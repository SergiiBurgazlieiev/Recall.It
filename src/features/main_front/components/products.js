import React, {Component} from 'react';
import ProductName from './productName';
import ProductType from './productType';
import ProductBrand from './productBrand';

class Products extends Component {
	constructor(props){
		super(props);
		this.state = {
			prodByName:props.productsData[0],
			prodByType:props.productsData[1],
			prodByManufacturer:props.productsData[2],
			showProdName:false,
			showProdType:false,
			showProdBrand:false,
			prdValue:props.prdValue
		}
	} 

	componentDidMount(){
		this.displayProducts()
	}

	displayProducts(){
		switch(this.state.prdValue){
			case "Name":
			this.setState({
				showProdName:!this.state.showProdName
			});
			break;
			case "Type":
			this.setState({
				showProdType:!this.state.showProdType
			})
			break;
			case "Brand":
			this.setState({
				showProdBrand:!this.state.showProdBrand
			});
			default:
			console.log(null)
		}
	}

	handleClick = (e)=>{
		let trgt = e.currentTarget.textContent;
		switch(trgt){
			case "Name":
			this.setState({
				showProdName:true,
				showProdType:false,
				showProdBrand:false
			});
			break;
			case "Type":
			this.setState({
				showProdType:true,
				showProdName:false,
				showProdBrand:false
			});
			break;
			case "Brand":
			this.setState({
				showProdBrand:true,
				showProdName:false,
				showProdType:false
			});
			break;
			default:
			console.log("null")
		}
	}


	render(){
		return(
			<div className="listOfProducts">
				<div className="listContainer">
			 	 	<ul className="listOfProductBtn">
				 		<li key="1" onClick={((e)=>this.handleClick(e))}>Name</li>
						<li key="2" onClick={((e)=>this.handleClick(e))}>Type</li>
						<li key="3" onClick={((e)=>this.handleClick(e))}>Brand</li>
				 	</ul>
				</div>
					<div className="productContainer">
						{this.state.showProdName ? <ProductName prodByName={this.state.prodByName}/> :null}
				 		{this.state.showProdType ? <ProductType prodByType={this.state.prodByType}/> :null}
				 		{this.state.showProdBrand ? <ProductBrand prodByBrand={this.state.prodByManufacturer}/> :null}
				 	</div>
			</div>
		)
	}
}

export default Products