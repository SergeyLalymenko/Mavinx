import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setTokenBoolean } from './store/actions/actions'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import UserForm from './components/UserForm/UserForm'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Cabinet from './components/Cabinet/Cabinet'
import './App.css'



function App({tokenBoolean, setTokenBoolean}) {

  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => setTokenBoolean(), []);

  return (
    <Router>
      <ThemeProvider theme={theme()}>
        <CssBaseline/>
        <div className="main">
          {!tokenBoolean ? <UserForm hasAccount={hasAccount} setHasAccount={setHasAccount}/> :
          <>
          <Header/>
          <Switch>
            <Route path="/main">
              <Main/>
            </Route>
            <Route path="/сabinet">
              <Cabinet/>
            </Route>
            <Route path="*">
              <Redirect to="/main"/>
            </Route>
          </Switch>
          </>
          }
        </div>
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = ({tokenBoolean}) => ({tokenBoolean})

const mapDispatchToProps = {
  setTokenBoolean,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);