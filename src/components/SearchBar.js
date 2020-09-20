import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.filter === 'Alphabetically'} onChange={(e) => props.onChange(e.target.value)}/>
        Alphabetically
      </label> 
      <label>
        <input type="radio" value="Price" checked={props.filter === 'Price'} onChange={(e) => props.onChange(e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => props.onFilter(e.target.value)}>
          <option value="disabled" disabled selected>Select Filter</option>
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
