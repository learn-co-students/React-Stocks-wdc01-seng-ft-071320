import React from 'react'

const Stock = (props) => {
 //let {name, ticker, price} = props.stock
  console.log(props)
  return(
  <div>

    <div className="card" onClick={() => props.addStock(props.stock.id)}>
      <div className="card-body">
        <h5 className="card-title">{
          props.stock.name
          }</h5>
        <p className="card-text">
           
            {props.stock.ticker} : {props.stock.price}
          </p>
      </div>
    </div>


  </div>
  )
        };

export default Stock
