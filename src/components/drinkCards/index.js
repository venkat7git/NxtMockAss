import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const DrinkCard = props => {
  const {drinkCardDetails, onDrinkDetails} = props
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strTags,
    strInstructions,
    strGlass,
    strCategory,
  } = drinkCardDetails
  const {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  } = drinkCardDetails
  const inGrediantList = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  ]
  const filterIngrediantsList = inGrediantList.filter(
    eachIngrediant => eachIngrediant !== null,
  )
  const onTriggerDetails = () =>
    onDrinkDetails(
      idDrink,
      strInstructions,
      filterIngrediantsList,
      strCategory,
      strGlass,
    )
  return (
    <li className="list-itme">
      <Popup
        trigger={
          <div className="link-item">
            <img src={strDrinkThumb} alt="drink" className="drink-image" />
            <h1 className="drink-name">{strDrink}</h1>
            <p className="description">{strTags}</p>
          </div>
        }
        position="center"
      >
        {onTriggerDetails()}
      </Popup>
    </li>
  )
}

export default DrinkCard
