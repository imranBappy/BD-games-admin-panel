import React, { createContext, useEffect, useState } from 'react';
import {
  HashRouter, Route, Switch
} from "react-router-dom";
import './App.css';
import Dashboards from './components/Dashboards/Dashboards';
import Layout, { UsersList } from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignIn from './components/Signin/Signin';
import { allBits } from './fakeData/test';

export const ResultContent = createContext()
export const BetsContent = createContext()
export const ResultEditContent = createContext()

const App = () => {
  const [result, setResult] = useState({})
  const [bets, setBets] = useState([])
  const [resultEdit, setResultEdit] = useState({})
  useEffect(() => {
    setBets(allBits)
  },[])


  return (
    <>
      <HashRouter>
        <ResultContent.Provider value={[result, setResult]}>
          <BetsContent.Provider value={[bets, setBets]}>
            <ResultEditContent.Provider value={[resultEdit, setResultEdit]}>
              <Layout>
                <Switch>
                  {/* <DynamicForm /> */}
                  <Route exact path='/login' component={SignIn} />
                  <PrivateRoute path='/' >
                    <Dashboards />
                  </PrivateRoute>
                  <PrivateRoute path='/users-list' >
                    <UsersList />
                  </PrivateRoute>
                </Switch>
              </Layout>
            </ResultEditContent.Provider>
          </BetsContent.Provider>
        </ResultContent.Provider>
      </HashRouter>
    </>
  );
};

export default App;