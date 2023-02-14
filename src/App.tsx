import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Card, message, Row, Space, Tag } from "antd";
import Button from "antd/es/button";
import Drawer from "antd/es/drawer";
import { Col } from "antd/es/grid";
import Input from "antd/es/input";
import Skeleton from "antd/es/skeleton";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { fetAccount, search } from "./apis/api";
import "./App.css";
import DetailTabs from "./detail/DetailTabs";
import SolListForm from "./SolListForm";
let solListLocal: any = undefined;
function App() {
  solListLocal = localStorage.getItem("solListLocal")
    ? localStorage.getItem("solListLocal")
    : "[]";

  const [solList, setSolList] = useState<any[]>(JSON.parse(solListLocal));
  const [solPrice, setSolPrice] = useState<any>({});
  const [account, setAccount] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { Search } = Input;
  const { Meta } = Card;
  const [modal, setModal] = useState<any>({
    item: [],
    open: false,
    title: null,
    des: null,
  });

  const onSearch = (value: string) => {
    getAccount([value]);
  };
  const dataSource = [...Array(100)].map((el: any, index: number) => ({
    key: index,
    name: "Mike",
    age: 32 + index,
    address: "10 Downing Street",
  }));

  const handleSolList = (value: any) => {
    if (value.index != undefined) {
      setSolList(solList.splice(value.index, 1, value));
    } else {
      solList.push(value);
    }
    setSolList(solList);
    localStorage.setItem("solListLocal", JSON.stringify(solList));
    onClose();
  };

  const getAccount = async (arr: any) => {
    setAccount([]);
    const result = [];
    setLoading(true);
    for (let index = 0; index < arr?.length; index++) {
      const params = {
        address: arr[index],
        cluster: null,
      };
      try {
        const data = await fetAccount(params);
        if (data.succcess) {
          result.push({ ...data?.data, key: index });
        } else {
          result.push({
            account: arr[index],
            isErr: true,
            key: index,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    setAccount(result);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => {
        return <div>{index + 1} </div>;
      },
      with: 100,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: (text: string) => {
        return <div className="text-clip">{text} </div>;
      },
    },
    {
      title: "Balance",
      dataIndex: "lamports",
      key: "lamports",
      render: (text: string) => {
        return <span>{(Number(text) / Math.pow(10, 8)).toFixed(4)} </span>;
      },
    },
    {
      title: "Value",
      dataIndex: "lamports",
      key: "lamports",
      render: (text: string) => {
        return (
          <span>
            {((Number(text) / Math.pow(10, 8)) * solPrice.priceUsdt).toFixed(2)}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "isErr",
      key: "isErr",
      render: (text: string) => {
        return (
          <Tag color={text ? "error" : "success"}>
            {text ? "Error" : "Success"}
          </Tag>
        );
      },
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

  const fetPriceDetail = async () => {
    const params = {
      symbol: "SOL",
      cluster: null,
    };
    try {
      const data = await search(params);
      if (data.success) {
        setSolPrice(data?.data);
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetPriceDetail();
  }, []);

  return (
    <div className="container">
      <h1>Scan SOL wallets</h1>
      <Row>
        <Col style={{ margin: "auto", width: "200px" }}>
          <Space>
            <img
              src="https://solscan.io/static/media/solana-sol-logo.b612f1402147c92338bed5af1879b175.svg"
              alt=""
              height={10}
            />
            <b>${solPrice?.priceUsdt}</b>
            <Tag color={solPrice?.priceChange24h > 0 ? "success" : "error"}>
              {solPrice?.priceChange24h?.toFixed(2)}%{" "}
            </Tag>
            <span>Rank: #{solPrice.marketCapRank}</span>
          </Space>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
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
        {solList?.map((el: any, index) => (
          <Col span={6} key={index}>
            <Card
              loading={loading}
              hoverable
              actions={[
                <FileSearchOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    getAccount(el?.item);
                  }}
                  key="search"
                />,
                <EditOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal({ ...el, open: true, index: index });
                  }}
                  key="edit"
                />,
                <DeleteOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    let arr = [...solList];
                    arr.splice(index, 1);
                    setSolList(arr);
                    localStorage.setItem("solListLocal", JSON.stringify(arr));
                  }}
                  key="delete"
                />,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta title={el.title} description={el.des} />
              </Skeleton>
            </Card>
          </Col>
        ))}
        {(!solList?.length || solList?.length < 4) && (
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
        )}
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Table
          size="small"
          style={{ width: "100%" }}
          pagination={false}
          dataSource={account || []}
          columns={columns}
          loading={loading}
          scroll={{ y: 500 }}
          expandable={{
            expandedRowRender: (record: any) => <DetailTabs record={record} />,
          }}
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
