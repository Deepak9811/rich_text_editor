import React, { Component } from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import { TailSpin } from 'react-loader-spinner'
import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Router from 'next/router';

export default class showfeedbackresponse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentData: [],
            loading: true,
            colorProg: "",
            answer: []
        }
    }

    static async getInitialProps({ query }) {
        return { data: query }
    }

    componentDidMount() {
        if (this.props) {
            if (this.props.data) {
                console.log(this.props.data.id)
                this.getResponse(this.props.data.id)
            }
        }
    }


    getResponse(questionID) {

        // http://192.168.1.217:1003/api/showpercentage?libcode=CLBITSOM&QUESTIONID=1

        fetch(`http://192.168.1.217:1003/api/showpercentage?libcode=CLBITSOM&QUESTIONID=${questionID}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
        }).then((data) => {
            data.json().then((resp) => {
                // console.log("questionID :- ",resp)
                if (resp.response === "Success") {
                    console.log("questionID :- ", resp.data);
                    this.setState({
                        contentData: resp.data,
                        loading: false,
                        answer: resp.data[0].Answer
                    })
                    console.log(this.state.answer)
                } else {
                    Router.push("/feedback/showfeedbacks")
                    alert("No data found.");
                }
            });
        }).catch(erro => {
            console.log("There is problem in " + erro.message)
        });
    }



    // chngColor(item) {
    //     if (item.percentage < 10) {
    //         // console.log("red :-", item.percentage)
    //         this.state.colorProg = "info"
    //         // this.setState({
    //         //     colorProg:"info"
    //         // })

    //     } else if (item.percentage < 30) {
    //         // console.log("blue :- ", item.percentage)
    //         this.state.colorProg = "success"

    //     } else if (item.percentage < 50) {
    //         // console.log("black :- ", item.percentage)
    //         this.state.colorProg = "warning"

    //     } else if (item.percentage < 60) {
    //         // console.log("yellow :- ", item.percentage)
    //         this.state.colorProg = "danger"

    //     } else if (item.percentage < 70) {
    //         // console.log("pink :- ", item.percentage)
    //         this.state.colorProg = "danger"
    //     } else if (item.percentage <= 100) {
    //         // console.log("pink :- ", item.percentage)
    //         this.state.colorProg = "danger"
    //     }
    // }

    render() {
        const { contentData, loading } = this.state
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
                                    Feedback Response
                                    <div className="page-title-subheading">
                                        Click on New Feedback to add new Feedback to the system.
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                <Link href="/feedback/showfeedbacks">
                                    <a>

                                        <button type="button" className="mr-1 btn btn-success" >
                                            <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}
                                            Show Feedbacks
                                        </button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {!loading ? (
                        <>

                            <div className="main-card mb-0 card">
                                <div className="card-header bg-info text-white">
                                    List of content
                                </div>


                                <div className="card-body">
                                    {contentData.map((item, i) => {
                                        // console.log(item.Percentage)

                                        return (
                                            <React.Fragment key={i}>
                                                <div className='resp'>
                                                    <div className='flx'>
                                                        <h4 >{i + 1}. {" "} </h4>
                                                        <h3> {item.question}</h3>
                                                    </div>


                                                    {this.state.answer.map((item, i) => {
                                                        console.log(item.percentage)
                                                        // {
                                                        //     this.chngColor(item)
                                                        // }
                                                        return (
                                                            <React.Fragment key={i}>

                                                                <div className='flx pdanswer'>
                                                                    <h5 style={{ width: "25%" }}>{item.answer}</h5>
                                                                    <div className='prgbr'>
                                                                        <ProgressBar max={100} min={0} variant={this.state.colorProg} now={Number(item.percentage) + 4} label={`${Number(item.percentage)} %`} />
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}




                                                </div>
                                            </React.Fragment>

                                        )
                                    })}


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
        )
    }
}
