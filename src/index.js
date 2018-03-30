require('./scss/styles.scss');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/header';
import Home from './containers/home';
import Index from './containers/index';
import NotFound from './containers/notfound';
import Page from './containers/page';
import Book from './containers/book';
import store from './store';
import MobileDetect from 'mobile-detect';
import {Link} from 'react-router-dom'
import axios from 'axios';

class App extends Component {
	componentWillMount() {
		window.url = window.location.href;
	}

	componentDidMount() {
		var hideAddressBar = setTimeout(function() {
			window.scrollTo(0,0);
		}, 250);
	}

	componentDidUpdate() {
		var hideAddressBar = setTimeout(function() {
			window.scrollTo(0,0);
		}, 250);
	}

	componentWillUpdate() {   
		/*
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
		*/

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
			//console.log('window.screen.orientation');
			var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
			if (orientation.type === "landscape-primary") {
				return true
			} else if (orientation.type === "landscape-secondary") {
				return true
			} else if (orientation.type === "portrait-secondary" || orientation.type === "portrait-primary") {
				return false
			}
		} else if (window.orientation != undefined) {
			//console.log('window.orientation');
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

	onOrientationChange() {

		var md = new MobileDetect(window.navigator.userAgent);
		if (document.getElementById('container')) {
			var container = document.getElementById('container');
			if (window.screen.orientation != undefined) {
				var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
				
				if (orientation.type === "landscape-primary") {
					if (container.classList.contains('portrait')) {
						container.classList.remove('portrait');
						container.classList.add('landscape');
					}
				} else if (orientation.type === "landscape-secondary") {
					if (container.classList.contains('portrait')) {
						container.classList.remove('portrait');
						container.classList.add('landscape');
					}
				} else if (orientation.type === "portrait-secondary" || orientation.type === "portrait-primary") {
					if (container.classList.contains('landscape')) {
						container.classList.remove('landscape');
						container.classList.add('portrait');
					}
				}
				
				if ((orientation.type === "portrait-secondary" || orientation.type === "portrait-primary") && window.location.href.indexOf("/books/") > -1) {
					if (md.phone() != null) {
						document.getElementById('body').classList.add('book-portrait');
					}
					var setWidthAndHeight = setInterval(function() {
						if (window.outerWidth != '0' && window.outerHeight != '0') {
							document.getElementById('app').style.width = window.outerHeight + 'px';
							document.getElementById('app').style.height = window.outerWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						} else {
							document.getElementById('app').style.width = document.documentElement.clientHeight + 'px';
							document.getElementById('app').style.height = document.documentElement.clientWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						}
					}, 10);
				} else {
					if (md.phone() != null) {
						if (document.getElementById('body').classList.contains('book-portrait')) document.getElementById('body').classList.remove('book-portrait');
					}
					var setWidthAndHeight = setInterval(function() {
						if (window.outerWidth != '0' && window.outerHeight != '0') {
							document.getElementById('app').style.height = window.outerHeight + 'px';
							document.getElementById('app').style.width = window.outerWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						} else {
							document.getElementById('app').style.height = document.documentElement.clientHeight + 'px';
							document.getElementById('app').style.width = document.documentElement.clientWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						}
					}, 10);
				}
			} else if (window.orientation != undefined) {
				//console.log('window.orientation');
				if ((window.orientation == 0 || window.orientation == 180) && window.location.href.indexOf("/books/") > -1) {
					if (md.phone() != null) {
						document.getElementById('body').classList.add('book-portrait');
					}
					var setWidthAndHeight = setInterval(function() {
						if (window.outerWidth != '0' && window.outerHeight != '0') {
							document.getElementById('app').style.width = window.outerHeight + 'px';
							document.getElementById('app').style.height = window.outerWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						} else {
							document.getElementById('app').style.width = document.documentElement.clientHeight + 'px';
							document.getElementById('app').style.height = document.documentElement.clientWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						}
					}, 10);
				} else {
					if (md.phone() != null) {
						if (document.getElementById('body').classList.contains('book-portrait')) document.getElementById('body').classList.remove('book-portrait');
					}
					var setWidthAndHeight = setInterval(function() {
						if (window.outerWidth != '0' && window.outerHeight != '0') {
							document.getElementById('app').style.height = window.outerHeight + 'px';
							document.getElementById('app').style.width = window.outerWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						} else {
							document.getElementById('app').style.height = document.documentElement.clientHeight + 'px';
							document.getElementById('app').style.width = document.documentElement.clientWidth + 'px';
							var stop = setTimeout(function() {
								clearInterval(setWidthAndHeight);
							}, 200);
						}
					}, 10);
				}

				switch (window.orientation) {  
				case 0:
					if (container.classList.contains('landscape')) {
						container.classList.remove('landscape');
						container.classList.add('portrait');
					}
					break;
				case 180:
					if (container.classList.contains('landscape')) {
						container.classList.remove('landscape');
						container.classList.add('portrait');
					}
					break;
				case -90:
					if (container.classList.contains('portrait')) {
						container.classList.remove('portrait');
						container.classList.add('landscape');
					}
					break;
				case 90:
					if (container.classList.contains('portrait')) {
						container.classList.remove('portrait');
						container.classList.add('landscape');
					}
					break;
				}
			}
		}
	}

	render() {
		var md = new MobileDetect(window.navigator.userAgent);
		if (md.phone() != null) {
			console.log('mobile');

			if (this.deviceOrientation() == false && window.location.href.indexOf("/books/") > -1) {
				document.getElementById('body').classList.add('book-portrait');
				var setWidthAndHeight = setInterval(function() {
					if (window.outerWidth != '0' && window.outerHeight != '0') {
						document.getElementById('app').style.width = window.outerHeight + 'px';
						document.getElementById('app').style.height = window.outerWidth + 'px';
						var stop = setTimeout(function() {
							clearInterval(setWidthAndHeight);
						}, 200);
					} else {
						document.getElementById('app').style.width = document.documentElement.clientHeight + 'px';
						document.getElementById('app').style.height = document.documentElement.clientWidth + 'px';
						var stop = setTimeout(function() {
							clearInterval(setWidthAndHeight);
						}, 200);
					}
				}, 10);
			} else {
				if (document.getElementById('body').classList.contains('book-portrait')) document.getElementById('body').classList.remove('book-portrait');
				var setWidthAndHeight = setInterval(function() {
					if (window.outerWidth != '0' && window.outerHeight != '0') {
						document.getElementById('app').style.height = window.outerHeight + 'px';
						document.getElementById('app').style.width = window.outerWidth + 'px';
						var stop = setTimeout(function() {
							clearInterval(setWidthAndHeight);
						}, 200);
					} else {
						document.getElementById('app').style.height = document.documentElement.clientHeight + 'px';
						document.getElementById('app').style.width = document.documentElement.clientWidth + 'px';
						var stop = setTimeout(function() {
							clearInterval(setWidthAndHeight);
						}, 200);
					}
				}, 10);
			}

			/*
			var adjustHeadingSize = setInterval(function() { 
				var elements = document.querySelectorAll(".mobile.landscape h3");
				console.log(elements);
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.border = '1px solid red';
					elements[i].style.boxSizing = 'border-box';
				}
				var stop = setTimeout(function() {
					clearInterval(adjustHeadingSize);
				}, 2000);
			}, 500);
			*/

			window.addEventListener("orientationchange", this.onOrientationChange);
			//window.onorientationchange = this.onOrientationChange;

			if (this.deviceOrientation() == false) {
				console.log('portrait');
				if (window.location.href.indexOf("/books/") > -1) {					
					return (
						<div id="container" className="container grayheader mobile portrait">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div id="container" className="container mobile portrait">
							<Header />
							<Main />
						</div>
					);
				}
			} else if (this.deviceOrientation() == true) {
				console.log('landscape');
				if (window.location.href.indexOf("/books/") > -1) {
					return (
						<div id="container" className="container grayheader mobile landscape">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div id="container" className="container mobile landscape">
							<Header />
							<Main />
						</div>
					);
				}
			}
		} else if (md.tablet() != null) {
			console.log('tablet');

			window.addEventListener("orientationchange", this.onOrientationChange);

			/*
			window.addEventListener("orientationchange", function() {
			    //alert("the orientation of the device is now " + screen.orientation.angle);
			});

			window.onorientationchange = this.deviceOrientation;
			*/

			if (this.deviceOrientation() == false) {
				console.log('portrait');
				if (window.location.href.indexOf("/books/") > -1) {
					return (
						<div id="container" className="container grayheader tablet portrait">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div id="container" className="container tablet portrait">
							<Header />
							<Main />
						</div>
					);
				}
			} else if (this.deviceOrientation() == true) {
				console.log('landscape');
				if (window.location.href.indexOf("/books/") > -1) {
					return (
						<div id="container" className="container grayheader tablet landscape">
							<Header />
							<Main />
						</div>
					);
				} else {
					return (
						<div id="container" className="container tablet landscape">
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
					<div id="container" className="container grayheader desktop">
						<Header />
						<Main />
					</div>
				);
			} else {
				return (
					<div id="container" className="container desktop">
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
