import Link from 'next/link';
import React, { Component } from 'react'
import { AiOutlineRocket } from "react-icons/ai";
import { BiDirections } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlinePersonAddAlt, MdKeyboardArrowDown, MdOutlineFeedback } from "react-icons/md";
import Image from 'next/image'

export default class header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDropdown: false,
            showNav: false,
            className: "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-footer fixed-header",
            showNDHideSideNav: true,
            showBtnInMobile: true,
            crossBtn: true,
            showChngPass: false,
            newPass: "",
            newPassRetype: "",
            clasID: false
        }
    }

    showDrop() {
        if (this.state.showDropdown === false) {
            this.setState({ showDropdown: true })
        } else {
            this.setState({ showDropdown: false })
        }
        console.log(this.state.showDropdown)
    }


    showNdHideNav() {
        if (this.state.showNav === false) {
            this.setState({
                showNav: true
            })
        } else {
            this.setState({
                showNav: false
            })
        }
    }



    showSideNave() {
        var cl = "#pddd"
        var element = document.querySelector(cl);

        this.setState(prevState => ({ showNDHideSideNav: !prevState.showNDHideSideNav }));

        if (this.state.showNDHideSideNav === true) {
            this.setState({
                className: "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-footer fixed-header closed-sidebar",
                crossBtn: false
            })
            element.style.paddingLeft = "8%";
        } else {
            this.setState({
                className: "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-footer fixed-header",
                crossBtn: true
            })
            element.style.padding = "2.3% 3% 5% 23%";
        }
    }



    showSideNaveInMobile() {
        this.setState(prevState => ({ showBtnInMobile: !prevState.showBtnInMobile }));
        if (this.state.showBtnInMobile === true) {
            this.setState({

                className: "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-footer fixed-header closed-sidebar-mobile closed-sidebar sidebar-mobile-open",
                crossBtn: false
            })
        } else {
            this.setState({
                className: "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-footer fixed-header closed-sidebar-mobile closed-sidebar",
                crossBtn: true
            })
        }
    }


    showPas() {
        if (this.state.showChngPass === false) {
            this.setState({
                showChngPass: true
            })
        } else {
            this.setState({
                showChngPass: false
            })
        }
        console.log(this.state.showChngPass)
    }



    checkUpdatePass() {
        if (this.state.newPass !== "" && this.state.newPassRetype !== "") {
            this.updatePass()
        } else {
            alert("Please enter details correctly.")
        }
    }


    updatePass() {
        const { newPass, newPassRetype } = this.state
        fetch(`http://192.168.1.217:1003/api/Changepassword?email=${newPass}&password=${newPassRetype}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            }
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                if (resp.response === "Success") {
                    this.setState({
                        showChngPass: false,
                        newPass: "",
                        newPassRetype: ""
                    })
                    setTimeout(() => {

                        alert(resp.message)
                    }, 500);
                } else {
                    alert("Something wents wrong.")
                }
            })
        }).catch(error => {
            console.log(error.message)
        })
    }


    logOUt() {
        localStorage.clear()
    }





    render() {
        const { newPass, newPassRetype } = this.state
        return (
            < >

                <div className={this.state.className} >
                    <div className="app-header header-shadow">
                        <div className="app-header__logo">
                            <div className="logo-src"></div>
                            <div className="header__pane ml-auto">
                                <div>

                                    {this.state.crossBtn ? (
                                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic"
                                            onClick={() => this.showSideNave()}
                                        >
                                            <span className="hamburger-box">
                                                <span className="hamburger-inner"></span>
                                            </span>
                                        </button>
                                    ) :
                                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic is-active"
                                            onClick={() => this.showSideNave()}
                                        >
                                            <span className="hamburger-box">
                                                <span className="hamburger-inner"></span>
                                            </span>
                                        </button>
                                    }

                                    {/* <button type="button" className="hamburger close-sidebar-btn hamburger--elastic"
                                        onClick={() => this.showSideNave()}
                                    >
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="app-header__mobile-menu">
                            <div>
                                {/* <button onClick={() => this.showSideNaveInMobile()} type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </button> */}




                                {this.state.crossBtn ? (
                                    <button onClick={() => this.showSideNaveInMobile()} type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button>
                                ) :
                                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav is-active"
                                        onClick={() => this.showSideNaveInMobile()}
                                    >
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button>
                                }





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
                        <div className="app-header__content">
                            <div className="app-header-left">
                                <div className="search-wrapper">
                                    <Image src="/Image/CLBITSOM.png" alt='logo' width={45} height={45} />
                                </div>

                            </div>
                            <div className="app-header-right">
                                <div className="header-btn-lg pr-0">
                                    <div className="widget-content p-0">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left  ml-3 header-user-info">
                                                <div className="btn-group">
                                                    <Link href="#">
                                                        <a className="p-0 btn">
                                                            <div onClick={() => this.showDrop()}>
                                                                <div className="widget-heading">BITSOM<MdKeyboardArrowDown style={{
                                                                    height: "5%",
                                                                    width: "20px"
                                                                }} />
                                                                </div>
                                                                <div className="widget-subheading">Library User</div>
                                                            </div>

                                                        </a>
                                                    </Link>

                                                    <div style={{ display: this.state.showDropdown ? "block" : "none" }} className="dropdown-menu dropdown-menu-right"
                                                    >
                                                        <span onClick={() => this.showPas()}
                                                            className="dropdown-item" >
                                                            <HiOutlineUserCircle />
                                                            &nbsp;Change Password</span>

                                                        <form action="/Account/Logout" method="post">
                                                            <Link href={"/"}>
                                                                <a onClick={() => this.logOUt()}
                                                                    className="dropdown-item"
                                                                >
                                                                    <MdKeyboardArrowDown />&nbsp;Logout</a>
                                                            </Link>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>










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
                                        <li>
                                            <Link href="/">
                                                <a>
                                                    <><AiOutlineRocket className='svgicon' /></>
                                                    Dashboard
                                                </a>
                                            </Link>


                                        </li>
                                        <li className="app-sidebar__heading">Masters</li>
                                        <li>
                                            <Link href="/showcontent">
                                                <a>
                                                    <BiDirections className='svgicon' />Contents
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/home">
                                                <a>
                                                    <MdOutlinePersonAddAlt className='svgicon' />New Content
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/showevent">
                                                <a>
                                                    <BiDirections className='svgicon' />Events
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/event">
                                                <a>
                                                    <MdOutlinePersonAddAlt className='svgicon' />New Event
                                                </a>
                                            </Link>
                                        </li>


                                        <li>
                                            <Link href="/feedback/feedback">
                                                <a>
                                                    <MdOutlineFeedback className='svgicon' />Feedback Question
                                                </a>
                                            </Link>
                                        </li>


                                        <li>
                                            <Link href="/feedback/showfeedbacks">
                                                <a>
                                                    <MdOutlineFeedback className='svgicon' />Show Feedback Question
                                                </a>
                                            </Link>
                                        </li>



                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>





                {/* -----------------------DROPDOWN------------------------------------------- */}

                {this.state.showChngPass ? (
                    <>
                        <div onClick={() => this.showPas()} className="modal-backdrop fade show"></div>

                        <div

                            className="modal fade bd-ChangePassword show"
                            style={{ display: "block" }}
                        >
                            <div className="modal-dialog " style={{ background: "#fff" }}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Change Password</h5>
                                        <button type="button" className="close" onClick={() => this.showPas()}>
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Enter new password and click on Submit button.</p>
                                        <div className="form-row">
                                            <div className="col-md-6 mb-3">
                                                <label>New Password</label>

                                                <input
                                                    type="text"
                                                    maxLength="50"
                                                    className="form-control"
                                                    placeholder="New Password"
                                                    required=""
                                                    autoFocus=""
                                                    autoComplete=""
                                                    value={newPass}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            newPass: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Retype Password</label>
                                                <input
                                                    id="txtRetypePassword"
                                                    maxLength="50"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Retype Password"
                                                    value={newPassRetype}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            newPassRetype: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                onClick={() => this.showPas()}
                                                className="btn btn-secondary"


                                            >
                                                Close
                                            </button>
                                            <button onClick={() => this.checkUpdatePass()} className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                ) : null}










            </>
        )
    }
}
