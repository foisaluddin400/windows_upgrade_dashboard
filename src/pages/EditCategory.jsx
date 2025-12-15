import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../redux/api/metaApi";

const EditCategory = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategory] = useUpdateCategoryMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Load existing category on open
  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: selectedCategory?.avatar,
        },
      ]);
    }
  }, [editModal, selectedCategory, form]);

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Append file
      if (fileList.length && fileList[0].originFileObj) {
        formData.append("category_image", fileList[0].originFileObj);
      }

      // Append JSON as string
      const dataObj = {
        name: values.name,
      };
      formData.append("data", JSON.stringify(dataObj));

      const res = await updateCategory({
        id: selectedCategory?.key,
        data:formData,
      }).unwrap();

      message.success(res?.message || "Category updated!");
      setEditModal(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Update failed");
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
        <div className="font-bold text-center mb-6">Edit Category</div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please input category name" }]}
          >
            <Input placeholder="Enter category name" style={{ height: 40 }} />
          </Form.Item>

          <Form.Item label="Category Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

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
                  <span>Updating...</span>
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

export default EditCategory;
