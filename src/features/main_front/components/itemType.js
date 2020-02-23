import React from 'react';

export default function ItemType(props){
		if(props.product.Images.length > 0){
			return [
				<div key="20">
					<img key="12" src={props.product.Images[0].URL} alt="n/a" className="imgWindow"/>
					<p key="13">{props.product.RecallDate}</p>
					<p key="14">{props.product.Title}</p>
					<p key="15">Hazard {props.product.Hazards[0].Name}</p>
					<p key="16">Description {props.product.Description}</p>
				</div>
			]
		}else{
			return [
				<div key={props.index}>
					<img key="17" src="https://dapp.dblog.org/img/default.jpg" alt="n/a" className="imgWindow"/>
					<p key="18">{props.product.RecallDate}</p>
					<p key="19">{props.product.Title}</p>
					<p key="20">Hazard {props.product.Hazards[0].Name}</p>
					<p key="21">Description {props.product.Description}</p>
				</div>
			]
		}
}