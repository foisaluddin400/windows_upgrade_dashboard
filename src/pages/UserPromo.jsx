import React, { useState } from "react";
import { Table, Avatar, Pagination } from "antd";
import { useGetAllPromoUseQuery } from "../redux/api/metaApi";
import dayjs from "dayjs";
import { Download } from "lucide-react";

const UserPromo = () => {
     const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
  const { data: promoUseData, isLoading } = useGetAllPromoUseQuery({
      page: currentPage,
    limit: pageSize,
  });

  const promoUses = promoUseData?.data?.result || [];
  const meta = promoUseData?.data?.meta || {};

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={customer?.profile_image || ""}
            size={45}
            style={{ border: "1px solid #eee" }}
          />
          <div>
            <div className="font-semibold">{customer?.name}</div>
            <div className="text-gray-500 text-sm">{customer?.email}</div>
          </div>
        </div>
      ),
    },

    {
      title: "Promo Code",
      dataIndex: "promo",
      key: "promoCode",
      render: (promo) => <span className="font-semibold">{promo?.promoCode}</span>,
    },

    {
      title: "Value",
      dataIndex: "promo",
      key: "value",
      render: (promo) =>
        promo?.discountType === "PERCENT"
          ? `${promo.discountNum}%`
          : `৳${promo.discountNum}`,
    },

    {
      title: "Used On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  return (
    <div className="">
    <div className="flex justify-end mb-3">
      <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center  gap-2">
          <Download size={18} /> Export CSV
        </button>
    </div>

      <Table
        dataSource={promoUses}
        columns={columns}
        loading={isLoading}
        rowKey={(item) => item._id}
        pagination={false}
      />
       <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserPromo;
