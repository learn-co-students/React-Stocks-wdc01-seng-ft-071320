import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state ={
    stocks: [],
    displayStocks: [],
    portfolioStocks: [],
    sort: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocksArray => this.setState({stocks: stocksArray, displayStocks: stocksArray}))
  }

  handleAddStock = (stockData) => {
    let updatedStocks = []
    if (!this.state.portfolioStocks.includes(stockData)){
      updatedStocks = [...this.state.portfolioStocks, stockData]
    } else {
      updatedStocks = this.state.portfolioStocks
    }

    this.setState({portfolioStocks: updatedStocks})
  }

  handleDeleteStock = (value) => {
    let updatedStocks = this.state.portfolioStocks.filter(stock => stock!==value)
    this.setState({portfolioStocks: updatedStocks})
  }

  sortBy = (value) => {
    let sortedStocks = []
    if(value === "Alphabetically"){
      sortedStocks = this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)
    } else if(value === "Price"){
      sortedStocks = this.state.displayStocks.sort((a,b) => a.price - b.price)
    } 
    this.setState({displayStocks: sortedStocks, sort: value })
  }

  filterBy = (value) => {
    let filteredStocks = []
    if(value!=="All"){
      filteredStocks = this.state.stocks.filter(stock => stock.type === value)
    } else {
      filteredStocks = this.state.stocks
    }
    this.setState({
      displayStocks: filteredStocks
    })
  }


  render() {
    return (
      <div>
        <SearchBar sortBy={this.sortBy} sort={this.state.sort} filterBy={this.filterBy}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} add={this.handleAddStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} delete={this.handleDeleteStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
