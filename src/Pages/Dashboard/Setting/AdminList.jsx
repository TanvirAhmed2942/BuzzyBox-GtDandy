import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Flex,
  Input,
  Table,
  Popover,
  Button,
  Modal,
  Form,
  ConfigProvider,
} from "antd";
import { MoreOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

import ButtonEDU from "../../../components/common/ButtonEDU";

const AdminList = () => {
  // Initial data
  const initialData = [
    {
      key: 1,
      name: "Tom Hardy",
      email: "tom.hardy@gmail.com",
      role: "Admin",
      creationdate: "13 Feb 2020",
    },
    {
      key: 2,
      name: "Emma Stone",
      email: "emma.stone@example.com",
      role: "Admin",
      creationdate: "10 Jan 2021",
    },
    {
      key: 3,
      name: "Robert Downey",
      email: "rdj@avengers.com",
      role: "Admin",
      creationdate: "25 Dec 2019",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = admins.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  // Open Add Admin Modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close Add Admin Modal
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();
  };

  // Handle Add Admin Submission
  const handleAddAdmin = (values) => {
    const newAdmin = {
      key: admins.length + 1,
      ...values,
      creationdate: new Date().toLocaleDateString(),
    };
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();
  };

  // Open Edit Admin Modal
  const showEditModal = (record) => {
    setSelectedAdmin(record);
    setIsEditModalOpen(true);
    setTimeout(() => {
      editFormRef.current?.setFieldsValue(record);
    }, 0);
  };

  // Close Edit Admin Modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    editFormRef.current?.resetFields();
  };

  // Handle Edit Admin Submission
  const handleEditAdmin = (values) => {
    const updatedAdmins = admins.map((admin) =>
      admin.key === selectedAdmin.key ? { ...admin, ...values } : admin
    );
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsEditModalOpen(false);
  };

  // Open Delete Admin Modal
  const showDeleteModal = (record) => {
    setSelectedAdmin(record);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Admin
  const handleConfirmDelete = () => {
    if (!selectedAdmin) return;
    const updatedAdmins = admins.filter(
      (admin) => admin.key !== selectedAdmin.key
    );
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-[60%] bg-white rounded-lg shadow-lg p-5">
      <TableHead
        searchText={searchText}
        handleSearch={handleSearch}
        onAdd={showAddModal}
      />
      <TableBody
        filteredData={filteredData}
        onEdit={showEditModal}
        onDelete={showDeleteModal}
      />

      {/* Add Admin Modal */}
      <Modal
        title="Add Admin"
        open={isAddModalOpen}
        onCancel={handleCancelAdd}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form layout="vertical" ref={addFormRef} onFinish={handleAddAdmin}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input placeholder="Name" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter Email" }]}
            >
              <Input placeholder="Email" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input placeholder="Role" className="h-12" />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelAdd} />
              <ButtonEDU
                actionType="save"
                onClick={() => addFormRef.current?.submit()}
              />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal
        title="Edit Admin"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form layout="vertical" ref={editFormRef} onFinish={handleEditAdmin}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input className="h-12" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter Email" }]}
            >
              <Input className="h-12" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input className="h-12" />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelEdit} />
              <ButtonEDU
                actionType="save"
                onClick={() => editFormRef.current?.submit()}
              />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Admin Modal */}
      <Modal
        title="Delete Admin"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
        centered
        className="z-50"
      >
        <DeleteAdmin
          name={selectedAdmin?.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

const TableHead = ({ searchText, handleSearch, onAdd }) => (
  <Flex justify="space-between" align="center" className="mt-2 full">
    <Input
      placeholder="Search by Name or Email"
      value={searchText}
      onChange={handleSearch}
      className="w-56 h-12"
    />
    <h1
      className="bg-gtdandy flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white w-36 cursor-pointer"
      onClick={onAdd}
    >
      <FaPlus /> Add Admin
    </h1>
  </Flex>
);

const TableBody = ({ filteredData, onEdit, onDelete }) => (
  <Table
    rowKey={(record) => record.key}
    columns={columns(onEdit, onDelete)}
    dataSource={filteredData}
    pagination={false}
    className="mt-5"
  />
);

const columns = (onEdit, onDelete) => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    key: "action",
    render: (_, record) => (
      <Popover
        content={
          <div className="flex gap-3">
            <Button onClick={() => onEdit(record)}>
              <EditFilled />
            </Button>
            <Button onClick={() => onDelete(record)} danger>
              <DeleteFilled />
            </Button>
          </div>
        }
        trigger="hover"
      >
        <MoreOutlined />
      </Popover>
    ),
  },
];
const DeleteAdmin = ({ name, onConfirm, onCancel }) => (
  <Flex
    vertical
    justify="space-between"
    className="w-full h-full mb-3 mt-3"
    gap={20}
  >
    <Flex align="center" justify="center">
      Are you sure you want to delete{" "}
      <span className="font-bold ml-1">{name}</span>?
    </Flex>
    <div className="flex items-center justify-center gap-4">
      <ButtonEDU actionType="cancel" onClick={onCancel} />
      <ButtonEDU actionType="delete" onClick={onConfirm} />
    </div>
  </Flex>
);
export default AdminList;
