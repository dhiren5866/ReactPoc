import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Activityform from '../../features/activities/form/Activityform';
import ActivityDetails from '../../features/activities/Details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;


  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, token, setAppLoaded])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />
  return (

    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route exact path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={Activityform} />
                <Route path='/profile/:username' component={ProfilePage} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )} />

    </Fragment>
  );
};

export default withRouter(observer(App));

