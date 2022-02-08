import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { TailSpin } from 'react-loader-spinner'
import Link from 'next/link';
import { FiUsers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import Router from 'next/router';

export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: '',
            eventName: "",
            validFrom: new Date(),
            validUpto: new Date(),
            loading: false,
            physical: false,
            active: false,
            system: false,
            showMcq: false,
            showNewMcqData: false,
            mcqQuestionId: '',
            questionID: "",
            mcqNewData: [],
            Updateloading: false,
            choice: "",
            sortOrder: "",
            activeMcq: false,
            heading: "",
            question: "",
            question_type: "",
            hideSaveBttn: true
        };
    }


    static async getInitialProps({ query }) {
        return { data: query }
    }



    componentDidMount() {
        if (this.props) {
            if (this.props.data) {
                if (this.props.data.id) {
                    this.getFeedBackData(this.props.data.id)
                    console.log("refresh not working")
                }
            }
        }
    }



    getFeedBackData(id) {

        fetch(`http://192.168.1.217:1003/api/getquestion?libcode=CLBITSOM&questionid=${id}`, {
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
                        feedBckData: resp.data,
                        question_type: resp.data[0].type,
                        heading: resp.data[0].heading,
                        question: resp.data[0].question,
                        // validFrom: resp.data[0].validFrom,
                        // validUpto: resp.data[0].validUpto,
                        questionID: resp.data[0].questionID,
                        libCode: resp.data[0].libCode,
                        active: resp.data[0].active,
                        mcqNewData: resp.data[0].mcq,
                    })

                    console.log(this.state.mcqNewData)

                    if (this.state.mcqNewData.length != 0) {
                        this.setState({
                            showNewMcqData: true,
                            hideSaveBttn: false
                        })
                    }

                }
            })
        })
    }


    checkFeed() {
        const { eventName, physical, system, active, profileImg, validFrom, validUpto, heading, question, type, question_type, validFroms, questionID } = this.state;
        this.setState({
            loading: true
        })
        fetch(`http://192.168.1.217:1003/api/questions`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                questionID: questionID,
                libCode: "CLBITSOM",
                type: question_type,
                heading: heading,
                question: question,
                validFrom: validFrom,
                validUpto: validUpto,
                active: active
            })
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                if (resp.response === "Success") {
                    if (this.state.showNewMcqData === true) {
                        this.setState({
                            showMcq: false,
                            loading: false,
                        })
                        this.updateMcq()
                    } else if (question_type === "MCQ") {
                        this.setState({
                            mcqData: resp.data,
                            mcqQuestionId: resp.data[0].questionID,
                            showMcq: true,
                            loading: false,
                            question_type: "",
                            heading: "",
                            question: "",
                            validFrom: new Date(),
                            validUpto: new Date(),
                            active: false
                        })
                    } else {
                        this.setState({
                            mcqData: resp.data,
                            mcqQuestionId: resp.data[0].questionID,
                            showMcq: false,
                            loading: false,
                            question_type: "",
                            heading: "",
                            question: "",
                            validFrom: new Date(),
                            validUpto: new Date(),
                            active: false
                        })
                        alert(resp.message)
                    }
                } else {
                    alert("Something wents wrong.")
                    this.setState({
                        loading: false
                    })
                }
            })
        }).catch((error) => {
            alert(error.message)
            this.setState({
                loading: false
            })
        })
    }


    addMcq() {
        const { activeMcq, sortOrder, choice, mcqQuestionId, mcqNewData } = this.state;
        this.setState({
            loading: true
        })
        fetch(`http://192.168.1.217:1003/api/insertmcq`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                mcqid: "",
                questionid: mcqQuestionId,
                choice: choice,
                sortorder: sortOrder,
                active: activeMcq
            })
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                if (resp.response === "Success") {
                    this.setState({
                        resp: resp.data,
                        showMcq: true,
                        loading: false,
                        choice: "",
                        sortOrder: "",
                        activeMcq: false
                    })
                    alert(resp.message)
                } else {
                    alert("Something wents wrong.")
                    this.setState({
                        loading: false
                    })
                }
            })
        }).catch((error) => {
            alert(error.message)
        })
    }



    reset() {
        console.log("hello")
        this.setState({
            showMcq: false,
            loading: false,
            question_type: "",
            heading: "",
            question: "",
            validFrom: new Date(),
            validUpto: new Date(),
            active: false
        })
    }

    chngeDataFormate(date) {

        let dt = date.toString()
        let dts = dt.split(" ")
        let yr = dts[3]
        let mn = dts[1]
        let dty = dts[2]
        let tm = dts[4]

        let frm = yr + "-" + mn + "-" + dty + "T" + tm

        this.setState({ validFroms: date })

        console.log(JSON.stringify(frm))
    }


    handleChange(newName, index) {
        const { companies } = this.state;

        const newCompanies = [...companies];
        newCompanies[index] = newName;
        this.setState({ companies: newCompanies });
        console.log("input :- ", this.state.companies)
    }


    updateCompany(newName, index) {
        const { mcqNewData } = this.state;
        // const date = { name, email }
        const newmcqNewData = [...mcqNewData];

        newmcqNewData[index].choice = newName;
        this.setState({ mcqNewData: newmcqNewData });

        console.log(newmcqNewData)
    }


    updateOrder(newName, index) {
        const { mcqNewData } = this.state;
        // const date = { name, email }
        const newmcqNewData = [...mcqNewData];

        newmcqNewData[index].sortorder = Number(newName);
        this.setState({ mcqNewData: newmcqNewData });

        console.log(newmcqNewData)
    }


    updateActive(newName, index) {

        const { mcqNewData } = this.state;
        const newmcqNewData = [...mcqNewData];

        if (newName === "false") {
            let tr = true
            newmcqNewData[index].active = tr
        } else {
            let fl = false
            newmcqNewData[index].active = fl
        }
        this.setState({ mcqNewData: newmcqNewData });

        console.log(newName, index)
        console.log(newmcqNewData)
    }




    updateMcq() {
        const { activeMcq, sortOrder, choice, mcqQuestionId, mcqNewData } = this.state;
        this.setState({
            Updateloading: true
        })
        console.log(JSON.stringify(mcqNewData))

        fetch('http://192.168.1.217:1003/api/updatemcq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mcqNewData)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                if (resp.response === "Success") {


                    this.setState({
                        showMcq: false,
                        Updateloading: false,
                        showNewMcqData: false,
                        choice: "",
                        sortOrder: "",
                        heading: "",
                        question: "",
                        question_type: "",
                        activeMcq: false,
                        active: false
                    })
                    Router.push('/showfeedbacks')
                    alert(resp.message)
                } else {
                    alert("Something wents wrong.")
                    this.setState({
                        Updateloading: false
                    })
                }
            })
        }).catch((error) => {
            alert(error.message)
            this.setState({
                Updateloading: false
            })
        })
    }




    render() {
        const { activeMcq, sortOrder, choice, active, addChoice, validFrom, validUpto, heading, question, type, question_type, companies, mcqNewData } = this.state;
        // console.log(this.state)
        return (
            <div className='txt' id='pddd'>

                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <FiUsers className="pe-7s-users icon-gradient bg-mean-fruit" />

                            </div>
                            <div>
                                Feedback - ADD/UPDATE
                                <div className="page-title-subheading">
                                    <p>Enter the details and click on SAVE button to save the details.</p>
                                </div>
                            </div>
                        </div>
                        <div className="page-title-actions">
                            <Link href="/showevent">
                                <a>

                                    <button type="button" className="mr-1 btn btn-success" >
                                        <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}Show Feedbacks
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>



                <div className='txtb'>


                    <div className="card-header bg-info text-white">CONTENT DETAILS</div>

                    <div style={{ padding: "1.25rem" }}>


                        {!this.state.showMcq ? (
                            <>
                                <div className="form-row">
                                    <div className="col-md-3 mb-1 ">
                                        <label>Type</label><span className="text-danger">*</span>
                                        <div className="position-relative form-group ">

                                            <select
                                                id=""
                                                className="form-control"
                                                value={question_type}
                                                aria-label="question_type"
                                                name="question_type"
                                                title="question_type"
                                                onChange={(e) => this.setState({ question_type: e.target.value })}
                                            >
                                                <option value="" hidden>Type of Question</option>
                                                <option value="General">GEN</option>
                                                <option value="MCQ">MCQ</option>
                                                <option value="Rate">RATE</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-1">
                                        <label>Heading</label><span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            value={heading}
                                            onChange={(e) =>
                                                this.setState({ heading: e.target.value })
                                            }
                                            className="form-control"
                                            placeholder="Heading..."
                                            required=""
                                            autoFocus=""
                                            autoComplete="on"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-11 mb-1">
                                        <label>Question</label><span className="text-danger">*</span>

                                        <div className="position-relative form-group ">

                                            <input
                                                type="text"
                                                value={question}
                                                onChange={(e) =>
                                                    this.setState({ question: e.target.value })
                                                }
                                                className="form-control"
                                                placeholder="Question..."
                                                required=""
                                                autoFocus=""
                                                autoComplete="on"
                                            />
                                        </div>
                                    </div>


                                </div>

                                <div className="form-row">
                                    <div className="col-md-3 mb-1 ">
                                        <label>Valid From</label><span className="text-danger">*</span>
                                        <div className="position-relative form-group ">

                                            <DatePicker
                                                selected={validFrom}
                                                // onChange={(date) => this.chngeDataFormate(date)}
                                                onChange={(date) => this.setState({ validFrom: date })}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                                className='form-control'
                                            />
                                        </div>

                                    </div>

                                    <div className="col-md-3 mb-1 ">
                                        <label>Valid Upto</label><span className="text-danger">*</span>
                                        <div className="position-relative form-group ">

                                            <DatePicker
                                                selected={validUpto}
                                                onChange={(date) => this.setState({ validUpto: date })}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                                className='form-control'
                                            />
                                        </div>

                                    </div>

                                    <div className="col-md-3 mb-1" style={{ marginLeft: '8%' }}>
                                        <label>Active</label><span className="text-danger">*</span>
                                        <div className="position-relative form-group m-2">
                                            <div>
                                                <div className="custom-checkbox custom-control">
                                                    <input
                                                        className="custom-control-input"
                                                        id="exampleCustomInline1"
                                                        name="Show"
                                                        type="checkbox"
                                                        checked={this.state.active ? "checkbox" : null}
                                                        onChange={() =>
                                                            this.setState({
                                                                active: active ? false : true,
                                                            })
                                                        }
                                                    />
                                                    <input name="Show" type="hidden" value="false" />
                                                    <label className="custom-control-label" htmlFor="exampleCustomInline1">Active</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>




                                {this.state.hideSaveBttn && (

                                    <div className="card-footer">
                                        <div className="col-md-12 mb-0 text-center">
                                            {!this.state.loading ? (
                                                <>
                                                    <input type="submit" name="created" value="SAVE" className="btn-wide btn btn-success" onClick={() => this.checkFeed()} />
                                                </>
                                            ) : (
                                                <div className="btn-wide btn ">
                                                    <TailSpin color="#00BFFF" height={30} width={50} ariaLabel='loading' />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </>
                        ) :
                            <div>
                                <div className="form-row">

                                    <div className="col-md-5 mb-1">
                                        <label>Choice</label><span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            value={choice}
                                            onChange={(e) =>
                                                this.setState({ choice: e.target.value })
                                            }
                                            className="form-control"
                                            placeholder="Choice..."
                                            required=""
                                            autoFocus=""
                                            autoComplete="on"
                                        />
                                    </div>


                                    <div className="col-md-5 mb-1 ">
                                        <label>Sort Order</label><span className="text-danger">*</span>
                                        <div className="position-relative form-group ">

                                            <input
                                                type="number"
                                                value={sortOrder}
                                                onChange={(e) =>
                                                    this.setState({ sortOrder: e.target.value })
                                                }
                                                className="form-control"
                                                placeholder="Short Order..."
                                                required=""
                                                autoFocus=""
                                                autoComplete="on"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 mb-1" style={{ marginTop: '3%' }}>
                                        {/* <label>Active</label><span className="text-danger">*</span> */}
                                        <div className="position-relative form-group m-2">
                                            <div style={{ marginLeft: "20%" }}>
                                                <div className="custom-checkbox custom-control">
                                                    <input
                                                        className="custom-control-input"
                                                        id="exampleCustomInline1"
                                                        name="Show"
                                                        type="checkbox"
                                                        checked={this.state.activeMcq ? "checkbox" : null}
                                                        onChange={() =>
                                                            this.setState({
                                                                activeMcq: activeMcq ? false : true,
                                                            })
                                                        }
                                                    />
                                                    <input name="Show" type="hidden" value="false" />
                                                    <label className="custom-control-label" htmlFor="exampleCustomInline1">Active</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>


                                <div className="card-footer">
                                    <div className="col-md-12 mb-0 text-center">
                                        {!this.state.loading ? (
                                            <>
                                                <input type="submit" name="created" value="SAVE" className="btn-wide btn btn-success" onClick={() => this.addMcq()} />

                                                <input
                                                    type="reset"
                                                    value="Back"
                                                    className="btn-wide btn btn-light"
                                                    id="btnClear"
                                                    style={{ marginLeft: "2%" }}
                                                    onClick={() => this.reset()}
                                                />

                                            </>
                                        ) : (
                                            <div className="btn-wide btn ">
                                                <TailSpin color="#00BFFF" height={30} width={50} ariaLabel='loading' />
                                            </div>
                                        )}
                                    </div>
                                </div>





                            </div>}

                        {/* ----------------------------New-data---------------------------------------------------------- */}
                        {/* {companies.map((item, index) => (
                            <input type="text" key={index} value={item} onChange={(e) => this.updateCompany(e.target.value, index)}></input>
                        ))} */}


                        {this.state.showNewMcqData && (
                            <div>
                                {mcqNewData.map((item, index) => {
                                    // console.log(item.choice)
                                    return (
                                        <React.Fragment key={index}>
                                            <div>
                                                <div className="form-row">

                                                    <div className="col-md-5 mb-1">
                                                        <label>Choice</label><span className="text-danger">*</span>
                                                        <input
                                                            type="text"
                                                            key={index}
                                                            value={item.choice}
                                                            onChange={(e) => this.updateCompany(e.target.value, index)}
                                                            className="form-control"
                                                        ></input>
                                                        {/* <input
                                                        type="text"
                                                        value={item.choice}
                                                        onChange={(e) =>
                                                            // this.setState({ choice: e.target.value })
                                                            this.handleChange(e.target.value, i)
                                                        }
                                                        key={i}
                                                        className="form-control"
                                                        placeholder="Choice..."
                                                    /> */}
                                                    </div>


                                                    <div className="col-md-5 mb-1 ">
                                                        <label>Sort Order</label><span className="text-danger">*</span>
                                                        <div className="position-relative form-group ">

                                                            <input
                                                                type="number"
                                                                value={item.sortorder}
                                                                onChange={(e) => this.updateOrder(e.target.value, index)}
                                                                key={index}
                                                                className="form-control"
                                                                placeholder="Short Order..."
                                                                required=""
                                                                autoFocus=""
                                                                autoComplete="on"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-1 mb-1" style={{ marginLeft: "3%", marginTop: "2.7%" }}>
                                                        {/* <label>Active</label><span className="text-danger">*</span> */}
                                                        <div className="position-relative form-group m-2">
                                                            <div>
                                                                <div className="custom-checkbox custom-control">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        id={`${index}`}
                                                                        name="Show"
                                                                        type="checkbox"
                                                                        value={item.active}
                                                                        checked={item.active ? "checkbox" : null}
                                                                        onChange={(e) => this.updateActive(e.target.value, index)}
                                                                    />
                                                                    <input name="Show" type="hidden" value="false" />
                                                                    <label className="custom-control-label" htmlFor={`${index}`}>Active</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>





                                            </div>
                                        </React.Fragment>
                                    )
                                })}



                                <div className="card-footer">
                                    <div className="col-md-12 mb-0 text-center">
                                        {!this.state.Updateloading ? (
                                            <>
                                                <input type="submit" name="created" value="SAVE" className="btn-wide btn btn-success" onClick={() => this.checkFeed()} />
                                            </>
                                        ) : (
                                            <div className="btn-wide btn ">
                                                <TailSpin color="#00BFFF" height={30} width={50} ariaLabel='loading' />
                                            </div>
                                        )}
                                    </div>
                                </div>




                            </div>
                        )}




                        {/* ---------------------------------------------------------------------------------------------------- */}




                    </div>


                </div>
            </div>
        );
    }
}
