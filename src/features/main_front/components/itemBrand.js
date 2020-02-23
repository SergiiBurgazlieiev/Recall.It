import React from 'react';

export default function ItemBrand(props){
		if(props.product.Images.length > 0){
			return [
				<img key="1" src={props.product.Images[0].URL} alt="n/a" className="imgWindow"/>,
				<p key="2">{props.product.Title}</p>,
				<p key="3">{props.product.RecallDate}</p>,
				<p key="4">Hazard {props.product.Hazards[0].Name}</p>,
				<p key="5">Description {props.product.Description}</p>
			]
		}else{
			return [
				<img key="6" src="https://dapp.dblog.org/img/default.jpg" alt="n/a" className="imgWindow"/>,
				<p key="7">{props.product.Title}</p>,
				<p key="8">{props.product.RecallDate}</p>,
				<p key="9">Hazard {props.product.Hazards[0].Name}</p>,
				<p key="10">Description {props.product.Description}</p>
			]
		}
}