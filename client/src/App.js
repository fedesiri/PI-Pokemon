import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import PokemonCreate from './components/PokemonCreate'



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path= '/home' component= {Nav}/>
      <Route path='/home' component={Home}/>
      <Route path= '/pokemon' component= {Nav}/>
      <Route path='/pokemon/detail/:id' component={PokemonDetail}/>
      <Route path='/pokemon/create' component={PokemonCreate}/>
    </div>
  );
}

export default App;
