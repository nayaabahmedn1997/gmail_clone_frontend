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
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UserDropdown from '../components/UserDropdown';
import SearchComponent from '../components/SearchComponent';
import EmailContent from './EmailList';
import ComposeEmail from '../components/ComposeEmail';
import SingleEmail from './EmailDetail';
const { Header, Sider, Content } = Layout;


const SingleEmailViewComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [collapsed, setCollapsed] = useState(false);
  const [isComposeVisible, setIsComposeVisible] = useState(false);


  // Function to close the Compose Email modal
  const handleCloseCompose = () => {
    setIsComposeVisible(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();




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
            },
            {
              key: '3',
              icon: <SendOutlined />,
              label: 'Sent',
            },
            {
              key: '4',
              icon: <DeleteOutlined />,
              label: 'Trash',
            },
            {
              key: '5',
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
           {/* Render ComposeEmail component only when isComposeVisible is true */}
         {isComposeVisible && (
        <ComposeEmail onClose={handleCloseCompose} />
          )}
          < SingleEmail />
        </Content>
      </Layout>
    </Layout>
      </div>
  )
}

export default SingleEmailViewComponent