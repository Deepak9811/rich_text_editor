
import React, { Component, Props } from "react";
import { FaClipboardList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import { TailSpin } from 'react-loader-spinner'
import Link from "next/link";
import Router from "next/router";


export default class showcontent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentData: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch(`http://192.168.1.217:1003/api/showcontent?libid=CLBITSOM&id=0`, {
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


    editContent(item) {
        // console.log(item.contentId)
        let contentId = item.contentId
        // contentId = this.props
        // console.log(this.state.contentId)
        // this.props.contentId
        // console.log(this.props.match.params.contentId)
        Router.push(`/home?id=${contentId}`,)
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
                                    CONTENT LIST
                                    <div className="page-title-subheading">
                                        Click on New Content to add new content to the system.
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                <Link href="/home">
                                    <a>
                                        <button type="button" className="mr-1 btn btn-success" >
                                            <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}
                                            New Content
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
                                                <th>Heading</th>
                                                <th>SortOrder</th>
                                                <th>Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {this.state.contentData.map((item, i) => {
                                                console.log(item.Active)
                                                return (
                                                    <React.Fragment key={i}>
                                                        <tr >
                                                            <td>{item.heading}</td>
                                                            <td>{item.SortOrder}</td>
                                                            <td><p>{item.Active.toString()}</p></td>
                                                            <td className="edt" onClick={() => { this.editContent(item), this.props.item }} id={item.contentId}>
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
