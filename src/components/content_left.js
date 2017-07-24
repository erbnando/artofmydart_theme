import React, {Component} from 'react';

class ContentLeft extends Component {
    componentWillMount() {
    }

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	componentWillReceiveProps() {
	}

	render() {
		//console.log(this.props);
		return (
			<div className="content-left">
				<div dangerouslySetInnerHTML={{__html: this.props.content}} />
			</div>
		);
	}
}

module.exports = ContentLeft;
