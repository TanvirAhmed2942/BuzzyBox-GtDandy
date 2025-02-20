import React from "react";
import { Select, Space, ConfigProvider } from "antd";
import { DatePicker } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Filter({ picker }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            hoverBorderColor: "#ffeaa9",
          },
        },
      }}
    >
      <div className="shadow-md w-24 rounded mr-10 absolute top-0 right-0 mt-4 ">
        <DatePicker className="absolute" picker={picker} placeholder="2024" />
      </div>
    </ConfigProvider>
  );
}
