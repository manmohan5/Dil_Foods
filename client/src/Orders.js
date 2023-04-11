/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./redux/actions";
import {
  Table,
  Tag,
} from "antd";
import { PageHeader } from "@ant-design/pro-layout";

const Product = () => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const columns = [
    {
      title: "OrderId",
      key: "id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format('DD MMM, YYYY, h:mm a'),
      ellipsis: true,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      className: "numeric-column",
      render: (text) => `₹ ${text.toLocaleString("en-in")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
  ];

  const rows = (productsReducer.orders || []).map((pr) => ({
    id: pr._id,
    key: pr._id,
    date: pr.date,
    price: pr.items.reduce((a, b) => a + b.price, 0),
    status: pr.status,
    items: pr.items
  }));

  const getInnerData = (items) => {
    const innerColumn = [
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Quantity",
        key: "quantity",
        dataIndex: "quantity",
        width: "10%",
      },
      {
        title: "Price",
        key: "price",
        dataIndex: "price",
        width: "15%",
        className: "numeric-column",
        render: (text) => `₹ ${text.toLocaleString("en-in")}`,
      },
      {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
        width: "10%",
        render: (text) => `₹ ${text.toLocaleString("en-in")}`,
      },
    ];

    const innerRows = (items || []).map((pr) => ({
      id: pr._id,
      key: pr._id,
      price: pr.price,
      quantity: pr.quantity,
      name: pr.name,
      totalPrice: pr.quantity * pr.price,
    }));

    return <Table size="middle" columns={innerColumn} dataSource={innerRows} />;
  };

  return (
    <div>
      <PageHeader ghost={false} title="My Orders" />{" "}
      <Table
        loading={productsReducer.orderLoader}
        size="middle"
        expandable={{
          expandedRowRender: (record) => getInnerData(record.items),
        }}
        columns={columns}
        dataSource={rows}
      />
    </div>
  );
};

export default Product;
