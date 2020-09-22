import React, { Component } from 'react';
import Stock from '../components/Stock'

const PortfolioContainer = (props) => {

  // console.log(props)
    return (
      <div>
        <h2>My Portfolio</h2>
          {
           props.stocks.map(stock => <Stock key={stock.id} stock={stock} handleStock={props.removeStock}/>)
          }
      </div>
    );
  }



export default PortfolioContainer;
