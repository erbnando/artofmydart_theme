import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchMenu} from '../actions';
var FontAwesome = require('react-fontawesome');

class Menu extends Component {
    componentWillMount() {
        //console.log('\nmenu willmount:');
        //console.log(this.props);
        this.props.fetchMenu(this.props.name);
    }

    shouldComponentUpdate(nextProps) {
        //console.log(this.props.name);
        //console.log(nextProps.menu.name);
        //console.log(this.props.name === nextProps.menu.name);
        return this.props.name === nextProps.menu.name;
    }

    renderMenu(menu) {
        //console.log('\nrender menu:');
        //console.log(this.props);
        if ( this.props.name === menu.name) {
            return menu.items.map(item => {
                return (
                    <li key={item.ID}>
                        <Link to={Menu.getRelativeUrl(item.url)}>{item.title}</Link>
                    </li>
                );
            });
        }
    }

    static getRelativeUrl(url) {
        if (url === window.location.origin) {
            return '/';
        }

        return url.substr(window.location.origin.length);
    }

    getClasses(location=''){
        switch(location) {
            case 'main_menu':
                // return 'navbar-nav mr-auto';
            default:
                return '';
        }
    }

    componentDidUpdate() {
        //console.log('\n menu did update:');
        //console.log(this.props);
        document.getElementById('main_header').style.opacity = "1";
    }

    render() {
        //console.log('menu');
        return (
            <ul className={this.getClasses(this.props.menu.name)}>
                {this.renderMenu(this.props.menu)}
                <li className="social-first">
                    <a href="http://google.com" target="_blank">
                        <FontAwesome
                        name='facebook-square'
                        style={{ fontSize: '14px' }}
                        />
                    </a>
                </li>
                <li>
                    <a href="http://google.com" target="_blank">
                        <FontAwesome
                        name='instagram'
                        style={{ fontSize: '14px' }}
                        />
                    </a>
                </li>
            </ul>
        );
    }
}

function mapStateToProps({menu}) {
    return {menu};
}

export default connect(mapStateToProps, {fetchMenu})(Menu);