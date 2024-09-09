"use client";
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, message } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import DOMPurify from 'dompurify';

interface JobApplyModalProps {
  visible: boolean;
  onClose: () => void;
}

const JobApplyModal: React.FC<JobApplyModalProps> = ({ visible, onClose }) => {
  const [form] = useForm();
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<RcFile | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<RcFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('currentPosition', values.currentPosition || '');
    formData.append('currentSalary', values.currentSalary || '');
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resumeFile as RcFile);
    formData.append('coverLetterFile', coverLetterFile as RcFile);

    try {
      await axios.post('/api/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Application submitted successfully');
      onClose();
    } catch (error) {
      message.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      setResumeFile(info.file.originFileObj as RcFile);
    }
  };

  const handleCoverLetterChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      setCoverLetterFile(info.file.originFileObj as RcFile);
    }
  };

  return (
    <Modal
      title="Apply for Job"
      
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="!p-3 bg-white text-xl font-extrabold rounded-lg shadow-lg" // Added styling for modal
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="currentPosition"
            label="Current Position (Optional)"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="currentSalary"
            label="Current Salary (Optional)"
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Cover Letter"
          className="mt-4"
        >
          <ReactQuill
            value={coverLetter}
            onChange={(value) => setCoverLetter(DOMPurify.sanitize(value))}
            className="border rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Resume"
          className="mt-4"
        >
          <Upload
            beforeUpload={(file) => {
              const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
              if (!isValidType) {
                message.error('You can only upload PDF or DOC/DOCX files!');
              }
              return isValidType;
            }}
            onChange={handleResumeChange}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Resume</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Cover Letter File"
          className="mt-4"
        >
          <Upload
            beforeUpload={(file) => {
              const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
              if (!isValidType) {
                message.error('You can only upload PDF or DOC/DOCX files!');
              }
              return isValidType;
            }}
            onChange={handleCoverLetterChange}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Cover Letter</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JobApplyModal;
