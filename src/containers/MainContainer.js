import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const baseUrl = 'http://localhost:3000/stocks'
class MainContainer extends Component {

 state= {
     stocks: [],
     portfolioStocks: []
 }

 componentDidMount() {
   fetch(baseUrl)
   .then( res => res.json() )
   .then( stocksObj => this.setState({
    stocks: stocksObj
   })
    )
 }

 addStock = (stockId) => {
  let newStock = this.state.stocks.find(stock => stock.id === stockId)
  this.setState({
    portfolioStocks:  [...this.state.portfolioStocks, newStock]
  })
 }


  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
