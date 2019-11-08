// 资产相关业务
import request from '@/utils/request'
const prefix = '/api/ops/asset'

const ASSET_destroyAsset = prefix + '/destroyAsset'
const ASSET_downloadAssetAttach = prefix + '/downloadAssetAttach'
const ASSET_queryAssetDetail = prefix + '/queryAssetDetail'
const ASSET_queryAssetList = prefix + '/queryAssetList'
const ASSET_registerAsset = prefix + '/registerAsset'
const ASSET_queryRegCorpList = prefix + '/queryRegisterCorpList'
const ASSET_editAsset = prefix + '/editAsset'

// 作废资产
export const destroyAsset = function(data = {}) {
  return request({
    url: ASSET_destroyAsset,
    method: 'POST',
    data
  })
}

// 资产附件下载
export const downloadAssetAttach = function(data = {}) {
  return request({
    url: ASSET_downloadAssetAttach,
    method: 'POST',
    data
  })
}

// 查看资产详情
export const queryAssetDetail = function(data = {}) {
  return request({
    url: ASSET_queryAssetDetail,
    method: 'POST',
    data
  })
}

// 查询企业资产列表
export const queryAssetList = function(data = {}) {
  return request({
    url: ASSET_queryAssetList,
    method: 'POST',
    data
  })
}

// 查询可登记企业列表
export const queryRegCorpList = function(data = {}) {
  return request({
    url: ASSET_queryRegCorpList,
    method: 'POST',
    data
  })
}

// 登记资产
export const registerAsset = function(data = {}) {
  return request({
    url: ASSET_registerAsset,
    method: 'POST',
    data
  })
}

// 编辑资产
export const editAsset = function(data = {}) {
  return request({
    url: ASSET_editAsset,
    method: 'POST',
    data
  })
}
