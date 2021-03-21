import React, { createContext, useEffect, useState } from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Layout, { UsersList } from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboards from './components/Dashboards/Dashboards';
import SignIn from './components/Signin/Signin';
import { allBits } from './fakeData/test';
import DynamicForm from './components/DynamicForm/DynamicForm';

export const ResultContent = createContext()
export const BetsContent = createContext()
export const ResultEditContent = createContext()

const App = () => {
  const [result, setResult] = useState({})
  const [bets, setBets] = useState([])
  const [resultEdit, setResultEdit] = useState({})
  useEffect(() => {
    setBets(allBits)
  })


  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default App;