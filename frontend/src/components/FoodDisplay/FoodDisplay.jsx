import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../fooditem/FoodItem'

const FoodDisplay = ({category}) => {

    //get foodlist array using context api
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          {console.log(category, item.category);}
          if(category === 'All' || category === item.category){
            return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            );
          }
          else{
            return null;
          } 
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;