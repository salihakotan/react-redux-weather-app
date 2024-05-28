import './App.css';
import CitiesDropbox from './components/CitiesDropbox';
import WeatherCards from './components/WeatherCards';

function App() {
  return (
    <div className="App">
    <div id='container'>
      <WeatherCards/>
      </div>
      <CitiesDropbox/>
    </div>
  );
}

export default App;
