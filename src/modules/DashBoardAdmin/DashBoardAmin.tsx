import { Button, Input } from "antd";
import { useState } from "react";

import ModalRegisterUpdateStudent from "@/modules/DashBoardAdmin/components/ModalRegisterUpdateStudent";
import { ETypeModal, templateData } from "@/modules/DashBoardAdmin/const";
import useNotification from "@/modules/DashBoardAdmin/hooks/useNotification";
import { useAddStudent } from "@/services/api/students/useAddStudent";
import { useGetStudentList } from "@/services/api/students/useGetAllStudent";

import TableStudents from "./components/TableStudents";
import style from "./DashBoardAdminStyle.module.scss";
import { IStudent } from "./types";
import { convertStringToJSON } from "./utils/convertStringToJSON";

export default function DashBoardAmin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: dataStudents, refetch } = useGetStudentList();
  const { mutateAsync: addStudentMutation } = useAddStudent();
  const [inputName, setInputName] = useState("");
  const { openNotificationSuccess, contextHolder } = useNotification();

  const jsonString = convertStringToJSON(dataStudents);
  let data: IStudent[] = [];
  if (jsonString) {
    try {
      data = JSON.parse(jsonString) as IStudent[];
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  const onFinish = async (values: IStudent) => {
    const payload = templateData(
      {
        ...values,
        dateBirth: new Date(values.dateBirth).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      },
      "add"
    );
    openNotificationSuccess("top", "Success", "Student has been added");
    setIsOpenModal(false);
    await addStudentMutation(payload);
    return refetch();
  };
  let timeout: NodeJS.Timeout | null = null;

  const debouncedHandleInputName = (value: string) => {
    setInputName(value);
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      debouncedHandleInputName(value);
    }, 500);
  };
  const filterDataByName = () => {
    if (inputName === "") {
      return data;
    }
    return data.filter(item => {
      return item.name.toLowerCase().includes(inputName.toLowerCase());
    });
  };

  return (
    <div className={style.container}>
      {contextHolder}
      <div className={style.groupInputButton}>
        <Input
          className={style.input}
          placeholder="Enter the name of student to find"
          onChange={handleInputName}
        />
        <Button
          onClick={() => {
            setIsOpenModal(true);
          }}
          type="primary"
        >
          Add Student
        </Button>
      </div>
      <ModalRegisterUpdateStudent
        visible={isOpenModal}
        title={"Create Student"}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        onFinish={onFinish}
        onOk={function (): void {
          throw new Error("Function not implemented.");
        }}
        type={ETypeModal.ADD}
      />
      <TableStudents refetch={refetch} listStudents={filterDataByName()} />
    </div>
  );
}
