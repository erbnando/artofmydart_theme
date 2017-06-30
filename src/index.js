require('./sass/styles.scss');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header';
import Index from './containers/index';
import Blog from './containers/blog';
import store from './store';

class App extends Component {
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
	componentWillReceiveProps() {
        //console.log('will mount');
        if (document.getElementById('content-left') && document.getElementById('content-right')){
            if (window.location.pathname !== '/') {
                document.getElementById('content-left').style.opacity = "0";
                document.getElementById('content-right').style.opacity = "0";
                console.log('-----content left and right hidden');
            }
        }
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Index} />
				<Route path="page/:pageNum" page=":pageNum" component={Blog} />
				<Route path="*" component={Blog}/>
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