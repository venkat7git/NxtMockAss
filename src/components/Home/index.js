import {useState, useEffect} from 'react'
import DrinkCard from '../drinkCards'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [drinksData, setDrinksData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [isValid, setValidation] = useState(false)

  const getData = async drinkName => {
    setApiStatus(apiConstants.inProgress)

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.drinks)

    if (data.drinks === null) {
      setApiStatus(apiConstants.failure)
    } else if (data.drinks === 'no data found' || data.drinks.length === 0) {
      setApiStatus(apiConstants.failure)
    } else {
      setApiStatus(apiConstants.success)
      setDrinksData(data.drinks)
    }
  }

  useEffect(() => {
    getData('margarita')
  }, [])

  const onDrinkPopup = (id, Instructions, ingrediants, category, glass) => (
    <div className="popup-container">
      <h1 className="list-card-heading">Instructions</h1>
      <p className="list-card-paragraph">{Instructions}</p>
      <h1 className="list-card-heading">Ingrediants</h1>
      <ul>
        {ingrediants.map(eachIngr => (
          <li key={eachIngr}>{eachIngr}</li>
        ))}
      </ul>
      <h1 className="list-card-heading">Category</h1>
      <p className="list-card-paragraph">{category}</p>
      <h1 className="list-card-heading">Glass</h1>
      <p className="list-card-paragraph">{glass}</p>
    </div>
  )

  const successView = () => (
    <ul className="drinks-container">
      {drinksData.map(eachDrink => (
        <DrinkCard
          onDrinkDetails={onDrinkPopup}
          key={eachDrink.idDrink}
          drinkCardDetails={eachDrink}
        />
      ))}
    </ul>
  )

  const NoDataView = () => (
    <div className="no-data-container">
      <h1 className="no-data-heading">No data found</h1>
    </div>
  )

  const apiView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return successView()
      case apiConstants.failure:
        return NoDataView()
      case apiConstants.inProgress:
        return null
      default:
        return null
    }
  }

  const onClickSearch = () => {
    if (searchInput === '') {
      setValidation(true)
    } else {
      getData(searchInput)
    }
  }

  const onChangeSearchInput = event => {
    if (event.target.value.length === 1) {
      setValidation(false)
    }
    setSearchInput(event.target.value)
  }

  return (
    <div className="main-container">
      <div className="search-container">
        <div>
          <input
            type="search"
            value={searchInput}
            onChange={onChangeSearchInput}
            placeholder="Enter a key to search"
            className="search-input"
            required
          />

          <button
            type="button"
            onClick={onClickSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
        {isValid && (
          <p className="search-validation">search input should not be empty</p>
        )}
      </div>

      {apiView()}
    </div>
  )
}

export default Home
