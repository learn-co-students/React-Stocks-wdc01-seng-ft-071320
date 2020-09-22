import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const baseUrl = 'http://localhost:3000/stocks'
class MainContainer extends Component {

 state= {
     stocks: [],
     portfolioStocks: [],
     type: "All",
     sort: "All"
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
  // let newStock = this.state.stocks.find(stock => stock.id === stockId)
  if(!this.state.portfolioStocks.includes(stockId)){
  this.setState({
    portfolioStocks:  [...this.state.portfolioStocks, stockId]
  })
}
 }

 removeStock =(stockId) => {
   let remainStocks = this.state.portfolioStocks.filter(stock => stock !== stockId)
  // this.setState({
  //   portfolioStocks: remainStocks
  // })
  // console.log(remainStocks)
  this.setState({
    portfolioStocks: remainStocks
  })
 }

 changeSort = (value) => {
  // debugger
  this.setState({
    sort: value
  })
 }

 
 filterStocks= (value) => {
// console.log(value.target)

this.setState({
  type: value
})
 }

 stocksDisplay = () => {
   let filteredStocks =  [ ...this.state.stocks ]
   if (this.state.type !== "All") {
     filteredStocks  = filteredStocks.filter(stock => stock.type === this.state.type)
   }
   if (this.state.sort !== "All") {
     if(this.state.sort === "Alphabetically") return filteredStocks.sort((a,b) => a.name > b.name ? 1: -1) // if a is bigger than b move it up in the array thats what the 1 means the -1 is to move it down in the array
     if(this.state.sort === "Price") return filteredStocks.sort((a,b) => a.price > b.price ? 1: -1)
     
   }
     return filteredStocks
   

  }
  render() {
    let myStocks = this.state.stocks.filter(stock => this.state.portfolioStocks.includes(stock.id))
    let displayStocks = this.stocksDisplay()
    // debugger
    return (
      <div>
        <SearchBar filterStocks={this.filterStocks} changeSort={this.changeSort} sortState={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} addStock={this.addStock}/>

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
