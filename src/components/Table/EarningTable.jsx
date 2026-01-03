import { Pagination, Table } from "antd";
import { ArrowLeft, Download } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { useGetEarningQuery } from "../../redux/api/metaApi";
import dayjs from "dayjs";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const EarningTable = () => {
const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: paymentData } = useGetEarningQuery({
    page: currentPage,
    limit: pageSize,
  });

    const { data: paymentDataExcell } = useGetEarningQuery({
    page: 1,
    limit: 100000,
  });


  // Format data for Excel (remove avatar and unnecessary fields)
  const formattedData = paymentData?.data?.result?.map((item, index) => ({
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



const exportToExcel = () => {
  if (!formattedData.length) {
    toast.error("No data available to export");
    return;
  }

  const formattedDataExcel = paymentDataExcell?.data?.result?.map((item, index) => ({
    key: item._id,


    user: {
      name: item.customer?.name,
      email: item.customer?.email,
  
      
    },

    taskTitle: item.task?.title,
    amount: item.platformEarningAmount,
    date: item.createdAt,
  }));



  const worksheet = XLSX.utils.json_to_sheet(formattedDataExcel);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Task Providers");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(data, "task-providers.xlsx");
};


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
      <div className="flex justify-between h-20 items-center rounded-md overflow-clip ">
        <div className="flex items-center gap-2">
          <Link
            to="/earnings"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <p className="text-xl font-semibold">Earning History</p>{" "}
        </div>
        <button onClick={exportToExcel} className="bg-[#115E59] cursor-pointer hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
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

export default EarningTable;
