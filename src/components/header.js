import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Menu from '../containers/menu';

class Header extends Component {
    render() {
        return (
            <header id="main_header">
                <div className="logo">
                    <Link onClick={this.hideComponents} to={`/`}>
                        <img src="/wp-content/themes/artofmydart_theme/assets/img/logo.png" />
                    </Link>
                </div>
                <nav>
                    <Menu name="main_menu" />
                </nav>
            </header>
        );
    }
}

module.exports = Header;
