/*
* 接口统一输出
* 页面引用时直接引用到对应的 Api 命名空间
*/
import * as PlatformApi from './platform'
import * as FunderApi from './funder'
import * as EnterprisApi from './enterpris'
import * as UserApi from './user'
import * as CommonApi from './common'
import * as SuperApi from './super'

export {
  PlatformApi,
  EnterprisApi,
  FunderApi,
  UserApi,
  CommonApi,
  SuperApi
}
