import { combineReducers } from 'redux';

// Import app reducers
import appReducer from './app';
import sysReducer from './sys';

// ============================================
// Combine
const RootReducer = combineReducers({
  // 其他自定义的reducer
  app: appReducer, // 这里的命名，关系到container中取state对应的reducer的名字
  sys: sysReducer, // 这里的命名，关系到container中取state对应的reducer的名字
});

export default RootReducer;
