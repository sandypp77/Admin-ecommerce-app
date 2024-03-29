import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getyearlyStats,
} from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state.auth.monthlyData);
  const yearlyDataState = useSelector((state) => state.auth.yearlyData);
  const ordersDataState = useSelector((state) => state.auth.orders);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getyearlyStats());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let countSales = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month - 1],
        income: element?.count,
      });
      countSales.push({
        type: monthNames[element?._id?.month - 1],
        sales: element?.count,
      });
    }
    setMonthlyData(data);
    setMonthlyDataSales(countSales);

    let data1 = [];
    for (let i = 0; i < ordersDataState?.length; i++) {
      const element = ordersDataState[i];
      data1.push({
        key: i,
        name: element?.user.firstname + element?.user.lastname,
        product: element?.orderItems?.length,
        price: "$" + element?.totalPrice,
        dprice: "$" + element?.totalPriceAfterDiscount,
        status: element?.orderStatus,
      });
    }
    setOrderData(data1);

  }, [monthlyDataState, yearlyDataState]);

  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];

  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#5D87FF";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const configSales = {
    data: monthlyDataSales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#5D87FF";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 main-item">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              ${yearlyDataState ? yearlyDataState[0]?.amount : ""}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6>
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0  desc">This Year Total Income</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 main-item">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState ? yearlyDataState[0].count : ""}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0 desc">This Year Total Sales</p>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-between gap-3">
        <div className="col-6">
          <h3 className="mb-5 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="col-6">
          <h3 className="mb-5 title">Sales Statics</h3>
          <div>
            <Column {...configSales} />
          </div>
        </div>
      </div>
      <div className="mt-4 ">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div className="main-item">
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
