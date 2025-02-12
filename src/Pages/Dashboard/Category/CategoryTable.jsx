import React, { useState } from "react";
import {
  Table,
  ConfigProvider,
  Modal,
  Upload,
  message,
  Form,
  Input,
} from "antd";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CloudUploadOutlined } from "@ant-design/icons";
import ButtonEDU from "../../../components/common/ButtonEDU";
import gift from "../../../assets/gtdandy/gift.png";

const { Dragger } = Upload;

function CategoryTable() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([
    { key: "1", name: "John Brown", serial: 1, sliderimg: gift },
    { key: "2", name: "Jim Green", serial: 2, sliderimg: gift },
    { key: "3", name: "Joe Black", serial: 3, sliderimg: gift },
  ]);

  const showEditModal = (record) => {
    setSelectedCategory(record);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (record) => {
    setSelectedCategory(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setData((prevData) =>
      prevData.filter((item) => item.key !== selectedCategory?.key)
    );
    setIsDeleteModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null); // Reset selected category when modal is closed
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null); // Reset selected category when modal is closed
  };

  const updateTableData = (updatedCategory) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === updatedCategory.key ? updatedCategory : item
      )
    );
    setIsEditModalOpen(false);
    setSelectedCategory(null); // Reset selected category after update
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
      render: (serial) => (
        <p className="font-bold text-black text-[16px]">
          {serial < 10 ? "0" + serial : serial}
        </p>
      ),
    },
    {
      title: "Slider Image",
      dataIndex: "sliderimg",
      key: "sliderimg",
      render: (sliderimg) => <img width={100} src={sliderimg} alt="slider" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-5 items-center">
          <FiEdit2
            size={25}
            className="cursor-pointer hover:text-sky-500"
            onClick={() => showEditModal(record)}
          />
          <RiDeleteBin6Line
            size={25}
            className="cursor-pointer hover:text-red-500"
            onClick={() => showDeleteModal(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="px-10 py-5 w-full">
      <ConfigProvider
        theme={{
          components: {
            Table: { rowSelectedBg: "#fef9eb", headerBg: "#fef9eb" },
            Pagination: {
              itemActiveBg: "#FFC301",
              itemBg: "black",
              borderRadius: "50px",
              colorText: "white",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSizeOptions: [5, 10, 15, 20],
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={false}
        centered
      >
        <EditCategory
          selectedCategory={selectedCategory}
          onCancel={handleEditCancel}
          onUpdate={updateTableData} // Pass the update function
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        centered
        footer={false}
      >
        <DeleteCategory
          name={selectedCategory?.name}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </Modal>
    </div>
  );
}

export default CategoryTable;

// Edit Category Component
const EditCategory = ({ selectedCategory, onCancel, onUpdate }) => {
  const [form] = Form.useForm();

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedCategory = {
          ...selectedCategory,
          name: values.name || selectedCategory.name,
          sliderimg: values.image || selectedCategory.sliderimg,
        };

        onUpdate(updatedCategory); // Pass updated category to parent
        onCancel(); // Close modal after update
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  // Custom validation to require at least one field (name or image) to be updated
  const checkRequiredFields = (_, value) => {
    const name = form.getFieldValue("name");
    const image = form.getFieldValue("image");

    if (!name && !image) {
      return Promise.reject(
        new Error("Please update either the name or the image.")
      );
    }
    return Promise.resolve();
  };

  return (
    <Form form={form} layout="vertical" initialValues={selectedCategory}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: false, message: "Please enter category name!" },
          { validator: checkRequiredFields },
        ]}
      >
        <Input className="h-12" placeholder="Enter category name" />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[
          { required: false, message: "Please upload an image!" },
          { validator: checkRequiredFields },
        ]}
      >
        <UploadImg />
      </Form.Item>
      <div className="flex justify-end gap-4">
        <ButtonEDU actionType="cancel" onClick={onCancel} />
        <ButtonEDU actionType="update" onClick={handleUpdate} />
      </div>
    </Form>
  );
};

// Upload Image Component
const UploadImg = () => {
  return (
    <Dragger beforeUpload={() => false}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined style={{ color: "#ffc301", fontSize: "30px" }} />
      </p>
      <p className="ant-upload-hint text-[10px]">
        Upload Image (Max: 2MB, .jpg, .png)
      </p>
    </Dragger>
  );
};

// Delete Category Component
const DeleteCategory = ({ name, onConfirm, onCancel }) => {
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex justify-center">
        Are you sure you want to delete{" "}
        <span className="font-bold ml-1">{name}</span>?
      </div>
      <div className="flex justify-center gap-4">
        <ButtonEDU actionType="cancel" onClick={onCancel} />
        <ButtonEDU actionType="delete" onClick={onConfirm} />
      </div>
    </div>
  );
};
