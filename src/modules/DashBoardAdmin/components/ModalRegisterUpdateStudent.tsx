import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Modal, Input, DatePicker, Button, Form, InputNumber, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

import { ETypeModal } from "@/modules/DashBoardAdmin/const";

import { IStudent } from "../types";

interface IModalRegisterUpdateStudentProps {
  visible: boolean;
  student?: IStudent;
  title: string;
  onOk?: () => void;
  onCancel?: () => void;
  onFinish?: (value: IStudent) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onChangeDatePicker?: (value: Dayjs | null, dateString: string) => void;
  type: ETypeModal;
}

export default function ModalRegisterUpdateStudent({
  visible,
  title,
  onOk,
  onCancel,
  onFinish,
  onFinishFailed,
  student,
  type,
}: IModalRegisterUpdateStudentProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!student) return;
    form.setFieldsValue({
      Id: student?.Id,
      name: student?.name,
      dateBirth: dayjs(student.dateBirth, "DD/MM/YYYY"),
      email: student?.email,
      gpa: student?.gpa,
      password: student?.password,
    });
  }, [student]);
  useEffect(() => {
    if (type !== ETypeModal.ADD) return;
    form.resetFields();
  }, [visible]);

  return (
    <Modal title={title} open={visible} onOk={onOk} onCancel={onCancel} footer={false}>
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        form={form}
      >
        {type === ETypeModal.EDIT && (
          <Form.Item<IStudent> label="Id" name="Id">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item<IStudent>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input student name!" }]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>
        <Form.Item<IStudent>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input student gender!" }]}
        >
          <Select
            style={{ width: 170 }}
            placeholder="Select Gender"
            options={[
              { value: "MALE", label: "MALE" },
              { value: "FEMALE", label: "FEMALE" },
            ]}
          />
        </Form.Item>

        <Form.Item<IStudent>
          label="Date of Birth"
          name="dateBirth"
          rules={[{ required: true, message: "Please input student birth day" }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item<IStudent>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input student email", type: "email" }]}
        >
          <Input placeholder="Enter student email" />
        </Form.Item>
        <Form.Item<IStudent>
          label="GPA"
          name="gpa"
          rules={[{ required: true, message: "Please input GPA for student" }]}
        >
          <InputNumber style={{ width: "150px" }} min={1} max={4} placeholder="Enter student GPA" />
        </Form.Item>
        <Form.Item<IStudent>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input Password for student" }]}
        >
          <Input.Password
            placeholder="Enter student password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit">
            {type === ETypeModal.ADD ? "Add" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
