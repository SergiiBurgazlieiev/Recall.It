import React, {Component} from 'react';
import icon from '../extension_icon.png'

class Logo extends Component{
	constructor(props){
		super(props);
		console.log(this.props)
		this.state = {
	
		}
		this.getResults = this.getResults.bind(this)
	}

	getResults(){
		this.props.showResults();
	}

	render(){
		return(
			<div>
				<div className="logo">
					<img src={icon} alt="icon" onClick={this.getResults}/>
				</div>
			</div>
		)
	}
}

export default Logo