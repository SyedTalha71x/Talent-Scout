"use client";
import React from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker, Checkbox, Row, Col, Collapse } from 'antd';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddJob = () => {
  const onFinish = (values: any) => {
    console.log('Form Values: ', values);
    // Handle form submission here
  };

  return (
      <div className="add-job-section">
        <h2 className='text-gray-800 text-2xl font-extrabold'>Create a Job</h2>
        <Collapse defaultActiveKey={['1']} accordion className='mt-4'>
          <Panel header="Create Job Details" key="1">
            <Form 
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ isRemote: false }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="title" 
                    label="Job Title" 
                    rules={[{ required: true, message: 'Please enter the job title' }]}>
                    <Input placeholder="Job Title" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="company" 
                    label="Company Name" 
                    rules={[{ required: true, message: 'Please enter the company name' }]}>
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="location" 
                    label="Location" 
                    rules={[{ required: true, message: 'Please enter the job location' }]}>
                    <Input placeholder="Location" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="jobType" 
                    label="Job Type" 
                    rules={[{ required: true, message: 'Please select the job type' }]}>
                    <Select placeholder="Select Job Type">
                      <Select.Option value="Full-time">Full-time</Select.Option>
                      <Select.Option value="Part-time">Part-time</Select.Option>
                      <Select.Option value="Contract">Contract</Select.Option>
                      <Select.Option value="Freelance">Freelance</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="experienceLevel" 
                    label="Experience Level" 
                    rules={[{ required: true, message: 'Please select the experience level' }]}>
                    <Select placeholder="Select Experience Level">
                      <Select.Option value="Junior">Junior</Select.Option>
                      <Select.Option value="Mid">Mid</Select.Option>
                      <Select.Option value="Senior">Senior</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="experience" 
                    label="Experience (in years)" 
                    rules={[{ required: true, message: 'Please enter years of experience' }]}>
                    <InputNumber placeholder="Years" min={0} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="salary" 
                    label="Salary">
                    <InputNumber placeholder="Salary" min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="applicationDeadline" 
                    label="Application Deadline">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item 
                    name="isRemote" 
                    valuePropName="checked" 
                    label="Remote">
                    <Checkbox>Is this a remote job?</Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item 
                    name="description" 
                    label="Job Description" 
                    rules={[{ required: true, message: 'Please enter the job description' }]}>
                    <TextArea rows={4} placeholder="Enter full job description" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item 
                    name="briefDescription" 
                    label="Brief Description">
                    <TextArea rows={2} placeholder="Enter a brief description" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item 
                    name="skills" 
                    label="Skills Required" 
                    rules={[{ required: true, message: 'Please enter the skills required' }]}>
                    <Select mode="tags" placeholder="Enter required skills">
                      {/* Allow entering multiple skills */}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </div>
  );
};

export default AddJob;
