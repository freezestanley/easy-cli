import React, { Component } from 'react';
import {
  Form, Input, Select, Tree,
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import { ORG_TYPE } from 'utils/constant';

const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;

@Form.create({
  name: 'roleForm'
})
class RoleForm extends Component {
  state = {
  };

  // 判断节点key是完全选中还是半选中状态
  handleCheckedKeys = (keys, treeData) => {
    const result = {
      checked: [],
      halfChecked: []
    };

    keys.forEach((item) => {
      const children = this.getAllChildren(item, treeData);
      const flag = this.compareArr(children, keys);
      if (flag) {
        result.checked.push(item);
      } else {
        result.halfChecked.push(item);
      }
    });

    return result;
  }

  // 获取该节点所有的子节点key
  getAllChildren = (key, treeData) => {
    // 先找到该节点
    const node = this.getNodeByKey(key, treeData);
    // 再得到所有子节点的key
    return this.getAllChildrenKey(node.children || []);
  }

  getNodeByKey = (key, treeData) => {
    let node;
    for (let i = 0; i < treeData.length; i++) {
      if ((key + '') === (treeData[i].key + '')) {
        node = treeData[i];
        break;
      } else if (treeData[i].children) {
        const temp = this.getNodeByKey(key, treeData[i].children);
        if (temp) {
          node = temp;
          break;
        }
      }
    }
    return node;
  }

  getAllChildrenKey = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i].key);
      if (data[i].children) {
        const sub = this.getAllChildrenKey(data[i].children);
        result = result.concat(sub);
      }
    }
    return result;
  }

  // 对边子节点是否都包含在数据中
  compareArr = (children, keys) => {
    if (!children.length) { // 说明已经是最后一层的节点了，肯定是选中状态
      return true;
    } else {
      const isHalf = children.some((item) => {
        return !keys.includes(item);
      });
      return !isHalf;
    }
  }

  onCheck = (checkedKeys, e) => {
    const result = Array.from(new Set([...checkedKeys, ...e.halfCheckedKeys]));
    this.props.onCheck(result);
  };

  renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} title={item.name} />;
  });

  treeDataValidator = (rule, value, callback) => {
    if (value.checked.length === 0 && value.halfChecked.length === 0) {
      return callback('请选择权限');
    }
    return callback();
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, actionType, treeData } = this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const checkedKeys = this.handleCheckedKeys(originData.menuIds, treeData);
    console.log('from parent:', checkedKeys);

    return (
      <div className="">
        <Form colon={false} hideRequiredMark={true} {...formItemLayout} style={{ paddingBottom: '53px' }}>
          <Form.Item label="角色名称">
            {getFieldDecorator('name', {
              initialValue: originData.name,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })(
              <TrimInput placeholder="请输入" disabled={actionType !== 'add'} />,
            )}
          </Form.Item>
          <Form.Item label="角色所属">
            {getFieldDecorator('orgType', {
              initialValue: originData.orgType || undefined,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
            })(
              <Select placeholder="请选择" disabled={actionType !== 'add'}>
                {Object.keys(ORG_TYPE).map((item, index) => {
                  return (<Option key={index} value={item}>{ORG_TYPE[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="角色说明">
            {getFieldDecorator('remarks', {
              initialValue: originData.remarks,
            })(
              <TextArea placeholder="请输入" maxLength={50} />,
            )}
          </Form.Item>
          <Form.Item label="角色权限">
            {getFieldDecorator('menuIds', {
              initialValue: checkedKeys,
              valuePropName: 'checkedKeys',
              rules: [
                { required: true, message: '请选择', },
                { validator: this.treeDataValidator },
              ],
            })(
              <Tree
                checkable
                defaultExpandAll
                autoExpandParent={true}
                onCheck={this.onCheck}
                // checkedKeys={checkedKeys}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RoleForm;
