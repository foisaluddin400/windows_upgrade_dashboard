import { Form, Input, message, Modal, Spin, Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { useUpdatePromoMutation } from "../redux/api/metaApi";
import dayjs from "dayjs";

const UpdateManagePromo = ({ editModal, setEditModal, selectedPromo, refetch }) => {
  const [form] = Form.useForm();
  const [updatePromo] = useUpdatePromoMutation();
  const [loading, setLoading] = useState(false);

  // ✅ DEFAULT VALUES SET
  useEffect(() => {
    if (editModal && selectedPromo) {
      form.setFieldsValue({
        promoCode: selectedPromo?.promoCode,
        promoType: selectedPromo?.promoType,
        limit: selectedPromo?.limit,
        discountType:
          selectedPromo?.discountType === "PERCENT" ? "percentage" : "flat",
        discountValue: selectedPromo?.discountNum,
        startDate: selectedPromo?.startDate
          ? dayjs(selectedPromo?.startDate)
          : null,
        endDate: selectedPromo?.endDate ? dayjs(selectedPromo?.endDate) : null,
      });
    }
  }, [editModal, selectedPromo, form]);

  const handleCancel = () => {
    form.resetFields();
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    const finalData = {
      promoCode: values.promoCode,
      promoType: values.promoType,
      discountType: values.discountType === "percentage" ? "PERCENT" : "FIXED",
      discountNum: Number(values.discountValue),
      limit: Number(values.limit),
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };

    try {
      setLoading(true);

      await updatePromo({
        id: selectedPromo?._id,
        data: finalData,
      }).unwrap();

      message.success("Promo Updated Successfully!");

      form.resetFields();
      setEditModal(false);
      refetch && refetch();
    } catch (err) {
      console.log(err);
      message.error("Failed to update promo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <div>
        <div className="font-semibold text-3xl text-center mb-5">
          Update Manage Promo
        </div>
        <p className="text-neutral-700 text-center mb-7">
          Update promo details and manage discount settings.
        </p>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Promo Code"
            name="promoCode"
            rules={[{ required: true, message: "Please enter promo code" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Promo Type"
            name="promoType"
            rules={[{ required: true, message: "Please enter promo type" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Uses Limit"
            name="limit"
            rules={[{ required: true, message: "Enter limit" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[{ required: true, message: "Select discount type" }]}
            >
              <Select placeholder="Select" size="large">
                <Select.Option value="percentage">Percentage</Select.Option>
                <Select.Option value="flat">Fixed Amount</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Discount Value"
              name="discountValue"
              rules={[{ required: true, message: "Enter discount" }]}
            >
              <Input type="number" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Valid From"
              name="startDate"
              rules={[{ required: true, message: "Select start date" }]}
            >
              <DatePicker
                size="large"
                className="w-full"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Valid To"
              name="endDate"
              rules={[{ required: true, message: "Select end date" }]}
            >
              <DatePicker
                size="large"
                className="w-full"
                format="YYYY-MM-DD"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <button
              className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                loading
                   ? "bg-[#376b68] cursor-not-allowed"
                        : "bg-[#115E59] cursor-pointer hover:bg-teal-700"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin size="small" /> <span>Updating...</span>
                </>
              ) : (
                "Update"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateManagePromo;
