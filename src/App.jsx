import "./App.css"
import CountriesCard from "./compoenets/CountriesCard"
import CountriesDetail from "./compoenets/CountriesDetail"
import Header from './compoenets/Header'
import { Routes , Route } from "react-router-dom"

const App = () => {
  return (
    <div>

        <Routes>
          <Route path="/" element={
            <>
                 <Header/>
            <CountriesCard/>
            </>
          }/>

          <Route path="/country/:countryName" element={
            <CountriesDetail/>
          } />
        </Routes>

    </div>
  )
}

export default App
