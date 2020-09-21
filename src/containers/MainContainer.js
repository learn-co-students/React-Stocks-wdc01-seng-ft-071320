import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    sort: "All",
    filter: "All"
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({
      stocks: stocks
    }))
  }

  handleBuy = (id) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, id]
    })
  }

  handleSell = (id) => {
    let updatedStocks = this.state.portfolioStocks.filter(stockId => stockId !== id)
    this.setState({
      portfolioStocks: updatedStocks
    })
  }

  handleSort = (value) => {
    this.setState({
      sort: value
    })
  }

  handleFilter = (value) => {
    this.setState({
      filter: value
    })
  }

  displayStocks = () => {
    let filteredStocks = [...this.state.stocks]
    if (this.state.sort !== "All"){

      if (this.state.sort === "Alphabetically"){
      filteredStocks = filteredStocks.sort((a, b) => a.ticker.localeCompare(b.ticker))
      }

      if (this.state.sort === "Price" ){
        filteredStocks = filteredStocks.sort((a, b) => a.price - b.price)
      }

    }

    if (this.state.filter !== "All"){
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
     }
     
    return filteredStocks
  }

  render() {
    let stockDisplay = this.displayStocks()

    // Filter out the stocks whose id is included in portfolio stocks
    let myStocks = this.state.stocks.filter(stock => this.state.portfolioStocks.includes(stock.id) )

    return (
      <div>
        <SearchBar 
        handleSort={this.handleSort} 
        handleFilter={this.handleFilter}
        sortValue={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer 
              handleBuy={this.handleBuy} 
              stocks={stockDisplay}/>

            </div>
            <div className="col-4">

              <PortfolioContainer 
              myStocks={myStocks}
              handleSell = {this.handleSell}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
