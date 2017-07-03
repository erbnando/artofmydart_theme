import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage} from '../actions/index';

class Page extends Component {
    componentWillMount() {
        //console.log('\nmenu willmount:');
        //console.log(this.props);
        this.props.fetchPage('about');
    }

	componentDidMount() {
		//console.log('B did mount');
	}

	componentDidUpdate() {
		//console.log('B did update');
	}

	componentWillReceiveProps() {
		//console.log('B will receive props');
	}

	render() {
		if(this.props.page.page !== undefined){
			//console.log(this.props.page.page.content.rendered);
			return (
				<div className="content page" id="content">
					<div>
						<div dangerouslySetInnerHTML={{__html: this.props.page.page.content.rendered}} />
						<a className="page-contact" href="http://google.com">Contact</a>
					</div>
				</div>
			);
		} else {
			return <span />
		}
	}
}

function mapStateToProps({page}) {
	return {page};
}

export default connect(mapStateToProps, {fetchPage})(Page)
