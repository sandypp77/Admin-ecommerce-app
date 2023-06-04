import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import lgLogo from "../images/Screenshot_4.png";
import smLogo from "../images/Screenshot_7.png";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  const updateSize = () => {
    const sider = document.getElementById("sider");
    if (window.innerWidth <= 992) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        id="sider"
        style={{ background: "#fff" }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo">
          <h2 className="fs-5 text-center py-1 mb-0">
            <Link to={`/admin`} className="lg-logo">
              <img src={lgLogo} width="180" />
            </Link>
            <Link to={`/admin`} className="sm-logo">
              <img src={smLogo} width="40" />
            </Link>
            {/* <span className="lg-logo">Click Style</span> */}
          </h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List ",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                  className="rounded"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Sandy</h5>
                <p className="mb-0" id="email">
                  sandypoetra77@gmail.com
                </p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
