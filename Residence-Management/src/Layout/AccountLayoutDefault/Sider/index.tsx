import { Menu } from "antd";
import { AliwangwangFilled,DatabaseOutlined,HomeFilled, HomeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MenuProps } from "antd/es/menu";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  type?: "divider";
  icon?: React.ReactNode;
  children?: MenuItem[];
}
interface t {
    type: string;
  }

type CombineType=t|MenuItem

const MenuSider: React.FC = () => {
  const items: CombineType[] = [
    {
      key: '1',
      label: <Link to='/account' style={{ fontSize: '10px' }}>Dashboard</Link>,
      icon: <DatabaseOutlined />,
      disabled: false,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: "Rooms",
      icon: <DatabaseOutlined />,
      children: [
        {
          key: '2-1',
          label: <Link to='/account/rooms/create' style={{ fontSize: '10px' }}>Tạo phòng</Link>,
          icon: <HomeFilled />,
        },
        {
          key: '2-2',
          label: <Link to='/account/rooms/allRoom' style={{ fontSize: '10px' }}>Tất cả phòng</Link>,
          icon: <HomeTwoTone />,
        },
        {
          key: '2-3',
          label: <Link to='/account/rooms/createRoomRentalDetail' style={{ fontSize: '10px' }}>Tạo hợp đồng cho thuê</Link>,
          icon: <HomeTwoTone />,
        },
        {
          key: '2-4',
          label: <Link to='/account/rooms/allRoomRentalDetail' style={{ fontSize: '10px' }}>Tất cả hợp đồng cho thuê</Link>,
          icon: <HomeTwoTone />,
        },
        {
          key: '2-5',
          label: <Link to='/account/rooms/createMonthlyInvoice' style={{ fontSize: '10px' }}>Tạo hoá đơn</Link>,
          icon: <HomeTwoTone />,
        },
        {
          key: '2-6',
          label: <Link to='/account/rooms/allMonthlyInvoice' style={{ fontSize: '10px' }}>Tất cả hoá đơn</Link>,
          icon: <HomeTwoTone />,
        },
        
      ]
    },
    {
      key: '3',
      label: "Phòng đang thuê",
      icon: <DatabaseOutlined />,
      children: [
        {
          key: '3-2',
          label: <Link to='/account/customerService/allRoom' style={{ fontSize: '10px' }}>Tất cả phòng</Link>,
          icon: <HomeTwoTone />,
        },

        {
          key: '3-4',
          label: <Link to='/account/customerService/allRoomRentalDetail' style={{ fontSize: '10px' }}>Tất cả hợp đồng cho thuê</Link>,
          icon: <HomeTwoTone />,
        },
        {
          key: '3-6',
          label: <Link to='/account/customerService/allMonthlyInvoice' style={{ fontSize: '10px' }}>Tất cả hoá đơn</Link>,
          icon: <HomeTwoTone />,
        },
        
      ]
    },
    // {
    //   key: '3',
    //   label: <a href='https://www.youtube.com/' target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px' }}>Youtube</a>,
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       key: '2-1',
    //       label: 'Detail 1',
    //     },
    //     {
    //       key: '2-2',
    //       label: 'Detail 2',
    //     },
    //   ]
    // },
    // {
    //   key: '4',
    //   label: <a href='https://www.chatgpt.com/' target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px' }}>ChatGPT</a>,
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       key: '3-1',
    //       label: 'Detail 1',
    //     },
    //     {
    //       key: '3-2',
    //       label: 'Detail 2',
    //     },
    //   ]
    // },
    // {
    //   key: '5',
    //   label: <Link to='/book-room' style={{ fontSize: '10px' }}>Book Room</Link>,
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       key: '4-1',
    //       label: 'ok',
    //     },
    //     {
    //       key: '4-2',
    //       label: 'Detail 2',
    //     },
    //   ]
    // },
    // {
    //   key: '6',
    //   label: <Link to='/create-room' style={{ fontSize: '10px' }}>Create Room</Link>,
    //   icon: <SettingOutlined />,
    // },
    // {
    //   key: '7',
    //   label: <Link to='/account/my-store/list-product' style={{ fontSize: '10px' }}>List Room</Link>,
    //   icon: <SettingOutlined />,
    // },
    {
      key: '8',
      label: <Link to='/account/chat' style={{ fontSize: '10px' }}>Chat</Link>,
      icon: <AliwangwangFilled />,
    },
  ];

  return (
    <Menu
      mode="inline"
      items={items as MenuProps['items']} // Explicit type assertion for items
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={['1']}
    />
  );
}

export default MenuSider;
