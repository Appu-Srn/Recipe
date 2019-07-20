import React, {Component, Fragment} from 'react';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';



class App extends Component {

state={
  recipes,
  url: "https://www.food2fork.com/api/search?key=95615f2557c19ccee1133cf9284cf431",
  base_url:"https://www.food2fork.com/api/search?key=95615f2557c19ccee1133cf9284cf431",
  details_id:35384,
  pageIndex: 1,
  search:"",
  query:'&q=',
  error:''

};

async getRecipes(){
try{

  const data = await fetch(this.state.url);
  const jsonData = await data.json();
  if(jsonData.recipes.length===0){
this.setState(()=>{
  return {error:"sorry but your searh did not return any result"}
})

  }
  else{
    this.setState(()=>{
      return {recipes:jsonData.recipes}
    })
  }
  this.setState({
    recipes:jsonData.recipes
  })

}
catch(error){
  console.log(error);
}
}

componentDidMount(){
  this.getRecipes()
}

displayPage = (index)=>{
  switch(index){
    default:
      case 1:
        return(<RecipeList recipes={this.state.recipes}
        handleDetails={this.handleDetails}
        value={this.state.search}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        error={this.state.error}
        />)
      case 0:
        return(<RecipeDetails id={this.state.details_id}
        handleIndex={this.handleIndex}/>)
  }
}

handleIndex = index => {
  console.log("excetureeed")
this.setState({
  pageIndex: index
})
}

handleDetails = (index,id) => {
  this.setState({
    pageIndex: index,
    details_id: id
  })
}
 
handleChange = (e) =>{

this.setState({
  search:e.target.value
})

}

handleSubmit = (e) =>{
  e.preventDefault();
  const {base_url, query, search}= this.state;
  this.setState(()=>{
    return {url: `${base_url}${query}${search}`, search:"", error:""}
  },()=>{

    this.getRecipes()
  })
}


  render() {

// console.log(this.state.recipes);

    return (
 <Fragment >
  {this.displayPage(this.state.pageIndex)}
    </Fragment>
    )
  }
}


export default App;
