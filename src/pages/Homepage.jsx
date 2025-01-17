import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/slices/userSlice';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import { useNavigate } from 'react-router-dom';

import {
  DeleteOutlined,
  FileOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UserDropdown from '../components/UserDropdown';
import SearchComponent from '../components/SearchComponent';
import EmailContent from '../components/EmailContent';
const { Header, Sider, Content } = Layout;


const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const userStatus = useSelector((state)=>state.user.status);
  const userError = useSelector((state) => state.user.error);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleFetchUser = async () => {
    try {
      const result = await dispatch(fetchUserData()).unwrap(); // Unwrap resolves or rejects the promise
      generateToast(result.message, TOAST_SUCCESS);
    } catch (error) {
      generateToast(error, TOAST_ERROR);
      navigate('/login');
      console.error('Error fetching user:', error);
    }
  };
  useEffect(()=>{
    if(userStatus === 'idle')
    {
       
        
      handleFetchUser();
      
    }
  }, [userStatus, dispatch]);

  if(userStatus === 'loading')
  {
    return <div className="">Loading...</div>
  }
  if (userStatus === 'failed') {
    console.log(user)
    generateToast(user.error, TOAST_ERROR)
    navigate("/login");
  }
  return (
    <div>
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <InboxOutlined />,
              label: 'Inbox',
            },
            {
              key: '2',
              icon: <SendOutlined />,
              label: 'Sent',
            },
            {
              key: '3',
              icon: <DeleteOutlined />,
              label: 'Trash',
            },
            {
              key: '4',
              icon: <FileOutlined />,
              label: 'Draft',
            },

           
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
<div className="menu-container">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 70,
            }}
          />
          
            <div className="search-element"><SearchComponent /></div>
            <div className="user"><UserDropdown />  </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <EmailContent />
        </Content>
      </Layout>
    </Layout>
      </div>
  )
}

export default Homepage