// 企业信息 所属行业

export const industrys = [
  { value: 'A', label: '农、林、牧、渔业' },
  { value: 'B', label: '采矿业' },
  { value: 'C', label: '制造业' },
  { value: 'D', label: '电力、热力、燃气及水生产和供应业' },
  { value: 'E', label: '建筑业' },
  { value: 'F', label: '批发和零售业' },
  { value: 'G', label: '交通运输、仓储和邮政业' },
  { value: 'H', label: '住宿和餐饮业' },
  { value: 'I', label: '信息传输、软件和信息技术服务业' },
  { value: 'J', label: '金融业' },
  { value: 'K', label: '房地产业' },
  { value: 'L', label: '租赁和商务服务业' },
  { value: 'M', label: '科学研究和技术服务业' },
  { value: 'N', label: '水利、环境和公共设施管理业' },
  { value: 'O', label: '居民服务、修理和其他服务业' },
  { value: 'P', label: '教育' },
  { value: 'Q', label: '卫生和社会工作' },
  { value: 'R', label: '文化、体育和娱乐业' },
  { value: 'S', label: '公共管理、社会保障和社会组织' },
  { value: 'T', label: '国际组织' },
]
function arrToObj(arr) {
  const map = {}
  arr.forEach(item => {
    map[item.value] = item.label
  })
  return map
}
export const industryMap = arrToObj(industrys)

// 企业划分
export const scales = [
  // { value: 'LARGE', label: '大型企业' },
  // { value: 'B', label: '中型企业业' },
  { value: 'MEDIUM', label: '中型企业' },
  { value: 'SMALL', label: '小型企业' },
  { value: 'MICRO', label: '微型企业' },
]

export const scaleMap = arrToObj(scales)
