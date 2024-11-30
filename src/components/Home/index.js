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
  const [drinksData, setDrinksData] = useState()
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)

  const getData = async drinkName => {
    setApiStatus(apiConstants.inProgress)
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        if (data) {
          setDrinksData(data.drinks)
          setApiStatus(apiConstants.success)
        }

        console.log(data.drinks)
        console.log(response)
      } else {
        setDrinksData(apiConstants.failure)
        console.log(response)
      }
    } catch (e) {
      console.log(e)
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
          <li>{eachIngr}</li>
        ))}
      </ul>
      <h1 className="list-card-heading">Category</h1>
      <p className="list-card-paragraph">{category}</p>
      <h1 className="list-card-heading">Glass</h1>
      <p className="list-card-paragraph">{glass}</p>
    </div>
  )

  const successView = () => {
    console.log(drinksData)
    if (drinksData !== null) {
      return (
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
    }
    return (
      <div className="no-data-container">
        <h1 className="no-data-heading">No data found</h1>
      </div>
    )
  }

  const apiView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return successView()
      case apiConstants.failure:
        return null
      case apiConstants.inProgress:
        return null
      default:
        return null
    }
  }

  const onClickSearch = () => {
    getData(searchInput)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className="main-container">
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          onChange={onChangeSearchInput}
          placeholder="Enter a key to search"
          className="search-input"
        />
        <button type="button" onClick={onClickSearch} className="search-button">
          Search
        </button>
      </div>

      {apiView()}
    </div>
  )
}

export default Home
