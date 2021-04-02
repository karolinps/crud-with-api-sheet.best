import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Drawer, message, Spin } from "antd";
import axios from "axios";
import FormComponent from "./Form";
import config from "../config";
const { Column } = Table;

function TableComponent() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dataByItem, setByItem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(config.api);
      if (response) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      message.error('Ha ocurrido un error')
      console.log(error);
    }
  };

  const confirmDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.api}/id/*${id}*`);
      if (response) {
        message.success("Se ha borrado exitosamente", 5);
        getData();
      }
    } catch (error) {
      message.error('Ha ocurrido un error')
      console.log(error);
    }
  };

  const showDrawer = (data) => {
    setTitle(data ? "Editar" : "Agregar");
    setVisible(true);
    setByItem(data);
  };
  const onClose = () => {
    setVisible(false);
  };

  const DrawerForm = (
    <>
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <FormComponent onClose={onClose} data={dataByItem} getData={getData} />
      </Drawer>
    </>
  );
  return (
    <>
      {DrawerForm}
      <Button onClick={() => showDrawer("")}>Agregar</Button>
      <br />
      {loading === true ? (
        <Spin />
      ) : (
        <Table dataSource={data} pagination={false} rowKey="name">
          <Column title="Nombre" dataIndex="name" key="name" />
          <Column title="Apellido" dataIndex="lastname" key="lastname" />
          <Column title="Edad" dataIndex="age" key="age" />
          <Column title="Teléfono" dataIndex="phone" key="phone" />
          <Column
            title="Acciones"
            key="actions"
            render={(el) => (
              <>
                <Button type="primary" onClick={() => showDrawer(el)}>
                  Editar
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Popconfirm
                  title="¿Está seguro de eliminar este registro?"
                  onConfirm={() => {
                    confirmDelete(el.id);
                  }}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="danger" style={{ cursor: "pointer" }}>
                    Borrar
                  </Button>
                </Popconfirm>
              </>
            )}
          />
        </Table>
      )}
    </>
  );
}

export default TableComponent;
