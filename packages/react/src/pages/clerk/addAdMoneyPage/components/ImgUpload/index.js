import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { UPLOAD_URL } from 'api/file.js';
import { getToken } from 'utils/auth';

import styles from './index.module.scss';

const { Dragger } = Upload;

class Avatar extends Component {
  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('fileList' in nextProps) {
      if (state.fileList.length === 0) {
        return {
          fileList: nextProps.fileList || [],
        };
      } else {
        return null;
      }
    }
    return null;
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false,
  //     fileList: props.fileList ? props.fileList : [],
  //   };
  // }

  state = {
    fileList: [],
  }

  getFileSuffix = (fileName) => {
    const dotIndex = fileName.lastIndexOf('.');
    return fileName.slice(dotIndex + 1);
  }

  // 上传前校验文件类型和文件大小, 文件数量
  beforeUpload = (file) => {
    const suffix = this.getFileSuffix(file.name);
    const isAccept = ['png', 'jpg', 'jpeg'].includes(suffix);
    if (!isAccept) {
      message.error('该文件格式不支持');
    }
    const isOverSize = file.size / 1024 / 1024 < 5;
    if (!isOverSize) {
      message.error('文件必须小于 5MB!');
    }
    return isAccept && isOverSize;
  }

  onChange = (info) => {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功.`);
      // 筛选成功的，并且处理下数据
      const data = [];
      info.file.url = info.file.response.data.url;
      data.push(info.file);
      this.setState({
        fileList: data
      });
      // 触发事件把值传出去
      this.triggerChange(data);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
      if (info.fileList.length === 1) {
        this.setState({ fileList: [] });
      } else {
        this.setState({ fileList: info.fileList[0] });
      }
    } else {
      // this.setState({ fileList: [...info.fileList] });
      this.setState({
        fileList: info.fileList.filter((item) => item.status)
      });
    }
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { fileList } = this.state;

    const uploadButton = (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type="cloud-upload" />
        </p>
        <p className="ant-upload-text">将文件拖拽到此处，或点击上传</p>
        <p className="ant-upload-hint">
          支持扩展名：png/jpg，且不超过5M
        </p>
      </div>
    );

    return (
      <Dragger
        className={styles['uploader-container']}
        action={UPLOAD_URL}
        headers={{
          token: getToken(),
        }}
        fileList={fileList}
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={this.onChange}
      >
        {fileList.length && fileList[0].url ? <img src={fileList[0].url} alt="avatar" className={styles['img-class']} /> : uploadButton}
      </Dragger>
    );
  }
}

export default Avatar;
