import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.displayTheStocks.map(stock => 
            <Stock  stock={ stock } 
                    key={ stock.id }
                    clickedStock={ this.props.stockToPortfolio }
                    />)
        }
      </div>
    );
  }

}

export default StockContainer;
