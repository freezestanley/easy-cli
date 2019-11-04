import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './other.less';

const Chat = () => (
  <div>
    <div className={'box'}>this is Chat12123</div>
    <div>123123</div>
  </div>
)

ReactDOM.render(
  <Chat/>,
  document.getElementById('app')
)