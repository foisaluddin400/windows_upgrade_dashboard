import { useState } from "react";
import { Search, Download, User } from "lucide-react";
import { Link } from "react-router";
import { Input, message, Pagination, Popconfirm, Select, Spin, Table } from "antd";

import { MdBlockFlipped } from "react-icons/md";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import {
  useBlockUserMutation,
  useGetCustomerDataQuery,
} from "../../redux/api/userApi";
const AllUsersTab = () => {
  const [blockUserData] = useBlockUserMutation();
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  console.log(statusFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { data: customerData } = useGetCustomerDataQuery({
    page: 1,
    limit: 5,

    // Send query only if filter is not empty
    ...(statusFilter !== "" && { isBlocked: statusFilter }),
  });
  console.log(customerData);
  const users =
    customerData?.data?.result?.map((item) => ({
      id: item._id,
      name: item.name,
        avatar: item.profile_image
        ? `${item.profile_image}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      email: item.email,
      joined: item.createdAt.slice(0, 10),
      activeTasks: item.totalTaskCount,
      isBlocked: item.user?.isBlocked || false,
      blockId: item?.user?._id,
    })) || [];

  const handleBlock = async (record) => {
    const id = record?.blockId;
    try {
      setLoading(true);
      const res = await blockUserData(id);
      toast.success(res?.data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.avatar}
            alt={record.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-medium">{record.name}</p>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Joined Date",
      dataIndex: "joined",
      key: "joined",
    },

    {
      title: "Active Tasks",
      dataIndex: "activeTasks",
      key: "activeTasks",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          {/* View Button */}
          <Link to={`/block-user/${record.id}`}>
            <button
              className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
              title="View Details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </Link>

          {/* Block Button */}
          <Popconfirm
            title={`Are you sure to ${record.isBlocked ? 'Unblock' : 'Block'} This Account?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleBlock(record)}
          >
            <button
              className={`p-2 text-xl rounded-lg transition ${
                record.isBlocked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              title="Block User"
             
            >
            
                <MdBlockFlipped />
            
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {/* Table */}
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default AllUsersTab;
