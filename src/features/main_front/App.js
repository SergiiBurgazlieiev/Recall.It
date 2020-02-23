import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo';
import Products from './components/products';
import Result from './components/result'

class App extends Component{
	constructor(){
		super();
		this.state = {
			displayProductsResult:false,
			displayListOfProducts:false
		}
		this.showResults = this.showResults.bind(this);
		this.resultsOff = this.resultsOff.bind(this)
	}

	componentDidMount(){
		this.retrieveProductData()
	}

	retrieveProductData = async() => {
		try{
			let response = await fetch("https://www.saferproducts.gov/RestWebServices/Recall?ProductName=Baby&format=json", {
				method:'GET'
			})

			let parsedResponse = await response.json();
			this.setState({
				productsByName:parsedResponse
			});
			response = await fetch("https://www.saferproducts.gov/RestWebServices/Recall?ProductType=Kitchen&format=json", {
				method:"GET"
			})
			parsedResponse = await response.json();
			this.setState({
				productsByType:parsedResponse
			})
			response = await fetch("https://www.saferproducts.gov/RestWebServices/Recall?Manufacturer=Walmart&format=json", {
				method:"GET"
			})
			parsedResponse = await response.json();
			this.setState({
				productsByManufacturer:parsedResponse
			})
	
		}catch(err){
		}

	}

	showResults = async() => {
		this.setState({
			displayProductsResult:!this.state.displayProductsResult,
			displayListOfProducts:false
		})
	}

	resultsOff(val){
		this.setState({
			prdValue:val,
			displayProductsResult:!this.state.displayProductsResult,
			displayListOfProducts:!this.state.displayListOfProducts
		})
	}

  render(){
  	console.log(this.state);
    return (
      <div className="App">
      	{this.state.displayProductsResult ? 
      		<Result productsByNameNumber={this.state.productsByName.length} 
      				productsByTypeNumber={this.state.productsByType.length} 
      				productsByManufacturerNumber={this.state.productsByManufacturer.length}
      				resultsOff={this.resultsOff}/> 
      	: null}
      	{this.state.displayListOfProducts? <Products prdValue={this.state.prdValue} productsData={[this.state.productsByName, this.state.productsByType, this.state.productsByManufacturer]}/> : null}
        <Logo showResults={this.showResults}/>
      </div>
    );
  }
}

export default App;
