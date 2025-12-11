import { Pagination, Table, Tag } from "antd";
import { Download } from "lucide-react";
import { useGetAllReferralQuery } from "../../redux/api/metaApi";
import { useState } from "react";

const ReferralUses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: referralData } = useGetAllReferralQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ================
  // 🔥 MAP API DATA
  // ================
  const mappedData =
    referralData?.data?.result?.map((item) => ({
      id: item._id,

     
      referrerName: item.referrer?.name || "N/A",
      referrerEmail: item.referrer?.email || "N/A",
      referrerAvatar:
        item.referrer?.profile_image ||
        "https://ui-avatars.com/api/?name=" + item.referrer?.name,

      
      referredName: item.referred?.name || "N/A",
      referredEmail: item.referred?.email || "N/A",
      referredAvatar:
        item.referred?.profile_image ||
        "https://ui-avatars.com/api/?name=" + item.referred?.name,

      // Referral Value
      value: item.value || 0,

      // Referral Status
      status: item.status,

      // Applied Date
      date: item.appliedAt
        ? new Date(item.appliedAt).toLocaleDateString()
        : "Not Applied",
    })) || [];

  // 🔥 Table Columns
  const columns = [
    {
      title: "Referrer Info",
      dataIndex: "referrerName",
      key: "referrerName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.referrerAvatar}
            alt={record.referrerName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {record.referrerName}
            </p>
            <p className="text-xs text-gray-500">{record.referrerEmail}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Referred User",
      dataIndex: "referredName",
      key: "referredName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.referredAvatar}
            alt={record.referredName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-900">{record.referredName}</p>
             <p className="text-xs text-gray-500">{record.referredEmail}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Referred Value",
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <span className="text-sm font-medium text-gray-900">₦{value}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "ACTIVE" ? "green" : "volcano"}
          className="px-3 py-1 text-xs rounded-full"
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Applied Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span className="text-sm text-gray-900">{date}</span>,
    },
  ];

  return (
    <>
      {/* Export Button */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div>
        <Table
          dataSource={mappedData}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={referralData?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ReferralUses;
