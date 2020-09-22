import React from 'react'

const Stock = (props) => (
  <div>

    <div onClick={()=> props.handleStocks(props.stockProp)} className="card">
      <div className="card-body">
        <h5 className="card-title">{
            props.stockProp.name
          }</h5>
        <p className="card-text">{
            props.stockProp.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
