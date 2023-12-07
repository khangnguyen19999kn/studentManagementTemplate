import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Button, DatePickerProps, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { ETypeModal, templateData } from "@/modules/DashBoardAdmin/const";
import useNotification from "@/modules/DashBoardAdmin/hooks/useNotification";
import { useDeleteStudent } from "@/services/api/students/useDeleteStudent";
import { useUpdateStudent } from "@/services/api/students/useUpdateStudent";

import { IStudent } from "../types";

import ModalRegisterUpdateStudent from "./ModalRegisterUpdateStudent";

interface ITableStudents {
  listStudents?: IStudent[];
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<string, Error>>;
}

export default function TableStudents({ listStudents, refetch }: ITableStudents) {
  const { mutateAsync: deleteMutation } = useDeleteStudent();
  const { openNotificationSuccess, contextHolder } = useNotification();
  const listDataShow = listStudents?.map(student => {
    return {
      ...student,
      key: student.Id,
    };
  });
  const confirmDelete = async (key: string) => {
    await deleteMutation(key);
    openNotificationSuccess("top", "Success", "Student has been deleted");
    return refetch();
  };
  const columns: ColumnsType<IStudent> = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateBirth",
      key: "dateBirth",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 1,
      },
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
      sorter: {
        compare: (a, b) => a.gpa - b.gpa,
        multiple: 3,
      },
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: (key: string) => (
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "#228B22", marginRight: "10px" }}
            onClick={() => showModal(key)}
            icon={<EditOutlined />}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete Student"
            description="Are you sure to delete this student?"
            onConfirm={() => {
              return confirmDelete(key);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<IStudent>();

  const showModal = (id: string) => {
    setIsModalOpen(true);
    handleTestButton(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values: IStudent) => {
    console.log(values);
    const payload = templateData(
      {
        ...values,
        dateBirth: new Date(values.dateBirth).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      },
      "edit"
    );
    await updateStudentMutation(payload);
    setIsModalOpen(false);
    openNotificationSuccess("top", "Success", "Student has been updated");
    return refetch();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange: DatePickerProps["onChange"] = dateString => {
    console.log(dateString);
  };

  const { mutateAsync: updateStudentMutation } = useUpdateStudent();

  const handleTestButton = (id: string) => {
    const detailStudent = listDataShow?.filter(student => student.Id === id)[0];
    setDataDetail(detailStudent);
  };
  return (
    <div>
      {contextHolder}
      {dataDetail && (
        <ModalRegisterUpdateStudent
          visible={isModalOpen}
          title="Update Student"
          onOk={handleOk}
          onCancel={handleCancel}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onChangeDatePicker={onChange}
          type={ETypeModal.EDIT}
          student={dataDetail}
        />
      )}
      <Table columns={columns} dataSource={listDataShow} />
    </div>
  );
}
