import React, { useEffect, useState } from "react";
import FormRegister from "../../modules/form-register/form-register";
import { Layout } from "antd";

export default function Register() {
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
    <div className="container-fluid p-0">
      <Layout>
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
              <h2 className="mb-5 text-warning">Register CyberBugs</h2>
              <FormRegister />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
