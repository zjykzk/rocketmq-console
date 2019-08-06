import {Layout} from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import Header from './Header'
import Configuration from './Configuration'
import './app.css'

const {  Footer, Content  } = Layout;
export class App extends  React.Component {
  render() {
    return (<div>
      <Layout>
        <Router>
          <Header>Header</Header>
          <Content id="main">
            <Route path="/configuration" component={Configuration}/>
          </Content>
          <Footer>Footer</Footer>
        </Router>
      </Layout>
    </div>);
  }
}
