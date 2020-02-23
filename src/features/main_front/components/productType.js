import React, {Component} from 'react';
import ItemType from './itemType';

export default class ProductType extends Component{
	render(){
		let items = this.props.prodByType;
		return(
			<div>
				{
					items.map((product, index) => {
						return <ItemType key={index} product={product}/>
					})
				}
			</div>
		)
	}
}

