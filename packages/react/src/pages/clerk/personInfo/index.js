import React from 'react';
import styles from './index.module.scss';

function PersonInfo() {
  return (
    <div>
      <div className={styles['info-item']}>
        <div className={styles['item-label']}>业务员名称</div>
        <div className={styles['item-content']}>张三</div>
      </div>
      <div className={styles['info-item']}>
        <div className={styles['item-label']}>业务员手机号</div>
        <div className={styles['item-content']}>15675464544</div>
      </div>
      <div className={styles['info-item']}>
        <div className={styles['item-label']}>业务员负责省市</div>
        <div className={styles['item-content']}>江苏省苏州市 |  南京市</div>
      </div>
      <div className={styles['info-item']}>
        <div className={styles['item-label']}>业务员账号</div>
        <div className={styles['item-content']}>zhangsan</div>
      </div>
    </div>
  );
}

export default PersonInfo;
