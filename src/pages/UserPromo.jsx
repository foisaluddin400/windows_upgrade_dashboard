import React, { useState } from "react";
import { Table, Avatar, Pagination } from "antd";
import { useGetAllPromoUseQuery } from "../redux/api/metaApi";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
const UserPromo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: promoUseData, isLoading } = useGetAllPromoUseQuery({
    page: currentPage,
    limit: pageSize,
  });
  const { data: promoUseDataExcel } = useGetAllPromoUseQuery({
    page: 1,
    limit: 100000,
  });

  const promoUses = promoUseData?.data?.result || [];
  const promoUsesExcel = promoUseDataExcel?.data?.result || [];
  const meta = promoUseData?.data?.meta || {};

  const exportToExcel = () => {
    if (!promoUses.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedDataExcel = promoUsesExcel.map((item, index) => ({
      CustomerName: item.customer?.name || "N/A",
      CustomerEmail: item.customer?.email || "N/A",

      PromoCode: item.promo?.promoCode || "N/A",

      Discount:
        item.promo?.discountType === "PERCENT"
          ? `${item.promo?.discountNum}%`
          : `৳${item.promo?.discountNum || 0}`,

      UsedOn: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm"),
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
      render: (promo) => (
        <span className="font-semibold">{promo?.promoCode}</span>
      ),
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
        <button
          onClick={exportToExcel}
          className="bg-[#115E59] hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export CSV</span>
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
