import React from 'react';
import commonStyles from '../common.module.scss';

function RepayPlan(props) {
  const repayPlanData = props.repayPlanData || {};
  return (
    <div className="mar-b-30">
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>贷款到期日</div>
        <div className={commonStyles['item-content']}>{repayPlanData.endDay}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>贷款状态</div>
        <div className={commonStyles['item-content']}>{repayPlanData.loanState}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期天数</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdDays}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>业务处理日期</div>
        <div className={commonStyles['item-content']}>{repayPlanData.businessDate}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>费用</div>
        <div className={commonStyles['item-content']}>{repayPlanData.fee}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>费用滞纳金</div>
        <div className={commonStyles['item-content']}>{repayPlanData.fine}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>利息</div>
        <div className={commonStyles['item-content']}>{repayPlanData.intr}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期费用</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdFee }</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期利息</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdIntr}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期利息罚息</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdIntrPenalty}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期本金</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdPrin}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>逾期本金罚息</div>
        <div className={commonStyles['item-content']}>{repayPlanData.ovdPrinPenalty}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>本金</div>
        <div className={commonStyles['item-content']}>{repayPlanData.prin}</div>
      </div>
      {/* <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>还款金额</div>
        <div className={commonStyles['item-content']}>{repayPlanData.repayAmt}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>还款方式</div>
        <div className={commonStyles['item-content']}>{repayPlanData.repayType}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>还款结果</div>
        <div className={commonStyles['item-content']}>{repayPlanData.result}</div>
      </div> */}
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>剩余金额</div>
        <div className={commonStyles['item-content']}>{repayPlanData.surPri}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>总金额</div>
        <div className={commonStyles['item-content']}>{repayPlanData.total}</div>
      </div>
    </div>
  );
}

export default RepayPlan;
