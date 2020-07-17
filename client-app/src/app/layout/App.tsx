import React, { Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route,withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Activityform from '../../features/activities/form/Activityform';
import ActivityDetails from '../../features/activities/Details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';

const App : React.FC<RouteComponentProps> = ({location}) => {
  return (
 
    <Fragment>
        <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage}/>
      <Route path= {'/(.+)'} 
      render ={() => (
        <Fragment>
           <NavBar  />
        <Container style={{ marginTop: '7em' }}>
          <Switch> 
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route exact path='/activities/:id' component={ActivityDetails} />
          <Route key={location.key} path={['/createActivity','/manage/:id']} component={Activityform} />
          <Route component={NotFound} />
          </Switch>
        </Container>
          </Fragment> 
      )} />
     
    </Fragment>
  );
};

export default withRouter(observer(App));

