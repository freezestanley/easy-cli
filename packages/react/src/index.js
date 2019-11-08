import React from 'react';
import ReactDom from 'react-dom';
import Router from './router';
// import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from 'store';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

// css
import 'antd/dist/antd.less';
import 'styles/index.scss';

ReactDom.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router></Router>
    </ConfigProvider> 
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
