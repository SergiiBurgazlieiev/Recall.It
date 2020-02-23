import React, {Component} from 'react'
import ItemBrand from './itemBrand'

export default class ProductBrand extends Component{
	render(){
		let items = this.props.prodByBrand;
		return(
			<div>
				{
					items.map((product, index)=>{
						return <ItemBrand key={index} product={product}/>
					})
				}
			</div>
		)
	}
}

