import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Nav from './components/Nav'
import PokemonDetail from './components/PokemonDetail'
import PokemonCreate from './components/PokemonCreate'



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path= '/home' component= {Nav}/>
      <Route path='/home' component={Home}/>
      <Route path= '/pokemon' component= {Nav}/>
      <Route path='/pokemon/detail' component={PokemonDetail}/>
      <Route path='/pokemon/create' component={PokemonCreate}/>
    </div>
  );
}

export default App;
