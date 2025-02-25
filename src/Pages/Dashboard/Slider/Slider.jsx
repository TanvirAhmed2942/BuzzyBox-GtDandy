import React, { useState } from "react";
import { Table, ConfigProvider } from "antd";

import chrismas from "../../../assets/gtdandy/chrismas.png";

function Slider() {
  const [tableData, setTableData] = useState([
    { key: "1", name: "Chrismas", serial: 1, sliderimg: chrismas },
    { key: "2", name: "Chrismas", serial: 2, sliderimg: chrismas },
    { key: "1", name: "Chrismas", serial: 1, sliderimg: chrismas },
    { key: "3", name: "Chrismas", serial: 3, sliderimg: chrismas },
  ]);

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
      render: (sliderimg) => <img width={60} src={sliderimg} alt="slider" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">Slider</h1>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowSelectedBg: "#fef9eb",
              headerBg: "#fef9eb",
              cellFontSize: "17px",
              headerSplitColor: "none",
            },
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
          dataSource={tableData}
          pagination={{
            pageSizeOptions: [5, 10, 15, 20],
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Slider;
