import React from 'react';
import { PLAT_ORG_TYPE } from 'utils/constant';
import commonStyles from './common.module.scss';

function ViewForm(props) {
  const { originData } = props;

  return (
    <div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>机构类型</div>
        <div className={commonStyles['item-content']}>{PLAT_ORG_TYPE[originData.orgType]}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>机构代码</div>
        <div className={commonStyles['item-content']}>{originData.orgCode}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>机构名称</div>
        <div className={commonStyles['item-content']}>{originData.orgName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>统一社会信用代码</div>
        <div className={commonStyles['item-content']}>{originData.creditCode}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>法人名称</div>
        <div className={commonStyles['item-content']}>{originData.legalName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>法人证件号</div>
        <div className={commonStyles['item-content']}>{originData.legalIdCard}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>法人手机号</div>
        <div className={commonStyles['item-content']}>{originData.legalPhone}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>联系人</div>
        <div className={commonStyles['item-content']}>{originData.contectName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>联系人手机号</div>
        <div className={commonStyles['item-content']}>{originData.contectPhone}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>联系人邮箱</div>
        <div className={commonStyles['item-content']}>{originData.contectMail}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>管理员账号</div>
        <div className={commonStyles['item-content']}>{originData.loginName}</div>
      </div>
      <div className={commonStyles['info-item']}>
        <div className={commonStyles['item-label']}>其他说明</div>
        <div className={commonStyles['item-content']}>{originData.otherDesc}</div>
      </div>
    </div>
  );
}

export default ViewForm;
