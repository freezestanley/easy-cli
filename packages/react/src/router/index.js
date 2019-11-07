import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import UserLayout from 'layouts/UserLayout';
import BasicLayout from 'layouts/BasicLayout';
import NotFound from 'pages/notFound';

const customHistory = createBrowserHistory();

// export default class RootContainer extends React.Component {
//   render() {
//     return (
//       <Router history={customHistory}>
//         <Route
//           render={props => {
//             return (
//               <Switch>
//                 <Route path="/login" component={UserLayout} />
//                 <Route path="/" component={BasicLayout}></Route>
//                 <Route component={NotFound}></Route>
//               </Switch>
//             );
//           }}
//         />
//       </Router>
//     );
//   }
// }

const RootContainer = () => {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/login" component={UserLayout} />
        <Route path="/" component={BasicLayout}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
};

export default RootContainer;
