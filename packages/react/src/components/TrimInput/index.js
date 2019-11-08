// TrimInput Component

import React from 'react';
import { Input } from 'antd';

export default class TrimInput extends React.Component {
  handleBlur = (e) => {
    // 去除头尾空格
    e.target.value = e.target.value.trim();
    const { onChange } = this.props;
    // 主动调 onChange，将数据同步给 Form
    onChange(e);
  }

  render() {
    return (<Input onBlur={this.handleBlur} {...this.props} />);
  }
}
