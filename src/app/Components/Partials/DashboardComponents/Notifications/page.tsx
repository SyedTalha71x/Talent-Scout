"use client";
import { useEffect, useState } from "react";
import { List, Modal, Typography, Spin } from "antd";
import axios from "axios";
import Layout from "../../../../Dashboard/Layout/page";

const { Title, Paragraph } = Typography;

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications/getNotification");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const showModal = async (applicationId: string) => {
    try {
      const response = await axios.get(
        `/api/Jobs/recieveJobApplication/${applicationId}`
      );
      setSelectedApplication(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching application details:", error);
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
      <h3 className="text-2xl font-extrabold text-gray-800">Job Notifications Alert</h3>

      <div className=" p-4 rounded-lg shadow-md mt-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <div className="">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div key={item.id} className=" p-4 bg-slate-600 rounded-lg mt-3">
                      <h4 className="text-xl font-extrabold text-white">Job Application</h4>
                      <p className="text-white mt-1">{item.message}</p>
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-yellow-400 font-extrabold nav-btns text-white rounded-md py-2 px-8 cursor-pointer"
                          onClick={() => showModal(item.applicationId)}
                        >
                          View Application
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-white p-4">
                    No notifications available.
                  </p>
                )}
          </div>
        )}

        {/* Modal remains the same */}
        <Modal
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          {selectedApplication ? (
            <div>
              <h3 className="text-2xl mb-4 font-semibold">Applicant Information</h3>
              <p>
                <strong>Name:</strong> {selectedApplication.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplication.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedApplication.phoneNo}
              </p>
              <p>
                <strong>Current Position:</strong>{" "}
                {selectedApplication.currentPosition}
              </p>
              <p>
                <strong>Current Salary:</strong>{" "}
                {selectedApplication.currentSalary}
              </p>
              {selectedApplication.coverLetter &&<h4 className="text-xl font-medium mt-4">Cover Letter</h4>}
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: selectedApplication.coverLetter,
                }}
              />
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
