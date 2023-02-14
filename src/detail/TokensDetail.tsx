import { message, Row, Space, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { tokenPriceDetail } from "../apis/api";

interface interfacePros {
  record?: any;
}

const columns = [
  {
    title: "Account",
    dataIndex: "address",
    key: "address",
    render: (text: string, record: any) => {
      return (
        <a href={`https://solscan.io/token/${text}`} target="_blank">
          {text}{" "}
        </a>
      );
    },
  },
  {
    title: "Token",
    dataIndex: "tokenName",
    key: "tokenName",
    render: (text: string, record: any) => {
      return (
        <Space>
          <img style={{ width: 20 }} src={record.tokenIcon} alt="" />
          <span>{text} </span>
        </Space>
      );
    },
  },
  {
    title: "Balance",
    dataIndex: "amount",
    key: "amount",
    render: (text: string, record: any) => {
      return (
        <span>
          {(Number(text) / Math.pow(10, record?.decimals)).toFixed(4)}{" "}
        </span>
      );
    },
  },
];

const TokensDetail: FC<interfacePros> = (props: any) => {
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const { record } = props;
  const fetTokenPriceDetail = async () => {
    setLoading(true);
    const params = {
      address: record.account,
      cluster: null,
    };
    try {
      const data = await tokenPriceDetail(params);
      if (data.success) {
        setDataSource(data?.data);
      } else {
        message.error(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetTokenPriceDetail();
  }, [record]);
  return (
    <Row>
      <Table
        size="small"
        style={{ width: "100%" }}
        pagination={false}
        dataSource={dataSource || []}
        columns={columns}
        loading={loading}
      />
    </Row>
  );
};
export default TokensDetail;
