import "./headerAccountLayout.css";
import logo_short from "../../../assets/images/logo_short.png";
import logo_long from "../../../assets/images/logo_long.png";
import {SearchOutlined, MenuUnfoldOutlined, LogoutOutlined} from "@ant-design/icons"
import { MouseEventHandler } from "react";
import Notify from "../../../Components/Notify";
import { useDispatch } from "react-redux";
import { signOut } from "../../../store/actions/authAction";
import { normalizeAuthType } from "../../../utils/type";
import { Link } from "react-router-dom";


interface prop{
    setCollapsed:(value: boolean) => void,
    collapsed:boolean,
}
const Header:React.FC<prop>=({setCollapsed,collapsed})=>{
    const dispatch =useDispatch();
    const handleLogout:MouseEventHandler<HTMLDivElement>=()=>{
        const userConfirmed = confirm("Are you sure you want to logout?");
        if (userConfirmed) {
            localStorage.removeItem('jwtToken');
            const data:normalizeAuthType=signOut();
            dispatch(data);
        } 
    }
    return(
        <>
            <header className="headeraccount" style={{height:100}}>
                <div className={"headeraccount__logo "+(collapsed && "headeraccount__logo--collapsed")} style={collapsed ? {width:70} : {width:250}}>
                    
                <Link to='/'><img src={collapsed ? logo_short : logo_long} alt="Logo"/></Link>
                    
                </div>

                <div className="headeraccount__nav">
                    <div className="headeraccount__nav-left">

                        <div className="headeraccount__collapse" onClick={()=>setCollapsed(!collapsed)}>
                            <MenuUnfoldOutlined></MenuUnfoldOutlined>
                        </div>
                        <div className="headeraccount__search">
                            <SearchOutlined></SearchOutlined>
                        </div>

                    </div>

                    <div className="headeraccount__nav-right">
                        <LogoutOutlined onClick={handleLogout}></LogoutOutlined>
                        <Notify/>
                    </div>

                </div>


            </header>

        </>
    )
}

export default Header;