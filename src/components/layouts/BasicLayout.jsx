import { Outlet } from "react-router";
import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import LogoImage from "@/assets/logo.png";
import LogoImage2 from "@/assets/logo2.png";
const { Header, Content, Footer } = Layout;
import { Link } from "react-router-dom";

const BasicLayout = () => (
  <Layout>
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "#0e6137",
        height: "64px",
        paddingInline: "16px",
        color: "rgba(0, 0, 0, 0.88)",
        lineHeight: "64px",
      }}
      className="max-[450px]:py-2"
    >
      <div className="logo h-full flex items-center justify-between">
        <div className="my-auto">
          <img src={LogoImage} alt="logo" width={100} height={100} />
          {/* <img src={LogoImage2} alt="logo" width={100} height={100} /> */}
        </div>
        <div>
          <p className="text-white text-lg">Sức bật Việt Nam</p>
        </div>
      </div>
    </div>

    <Content className="site-layout">
      <div className="site-layout-background">
        <Outlet />
      </div>
    </Content>
  </Layout>
);
export default BasicLayout;
