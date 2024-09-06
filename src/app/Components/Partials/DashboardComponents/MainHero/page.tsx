// components/Dashboard.js
"use client";
import { Card, Col, Row } from 'antd';
import Layout from '../../../../Dashboard/Layout/page'

const Page = () => {
  return (
    <Layout>

    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card Title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
    </Layout>
  );
};

export default Page;
