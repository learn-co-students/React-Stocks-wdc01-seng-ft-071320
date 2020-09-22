import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks : [],
    myPortfolio: [],
    type: "All",
    sort: "All"
  }

componentDidMount(){
fetch('http://localhost:3000/stocks')
.then(resp => resp.json())
.then(stocks => this.setState({
  stocks: stocks
}))
}

addStocks =(stock) =>{
  // let newStock = this.state.stocks.find(stockObj => stockObj.id == stock.id)
  if (!this.state.myPortfolio.includes(stock.id)){
    this.setState({
      myPortfolio:[...this.state.myPortfolio, stock.id]
    })

  }
}

removeStock = (stock) => {
// let byeStock = this.state.myPortfolio.find(stockObj => stockObj.id == stock.id)
// let newPortfolio = [...this.state.myPortfolio.filter(stock => stock !== byeStock)]
// this.setState({
//   myPortfolio: newPortfolio 
// })
this.setState({
  myPortfolio: this.state.myPortfolio.filter(stockId => stockId !== stock.id)
})

}

changeFilter =(value)=> {
  this.setState({
    type: value
  })
}


stocksDisplay = () =>{
  let filteredStocks = [...this.state.stocks]
  if(this.state.type !== "All"){ 
    filteredStocks = filteredStocks.filter(stock => stock.type === this.state.type)
}
if (this.state.sort !== 'All'){
  if(this.state.sort === "Alphabetically")
    return filteredStocks.sort((a, b) => a.name > b.name ? 1: -1)

    if(this.state.sort === "Price")
    return filteredStocks.sort((a, b) => a.price > b.price ? 1: -1)
}

  return filteredStocks
}

changeSort = (value) =>{
  this.setState({
    sort: value
  })
}

  render() {
let myStocks = this.state.stocks.filter(stock => this.state.myPortfolio.includes(stock.id))
let displayStocks = this.stocksDisplay()
    return (
      <div>
        <SearchBar sortState={this.state.sort} changeFilter={this.changeFilter} changeSort={this.changeSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} addStocks={this.addStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={myStocks} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
