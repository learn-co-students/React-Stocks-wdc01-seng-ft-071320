import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const url = "http://localhost:3000/stocks"

class MainContainer extends Component {

  state={
    stocks: [],
    portfolioStocks: [],
    sort: "All",
    filter: "All"
  }

  componentDidMount() {
    fetch(url)
    .then(res => res.json())
    .then(stocks => this.setState({ stocks: stocks }))
  }

  stockToPortfolio = (id) => {
    if( !this.state.portfolioStocks.includes(id) ) {
        this.setState({
          portfolioStocks: [...this.state.portfolioStocks, id]
        })
    }
  }

  stockToRemove = (id) => {
      this.setState({
        portfolioStocks: this.state.portfolioStocks.filter( stockId => stockId !== id )
      })
  }

  sortStatus = (status) => {
    this.setState({
      sort: status 
    })
  }

  filterStatus = (status) => {
    this.setState({
      filter: status 
    })
  }

  displaySortedStocks = () => {
    let displayStocks = [...this.state.stocks]
    
    if(this.state.filter !== "All") {
      displayStocks = displayStocks.filter(stock => stock.type === this.state.filter)
    }

    switch(this.state.sort) {
      case "Alphabetically":
        return displayStocks.sort((a, b) => a.name > b.name ? 1 : -1)
      case "Price":
        return displayStocks.sort((a, b) => a.price > b.price ? 1 : -1)
      default:
        return displayStocks
    }

    // if( this.state.sort === "Price") {
    //   return displayStocks.sort((a, b) => a.price > b.price ? 1: -1)
    // } 
    //   else if ( this.state.sort === "Alphabetically") {
    //   displayStocks.sort((a, b) => a.name > b.name ?  1: -1)
    // } 
    //   return this.state.stock 
  }

  // filterStock = (e) => {
  //   let filteredStocks = [...this.state.stocks]
  //     return filteredStocks.filter( stock => stock.type === e )
  // }


  render() {

    const myStocks = this.state.stocks.filter( 
        stock => this.state.portfolioStocks.includes(stock.id))
    
    let displayTheStocks = this.displaySortedStocks()

    return (
      <div>
        <SearchBar
          sortState={ this.state.sort }
          filterState={ this.state.filter }
          sortStatus={ this.sortStatus }
          filterStatus={ this.filterStatus }
          />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                displayTheStocks={ displayTheStocks } 
                stockToPortfolio={ this.stockToPortfolio}
                />

            </div>
            <div className="col-4">

              <PortfolioContainer 
                myStocks={ myStocks } 
                stockToRemove={ this.stockToRemove} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
