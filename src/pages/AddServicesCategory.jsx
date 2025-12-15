import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../redux/api/metaApi";

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};
const AddServicesCategory = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [addcategory] = useAddCategoryMutation();
  const [fileList, setFileList] = useState([]);

  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      if (fileList.length > 0) {
        formData.append("category_image", fileList[0].originFileObj);
      }

      const dataObj = {
        name: values.name,
      };

      formData.append("data", JSON.stringify(dataObj));

      const res = await addcategory(formData).unwrap();

      message.success(res.message);
      form.resetFields();
      setFileList([]);
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
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
      <div className="">
        <div>
          <div className="font-bold text-center mb-6">+ Add Category</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Enter title" style={{ height: "40px" }} />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            {/* Save Button */}
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
                    <Spin size="small" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddServicesCategory;
