import { Badge, message, Row, Space, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { tokenPriceDetail } from "../apis/api";

interface interfacePros {
  record?: any;
}

const columns: any = [
  {
    title: "#",
    dataIndex: "",
    render: (text: string, record: any, index: number) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: "Token",
    dataIndex: "symbol",
    key: "symbol",
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Logo",
    dataIndex: "symbolLogos",
    key: "symbolLogos",
    render: (text: any, record: any) => {
      return (
        <Space>
          <img style={{ width: 20 }} src={text?.[0]?.URI} alt="" />
        </Space>
      );
    },
  },
  {
    title: "Change 24h",
    dataIndex: "fiat",
    key: "fiat",
    render: (text: any, record: any) => {
      return (
        <Badge
          status={text?.[0]?.percentChange24Hour > 0 ? "success" : "error"}
          text={
            text ? `${Number(text?.[0].percentChange24Hour).toFixed(2)}%` : "0%"
          }
        />
      );
    },
  },
  {
    title: "Balance",
    dataIndex: "value",
    key: "value",
    render: (text: string, record: any) => {
      return (
        <span>
          {(Number(text) / Math.pow(10, record?.decimals)).toFixed(4)}
        </span>
      );
    },
  },
  {
    title: "$",
    dataIndex: "fiat",
    key: "fiat",
    render: (text: any, record: any) => {
      return (
        <span>
          {text
            ? (
                Number(text?.[0].value) / Math.pow(10, text?.[0]?.decimals)
              ).toFixed(2)
            : 0}
        </span>
      );
    },
    align: "right",
  },
];

const TokensDetail: FC<interfacePros> = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { record } = props;
  useEffect(() => {}, [record]);
  return (
    <Row>
      <Table
        size="small"
        style={{ width: "100%" }}
        pagination={false}
        dataSource={record || []}
        columns={columns}
        loading={loading}
        scroll={{ y: 400 }}
      />
    </Row>
  );
};
export default TokensDetail;
