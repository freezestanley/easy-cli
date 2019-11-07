// withTrim

import React, { Component } from 'react';

const withTrim = (WrappedComponent) => class WrapperComponent extends Component {
    // 去除头尾空格
    handleBlur = (e) => {
      e.target.value = e.target.value.trim();
      const { onChange } = this.props;
      onChange(e);
    }

    render() {
      return <WrappedComponent onBlur={this.handleBlur} {...this.props} />;
    }
};

export default withTrim;
