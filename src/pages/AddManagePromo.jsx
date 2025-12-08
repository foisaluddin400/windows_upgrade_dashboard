/* eslint-disable no-unused-vars */
import { Form, Input, message, Modal, Spin, Select, DatePicker } from "antd";
import React, { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { useAddAllPromoMutation } from "../redux/api/metaApi";

const AddManagePromo = ({ openAddModal, setOpenAddModal, refetch }) => {
  const [form] = Form.useForm();
  const [addPromo] = useAddAllPromoMutation();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    const data = {
      promoCode: values.promoCode,
      promoType: values.promoType,
      discountType:
        values.discountType === "percentage" ? "PERCENT" : "FIXED",
      discountNum: Number(values.discountValue),
      limit: Number(values.limit),
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };

    console.log("Sending to backend:", data);

    try {
      setLoading(true);

      await addPromo(data).unwrap();

      message.success("Promo Added Successfully!");

      form.resetFields();
      setOpenAddModal(false);
      refetch && refetch();
    } catch (error) {
      message.error("Failed to add promo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div>
        <div className="font-semibold text-3xl text-center mb-5">
          Add Manage Promo
        </div>
        <p className="text-neutral-700 text-center mb-7">
          Create a new promotional coupon to offer discounts and boost
          engagement.
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
            <Input placeholder="e.g. SUMMER24" size="large" />
          </Form.Item>

          <Form.Item
            label="Promo Type"
            name="promoType"
            rules={[{ required: true, message: "Please enter promo type" }]}
          >
            <Input placeholder="e.g. Seasonal Promo" size="large" />
          </Form.Item>

          <Form.Item
            label="Uses Limit"
            name="limit"
            rules={[{ required: true, message: "Enter limit" }]}
          >
            <Input type="number" placeholder="10" size="large" />
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
              rules={[{ required: true, message: "Enter value" }]}
            >
              <Input type="number" placeholder="20" size="large" />
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
                  ? "bg-[#fa8e97] cursor-not-allowed"
                  : "bg-[#E63946] hover:bg-[#941822]"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spin size="small" /> <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddManagePromo;
