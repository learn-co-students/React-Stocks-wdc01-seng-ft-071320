import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    filteredStocks: [],
    filter: ''
  }

componentDidMount(){
  fetch('http://localhost:3000/stocks')
  .then(res => res.json())
  .then(stocksArray => {
    let mystock = {}
    let stocks = stocksArray.map(stock => mystock = {...stock, purchased: false})
    this.setState({
      stocks: stocks,
      filteredStocks: stocks
    })
  })
}

handlePurchase = (clickedStock) => {
  let updateStocks = this.state.stocks.map(stock => {
    if (stock === clickedStock){
      clickedStock.purchased = !clickedStock.purchased
    }
    return stock
  })
  this.setState({
    stocks: updateStocks,
    filteredStocks: updateStocks
  })
}

onChange = (value) => {
  switch(value){
    case 'Alphabetically':
      this.setState({
        filteredStocks: this.state.filteredStocks.sort((a, b) => a.name.localeCompare(b.name)),
        filter: 'Alphabetically'
      })
      break
    case 'Price':
      this.setState({
        filteredStocks: this.state.filteredStocks.sort((a, b) => a.price - b.price),
        filter: 'Price'
      })
      break
  }
}

onFilter = (value) => {
  switch (value) {
    case 'All':
      this.setState({
        filteredStocks: this.state.stocks
      })
    break
    case 'Tech':
      this.setState({
        filteredStocks: this.state.stocks.filter(stock => stock.type === 'Tech') 
      })
    break
    case 'Sportswear':
    this.setState({
      filteredStocks: this.state.stocks.filter(stock => stock.type === 'Sportswear') 
    })
    break
    case 'Finance':
      this.setState({
        filteredStocks: this.state.stocks.filter(stock => stock.type === 'Finance') 
      })
    break
  }
}



  render() {
    return (
      <div>
        <SearchBar onChange={this.onChange} onFilter={this.onFilter} filter={this.state.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks.filter(stock => stock.purchased === false)} handlePurchase={this.handlePurchase}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.filteredStocks.filter(stock => stock.purchased === true)} handlePurchase={this.handlePurchase}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
