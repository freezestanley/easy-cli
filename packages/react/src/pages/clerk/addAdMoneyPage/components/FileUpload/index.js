import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { UPLOAD_URL } from 'api/file.js';
import { getToken } from 'utils/auth';
import { FILE_TYEPS } from 'utils/constant';

import styles from './index.module.scss';

const { Dragger } = Upload;

class FileUpload extends Component {
  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || [],
      };
    }
    return null;
  }

  state = {
    fileList: [],
  }

  getFileSuffix = (fileName) => {
    const dotIndex = fileName.lastIndexOf('.');
    return fileName.slice(dotIndex + 1);
  }

  // 上传前校验文件类型和文件大小, 文件数量
  beforeUpload = (file) => {
    const { limit } = this.props;
    if (limit && this.state.fileList.length >= limit) {
      message.error(`超出文件最大数量 ${limit}`);
      return false;
    }
    const suffix = this.getFileSuffix(file.name);
    const isAccept = FILE_TYEPS.includes(suffix);
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
      info.fileList.forEach((item, index) => {
        if (item.status === 'done') {
          if (!item.url) {
            item.url = item.response.data.url;
          }
          data.push(item);
        }
      });
      this.triggerChange(data);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
      const length = info.fileList.length;
      const data = info.fileList.slice(0, length - 1);

      this.triggerChange(data);
    } else {
      const data = info.fileList.filter((item) => item.status);
      this.triggerChange(data);
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
    const { limit } = this.props;

    const uploadButton = (
      <div style={{ padding: '0 6px' }}>
        <p className="ant-upload-drag-icon">
          <Icon type="cloud-upload" />
        </p>
        <p className="ant-upload-text">将文件拖拽到此处，或点击上传</p>
        <p className="ant-upload-hint">{`支持扩展名：${FILE_TYEPS.join('/')}，且不超过5M`}</p>
      </div>
    );

    return (
      <div style={{ position: 'relative', }}>
        <Dragger
          className={styles['uploader-container']}
          action={UPLOAD_URL}
          headers={{
            token: getToken(),
          }}
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onChange={this.onChange}
        >
          {uploadButton}
        </Dragger>
        <div style={{ position: 'absolute', left: '306px', top: '-4px', }}>{fileList.length + '/' + limit}</div>
      </div>
    );
  }
}

export default FileUpload;
