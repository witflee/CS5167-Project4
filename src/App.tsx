//import { useState } from 'react'
import InfoCard from './components/infocard';
import AqiCard from './components/AqiCard';
import AqiMap from './components/AqiMap';
import { AqiProvider } from './components/AqiContext';
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <AqiProvider location="here">
      <div className="app-container">
        <div className='info-column'>
          <div className='aqi'>
            <AqiCard title='Current Air Quality Index' />
          </div>
          <div className='alerts'>
            <InfoCard title='Air Quality Alerts' content='No alerts for your area.' />
          </div>
        </div>
        <div className='map-column'>
          <div className='map'>
            <AqiMap />
          </div>
          <div className='table'>
            {/* AQI table will go here */}
          </div>
        </div>
      </div>
    </AqiProvider>
  )
}

export default App
