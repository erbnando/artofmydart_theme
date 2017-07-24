require('./sass/styles.scss');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header';
import Home from './containers/home';
import Index from './containers/index';
import NotFound from './containers/notfound';
import Page from './containers/page';
import Book from './containers/book';
import store from './store';
import MobileDetect from '../node_modules/mobile-detect';

class App extends Component {
	componentWillMount() {
		var md = new MobileDetect(window.navigator.userAgent);
		//console.log( md.mobile() );
	}

	render() {
		return (
			<div className="container">
				<Header />
				<Main />
			</div>

		);
	}
}

class Main extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/index/page/:pageNum" component={Index}/>
				<Route path="/index" component={Index}/>
				<Route path="/about" component={Page}/>
				<Route path="/books/:slug/:pageNum" component={Book} />
				<Route path="/books/:slug/" component={Book} />
				<Route path="*" component={NotFound}/>
			</Switch>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);
