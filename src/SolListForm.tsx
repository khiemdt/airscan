import { Button, Form, Input } from "antd";
import { FC, useEffect } from "react";
interface modalInterFace {
  modal?: any;
  handleSolList?: any;
}

const SolListForm: FC<modalInterFace> = (props: any) => {
  const { modal, handleSolList } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const onFinish = (value: any) => {
    const solArr: any = value?.textArea?.split("\n");
    handleSolList({
      ...value,
      item: solArr,
    });
  };

  useEffect(() => {
    if (modal.open) {
      form.resetFields();
    }
  }, [modal.open]);

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        layout="horizontal"
        initialValues={{
          ...modal,
        }}
        style={{ width: "100%" }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name={"index"} hidden>
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"title"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"des"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"textArea"}
        >
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            htmlType="submit"
            type="primary"
            className="submit-button"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SolListForm;
