import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

export class Header extends Component {
    render() {
        const {toggleSidebar, sidebarOpen, pathname} = this.props;
        return (
            <div>
                {
                    sidebarOpen && <div className="sidebar">
                        <div className="mobile_top">
                            <Link to="/" onClick={toggleSidebar}>
                                <img
                                    src={"/images/appicon/tsf-logo.png"}
                                    alt="logo"/>
                            </Link>
                        </div>
                        <div className="mobile_menu_item">
                            <ul className="navigation">
                                <li>
                                    <NavLink exact={true} to="/" activeClassName="active" onClick={toggleSidebar}>
                                        <i className="menu-icon">
                                            <img src={"/images/mobile-menu-icon/home.svg"} alt="menuIcon"/>
                                        </i>
                                        Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/portfolio" activeClassName="active" onClick={toggleSidebar}>
                                        <i className="menu-icon behansIcon">
                                            <img src={"/images/mobile-menu-icon/behance.svg"} alt="menuIcon"/>
                                        </i>
                                        Portfolio</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" activeClassName="active" onClick={toggleSidebar}>
                                        <i className="menu-icon aboutIcon">
                                            <img src={"/images/mobile-menu-icon/about-us.svg"} alt="menuIcon"/>
                                        </i>
                                        About us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" activeClassName="active" onClick={toggleSidebar}>
                                        <i className="menu-icon mobileIcon">
                                            <img src={"/images/mobile-menu-icon/contact.svg"} alt="menuIcon"/>
                                        </i>
                                        Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <div className="button" onClick={toggleSidebar}><img src={"/images/appicon/hamburger.png"}
                                                                     alt="menuIcon"/></div>
                <header id="header" className={pathname === '/' ? 'transparentHeader' : ''}>
                    <div className="header">
                        <div className="header-row">
                            <div className="main-logo"><Link to="/"><img src={"/images/logo.png"} alt="logo"/></Link>
                            </div>
                            <div className="navigation-menu">
                                <ul>
                                    <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                    <li><NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink></li>
                                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                                    <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}
