import Link from 'next/link';
import React, { Component } from 'react';
import { AiOutlineRocket } from "react-icons/ai";
import { BiDirections } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlinePersonAddAlt, MdKeyboardArrowDown } from "react-icons/md";

export default class sidebar extends Component {
    render() {
        return (
            <div>
                <div className='app-main'>

                    <div className='app-sidebar sidebar-shadow  ps ps--active-y'>



                        <div className="app-header__logo">
                            <div className="logo-src"></div>
                            <div className="header__pane ml-auto">
                                <div>
                                    <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" >
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="app-header__mobile-menu">
                            <div>
                                <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="app-header__menu">
                            <span>
                                <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                                    <span className="btn-icon-wrapper">
                                        <i className="fa fa-ellipsis-v fa-w-6"></i>

                                    </span>
                                </button>
                            </span>
                        </div>
                        <div className="scrollbar-sidebar">
                            <div className="app-sidebar__inner">
                                <ul className="vertical-nav-menu">
                                    <li className="app-sidebar__heading">Dashboards</li>
                                    <li><a href="/"><><AiOutlineRocket className='svgicon' /></>Dashboard</a></li>
                                    <li className="app-sidebar__heading">Masters</li>
                                    <li>
                                        <a href="/Contents/List/">
                                            <BiDirections className='svgicon' />Contents
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/Contents">
                                            <MdOutlinePersonAddAlt className='svgicon' />New Content
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/event">
                                            <a >
                                                <BiDirections className='svgicon' />Events
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="/event">
                                            <MdOutlinePersonAddAlt className='svgicon' />New Event
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>



            </div>
        );
    }
}
