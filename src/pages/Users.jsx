import { useState } from "react";
import { Search, Download, User } from "lucide-react";
import { Link } from "react-router";
import { Input, Pagination, Select, Spin, Table } from "antd";
import {
  useBlockUserMutation,
  useGetCustomerDataQuery,
} from "../redux/api/userApi";
import { MdBlockFlipped } from "react-icons/md";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";

// ⬇️ Import XLSX for Excel Export
import * as XLSX from "xlsx";

const Users = () => {
  const [blockUserData] = useBlockUserMutation();
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: customerData } = useGetCustomerDataQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    ...(statusFilter !== "" && { isBlocked: statusFilter }),
  });
console.log(customerData)
  const users =
    customerData?.data?.result?.map((item) => ({
      id: item._id,
      name: item.name,
      avatar: item.profile_image,
      email: item.email,
      joined: item.createdAt.slice(0, 10),
      activeTasks: item.totalTaskCount,
      isBlocked: item.user?.isBlocked || false,
       isVerify: item.user?.isAdminVerified || false,
      blockId: item?.user?._id,
      phone: item?.phone,
      bankAccountNumber: item?.bankAccountNumber,
      bankName: item?.bankName,
      referralCode: item?.referralCode,
      isAddressProvided: item?.isAddressProvided || false,
      address: `${item.city} ${item.street}`,
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

  // ⬇️ EXPORT CSV/EXCEL FUNCTION
  const exportToExcel = () => {
    if (!users.length) {
      toast.error("No data available to export");
      return;
    }

    // Format data for Excel (remove avatar and unnecessary fields)
    const formattedData = users.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Joined_Date: user.joined,
      Active_Tasks: user.activeTasks,
      Is_Blocked: user.isBlocked ? "Yes" : "No",
      Phone: user?.phone,
      Address: user?.address,
      Bank_Name: user?.bankName,
      Bank_Account_Number: user?.bankAccountNumber,
      Referral_Code: user?.referralCode,
      Is_Address_Provided: user.isAddressProvided ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "users-data.xlsx");
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
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Joined Date", dataIndex: "joined", key: "joined" },
    { title: "Active Tasks", dataIndex: "activeTasks", key: "activeTasks" },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Link to={`/block-user/${record.id}`}>
            <button
              className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg"
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

          <button
            onClick={() => handleBlock(record)}
            className={`p-2 text-xl rounded-lg transition ${
              record.isBlocked
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
            title="Block User"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="px-[2px]">
                  <Spin size="small" />{" "}
                </div>
              </>
            ) : (
              <MdBlockFlipped />
            )}
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-800">
            User Management
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150, height: "42px" }}
            options={[
              { value: "", label: "All" },
              { value: false, label: "Unblock User" },
              { value: true, label: "Blocked User" },
            ]}
          />

          <Input
            placeholder="Search here..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "400px", height: "42px" }}
          />

          {/* ⬇️ EXPORT BUTTON */}
          <div>
            <button
              onClick={exportToExcel}
              className="bg-[#115E59] w-[150px] hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={customerData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Users;
