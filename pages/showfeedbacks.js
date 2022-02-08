
import React, { Component, Props } from "react";
import { FaClipboardList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import { TailSpin } from 'react-loader-spinner'
import Link from "next/link";
import Router from "next/router";
import ProgressBar from 'react-bootstrap/ProgressBar';


export default class showfeedbacks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentData: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch(`http://192.168.1.217:1003/api/getquestion?libcode=CLBITSOM&questionid=0`, {
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
                        contentData: resp.data,
                        loading: false,
                    })

                }
            })
        })
    }

    static async getInitialProps({ query }) {

        return { path: query.id }
    }


    editFeedback(item) {
        let questionID = item.questionID
        Router.push(`/feedback?id=${questionID}`,)
    }


    showResponse(item){
        console.log(item.questionID)
        let questionID = item.questionID

        fetch(`http://192.168.1.217:1003/api/getAppresponse?questionID=${questionID}&userid=`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }).then((data) => {
            data.json().then((resp) => {
                console.log(resp)
            //   if (resp.response == "ok") {
            //     // console.log("coupon updated".resp.response);
            //   } else {
            //     // alert("Something went wrong");
            //   }
            });
          });


        }

    render() {
        return (
            <div className='txt' id='pddd'>

                <ProgressBar animated variant="success" now={60} label={`dk 60%`} />


                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <FaClipboardList></FaClipboardList>
                                </div>
                                <div>
                                    Feedback LIST
                                    <div className="page-title-subheading">
                                        Click on New Feedback to add new Feedback to the system.
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                <Link href="/feedback">
                                    <a >

                                        <button type="button" className="mr-1 btn btn-success" >
                                            <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}
                                            New Feedback
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
                                    List of content
                                </div>


                                <div className="card-body">
                                    <table className="mb-0 table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Question</th>
                                                <th>valid From</th>
                                                <th>valid Upto</th>
                                                <th>active</th>
                                                <th>Check</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {this.state.contentData.map((item, i) => {
                                                console.log(item.Active)
                                                return (
                                                    <React.Fragment key={i}>
                                                        <tr >
                                                            <td>{item.type}</td>
                                                            <td>{item.question}</td>
                                                            <td>{item.validFrom}</td>
                                                            <td>{item.validUpto}</td>
                                                            <td>{item.active.toString()}</td>
                                                            <td className="edt" onClick={() => { this.showResponse(item) }}>
                                                                Show
                                                            </td>
                                                            <td className="edt" onClick={() => { this.editFeedback(item), this.props.item }}>
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
            </div >
        );
    }
}
