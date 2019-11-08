import React, { Component } from 'react';
// import { Button } from 'antd';
// import ImgShow from 'components/ImgShow/index';
import FileAndImgShow from '../FileAndImgShow/index';

import commonStyles from '../common.module.scss';
import styles from './index.module.scss';

class ApplyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  formateFileData = (fileList) => {
    return fileList.map((file, index) => {
      return {
        uid: -(index + 2),
        name: file.name,
        status: 'done',
        url: file.url,
      };
    });
  }

  render() {
    const { caseInfo, loanCustomer, caseMaterial } = this.props;

    // 借款人证件正反面资料
    const loanCardFB = loanCustomer ? [
      {
        uid: -1,
        url: loanCustomer.idCardB,
        name: '证件正面',
        status: 'done',
      },
      {
        uid: -2,
        url: loanCustomer.idCardF,
        name: '证件背面',
        status: 'done',
      }
    ] : [];

    // 被保人证件正反面资料
    const caseCardFB = caseInfo ? [
      {
        uid: -1,
        url: caseInfo.idCardB,
        name: '证件正面',
        status: 'done',
      },
      {
        uid: -2,
        url: caseInfo.idCardF,
        name: '证件背面',
        status: 'done',
      }
    ] : [];

    return (
      <div>
        <div className={styles['anchor-title']}>垫资申请信息</div>
        {caseInfo ? (
          <div className="mar-b-30">
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>被保险人名称</div>
              <div className={commonStyles['item-content']}>{caseInfo.insuranceName}</div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>出险医院</div>
              <div className={commonStyles['item-content']}>{caseInfo.hospital}</div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>出险医院所属省市</div>
              <div className={commonStyles['item-content']}>{caseInfo.hospitalProvince + ' ' + caseInfo.hospitalCity}</div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>出险原因</div>
              <div className={commonStyles['item-content']}>{caseInfo.reason}</div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>住院日期</div>
              <div className={commonStyles['item-content']}>{caseInfo.hospitalizationDate}</div>
            </div>
            {
              loanCustomer ? (
                <React.Fragment>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人是被保险人</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.relationship}</div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>其他关系说明</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.otherDesc}</div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人姓名</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.loanCustomerName}</div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人证件类型</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.cardType}</div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人证件号</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.idCard}</div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人证件到期日</div>
                    <div className={commonStyles['item-content']}></div>
                  </div>
                  <div className={commonStyles['info-item']}>
                    <div className={commonStyles['item-label']}>借款人手机号</div>
                    <div className={commonStyles['item-content']}>{loanCustomer.phone}</div>
                  </div>
                </React.Fragment>
              ) : null
            }
            
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>医院预交金额(元)</div>
              <div className={commonStyles['item-content']}>{caseInfo.advanceAmount}</div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>申请垫资金额(元)</div>
              <div className={commonStyles['item-content']}>{caseInfo.capitalAmount}</div>
            </div>
            {caseInfo.otherDesc ? (
              <React.Fragment>
                <div className={commonStyles['info-item']}>
                  <div className={commonStyles['item-label']}>被保险人社保账号</div>
                  <div className={commonStyles['item-content']}>{caseInfo.otherDesc.insuredSocialNo}</div>
                </div>
                <div className={commonStyles['info-item']}>
                  <div className={commonStyles['item-label']}>社保所在地</div>
                  <div className={commonStyles['item-content']}>{caseInfo.otherDesc.insuredSocialAddress}</div>
                </div>
                <div className={commonStyles['info-item']}>
                  <div className={commonStyles['item-label']}>被保险人既往病情</div>
                  <div className={commonStyles['item-content']}>{caseInfo.otherDesc.insuredIllness}</div>
                </div>
                {/* <div className={commonStyles['info-item']}>
                  <div className={commonStyles['item-label']}>其他说明</div>
                  <div className={commonStyles['item-content']}>{caseInfo.otherDesc.desc}</div>
                </div> */}
              </React.Fragment>
            ) : null}
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>备注说明</div>
              <div className={commonStyles['item-content']}></div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>医保是否实时结算</div>
              <div className={commonStyles['item-content']}></div>
            </div>
          </div>
        ) : null}

        <div className={styles['anchor-title']}>垫资申请资料</div>
        {caseMaterial ? (
          <div className="mar-b-30">
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>借款人证件正反面资料</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow fileList={loanCardFB}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>被保险人门诊病例资料</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.medicalHistoryList)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>被保险人社保卡照片</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow fileList={this.formateFileData(caseMaterial.securityCardList)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>医院预交金通知单</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.advanceAmountNoticeList)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>入院通知单</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.admissionNoticeList)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>其他补充资料</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={caseMaterial.otherList || []}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>被保人证件正反面资料</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow fileList={caseCardFB}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>住院病例资料</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.inpatientMedicalRecords)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>理赔收款银行卡资料</div>
              <div className={commonStyles['item-content'] + ' df'}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.bandCardList)}></FileAndImgShow>
              </div>
            </div>
            <div className={commonStyles['info-item']}>
              <div className={commonStyles['item-label']}>理赔申请书</div>
              <div className={commonStyles['item-content']}>
                <FileAndImgShow showType="file" fileList={this.formateFileData(caseMaterial.claimsApplication)}></FileAndImgShow>
              </div>
            </div>
          </div>
        ) : null}
        

      </div>
    );
  }
}
 
export default ApplyInfo;
