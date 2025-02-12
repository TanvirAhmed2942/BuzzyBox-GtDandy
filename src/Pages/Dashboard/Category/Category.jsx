import React, { useState } from "react";
import { Modal, Flex, Input, Upload, message, Form } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";

import CategoryTable from "./CategoryTable";
import ButtonEDU from "../../../components/common/ButtonEDU";

const { Dragger } = Upload;

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">Category</h1>
        <button
          className="bg-gtdandy text-white px-4 py-2.5 rounded-md flex items-center"
          onClick={showModal}
        >
          <PlusOutlined className="mr-2" />
          Add New
        </button>
      </div>

      <CategoryTable />

      <Modal
        title="Add Category"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <AddCategory onClose={handleCancel} />
      </Modal>
    </>
  );
}

export default Category;

// ✅ Fixed AddCategory Component
const AddCategory = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Category Data:", values);
        message.success("Category added successfully!");
        onClose(); // Close modal
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <Form form={form} layout="vertical">
      <Flex vertical gap={20} className="py-5">
        {/* ✅ Fixed Label for Image */}
        <Flex vertical gap={5}>
          <label>
            Name <span className="text-red-600 text-[18px] ml-1">*</span>
          </label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input placeholder="Enter category name" className="h-12" />
          </Form.Item>
        </Flex>

        <Flex vertical gap={5}>
          <label>
            Image <span className="text-red-600 text-[18px] ml-1">*</span>
          </label>
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <UploadImg />
          </Form.Item>
        </Flex>
      </Flex>

      <div className="flex justify-end gap-4">
        <ButtonEDU actionType="cancel" onClick={onClose} />
        <ButtonEDU actionType="update" onClick={handleSubmit} />
      </div>
    </Form>
  );
};

// ✅ Fixed Upload Image Component with Validation
const UploadImg = () => {
  const [fileList, setFileList] = useState([]);

  const props = {
    name: "file",
    multiple: false,
    fileList,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      let newFileList = [...info.fileList];

      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }

      setFileList(newFileList);
    },
    onRemove: (file) => {
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined style={{ color: "#ffc301", fontSize: "30px" }} />
      </p>
      <p className="ant-upload-hint text-[10px]">
        Upload Image (Max: 2MB, .jpg, .png)
      </p>
    </Dragger>
  );
};
