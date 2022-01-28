import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { TailSpin } from 'react-loader-spinner'
import Link from 'next/link';
import { FiUsers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";

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
            virtual: false,
            system: false
        };
    }



    render() {
        const { eventName, physical, system, virtual, profileImg, validFrom, validUpto, location, registrationLink, type } = this.state;
        console.log(this.state)
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



                        <div className="form-row">
                            <div className="col-md-3 mb-1 ">
                                <label>Type</label><span className="text-danger">*</span>
                                <div className="position-relative form-group ">

                                    <DatePicker
                                        selected={validFrom}
                                        onChange={(date) => this.setState({ validFrom: date })}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                        className='form-control'
                                    />
                                </div>
                            </div>

                            <div className="col-md-8 mb-1">
                                <label>Heading</label><span className="text-danger">*</span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        this.setState({ location: e.target.value })
                                    }
                                    className="form-control"
                                    placeholder="location..."
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
                                        value={registrationLink}
                                        onChange={(e) =>
                                            this.setState({ registrationLink: e.target.value })
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
                                                onChange={() =>
                                                    this.setState({
                                                        virtual: virtual ? false : true,
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
                                        <input type="submit" name="created" value="SAVE" className="btn-wide btn btn-success" onClick={() => this.checkSaveContent()} />
                                        <input type="reset" value="RESET" className="btn-wide btn btn-light" id="btnClear" style={{ marginLeft: "2%" }} />


                                    </>
                                ) : (
                                    <div className="btn-wide btn ">
                                        <TailSpin color="#00BFFF" height={30} width={50} ariaLabel='loading' />
                                    </div>
                                )}



                            </div>

                        </div>




                    </div>


                </div>
            </div>
        );
    }
}
