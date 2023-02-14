import { Col, Row, Tabs, TabsProps } from "antd";
import { FC } from "react";
import TokensDetail from "./TokensDetail";

interface interfacePros {
  record?: any;
}

const DetailTabs: FC<interfacePros> = (props: any) => {
  const { record } = props;

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Token`,
      children: <TokensDetail record={record} />,
    },
    {
      key: "2",
      label: `NFTs`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Transaction`,
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <Row style={{ padding: "0px 10px" }}>
      <Col span={24}>
        <Tabs
          style={{ width: "100%" }}
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
export default DetailTabs;
