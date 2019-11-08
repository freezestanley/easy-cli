import React, { Component } from 'react';
import {
  Form, Input, Button, Icon, message
} from 'antd';
import styles from './index.module.scss';
import bg from 'assets/images/bg.jpg';
import { encryption } from 'utils/crypto.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from 'actionCreators/app';

@connect(
  null,
  dispatch => ({
    actions: bindActionCreators(
      { loginAction },
      dispatch
    )
  })
)
@Form.create()
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.loading) return;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });

        this.props.actions.loginAction({
          loginName: values.loginName,
          loginPwd: encryption(values.loginPwd),
        }).then(() => {
          setTimeout(() => {
            this.jump();
          }, 500);
          message.success('登录成功');
        }).finally(() => {
          this.setState({ loading: false });
        });
      }
    });
  };

  jump = () => {
    const { location, history } = this.props;
    if (location.state) {
      history.push(location.state.from);
    } else {
      history.push('/');
    }
  }

  render() {
    const { loading, errorMsg } = this.state;
    const { getFieldDecorator } = this.props.form;

    let buttonClassName = styles['login-form-button'];
    if (loading) {
      buttonClassName += ' disable';
    }

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <img className={styles.img} src={bg} alt="背景" style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.right}>
          <Form
            className={styles['form-class']}
            hideRequiredMark={true}
            onSubmit={this.handleSubmit}
          >
            <div className={styles.title}>
              理赔垫资机构管理
            </div>
            {errorMsg ? (
              <div className={styles['errpr-tip']}>
                <Icon type="close-circle" />
                {errorMsg}
              </div>
            ) : ''}
            <Form.Item>
              {getFieldDecorator('loginName', {
                rules: [
                  {
                    required: true,
                    message: '请输入账号',
                  },
                ],
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="账号"
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('loginPwd', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(<Input.Password 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="密码"
              />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={buttonClassName}>
                登录
              </Button>
            </Form.Item>
            <div className={styles['forget-psw-tip']}>
              如 <span>忘记密码</span> 请联系平台管理员
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
