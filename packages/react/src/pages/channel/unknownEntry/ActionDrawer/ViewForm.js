import React from 'react';
import { thousandPoint } from 'utils/index';
import commonStyles from './common.module.scss';

function ViewForm(props) {
  const { originData } = props;

  return (
    <div>
      <div className={commonStyles['anchor-title']}>入账信息</div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>代收付申请单号</div>
        <div className={commonStyles['item-content']}>{originData.paymentNo}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>入账金额(元)</div>
        <div className={commonStyles['item-content']}>{thousandPoint(Number(originData.amount) / 100)}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>入账时间</div>
        <div className={commonStyles['item-content']}>{originData.finishDate}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>付款方账户名</div>
        <div className={commonStyles['item-content']}>{originData.payerName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>付款方账户号</div>
        <div className={commonStyles['item-content']}>{originData.payerAccount}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>付款方开户行</div>
        <div className={commonStyles['item-content']}>{originData.payerBank}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>状态</div>
        <div className={commonStyles['item-content']}>{originData.status}</div>
      </div>

      <div className={commonStyles['anchor-title']}>确认信息</div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>处理用户</div>
        <div className={commonStyles['item-content']}>{originData.doUser}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>处理时间</div>
        <div className={commonStyles['item-content']}>{originData.doTime}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>处理类型</div>
        <div className={commonStyles['item-content']}>{originData.doType}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>对应案件号</div>
        <div className={commonStyles['item-content']}>{originData.caseNo}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>对应垫付号</div>
        <div className={commonStyles['item-content']}>{originData.advanceNo}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>被保险人名称</div>
        <div className={commonStyles['item-content']}>{originData.insuranceName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>垫资总额(元)</div>
        <div className={commonStyles['item-content']}>{originData.capitalAmount}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>确认说明</div>
        <div className={commonStyles['item-content']}>{originData.memo}</div>
      </div>
    </div>
  );
}

export default ViewForm;
