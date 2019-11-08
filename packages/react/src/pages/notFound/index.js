import React, { Component } from 'react';
import styles from './index.module.scss';
import png404 from 'assets/404_images/404.png';
import png404cloud from 'assets/404_images/404_cloud.png';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles['wscn-http404-container']}>
        <div className={styles['wscn-http404']}>
          <div className={styles['pic-404']}>
            <img className={styles['pic-404__parent']} src={png404} alt="404" />
            <img className={styles['pic-404__child'] + ' ' + styles.left} src={png404cloud} alt="404" />
            <img className={styles['pic-404__child'] + ' ' + styles.mid} src={png404cloud} alt="404" />
            <img className={styles['pic-404__child'] + ' ' + styles.right} src={png404cloud} alt="404" />
          </div>
          <div className={styles.bullshit}>
            <div className={styles.bullshit__oops}>页面找不到!</div>
            <div className={styles.bullshit__info}>您访问的页面不存在或者您没有权限访问当前页面
            </div>
            <div className={styles.bullshit__headline}>管理员说你不能进入这个页面...</div>
            <div className={styles.bullshit__info}>请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
            <a href="/" className={styles['bullshit__return-home']}>返回首页</a>
          </div>
        </div>
      </div>
    );
  }
}
