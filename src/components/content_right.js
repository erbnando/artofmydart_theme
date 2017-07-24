import React, {Component} from 'react';

class ContentRight extends Component {
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
			<div className="content-right">
				<div dangerouslySetInnerHTML={{__html: this.props.content}} />
			</div>
		);
	}
}

module.exports = ContentRight;
