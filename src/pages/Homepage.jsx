import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/slices/userSlice';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  DeleteOutlined,
  FileOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UserDropdown from '../components/UserDropdown';
import SearchComponent from '../components/SearchComponent';
import EmailContent from '../components/EmailList';
import ComposeEmail from '../components/ComposeEmail';
import socket from '../components/socket';
const { Header, Sider, Content } = Layout;


const Homepage = ({children}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const userStatus = useSelector((state)=>state.user.status);
  const userError = useSelector((state) => state.user.error);
  const [collapsed, setCollapsed] = useState(false);
  const [isComposeVisible, setIsComposeVisible] = useState(false);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for new email notifications
    socket.on('new_email', (email) => {
      console.log('New email received:', email);

      // Add the new email to notifications
      setNotifications((prev) => [...prev, email]);
    });

    // Clean up the socket listener
    return () => {
      socket.off('new_email');
    };
  }, []);


  // Function to open the Compose Email modal
  const handleComposeClick = () => {
    setIsComposeVisible(true);
  };

  // Function to close the Compose Email modal
  const handleCloseCompose = () => {
    setIsComposeVisible(false);
  };

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
              key:'1',
              icons: <PlusOutlined />,
              label: 'Compose',
              onClick: ()=>{
                setIsComposeVisible(true);
              }
              
            },
            {
              key: '2',
              icon: <InboxOutlined />,
              label: 'Inbox',
              onClick: ()=>{
                navigate("/inbox")
              }
            },
            {
              key: '3',
              icon: <SendOutlined />,
              label: 'Sent',
              onClick: ()=>{
                navigate("/sent")
              }
            },
            {
              key: '4',
              icon: <DeleteOutlined />,
              label: 'Trash',
              onClick: ()=>{
                navigate("/trash")
              }
            },
            {
              key: '5',
              icon: <FileOutlined />,
              label: 'Draft',
              onClick: ()=>{
                navigate("/draft")
              }
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
           {/* Render ComposeEmail component only when isComposeVisible is true */}
         {isComposeVisible && (
        <ComposeEmail onClose={handleCloseCompose} />
          )}
          {/* <EmailContent /> */}
          {children}
          <Outlet /> {/* This renders the child routes */}
        </Content>
      </Layout>
    </Layout>
      </div>
  )
}

export default Homepage