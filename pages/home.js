
import React, { Component, Props } from "react";
import { FaClipboardList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import { TailSpin } from 'react-loader-spinner'
import Link from "next/link";
import Router from "next/router";

import Protected from "./common/protected";


export default class showcontent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentData: [],
            loading: true,
            hideTable: false
        }
    }

    render() {
        return (
            <Protected>
                <div className='txt' id='pddd'>
                    <div className="app-main__inner">
                        <div className="app-page-title">
                            <div className="page-title-wrapper">
                                <div className="page-title-heading">
                                    <div className="page-title-icon">
                                        <FaClipboardList></FaClipboardList>
                                    </div>
                                    <div>
                                            BITSoM - DASHBOARD
                                        <div className="page-title-subheading">
                                            USER DASHBOARD
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="page-title-actions">
                                    <button type="button" className="mr-1 btn btn-success" >
                                        <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}
                                        Daily Filter
                                    </button>
                                </div> */}
                            </div>
                        </div>

                        {/* --------------------------------------------- */}





                        <div class="row">
                            <div class="col-md-6 col-xl-3">
                                <div class="card mb-3 widget-content bg-success">
                                    <div class="widget-content-wrapper text-white">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Visitors</div>
                                            <div class="widget-subheading">Visited the premises</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-white"><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="card mb-3 widget-content bg-info">
                                    <div class="widget-content-wrapper text-white">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Within Premises</div>
                                            <div class="widget-subheading">Visitors within premises</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-white"><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="card mb-3 widget-content bg-warning">
                                    <div class="widget-content-wrapper text-white">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Employees</div>
                                            <div class="widget-subheading">Within campus</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-white"><span>41</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="card mb-3 widget-content bg-focus">
                                    <div class="widget-content-wrapper text-white">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Support Staff</div>
                                            <div class="widget-subheading">Within campus</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-white"><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>










                        {/* ---------------------------------------- */}



                        <>

                            {/* <div className="main-card mb-0 card">
                                <div className="card-header bg-info text-white">
                                    VISITORS
                                </div>


                                <div className="card-body">
                                    <table className="mb-0 table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Slip No</th>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Employee</th>
                                            </tr>
                                        </thead>
                                        <tbody>







                                        </tbody>
                                    </table>
                                </div>

                            </div> */}
                        </>



                    </div>
                </div >
            </Protected>
        );
    }
}
