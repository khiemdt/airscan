import {
  AudioOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Row, Card } from "antd";
import Avatar from "antd/es/avatar";
import Button from "antd/es/button";
import Drawer from "antd/es/drawer";
import { Col } from "antd/es/grid";
import Input from "antd/es/input";
import Skeleton from "antd/es/skeleton";
import Table from "antd/es/table";
import { FC, useState } from "react";
import "./App.css";
import SolListForm from "./SolListForm";

function App() {
  const [solList, setSolList] = useState<any[]>([]);
  const { Search } = Input;
  const { Meta } = Card;
  const [modal, setModal] = useState<any>({
    item: [],
    open: false,
    title: null,
    des: null,
  });

  const onSearch = (value: string) => console.log(value);
  const dataSource = [...Array(100)].map((el: any, index: number) => ({
    key: index,
    name: "Mike",
    age: 32 + index,
    address: "10 Downing Street",
  }));

  const handleSolList = (value: any) => {
    solList.push(value);
    setSolList(solList);
    onClose();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text: number) => {
        return <span>{text + 1} </span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onClose = () => {
    setModal({
      item: [],
      open: false,
      title: null,
      des: null,
    });
  };

  return (
    <div className="container">
      <h1>Scan SOL wallets</h1>
      <Row>
        <Col span={24}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row gutter={10} style={{ marginTop: "24px" }}>
        {solList.map((el: any) => (
          <Col span={6}>
            <Card
              hoverable
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta title={el.title} description={el.des} />
              </Skeleton>
            </Card>
          </Col>
        ))}
        {!solList.length ||
          (solList?.length < 4 && (
            <Col span={6}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({
                    item: [],
                    open: true,
                    title: null,
                    des: null,
                  });
                }}
                className="btn-main"
                type="primary"
              >
                Add SOL list
              </Button>
            </Col>
          ))}
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Table
          size="small"
          style={{ width: "100%" }}
          pagination={false}
          dataSource={dataSource || []}
          columns={columns}
          loading={false}
          scroll={{ y: 500 }}
        />
      </Row>
      <Drawer
        title="Add Sol list"
        placement="right"
        onClose={onClose}
        open={modal.open}
      >
        <SolListForm modal={modal} handleSolList={handleSolList} />
      </Drawer>
    </div>
  );
}

export default App;
