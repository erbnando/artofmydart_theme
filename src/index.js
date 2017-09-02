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
		window.scroll(0,0);	

		var captionsLeft = document.getElementsByClassName("captions-left");
		for(var i = 0; i < captionsLeft.length; i++) {
		    if(captionsLeft[i].style.opacity == "1") {
			    captionsLeft[i].style.opacity = "0";
		    }
		}
		var captionsRight = document.getElementsByClassName("captions-right");
		for(var i = 0; i < captionsRight.length; i++) {
		    if(captionsRight[i].style.opacity == "1") {
			    captionsRight[i].style.opacity = "0";
		    }
		}

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

	deviceOrientation() {                		
		if (window.screen.orientation != undefined) {
			var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
			if (orientation.type === "landscape-primary") {
				return true
			} else if (orientation.type === "landscape-secondary") {
				return true
			} else if (orientation.type === "portrait-secondary" || orientation.type === "portrait-primary") {
				return false
			}
		} else if (window.orientation != undefined) {
			switch (window.orientation) {  
			case 0:
				return false
			    break;
			case 180:
				return false
			    break;
			case -90:
				return true
			    break;
			case 90:
				return true
			    break;
			}
		}
	}

	render() {
		var md = new MobileDetect(window.navigator.userAgent);
		if (md.phone() != null || md.tablet() != null || md.mobile() != null) {
			console.log('mobile');
			if (this.deviceOrientation() == false) {
				console.log('portrait');
				if (window.location.href.indexOf("/books/") > -1) {
					return (
						<div className="container grayheader mobile portrait">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div className="container mobile portrait">
							<Header />
							<Main />
						</div>
					);
				}
			} else if (this.deviceOrientation() == true) {
				console.log('landscape');
				if (window.location.href.indexOf("/books/") > -1) {
					return (
						<div className="container grayheader mobile landscape">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div className="container mobile landscape">
							<Header />
							<Main />
						</div>
					);
				}
			}
		} else {
			console.log('desktop');
			if (window.location.href.indexOf("/books/") > -1) {
				return (
					<div className="container grayheader desktop">
						<Header />
						<Main />
					</div>
				);
			} else {
				return (
					<div className="container desktop">
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
