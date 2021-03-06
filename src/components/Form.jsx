import React, { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import PropTypes from "prop-types";

function FormComponent(props) {
  const { onClose, data, getData } = props;
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  useEffect(() => {
    data ? loadInfo(data) : loadInfoDefault();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
          message.success("Se ha guardado exitosamente", 5);
          form.resetFields();
          onClose();
          getData();
        }
      } catch (error) {
        console.log(error);
        message.error("Ha ocurrido un error");
      }
    } else {
      try {
        const response = await axios.put(`${config.api}/id/*${id}*`, obj);
        if (response) {
          message.success("Se ha actualizado exitosamente", 5);
          onClose();
          getData();
        }
      } catch (error) {
        console.log(error);
        message.error("Ha ocurrido un error");
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
          label="Tel??fono"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {data ? "Actualizar" : "Agregar"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
FormComponent.propTypes = {
  onClose: PropTypes.any,
  data: PropTypes.any,
  getData: PropTypes.any,
};
export default FormComponent;
