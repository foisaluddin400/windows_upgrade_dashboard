import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { useGetEarningQuery } from "../../redux/api/metaApi";
import { Pagination, Table } from "antd";
import dayjs from "dayjs";

const LastEarnHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: paymentData } = useGetEarningQuery({
    page: 1,
    limit: 5,
  });

  // Format data for Excel (remove avatar and unnecessary fields)
  const formattedData = paymentData?.data?.result?.slice(0,5).map((item, index) => ({
    key: item._id,
    sl: index + 1,

    user: {
      name: item.customer?.name,
      email: item.customer?.email,
     
      image: item.customer?.profile_image
        ? `${item.customer?.profile_image}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",

      
    },

    taskTitle: item.task?.title,
    amount: item.platformEarningAmount,
    date: item.createdAt,
  }));

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      align: "center",
    },

    {
      title: "User Info",
      key: "user",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center gap-3 justify-center">
          <img
            src={record.user.image }
            alt={record.user.name}
            className="w-10 h-10 rounded-full object-cover "
          />
          <div className="text-left">
            <p className="font-medium text-sm">{record.user.name}</p>
            <p className="text-xs text-gray-500">{record.user.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Task Title",
      dataIndex: "taskTitle",
      key: "taskTitle",
      align: "center",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount) => (
        <span className="font-semibold text-green-600">₦ {amount}</span>
      ),
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => dayjs(date).format("DD MMM YYYY, hh:mm A"),
    },
  ];
  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div>
      <div className="flex justify-between h-20 items-center shadow-md px-12 rounded-md my-4 overflow-clip mt-20">
        <div>
          <p className="text-xl font-semibold">Last Earn History</p>
        </div>
        <Link to="/earning_table" className="text-[#115E59] font-semibold">
          Show All
        </Link>
      </div>
      <Table
        dataSource={formattedData}
        columns={columns}
        rowKey="key"
        pagination={false}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={paymentData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default LastEarnHistory;
