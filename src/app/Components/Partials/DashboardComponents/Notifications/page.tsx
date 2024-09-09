"use client";
import { useEffect, useState } from 'react';
import { List, Button, Modal, Typography, Spin } from 'antd';
import axios from 'axios';
import Layout from '../../../../Dashboard/Layout/page';

const { Title, Paragraph } = Typography;

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications/getNotification');
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const showModal = async (applicationId: string) => {
    try {
      const response = await axios.get(`/api/Jobs/recieveJobApplication/${applicationId}`);
      setSelectedApplication(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching application details:', error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <div>
        {loading ? (
          <Spin />
        ) : (
          <List
            header={<Title level={3}>Notifications</Title>}
            bordered
            dataSource={notifications}
            renderItem={item => (
              <List.Item>
                <div>
                  <Title level={4}>Job Application</Title>
                  <Paragraph>{item.message}</Paragraph>
                  <Button onClick={() => showModal(item.applicationId)}>View Details</Button>
                </div>
              </List.Item>
            )}
          />
        )}

        <Modal
          title="Application Details"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedApplication ? (
            <div>
              <Title level={4}>Applicant Information</Title>
              <Paragraph><strong>Name:</strong> {selectedApplication.name}</Paragraph>
              <Paragraph><strong>Email:</strong> {selectedApplication.email}</Paragraph>
              <Paragraph><strong>Phone Number:</strong> {selectedApplication.phoneNo}</Paragraph>
              <Paragraph><strong>Current Position:</strong> {selectedApplication.currentPosition}</Paragraph>
              <Paragraph><strong>Current Salary:</strong> {selectedApplication.currentSalary}</Paragraph>
              <Title level={4}>Cover Letter</Title>
              <div dangerouslySetInnerHTML={{ __html: selectedApplication.coverLetter }} />
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default NotificationList;
