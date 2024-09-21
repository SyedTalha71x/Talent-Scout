"use client";
import { useEffect, useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { Input, Modal, Space, Spin } from "antd";
import type { GetProps } from "antd";
import axios from "axios";

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const Navbar = () => {
  const [notifications, setnotifications] = useState<any>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [isModal, setisModal] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications/getNotification");
        setnotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications/countNotifications");
        const data = await res.json();
        setNotificationCount(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const openModal = () => {
    setisModal(true);
  };

  const closeModal = () => {
    setisModal(false);
  };

  const isOK = () => {
    setisModal(false);
  };

  return (
    <div className="bg-[#181f4a] flex justify-between items-center p-5 text-white">
      <div>
        <div className="w-full">
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            // suffix={suffix}
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative  mr-4 cursor-pointer " onClick={openModal}>
          <IoNotificationsOutline className="text-3xl" />
          {notificationCount > 0 && (
            <div className="absolute top-[-5px] left-[16px] bg-yellow-400 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {notificationCount}
            </div>
          )}
        </div>
        <Link href={"/"}>
          <button className="bg-purple-600 flex justify-center items-center nav-btns py-2 px-6 rounded-md text-white mr-4">
            <TiArrowLeft className="pr-1 text-xl" />
            Back
          </button>
        </Link>
      </div>

      <Modal
        style={{ overflowY: "auto" }}
        title="Notifications"
        open={isModal}
        onOk={isOK}
        onCancel={closeModal}
        footer={null}
      >
        <p className="flex gap-1">
          You have <div className="font-extrabold"> {notificationCount}</div>{" "}
          new notifications.
        </p>
        <div className=" p-4 rounded-lg shadow-md mt-4">
          {Loading ? (
            <div className="flex justify-center items-center">
              <Spin />
            </div>
          ) : (
            <div className="cursor-pointer ">
              {notifications.length > 0 ? (
                notifications.map((item: any, index: any) => (
                  <Link key={index}
                    href={
                      "/Components/Partials/DashboardComponents/Notifications"
                    }
                  >
                    <div
                      key={item.id}
                      className=" p-3 w-full bg-slate-600 rounded-lg mt-3 hover:bg-slate-800 transition-all duration-300"
                    >
                      <h4 className="text-lg font-extrabold text-yellow-400">
                        Job Application
                      </h4>
                      <p className="text-white text-sm mt-1">{item.message}</p>
                      <div className="flex justify-end mt-4"></div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-white p-4">
                  No notifications available.
                </p>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
