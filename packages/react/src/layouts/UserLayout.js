import React from 'react';
import Login from 'container/Login';

export default class AppContainer extends React.Component {
  render() {
    return (
      <Login {...this.props}></Login>
    );
  }
}
