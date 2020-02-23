import React, { Component } from 'react';

class Result extends Component{
	constructor(props){
		super(props);
		this.state = {
			retrievedData:false
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = (e)=> {
		this.props.resultsOff(e.target.dataset.value);
	}



	render(){
		console.log(this.state)
		return(
			<div>
				<div className="resultWindow">
					<div>
						<h3>Recall.it</h3>
					</div>
						 <p data-value="Name" onClick={((e)=> this.handleClick(e))}>Found {this.props.productsByNameNumber} items by product name</p>
						 <p data-value="Type" onClick={((e)=> this.handleClick(e))}>Found {this.props.productsByTypeNumber} items by type</p>
						 <p data-value="Brand" onClick={((e)=> this.handleClick(e))}>Found {this.props.productsByManufacturerNumber} items by manufacturer</p>
				</div>
			</div>
		)
	}
}

export default Result