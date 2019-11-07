import React, { Component } from 'react';
import styles from './index.module.scss';

class PageName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPageName = (path, routes) => {
    let str = '';
    for (let i = 0; i < routes.length; i++) {
      if (path === routes[i].path) {
        str = routes[i].title;
        return str;
      } else if (routes.routes) {
        str = this.getPageName(path, routes.routes);
      }
    }
    return str;
  }

  render() {
    const { location, routes } = this.props;
    let pageName = this.getPageName(location.pathname, routes);
    return (
      <div className={styles['page-name']}>{ pageName }</div>
    );
  }
}
 
export default PageName;
