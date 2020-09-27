import React from 'react';
import './App.css'
import NavBar  from './components/NavBar'
import Home  from './components/Home'
// import RecipeShow  from './components/RecipeShow'
import Login  from './components/Sessions/Login'
// import Logout  from './components/sessions/Logout'
import Signup  from './components/Sessions/Signup'
import MyRecipes  from './components/Containers/MyRecipes'
import RecipeForm  from './components/Containers/RecipeForm'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import MainContainer from './components/Containers/MainContainer';
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends React.Component {
  
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render () {

    const { loggedIn } = this.props
    return (
      <div className="App">
        <MainContainer />
        { loggedIn ? <NavBar location={this.props.location}/> : <Home /> }
          <Switch>
            <Route exact path="/signup" render={({ history }) => <Signup history={ history }/>} />
            <Route exact path="/login" component={Login} />
            <Route exact path ="/myrecipes" component={MyRecipes}/>
            <Route exact path ="/recipes/new" component={RecipeForm}/>
            {/* <Route exact path ="/recipes/:id" component={RecipeShow}/> */}

          </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { getCurrentUser })(App));