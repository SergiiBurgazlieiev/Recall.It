import React from 'react';

export default function ItemName(props){
		if(props.product.Images.length == 0 || props.product.Hazards[0].Name == 0){
			return [
				<img key="5" src="https://dapp.dblog.org/img/default.jpg" alt="n/a" className="imgWindow"/>,
				<p key="6">{props.product.Title}</p>,
				<p key="7">{props.product.RecallDate}</p>,
				<p key="8">hazard Not available</p>,
				<p key="9">description {props.product.Description}</p>
			]
		}else{
			return [
				<img key="10" src={props.product.Images[0].URL} alt="n/a" className="imgWindow"/>,
				<p key="11">{props.product.RecallDate}</p>,
				<p key="12">{props.product.Title}</p>,
				<p key="13">hazard:{props.product.Hazards[0].Name}</p>,
				<p key="14">description {props.product.Description}</p>
			]
		}
}
