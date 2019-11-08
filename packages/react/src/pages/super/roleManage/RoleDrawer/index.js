import React, { Component } from 'react';
import { Drawer, Spin, Button, } from 'antd';
import RoleForm from './RoleForm';

// import { addRoleApi, updateRoleApi, getMenuTreeApi } from 'api/super/roleManage';
import { addRoleApi, updateRoleApi, getMenuTreeApi } from 'api/super/roleManage';

const defaultFormData = {
  id: '',
  name: '',
  orgType: '',
  remarks: '',
  menuIds: [],
};

class RoleDrawer extends Component {
  state = {
    actionType: 'add',
    loading: false,
    visible: false,
    formData: defaultFormData,
    confirmLoading: false,
  }

  componentDidMount() {
    this.getMenuTree();
  }

  getMenuTree = () => {
    getMenuTreeApi().then(res => {
      this.setState({
        treeData: res.list
      });
    });
  }

  showDrawer = (data) => {
    this.setState({
      actionType: data ? 'edit' : 'add',
      visible: true,
      formData: data || this.state.formData,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      formData: defaultFormData,
    });
    this.roleForm.props.form.resetFields();
  };

  changePower = (data) => {
    this.setState({
      formData: {
        id: this.state.formData.id,
        name: this.state.formData.name,
        orgType: this.state.formData.orgType,
        remarks: this.state.formData.remarks,
        menuIds: data,
      },
    }, () => {
      this.roleForm.props.form.setFields({
        menuIds: {
          checked: [],
          halfChecked: []
        }
      });
    });
  }

  onSubmit = () => {
    const { confirmLoading, actionType } = this.state;
    if (confirmLoading) return;
    this.roleForm.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        console.log('roleinfo:', {
          ...values,
          menuIds: this.state.formData.menuIds,
          id: this.state.formData.id,
        });
        let api = actionType === 'add' ? addRoleApi : updateRoleApi;
        api({
          ...values,
          menuIds: this.state.formData.menuIds,
          id: this.state.formData.id,
        }).then(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          }, () => {
            this.roleForm.props.form.resetFields();
            this.props.callback();
          });
        }).catch(() => {
          this.setState({ confirmLoading: false });
        });
      }
    });
  }

  render() { 
    const {
      actionType, loading, visible, formData, treeData 
    } = this.state;

    return (
      <Drawer
        title={actionType === 'add' ? '新建角色' : '编辑角色'}
        width={720}
        onClose={this.onClose}
        visible={visible}
      >
        <Spin spinning={loading}>
          <RoleForm
            wrappedComponentRef={(form) => this.roleForm = form}
            originData={formData}
            actionType={actionType}
            treeData={treeData}
            onCheck={this.changePower}
          >
          </RoleForm>
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
 
export default RoleDrawer;
