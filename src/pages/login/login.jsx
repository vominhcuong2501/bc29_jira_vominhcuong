import React, { useEffect, useState } from "react";
import FormLogin from "../../modules/form-login/form-login";
import { Layout } from "antd";

export default function Login() {
  const { Sider, Content } = Layout;

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  return (
    <div className="container-fluid p-0" style={{overflow: "hidden"}}>
      <Layout className="row">
        <Sider className="d-md-block d-none"
          width={size.width / 2}
          style={{
            height: size.height,
            backgroundImage: "url(./bg-login1.jpg)",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Sider>
        <Layout>
          <Content>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: size.height }}
            >
              <h2 className="mb-5 text-warning">Login CyberBugs</h2>
              <FormLogin />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
