import { useState } from "react";
import { Search, Download, ClipboardList } from "lucide-react";
import { Link } from "react-router";
import { Pagination, Popconfirm, Select, Spin, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  useBlockUserMutation,
  useGetTaskProviderQuery,
} from "../redux/api/userApi";
import { toast } from "react-toastify";
import { Navigate } from "../Navigate";

const TaskProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  // 🔥 API CALL
  const { data: taskProviderData, isLoading } = useGetTaskProviderQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    ...(statusFilter !== "" && { isBlocked: statusFilter }),
  });


  const { data: taskProviderDataExcel} = useGetTaskProviderQuery({
    
    page: 1,
    limit: 10000,
   
  });

  const [blockUser] = useBlockUserMutation();


 


  const providers = taskProviderData?.data?.result || [];

 const providerExcel = taskProviderDataExcel?.data?.result || [];
  const handleBlock = async (record) => {
    const id = record.user?._id;

    try {
      setLoading(true)
      const res = await blockUser(id);
      toast.success(res?.data?.message);
      setLoading(false)
    } catch (error) {
      toast.error(error?.message);
      setLoading(false)
    }
  };
const exportToExcel = () => {
  if (!providers.length) {
    toast.error("No data available to export");
    return;
  }

  const formattedData = providerExcel.map((user, index) => ({
   
    Name: user.name || "N/A",
    Email: user.email || "N/A",
    Phone: user.phone || "N/A",
    City: user.city || "N/A",
    TotalTasks: user.totalTaskCount || 0,
    
    Status: user.user?.isBlocked ? "Blocked" : "Unblocked",
    CreatedAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
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
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={
              record.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={record.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-medium">{record.name}</p>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (city) => city || "N/A",
    },
    {
      title: "Tasks",
      dataIndex: "totalTaskCount",
      key: "totalTaskCount",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },

    // ACTION COLUMN
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          {/* View button */}
          <Link to={`/taskproviders-details/${record._id}`}>
            <button
              className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
              title="View Details"
            >
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </button>
          </Link>

          {/* Block Button */}
          <Popconfirm
            title={`Are you sure to ${
              record.user?.isBlocked ? "Unblock" : "Block"
            } This Account?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleBlock(record)}
          >
          <button
         
            className={`p-2 text-xl rounded-lg transition ${
              record.user?.isBlocked
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
            title="Block User"
            disabled={loading}
          >
           
              <MdBlockFlipped />
          
          </button></Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <Navigate title="Task Providers" />

        <div className="flex items-center gap-4">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180, height: "42px" }}
            options={[
              { value: "", label: "All Providers" },
              { value: false, label: "Unblocked" },
              { value: true, label: "Blocked" },
            ]}
          />

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search provider"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-64"
            />
          </div>

          {/* Export CSV */}
          <button  onClick={exportToExcel} className="bg-[#115E59] hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <Table
        loading={isLoading}
        dataSource={providers}
        columns={columns}
        pagination={false}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={taskProviderData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default TaskProviders;
