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
import { API_KEY, CHAIN_SP } from "./constants/constant";
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

  const getAccount = async (arr: string[]) => {
    setLoading(true);
    const result: any[] = [];
    for (let index = 0; index < CHAIN_SP.length; index++) {
      const params = {
        chainID: CHAIN_SP[index],
        filterDust: true,
        filterSpam: true,
        apikey: API_KEY,
      };
      try {
        const data = await fetAccount(params, arr[0]);
        if (data) {
          if (data.length) {
            result.push({
              chain: CHAIN_SP[index],
              data: data,
            });
          }
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    setAccount(result);
  };

  const getValueOnchain = (data: any[]) => {
    if (!data || !data.length) {
      return 0;
    }

    const result = data.reduce((accumulator: number, currentElement: any) => {
      console.log(currentElement?.fiat?.[0].value);

      const sum = currentElement
        ? (
            Number(currentElement?.fiat?.[0].value || 0) /
            Math.pow(10, currentElement?.fiat?.[0]?.decimals || 1)
          ).toFixed(2)
        : 0;
      return accumulator + Number(sum);
    }, 0);

    return result;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "chain",
      with: 100,
    },
    {
      title: "$",
      dataIndex: "data",
      key: "data",
      render: (text: any) => {
        return <span>{getValueOnchain(text)}</span>;
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
    if (solList.length) {
      getAccount(solList[0]?.item);
    }
  }, []);

  return (
    <div className="container">
      <h1>Scan EVM wallets</h1>
      <Row style={{ marginTop: "10px" }}>
        <Col span={24}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            loading={loading}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Table
          size="small"
          style={{ width: "100%" }}
          pagination={false}
          dataSource={account || []}
          columns={columns}
          scroll={{ y: 500 }}
          expandable={{
            expandedRowRender: (record: any) => (
              <DetailTabs record={record?.data} />
            ),
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
