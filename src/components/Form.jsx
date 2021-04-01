import { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import config from "../config";

function FormComponent(props) {
  const { onClose, data } = props;
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  useEffect(() => {
    data ? loadInfo(data) : loadInfoDefault();
  }, [data]);

  const loadInfoDefault = () => {
    form.setFieldsValue({
      name: "",
      lastname: "",
      age: "",
      phone: "",
    });
  };

  const loadInfo = (data) => {
    setId(data.id);
    form.setFieldsValue({
      name: data.name,
      lastname: data.lastname,
      age: data.age,
      phone: data.phone,
    });
  };
  const sendData = async (values) => {
    const obj = {
      id: id ? id : uuidv4(),
      name: values.name,
      lastname: values.lastname,
      age: values.age,
      phone: values.phone,
    };
    if (!id) {
      try {
        const response = await axios.post(config.api, obj);
        if (response) {
          message.success("Se ha guardado exitosamente", 10);
          form.resetFields();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = axios.put(`${config.api}/id/*${id}*`, obj);
        if (response) {
          message.success("Se ha guardado exitosamente", 10);
          form.resetFields();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={sendData}
        layout={"vertical"}
        form={form}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="lastname"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Edad"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {data ? 'Actualizar': 'Agregar'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormComponent;
