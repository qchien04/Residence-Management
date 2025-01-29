import { Layout } from "antd";
import { useState } from "react";
import MenuSider from "./Sider";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const {Sider,Content}=Layout;

function LayoutDefault(){
    const [collapsed,setCollapsed]=useState(false);
    return(
        <>
            <Layout className="layout-default">
                <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
                <Layout>
                    <Sider width={250} className="sider" 
                    theme="light"
                            collapsedWidth={70} collapsed={collapsed}
                            style={{ 
                                transition: 'all 0.5s' 
                              }}
                     >
                        <MenuSider></MenuSider>
                    </Sider>

                    <Content className="content">
                        <Outlet></Outlet>
                    </Content>

                </Layout>

            </Layout>

        </>
    )
}

export default LayoutDefault