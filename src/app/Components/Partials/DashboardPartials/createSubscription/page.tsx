"use client";
import React from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Row,
  Col,
  message,
  Collapse,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css"; 

const { TextArea } = Input;
const { Panel } = Collapse;

const AddSubscription = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch("/api/subscriptions/postSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        message.success("Subscription added successfully!");
        form.resetFields();
      } else {
        message.error(result.message || "Failed to add the subscription");
        console.error("Error:", result);
      }
    } catch (error) {
      message.error("An error occurred while adding the subscription");
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-subscription-section">
      <h2 className="text-gray-800 text-2xl font-extrabold">
        Create a Subscription
      </h2>
      <Collapse defaultActiveKey={["1"]} accordion className="mt-4">
        <Panel header="Subscription Details" key="1">
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{ validTill: null }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="name"
                  label="Subscription Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the subscription name",
                    },
                  ]}
                >
                  <Input placeholder="Subscription Name" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="bulletpoints"
                  label="Bullet Points"
                  rules={[
                    {
                      required: false,
                      message: "Please enter the bullet points",
                    },
                  ]}
                >
                  <Select mode="tags" placeholder="Enter required Points">
                    {/* Allow entering multiple skills */}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="validTill"
                  label="Validity Till"
                  rules={[
                    {
                      required: true,
                      message: "Please select the validity ",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[
                    { required: true, message: "Please enter the price" },
                  ]}
                >
                  <InputNumber
                    placeholder="Price"
                    min={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    Add Subscription
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default AddSubscription;
