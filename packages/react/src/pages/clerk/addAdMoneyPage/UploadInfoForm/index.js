import React, { Component } from 'react';
import { Form } from 'antd';
import FileUpload from '../components/FileUpload';

import styles from './index.module.scss';

@Form.create({
  name: 'uploadInfoForm'
})
class UploadInfoForm extends Component {
  state = {
    originData: {
      medicalHistoryList: [],
      bandCardList: [],
      claimsApplication: [],
      securityCardList: [],
      inpatientMedicalRecords: [],
      admissionNoticeList: [],
      advanceAmountNoticeList: [],
    }
  }

  fileValidator = (rule, value, callback) => {
    const flag = value.some((item) => {
      return item.url && item.name;
    });
    if (!flag) {
      return callback('请上传');
    }
    return callback();
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, } = this.state;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <div className={styles['form-class']}>
        <Form colon={false} hideRequiredMark={true} {...formItemLayout} labelAlign="left" layout="horizontal">
          <div className={styles.title}>上传资料</div>
          <Form.Item label="被保险人门诊病历资料">
            {getFieldDecorator('medicalHistoryList', {
              initialValue: originData.medicalHistoryList || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="理赔收款银行卡资料">
            {getFieldDecorator('bandCardList', {
              initialValue: originData.bandCardList || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="理赔申请书">
            {getFieldDecorator('claimsApplication', {
              initialValue: originData.claimsApplication || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="被保人社保卡照片">
            {getFieldDecorator('securityCardList', {
              initialValue: originData.securityCardList || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="住院病历资料">
            {getFieldDecorator('inpatientMedicalRecords', {
              initialValue: originData.inpatientMedicalRecords || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="入院通知单">
            {getFieldDecorator('admissionNoticeList', {
              initialValue: originData.admissionNoticeList || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
          <Form.Item label="医院预交金通知单">
            {getFieldDecorator('advanceAmountNoticeList', {
              initialValue: originData.advanceAmountNoticeList || [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请上传', },
                { validator: this.fileValidator },
              ],
            })(
              <FileUpload limit={2} />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
 
export default UploadInfoForm;
