import React from 'react';
import { Link  } from 'react-router-dom';
import {Layout, Menu} from 'antd';
const { Header  } = Layout;

export default () => (<Header>
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['1']}
    style={{ lineHeight: '64px'  }}
  >
    <Menu.Item key="1"><Link to="/configuration">Configuration</Link></Menu.Item>
  </Menu>
  </Header>)
