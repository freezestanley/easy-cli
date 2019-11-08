import React from 'react';
import commonStyles from '../common.module.scss';

function LoanInfo(props) {
  const loanInfoData = props.loanInfoData;
  return (
    <div className="mar-b-30">
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>放款申请时间</div>
        <div className={commonStyles['item-content']}>{loanInfoData.applyTime}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>放款申请用户</div>
        <div className={commonStyles['item-content']}>{loanInfoData.applyUser}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>收款账户类型</div>
        <div className={commonStyles['item-content']}>{loanInfoData.accountType}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>收款账户名称</div>
        <div className={commonStyles['item-content']}>{loanInfoData.acctName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>收款账户账号</div>
        <div className={commonStyles['item-content']}>{loanInfoData.acctNo}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>收款账户所属银行</div>
        <div className={commonStyles['item-content']}>{loanInfoData.branchName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>实际放款金额</div>
        <div className={commonStyles['item-content']}>{loanInfoData.prin}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>实际放款时间</div>
        <div className={commonStyles['item-content']}>{loanInfoData.loanTime}</div>
      </div>
    </div>
  );
}

export default LoanInfo;
