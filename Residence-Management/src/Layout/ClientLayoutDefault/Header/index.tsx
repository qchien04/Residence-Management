import logo_long from "../../../assets/images/logo_long.png";
import {SearchOutlined, LogoutOutlined} from "@ant-design/icons"
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/authAction";
import { normalizeAuthType } from "../../../utils/type";
import "./headerClientLayout.css";
import { Button, Dropdown, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { itemsByCost } from "./menuHeader";

interface FormSearch{
    key:string;
}
const Header:React.FC=()=>{
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const handleLogout:MouseEventHandler<HTMLDivElement>=()=>{
        const userConfirmed = confirm("Are you sure you want to logout?");
        if (userConfirmed) {
            localStorage.removeItem('jwtToken');
            const data:normalizeAuthType=signOut();
            dispatch(data);
        } 
    }
    const handleSubmit=(value:FormSearch)=>{
        navigate(`/search?key=${value.key}`);
    }
    const handleChangePageLogin=()=>{
        navigate("/auth/sign-in");
    }
    const handleChangePageSignup=()=>{
        navigate("/auth/sign-up");
    }
    const {user}=useSelector((state:RootState)=>state.authReducer);
    
    
    return(
        <>
            <header className="header">
                <div className="header__logo ">
                    <Link to='/'> <img src={logo_long} alt="Logo"/> </Link>
                </div>

                <div className="header__nav">
                    <div className="header__nav-on">
                        <div className="header__nav-search">
                            <Form
                            onFinish={handleSubmit}>
                                <Form.Item name="key">
                                    <Input placeholder="Tìm kiếm"></Input>
                                </Form.Item>

                                <Form.Item className="header__nav-search-icon">
                                    <Button type="primary" htmlType="submit">
                                        <SearchOutlined></SearchOutlined>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>


                    <div className="header__nav-bottom">
                        
                        <Dropdown className="menu" menu={{ items:itemsByCost }} trigger={['hover']} placement="bottom">
                            Tìm theo giá
                        </Dropdown>

                        <Dropdown className="menu" menu={{ items:itemsByCost }} trigger={['hover']} placement="bottom">
                            Tìm theo số giường 
                        </Dropdown>

                        <Dropdown className="menu" menu={{ items:itemsByCost }} trigger={['hover']} placement="bottom">
                            Tìm theo số người tối đa
                        </Dropdown>

                        <Dropdown className="menu" menu={{ items:itemsByCost }} trigger={['hover']} placement="bottom">
                            Tìm theo diện tích
                        </Dropdown>


                    </div>

                </div>

                <div className="header__account">
                    {user?<>
                        <Link to='/account' style={{ fontSize: '20px',padding:20}}>{user.name}</Link>
                        <Button variant='filled' type='dashed' shape='circle' size='large'
                        onClick={handleLogout}><LogoutOutlined/></Button>
                    </>:
                    <>
                        <Button onClick={handleChangePageLogin} className="header__account-item" variant='filled' type='primary' shape='round' size='large'>Đăng nhập</Button>
                        <Button onClick={handleChangePageSignup} className="header__account-item" variant='filled' type='primary' shape='round' size='large'>Đăng kí</Button>
                    </>}
                
                </div>


            </header>

        </>
    )
}

export default Header;