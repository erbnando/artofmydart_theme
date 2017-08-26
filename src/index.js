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
import MobileDetect from 'mobile-detect';

class App extends Component {
	componentWillMount() {
		window.url = window.location.href;
	}

	componentWillUpdate() {
		if (window.location.href != window.url) {
			if(document.getElementById('content-right')) {
				document.getElementById('content-right').style.transition = "opacity 0s";
				document.getElementById('content-right').style.opacity = "0";
			}
			if(document.getElementById('content-left')) {
				document.getElementById('content-left').style.transition = "opacity 0s";
				document.getElementById('content-left').style.opacity = "0";
			}
			if(document.getElementById('book')) {
				document.getElementById('book').style.transition = "opacity 0s";
				document.getElementById('book').style.opacity = "0";
			}
		}
		window.url = window.location.href;
	}

	render() {
		screen.addEventListener("orientationchange", function () {
			console.log("The orientation of the screen is: " + screen.orientation);
		});


		var md = new MobileDetect(window.navigator.userAgent);

		if (md.phone() !== null || md.tablet() !== null || md.mobile() !== null) {
			if (window.location.href.indexOf("/books/") > -1) {
				return (
					<div className="container grayheader desktop mobile">
						<Header />
						<Main />
					</div>
				);
			} else {
				return (
					<div className="container mobile">
						<Header />
						<Main />
					</div>
				);
			}
		} else {
			if (window.location.href.indexOf("/books/") > -1) {
				return (
					<div className="container grayheader desktop">
						<Header />
						<Main />
					</div>
				);
			} else {
				return (
					<div className="container">
						<Header />
						<Main />
					</div>
				);
			}
		}
	}
}

class Main extends Component {
	componentDidUpdate() {
	}

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
