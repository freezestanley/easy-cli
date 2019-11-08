import axios from 'axios';
import { v4 } from 'uuid';
const EventUrl = '/anlink-node-proxy/app/node/getEvent'

export default (eventType, opts = {
}) => {
  const { headers, source, extension, ...rest } = opts;
  const ceId = v4();
  let ext = {};
  if (extension) ext['ce-my-extension'] = extension;

  return axios({
    url: EventUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'ce-type': eventType,
      'ce-specversion': '0.2',
      'ce-source': source || window.location.href,
      'ce-id': ceId,
      ...ext,
      ...headers,
    },
    ...rest,
  })
    .then(res => res)
    .catch(err => {
      // 非200返回
    })
}