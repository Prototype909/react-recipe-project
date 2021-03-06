import React from 'react';
import './App.scss'
import './App.css'
import NavBar  from './components/NavBar'
import Home  from './components/Containers/Home'
import RecipeCard  from './components/RecipeCard'
import Login  from './components/Sessions/Login'
import NoMatch  from './components/NoMatch'
import Signup  from './components/Sessions/Signup'
import MyRecipes  from './components/Containers/MyRecipes'
import RecipeForm  from './components/RecipeForm'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import MainContainer from './components/Containers/MainContainer';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { getAllRecipes, updateRecipe, createRecipe } from './actions/myRecipes';

class App extends React.Component {
  
  componentDidMount() {
    this.props.getCurrentUser()
    this.props.getAllRecipes()
  }

  render () {

    const { allRecipes, updateRecipe, createRecipe } = this.props
    return (
      <div className="App">
        <NavBar location={this.props.location} history={this.props.history}/>
        <MainContainer />    
          <Switch>
            <Route exact path="/signup" render={({ history }) => <Signup history={ history }/>} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/no-match" component={NoMatch} />
            <Route exact path ="/myrecipes" component={MyRecipes}/>
            <Route exact path ="/recipes/new" render={props => <RecipeForm onSubmit={createRecipe} {...props} buttonText={"Create A Recipe"}/>}/>
            <Route exact path ="/recipes/:id" render={props => {
                const recipe = allRecipes.find(recipe => recipe.id === props.match.params.id)
                return <RecipeCard recipe={recipe} {...props}/>
              }
            }/>
            <Route exact path ="/recipes/:id/edit" render={props => {
                const recipe = allRecipes.find(recipe => recipe.id === props.match.params.id)
                return <RecipeForm onSubmit={updateRecipe} recipe={recipe} {...props} buttonText={"Update Recipe"}/>
              }
            }/>
            <Route exact path="/" component={Home} />
            <Redirect to="/no-match" />

          </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.currentUser,
    // recipes: state.myRecipes,
    allRecipes: state.myRecipes.allRecipes
  }
}

export default withRouter(connect(mapStateToProps, { getCurrentUser, getAllRecipes, updateRecipe, createRecipe })(App));