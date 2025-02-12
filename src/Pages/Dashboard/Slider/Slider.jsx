import React from "react";
import { Table, ConfigProvider } from "antd";
import gift from "../../../assets/gtdandy/gift.png";
function Slider() {
  return (
    <div className="px-10 py-5">
      <h1 className="text-[20px] font-medium mb-5">Slider</h1>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowSelectedBg: "#fef9eb",
              headerBg: "#fef9eb",
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
          dataSource={data}
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
];

const data = [
  {
    key: "1",
    name: "John Brown",
    serial: 1,
    sliderimg: gift,
  },
  {
    key: "2",
    name: "Jim Green",
    serial: 2,
    sliderimg: gift,
  },
  {
    key: "3",
    name: "Joe Black",
    serial: 3,
    sliderimg: gift,
  },
];
