// 消息管理相关接口
import request from '@/utils/request'
const prefix = '/api/ops/corp/message'

const OPS_addAnnouncement = prefix + '/addAnnouncement'
const OPS_addNotice = prefix + '/addNotice'
const OPS_cancelSendMessage = prefix + '/cancelSendMessage'
const OPS_markAllRead = prefix + '/markAllRead'
const OPS_markRead = prefix + '/markRead'
const OPS_queryAnnouncementList = prefix + '/queryMessage'
const OPS_queryMessageList = prefix + '/queryMessageOperDetail'
const OPS_querySendMessageCorp = prefix + '/querySendMessageCorp'
const OPS_resendMessage = prefix + '/resendMessage'

// 生成公告
export function addAnnouncement(data) {
  return request({
    url: OPS_addAnnouncement,
    method: 'POST',
    data
  })
}

// 生成业务通知
export function addNotice(data) {
  return request({
    url: OPS_addNotice,
    method: 'POST',
    data
  })
}

// 取消发送并删除
export function cancelSendMessage(data) {
  return request({
    url: OPS_cancelSendMessage,
    method: 'POST',
    data
  })
}

// 全部标为已读
export function markAllRead(data) {
  return request({
    url: OPS_markAllRead,
    method: 'POST',
    data
  })
}

// 标记为已读
export function markRead(params) {
  return request({
    url: OPS_markRead + `?messageOperId=${params.messageOperId}`,
    method: 'GET'
  })
}

// 平台获取公告列表
export function queryAnnouncementList(data) {
  return request({
    url: OPS_queryAnnouncementList,
    method: 'POST',
    data
  })
}

// 企业获取消息详情列表
export function queryMessageList(data) {
  return request({
    url: OPS_queryMessageList,
    method: 'POST',
    data
  })
}

// 平台查询所有发送消息企业
export function querySendMessageCorp(data) {
  return request({
    url: OPS_querySendMessageCorp,
    method: 'POST',
    data
  })
}

// 重新发送
export function resendMessage(data) {
  return request({
    url: OPS_resendMessage,
    method: 'POST',
    data
  })
}
