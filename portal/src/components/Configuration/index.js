import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';

@observer
class ConfigurationForm extends React.Component {
  config = new Configuration()

  componentDidMount() {
    this.config.loadConfig()
  }

  update = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      this.config.update(values);
      if (this.config.err) {
        message.error(this.config.err);
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched  } = this.props.form
    const namesrvsErr = isFieldTouched('namesrvs') && getFieldError('namesrvs')
    return (
      <Form labelCol={{ span: 2  }} wrapperCol={{ span: 4  }} onSubmit={this.update}>
        <Form.Item label="namesrvs" validateStatus={namesrvsErr ? 'error' : ''}>
            {getFieldDecorator('namesrvs', {
              rules:[{required:true, message:'Please input the name server!'}],
              initialValue: this.config.namesrvs
            })(
              <Input />
            )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 2 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

class Configuration {
  @observable namesrvs = '';

  err = '';

  @action
  loadConfig = () => {
    axios.get('/config').then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        runInAction(() => this.namesrvs = resp.data.namesrvs)
      } else {
        runInAction(() => this.namesrvs = '')
        // alert error message TODO
      }
    }).catch(function (err) {
      console.log(err)
    })
  }

  update = (conf) => {
    axios.put('/config').then((resp) => {
      console.log(resp)
      runInAction(() => this.namesrvs = conf.namesrvs)
    }).catch((err) => {
      if (err.response) {
        this.err = err.response.data.message;
      }
    })
  }
}

export default Form.create({name:'configuration'})(ConfigurationForm)
