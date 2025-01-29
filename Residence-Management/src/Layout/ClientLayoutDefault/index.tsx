import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FormSearch from "../../Components/FormSearch";
import ChatBox from "../../Components/ChatBox/ChatBox";

const {Content}=Layout;

function ClientLayoutDefault(){
    return(
        <>
            <Layout className="layout-default">
                <div style={{height:90}}></div>
                <Header></Header>
                <ChatBox></ChatBox>
                <Content>
                    <FormSearch></FormSearch>
                    <Outlet></Outlet>
                </Content>
                <Footer></Footer>
            </Layout>

        </>
    )
}

export default ClientLayoutDefault;