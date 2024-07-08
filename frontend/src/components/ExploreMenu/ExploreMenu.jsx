import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCatagory}) => {
  return (
    <div className='explore-menu' id='explored-menu'>
      <h1>Explore our menu</h1>
      <p className='explored-menu-text'>Choose from a diverse menu featuring a delectable of dishes. Our mission is to satisfy yout cravings and delevate your dining experience, one delicious meal at a time.</p>
      <div className="explored-menu-list">
        {menu_list.map( (item, index) => {
            return (
                <div onClick={() => setCatagory(prev=>prev === item.menu_name? "All" : item.menu_name)} key={index} className='explored-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;



//onClick={() => setCatagory(prev=>prev === item.menu_name? "All" : item.menu_name)} 
//this meant if i click on slad or any items than it will store salad in our state
// and uasing this state we add one dynamic class in image