/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getOTP, verifyOtp } from "./redux/actions";
import OtpInput from "react-otp-input";
import {
  Table,
  Tag,
  Button,
  Badge,
  Tooltip,
  Drawer,
  InputNumber,
  Row,
  Modal,
} from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import {
  ShoppingCartOutlined,
  CloseCircleTwoTone,
  PlusCircleTwoTone,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.products);
  const authReducer = useSelector((state) => state.authReducer);

  console.log("authReducer",authReducer)

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [productsCartData, setProductsCartData] = useState(new Map());
  const [openOtpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isCartVisible, setCartVisible] = useState(false);

  const addToCart = (e, id, record) => {
    e.stopPropagation();
    setProductsCartData((prevState) => {
      const newState = new Map(prevState);
      record.qty = 1;
      newState.set(id, record);
      return newState;
    });
  };

  const updateQuantity = (quantity, id, record) => {
    setProductsCartData((prevState) => {
      const newState = new Map(prevState);
      record.qty = quantity;
      newState.set(id, record);
      return newState;
    });
  };

  const removeFromCart = (e, id) => {
    e.stopPropagation();
    setProductsCartData((prevState) => {
      const newState = new Map(prevState);
      newState.delete(id);
      return newState;
    });
  };

  const clearCart = (e) => {
    // e.stopPropagation();
    setProductsCartData((prevState) => {
      const newState = new Map(prevState);
      newState.clear();
      return newState;
    });
  };

  const getOtP = () => {
    setOtpModal(true);
    const params = {};
    params.userId = authReducer.userData.id;
    dispatch(getOTP(params));
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setCartVisible(false);
    setOtpModal(false);
    clearCart();
    navigate("/products");
  };
  const handleOk = async () => {
    const payload = {};
    const items = [];
    productsCartData.forEach((value) => {
      items.push({
        name: value.name,
        product: value.id,
        price: value.price,
        quantity: value.qty,
      });
    });
    payload.items = items;
    payload.otp = otp;
    dispatch(verifyOtp(payload, handleClose));
  };

  const columns = [
    {
      title: "",
      key: "action",
      dataIndex: "action",
      width: "5%",
      render: (text, record) => {
        return productsCartData.has(record.id) ? (
          <Tooltip placement="top" title="Remove">
            <CloseCircleTwoTone
              style={{ cursor: "pointer" }}
              onClick={(e) => removeFromCart(e, record.id)}
              twoToneColor="#eb2f96"
            />
          </Tooltip>
        ) : (
          <Tooltip placement="top" title="Add">
            <PlusCircleTwoTone
              style={{ cursor: "pointer" }}
              onClick={(e) => addToCart(e, record.id, record)}
              twoToneColor="#52c41a"
            />
          </Tooltip>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "10%",
      render: (text) => moment(text).format("DD MMM, YYYY"),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
  ];

  const cartColumn = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      ellipsis: true,
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
      title: "Quantitiy",
      key: "qty",
      dataIndex: "qty",
      width: "15%",
      className: "numeric-column",
      render: (text, record) => (
        <InputNumber
          value={text}
          onChange={(quantity) => updateQuantity(quantity, record.key, record)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "12%",
      className: "center-align",
      render: (text, record) => {
        return (
          <Button
            danger
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
              margin: "0px 10px",
            }}
            type="link"
            onClick={(e) => removeFromCart(e, record.id)}
            icon={<CloseCircleOutlined />}
          />
        );
      },
    },
  ];
  const rows = (productsReducer.products || []).map((pr) => ({
    name: pr.name,
    brand: pr.company,
    id: pr._id,
    key: pr._id,
    date: pr.date,
    price: pr.price,
    status: pr.status,
  }));

  const cartRows = [];
  productsCartData.forEach((value) => {
    cartRows.push({
      name: value.name,
      id: value.id,
      price: value.price,
      key: value.key,
      qty: value.qty,
    });
  });

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Products"
        extra={[
          <>
            <Badge count={productsCartData.size}>
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  setCartVisible(true);
                }}
                disabled={!productsCartData.size}
              >
                View
              </Button>
            </Badge>
          </>,
        ]}
      />{" "}
      <Table
        loading={productsReducer.productLoader}
        size="middle"
        columns={columns}
        dataSource={rows}
      />
      {isCartVisible && (
        <Drawer
          title="Product Cart"
          placement="right"
          closable
          open
          onClose={() => setCartVisible(false)}
          zIndex={1001}
          width={500}
        >
          <Table
            size="middle"
            columns={cartColumn}
            dataSource={cartRows}
            pagination={false}
          />
          <div
            style={{
              width: "90%",
              marginBottom: "10px",
              bottom: "10px",
              position: "fixed",
            }}
          >
            {" "}
            <Row>
              <Button
                danger
                onClick={(e) => clearCart(e)}
                ghost
                style={{ marginRight: "8px" }}
              >
                Clear Cart
              </Button>
              <Button type="primary" onClick={() => getOtP()}>
                Place Order
              </Button>
            </Row>
          </div>
          {openOtpModal && (
            <Modal
              onOk={handleOk}
              zIndex={100001}
              open
              onCancel={() => setOtpModal(false)}
              okText="Place Order"
              okButtonProps={{ loading: productsReducer.otpLoader }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 10 }}>
                  <strong>Enter Verification Code</strong>
                </div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  inputStyle={{ height: 35, width: 35, borderRadius: "20%" }}
                  numInputs={5}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </Modal>
          )}
        </Drawer>
      )}
    </div>
  );
};

export default Product;
