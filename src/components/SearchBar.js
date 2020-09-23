import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input  type="radio" value="All" 
                checked={ props.sort === "All" } 
                onChange={ (e) => props.sortStatus(e.target.value) }
                />
                All
      </label>
      <label>
        <input  type="radio" value="Alphabetically" 
                checked={ props.sort === "Alphabetically" } 
                onChange={ (e) => props.sortStatus(e.target.value) }
                />
                Alphabetically
      </label>
      <label>
        <input  type="radio" value="Price" 
                checked={ props.sort === "Price" } 
                onChange={ (e) => props.sortStatus(e.target.value) }
                />
                Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={ (e) => props.filterStatus(e.target.value) }>
        <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
