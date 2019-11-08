import fetchEvent from './base/fetchEvent';
import EventType from './base/eventType';

export default {
  async getUserinfo(param) {
    return await fetchEvent(EventType.getUserinfo, {
      data: param,
    });
  },
}