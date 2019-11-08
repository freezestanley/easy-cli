import React, { Component } from 'react';
import {
  message, Drawer, Spin, Button, 
} from 'antd';
import OrgForm from './OrgForm';
import ViewForm from './ViewForm';

import { createOrgApi, updateOrgApi, } from 'api/plat/orgManage';

const defaultFormData = {
  orgType: '',
  orgCode: '',
  orgName: '',
  creditCode: '', // 91440300087026085W
  legalName: '',
  legalIdCard: '',
  legalPhone: '',
  contectName: '',
  contectPhone: '',
  contectMail: '',
  loginName: '',
  otherDesc: '',
};

class ActionDrawer extends Component {
  state = {
    actionType: 'add',
    loading: false,
    visible: false,
    formData: defaultFormData,
    confirmLoading: false,
  }

  showDrawer = (type, data) => {
    this.setState({
      actionType: type,
      visible: true,
      formData: data || this.state.formData,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      formData: defaultFormData,
    });
    if (this.state.actionType !== 'view') {
      this.actionForm.props.form.resetFields();
    }
  };

  onSubmit = () => {
    const { confirmLoading, actionType, formData } = this.state;
    if (actionType === 'view') {
      this.onClose();
    } else {
      if (confirmLoading) return;
      this.actionForm.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.setState({ confirmLoading: true });
          console.log('finally values:', values);
          let api = actionType === 'add' ? createOrgApi : updateOrgApi;
          api({
            ...values,
            id: formData.id,
          }).then(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            }, () => {
              this.actionForm.props.form.resetFields();
              this.props.callback();
            });
            message.success(`${actionType === 'add' ? '添加' : '更改'}成功`);
          }).catch(() => {
            this.setState({ confirmLoading: false });
          });
        }
      });
    }
  }

  render() {
    const {
      actionType, loading, visible, formData
    } = this.state;

    const actionTypeChange = actionType === 'add' ? '新建' : actionType === 'edit' ? '编辑' : '查看';

    return (
      <Drawer
        title={`${actionTypeChange}机构`}
        width={720}
        onClose={this.onClose}
        visible={visible}
      >
        <Spin spinning={loading}>
          <div>
            {actionType !== 'view' ? (
              <OrgForm
                wrappedComponentRef={(form) => this.actionForm = form}
                originData={formData}
                actionType={actionType}
              >
              </OrgForm>
            ) : (
              <ViewForm originData={formData}></ViewForm>
            )}
            
          </div>
        </Spin>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={this.onSubmit} type="primary">
            确定
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default ActionDrawer;
