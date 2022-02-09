import React, { Component } from "react";
import { FaClipboardList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import { TailSpin } from 'react-loader-spinner'
import Link from "next/link";
import Router from "next/router";

export default class Showevent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            eventData: [],
            loading: true,
        }
    }


    componentDidMount() {
        fetch(`http://192.168.1.217:1003/api/showevent?libid=CLBITSOM&id=0`, {
            method: "GET",
            headers: {
                Accepts: "application/json",
                'content-type': "application/json"
            }
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                if (resp.response === "Success") {
                    this.setState({
                        eventData: resp.data,
                        loading: false,
                    })

                }
            })
        })
    }


    editEvent(item) {
        // console.log(item.contentId)
        let dk = item.id
        // id = this.props
        // console.log(this.state.id)
        // this.props.id
        // console.log(this.props.match.params.id)
        Router.push(`/event?id=${dk}`,)
    }

    render() {
        return (
            <div className='txt' id='pddd'>
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <FaClipboardList></FaClipboardList>
                                </div>
                                <div>
                                    EVENET LIST
                                    <div className="page-title-subheading">
                                        Click on New Event to add new event to the system.
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                <Link href="/event">
                                    <a>
                                        <button type="button" className="mr-1 btn btn-success" >
                                            <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}
                                            New Event
                                        </button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {!this.state.loading ? (
                        <>

                            <div className="main-card mb-0 card">
                                <div className="card-header bg-info text-white">
                                    List of evnets
                                </div>
                                <div className="card-body">
                                    <table className="mb-0 table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '200px' }}>Event</th>
                                                <th>Type</th>
                                                <th>Valid From</th>
                                                <th>Valid Upto</th>
                                                <th>Organiser</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.eventData.map((item, i) => {
                                                return (
                                                    <React.Fragment key={i}>


                                                        <tr>
                                                            <td>{item.eventName}</td>
                                                            <td>{item.type}</td>
                                                            <td>{item.validFrom}</td>
                                                            <td>{item.validUpto}</td>
                                                            <td >{item.location}</td>
                                                            <td onClick={() => { this.editEvent(item) }} >
                                                                <FaEdit></FaEdit>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                )

                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </>
                    ) : (
                        <div className="loading_c">

                            <TailSpin color="#00BFFF" height={60} width={80} ariaLabel='loading' />
                        </div>
                    )}


                </div>
            </div>
        )
    }
}