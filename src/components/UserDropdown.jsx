import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: 'Logout',
    key: '1',
    icon: <UserOutlined />,
  },
  
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const UserDropdown = () =>{

    const userData = useSelector((state)=>state.user.user);
   
return (
    <Space wrap>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        {userData?.userData?.name}
      </Dropdown.Button>
     
    </Space>
  );
} 
export default UserDropdown;