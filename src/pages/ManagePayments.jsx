import { useState } from 'react'
import { ArrowLeft, Search, Download, CreditCard } from 'lucide-react';
import PendingPayments from '../components/Table/PendingPayments';
import AllPayment from '../components/Table/AllPayment';
import { Link } from 'react-router';
import { useGetManagePaymentQuery } from '../redux/api/metaApi';
import { Pagination, Select, Table } from 'antd';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Navigate } from '../Navigate';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from 'react-toastify';
const ManagePayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
const [statusFilter, setStatusFilter] = useState("");
  const { data: managePayment, isLoading } =
    useGetManagePaymentQuery({
        searchTerm,
    page: currentPage,
    limit: pageSize,
    ...(statusFilter !== "" && { status: statusFilter }),
    });
  const { data: managePaymentExcell } =
    useGetManagePaymentQuery({
          page: 1,
    limit: 10000,
    });


  const manage = managePaymentExcell?.data?.result || [];
  console.log(manage)
const exportToExcel = () => {
    if (!manage.length) {
      toast.error("No data available to export");
      return;
    }

    // Format data for Excel (remove avatar and unnecessary fields)
const managePaymentExcell = manage.map((item, index) => ({
 

  ProviderName: item.provider?.name || "N/A",
  ProviderEmail: item.provider?.email || "N/A",

  TaskTitle: item.task?.title || "N/A",
  Status: item.status || "N/A",

  BankName: item.provider?.bankName || "Not Provided",
  AccountNumber: item.provider?.bankAccountNumber || "Not Provided",

  PaymentDate: item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "N/A",
}));


    const worksheet = XLSX.utils.json_to_sheet(managePaymentExcell);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "users-data.xlsx");
  };




 const columns = [
  {
    title: "Provider",
    key: "provider",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        {record.provider?.profile_image ? (
          <img
            src={record.provider.profile_image}
            className="w-10 h-10 rounded-full object-cover"
            alt={record.provider.name}
          />
        ) : (
          <FaRegCircleUser className="text-3xl text-gray-400" />
        )}
        <span className="font-medium">
          {record.provider?.name || "N/A"}
        </span>
      </div>
    ),
  },
  {
    title: "Task",
    key: "task",
    render: (_, record) => record.task?.title || "N/A",
  },
  {
    title: "Bank Name",
    key: "bankName",
    render: (_, record) =>
      record.provider?.bankName || "Not Provided",
  },
  {
    title: "Account No",
    key: "bankAccountNumber",
    render: (_, record) =>
      record.provider?.bankAccountNumber || "Not Provided",
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) =>
      record?.status || "Not Provided",
  },
  {
    title: "Payment Date",
    key: "createdAt",
    render: (_, record) =>
      new Date(record.createdAt).toLocaleDateString(),
  },
];
    

    
    
  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
       <Navigate title="Manage Payments" />

        <div className="flex items-center gap-4">
            <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150, height: "42px" }}
            options={[
              { value: "", label: "All" },
              { value: 'PAID', label: "Paid" },
              { value: 'UNPAID', label: "Unpaid" },
            ]}
          />

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>

          <button onClick={exportToExcel} className="bg-[#115E59] hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <Table
        dataSource={managePayment?.data?.result || []}
        columns={columns}
        loading={isLoading}
        pagination={false}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={managePayment?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default ManagePayments