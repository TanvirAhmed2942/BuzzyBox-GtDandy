// import React, { useState } from "react";
// import { Collapse, Modal, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import FaqPopover from "../../../components/common/PopContent";
// import ButtonEDU from "../../../components/common/ButtonEDU";

// // Default text for FAQ content
// const defaultText = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

// // FAQ Header Component
// export const HeadFaq = ({ showModal }) => (
//   <div className="flex justify-between items-center py-5">
//     <h1 className="text-[20px] font-medium">FAQ</h1>
//     <button
//       className="bg-gtdandy text-white px-4 py-2.5 rounded-md shadow-md"
//       onClick={showModal}
//     >
//       <PlusOutlined size={24} className="mr-2" />
//       Add New
//     </button>
//   </div>
// );

// // FAQ Collapse Component
// export default function FaqCollapse() {
//   const [activeKeys, setActiveKeys] = useState(["1"]);
//   const [faqs, setFaqs] = useState([
//     { key: "1", question: "What is a dog?", answer: defaultText },
//     { key: "2", question: "What is a cat?", answer: defaultText },
//     { key: "3", question: "What is a bird?", answer: defaultText },
//   ]);

//   // State for Add/Edit FAQ Modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editFaq, setEditFaq] = useState(null);
//   const [faqData, setFaqData] = useState({ question: "", answer: "" });

//   // State for Delete Confirmation Modal
//   const [deleteFaq, setDeleteFaq] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   // Open modal for adding a new FAQ
//   const showAddModal = () => {
//     setEditFaq(null);
//     setFaqData({ question: "", answer: "" });
//     setIsModalOpen(true);
//   };

//   // Open modal for editing an existing FAQ
//   const showEditModal = (faq) => {
//     setEditFaq(faq);
//     setFaqData({ question: faq.question, answer: faq.answer });
//     setIsModalOpen(true);
//   };

//   // Open delete confirmation modal
//   const showDeleteModal = (faq) => {
//     setDeleteFaq(faq);
//     setIsDeleteModalOpen(true);
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFaqData({ ...faqData, [e.target.name]: e.target.value });
//   };

//   // Handle Save (Both Add & Edit)
//   const handleSave = () => {
//     if (editFaq) {
//       // Update existing FAQ
//       setFaqs(
//         faqs.map((item) =>
//           item.key === editFaq.key
//             ? { ...item, question: faqData.question, answer: faqData.answer }
//             : item
//         )
//       );
//     } else {
//       // Add new FAQ
//       const newKey = (faqs.length + 1).toString();
//       setFaqs([
//         ...faqs,
//         { key: newKey, question: faqData.question, answer: faqData.answer },
//       ]);
//     }
//     setIsModalOpen(false);
//   };

//   // Handle Delete FAQ
//   const handleDelete = () => {
//     setFaqs(faqs.filter((faq) => faq.key !== deleteFaq.key));
//     setIsDeleteModalOpen(false);
//   };

//   // Generate FAQ items
//   const getItems = () =>
//     faqs.map(({ key, question, answer }) => ({
//       key,
//       label: (
//         <div className="flex items-center justify-between  ">
//           {question}
//           <FaqPopover
//             onEdit={() => showEditModal({ key, question, answer })}
//             onDelete={() => showDeleteModal({ key, question })}
//           />
//         </div>
//       ),
//       children: <p className="border-l-2 border-yellow-400 pl-4">{answer}</p>,
//     }));

//   return (
//     <div className="px-10">
//       <HeadFaq showModal={showAddModal} />
//       <Collapse
//         bordered={false}
//         activeKey={activeKeys}
//         onChange={setActiveKeys}
//         expandIcon={({ isActive }) => (
//           <div
//             className="flex items-center justify-center w-6 h-6 transition-transform duration-300"
//             style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
//           >
//             <PlusOutlined />
//           </div>
//         )}
//         items={getItems()}
//         className="bg-white shadow-md"
//       />

//       {/* Add/Edit FAQ Modal */}
//       <Modal
//         title={editFaq ? "Edit FAQ" : "Add FAQ"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         centered
//         footer={null}
//       >
//         <div className="flex flex-col gap-5 mb-5">
//           <label>Question</label>
//           <Input
//             name="question"
//             value={faqData.question}
//             onChange={handleChange}
//             placeholder="Enter the question"
//           />
//           <label>Answer</label>
//           <Input.TextArea
//             name="answer"
//             value={faqData.answer}
//             onChange={handleChange}
//             placeholder="Enter the answer"
//             rows={4}
//           />
//         </div>
//         <div className="flex justify-end gap-4">
//           <ButtonEDU
//             actionType="cancel"
//             onClick={() => setIsModalOpen(false)}
//           />
//           <ButtonEDU actionType="save" onClick={handleSave} />
//         </div>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         title="Delete FAQ"
//         open={isDeleteModalOpen}
//         onCancel={() => setIsDeleteModalOpen(false)}
//         centered
//         footer={null}
//       >
//         <p>Are you sure you want to delete this FAQ?</p>
//         <div className="flex justify-center gap-4 mt-4">
//           <ButtonEDU
//             actionType="cancel"
//             onClick={() => setIsDeleteModalOpen(false)}
//           />
//           <ButtonEDU actionType="delete" onClick={handleDelete} />
//         </div>
//       </Modal>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Collapse, Modal, Form, Input, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FaqPopover from "../../../components/common/PopContent";
import ButtonEDU from "../../../components/common/ButtonEDU";

const defaultText = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

// FAQ Header Component
export const HeadFaq = ({ showModal }) => (
  <div className="flex justify-between items-center py-5">
    <h1 className="text-[20px] font-medium">FAQ</h1>
    <button
      className="bg-gtdandy text-white px-4 py-2.5 rounded-md shadow-md"
      onClick={showModal}
    >
      <PlusOutlined size={24} className="mr-2" />
      Add New
    </button>
  </div>
);

// FAQ Collapse Component
export default function FaqCollapse() {
  const [activeKeys, setActiveKeys] = useState(["1"]);
  const [faqs, setFaqs] = useState([
    { key: "1", question: "What is a dog?", answer: defaultText },
    { key: "2", question: "What is a cat?", answer: defaultText },
    { key: "3", question: "What is a bird?", answer: defaultText },
  ]);

  // State for Add/Edit FAQ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState(null);
  const [form] = Form.useForm(); // Ant Design form instance

  // State for Delete Confirmation Modal
  const [deleteFaq, setDeleteFaq] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Open modal for adding a new FAQ
  const showAddModal = () => {
    setEditFaq(null);
    form.resetFields(); // Reset form when adding a new FAQ
    setIsModalOpen(true);
  };

  // Open modal for editing an existing FAQ
  const showEditModal = (faq) => {
    setEditFaq(faq);
    form.setFieldsValue(faq); // Pre-fill form with selected FAQ
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const showDeleteModal = (faq) => {
    setDeleteFaq(faq);
    setIsDeleteModalOpen(true);
  };

  // Handle Save (Both Add & Edit)
  const handleSave = (values) => {
    if (editFaq) {
      // Update existing FAQ
      setFaqs(
        faqs.map((item) =>
          item.key === editFaq.key
            ? { ...item, question: values.question, answer: values.answer }
            : item
        )
      );
    } else {
      // Add new FAQ
      const newKey = (faqs.length + 1).toString();
      setFaqs([
        ...faqs,
        { key: newKey, question: values.question, answer: values.answer },
      ]);
    }
    setIsModalOpen(false);
  };

  // Handle Delete FAQ
  const handleDelete = () => {
    setFaqs(faqs.filter((faq) => faq.key !== deleteFaq.key));
    setIsDeleteModalOpen(false);
  };

  // Generate FAQ items
  const getItems = () =>
    faqs.map(({ key, question, answer }) => ({
      key,
      label: (
        <div className="flex items-center justify-between ">
          {question}
          <FaqPopover
            onEdit={() => showEditModal({ key, question, answer })}
            onDelete={() => showDeleteModal({ key, question })}
          />
        </div>
      ),
      children: <p className="border-l-2 border-yellow-400 pl-4">{answer}</p>,
    }));

  return (
    <div className="min-h-[90vh] px-10">
      <HeadFaq showModal={showAddModal} />

      <Collapse
        bordered={false}
        activeKey={activeKeys}
        onChange={setActiveKeys}
        expandIcon={({ isActive }) => (
          <div
            className="flex items-center justify-center w-6 h-6 transition-transform duration-300 "
            style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
          >
            <PlusOutlined />
          </div>
        )}
        items={getItems()}
        className="shadow-md "
      />

      {/* Add/Edit FAQ Modal */}
      <Modal
        title={editFaq ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={null}
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 20,
                itemMarginBottom: 8,
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="flex flex-col gap-5"
          >
            {/* Question */}
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input placeholder="Enter the question" className="h-12" />
            </Form.Item>

            {/* Answer */}
            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter the answer" }]}
            >
              <Input.TextArea placeholder="Enter the answer" rows={5} />
            </Form.Item>

            <div className="flex justify-end gap-4">
              <ButtonEDU
                actionType="cancel"
                onClick={() => {
                  form.resetFields(); // Reset the form fields
                  setIsModalOpen(false); // Close the modal
                }}
              />
              <ButtonEDU actionType="save" htmlType="submit" />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete FAQ"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        centered
        footer={null}
      >
        <p>Are you sure you want to delete this FAQ?</p>
        <div className="flex justify-center gap-4 mt-4">
          <ButtonEDU
            actionType="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <ButtonEDU actionType="delete" onClick={handleDelete} />
        </div>
      </Modal>
    </div>
  );
}
