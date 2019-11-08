import request from '@/utils/request'

// applyContract
export const applyContract = function(data) {
  return request({
    url: '/api/ops/contract/applyContract',
    method: 'POST',
    data
  })
}

// createContract
export const createContract = function(data) {
  return request({
    url: '/api/ops/contract/createContract',
    method: 'POST',
    data
  })
}

export const deleteContractTemplate = function (data) {
  return request({
    url: '/api/ops/contract/deleteContractTemplate',
    method: 'POST',
    data
  })
}

// queryByContractNo
export const queryByContractNo = function(data) {
  return request({
    url: '/api/ops/contract/queryByContractNo',
    method: 'POST',
    data
  })
}

// queryContractList
export const queryContractList = function(data) {
  return request({
    url: '/api/ops/contract/queryContractList',
    method: 'POST',
    data
  })
}

// queryTemplateFile
export const queryTemplateFile = function(data) {
  return request({
    url: '/api/ops/contract/queryTemplateFile',
    method: 'POST',
    data
  })
}

// signContract
export const signContract = function(data) {
  return request({
    url: '/api/ops/contract/signContract',
    method: 'POST',
    data
  })
}

// uploadContractTemplate
export const uploadContractTemplate = function(data) {
  return request({
    url: '/api/ops/contract/uploadContractTemplate',
    method: 'POST',
    data
  })
}

