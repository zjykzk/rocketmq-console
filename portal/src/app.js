import {Layout} from 'antd';
import React from 'react';

const { Header, Footer, Sider, Content  } = Layout;
export class App extends  React.Component {
  render() {
    return (<div>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>);
  }
}
