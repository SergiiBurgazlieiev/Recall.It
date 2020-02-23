import React, {Component} from 'react'
import ItemName from './itemName'

export default class ProductName extends Component{
	render(){
		let items = this.props.prodByName;
		return(
			<div>
				{items.map((product, index) => {
					 return <ItemName key={index} product={product}/>
				})}
			</div>
		)
	}
}

