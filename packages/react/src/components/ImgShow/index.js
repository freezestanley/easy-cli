import React, { Component } from 'react';
import {
  Upload, Modal, Button, Icon 
} from 'antd';
import LazyLoad from 'react-lazyload';
import { downloadFileFun } from 'utils/index';

import styles from './index.module.scss';

class PicturesWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      maxShow: 1,
      // fileList: [
      //   {
      //     uid: '-1', // 必须要有
      //     name: 'xxx.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      // ],
      currentIndex: 0, // 当前看到图片的下标
    };
  }

  handleCancel = () => this.setState({
    previewVisible: false
  });

  handlePreview = async file => {
    this.setState({
      previewVisible: true,
    });
  };

  handleClickLeft = () => {
    const currentIndex = this.state.currentIndex;
    const nextIndex = currentIndex - 1;
    this.setState({
      currentIndex: nextIndex,
    });
  }

  handleClickRight = () => {
    const currentIndex = this.state.currentIndex;
    const nextIndex = currentIndex + 1;
    this.setState({
      currentIndex: nextIndex,
    });
  }

  getImgNode = (data, current) => {
    const result = [];
    data.forEach((item, index) => {
      if (index === current) {
        result.push(
          <LazyLoad key={index}>
            <img alt={item.name} style={{ width: '100%' }} src={item.url} />
          </LazyLoad>
        );
      } else {
        result.push(
          <LazyLoad key={index}>
            <img alt={item.name} style={{ width: '100%', display: 'none' }} src={item.url} />
          </LazyLoad>
        );
      }
    });
    return result;
  }

  render() {
    const { previewVisible, currentIndex } = this.state;
    const fileList = this.props.data.length ? [this.props.data[0]] : [];

    return (
      <div className="clearfix">
        <Upload
          action=""
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          className={styles['hide-delete']}
        >
          {null}
        </Upload>
        <Modal
          visible={previewVisible}
          width={742}
          closable={false}
          footer={null}
          onCancel={this.handleCancel}
          wrapClassName={styles['modal-container']}
        >
          <div className={styles['image-viewer-header']}>
            <div className={styles['header-left']}>
              <Icon
                type="close"
                style={{ marginLeft: '16px' }}
                onClick={this.handleCancel}
              />
              <Icon
                type="arrow-left"
                style={{ marginLeft: '30px', fontSize: '16px' }}
                className={currentIndex === 0 ? styles.inactive : styles.active}
                onClick={() => this.handleClickLeft()}
              />
              <Icon
                type="arrow-right"
                style={{ marginLeft: '20px', fontSize: '16px' }}
                className={currentIndex === (this.props.data.length - 1) ? styles.inactive : styles.active}
                onClick={() => this.handleClickRight()}
              />
            </div>
            <div className="tac">{(currentIndex + 1) + '/' + this.props.data.length}</div>
            <div className={styles['header-right']}>
              <Button type="link" icon="download" size="small" onClick={() => downloadFileFun(this.props.data[currentIndex].url)}>
                下载该图片
              </Button>
            </div>
          </div>
          
          <div>
            {this.getImgNode(this.props.data, currentIndex)}
          </div>
          {/* <img alt="example" style={{ width: '100%' }} src={previewImage} /> */}
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
