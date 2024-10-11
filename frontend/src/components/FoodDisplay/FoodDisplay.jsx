import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter food items based on category and search query
  const filteredFoodList = food_list.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-input'
      />
      <div className='food-display-list'>
        {filteredFoodList.map(item => (
          <FoodItem
            key={item._id}
            image={item.image}
            name={item.name}
            desc={item.description}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
