import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
let url = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  constructor(){
    super()
    this.state = {
      stocks: [],
      portfolioStocks: [],
      filterType: 'All',
      sortType: 'All'

    }
  }

  componentDidMount(){
    fetch(url)
    .then(res => res.json())
    .then(stocksArray => this.setState({stocks : stocksArray }))
  }
  
  
  addStock = (id) =>{
    let newStock = this.state.stocks.find(stock => stock.id === id)
    if(!this.state.portfolioStocks.includes(newStock)){
      this.setState({
        portfolioStocks: [...this.state.portfolioStocks, newStock]
      })
    }
  }

  removeStock = (id) => {
    // console.log(id)
    let deleteStock = this.state.portfolioStocks.find(stock => stock.id == id)
    let newArray = [...this.state.portfolioStocks.filter(stock => stock !== deleteStock)]
    //console.log(deleteStock)
    //console.log(newArray)
    this.setState({
      portfolioStocks: newArray
    })
  }

  changeFilter = (value) =>{
    this.setState({
      type: value
    })
  }

  changeSort = (value) =>{
    this.setState({
      sortType: value
    })
  }
  
  displayStock = () =>{
    let filteredStocks = [...this.state.stocks]
    if(this.state.type !== 'All'){
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.type)
    }

    if(this.state.sortType !== 'All'){
      if(this.state.sortType == "Alphabetically")return filteredStocks.sort((a,b) => a.name > b.name? 1 : -1)
      if(this.state.sortType == 'Price')return filteredStocks.sort((a,b) => a.price > b.price? 1 : -1)

    }

    return filteredStocks
  }
  
  
  
  
  render() {
    let displayStocks = this.displayStock()
    return (
      <div>
        <SearchBar changeFilter={this.changeFilter} changeSort={this.changeSort} sortType={this.state.sortType}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} addStock={this.addStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
