import React, { Component } from 'react';
import Stock from '../components/Stock'

const StockContainer = (props) => {

 console.log(props.stocks)
    return (
      <div>
        <h2>Stocks</h2>
        {
         props.stocks.map(stock => <Stock  key={stock.id} stock={stock} 
          addStock={props.addStock}/>) //sending the stock as a prop
        }
      </div>
    );
  

}

export default StockContainer;
