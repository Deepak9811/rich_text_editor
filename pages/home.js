import React, { Component } from 'react'
// import {EditorState} from "draft-js";

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
// import { convertFromRaw, convertToRaw } from 'draft-js';
import { FiUsers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from 'next/link';

import { TailSpin } from 'react-loader-spinner'


export default class ArticleEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            profileImg: [],
            heading: "",
            showChngPass: false,
            order: "",
            system: "",
            app: '',
            loading: false,
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))

        // this.props.handleContent(
        //     convertToRaw(editorState.getCurrentContent()
        // ));
    };

    // uploadImageCallBack = async (file) => {
    //     const imgData = await apiClient.uploadInlineImageForArticle(file);
    //     console.log(imgData)
    //     return Promise.resolve({
    //         data: {
    //             link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
    //         }
    //     });
    // }


    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    profileImg: reader.result.replace("data:image/png;base64,", " ")
                })
                console.log("profile :- ", reader.result.replace("data:image/png;base64,", " "))
            }
        }
        reader.readAsDataURL(e.target.files[0])

        // console.log("profile :- ",this.state.profileImg)
    }


    checkSaveContent() {
        if (this.state.heading != "" && this.state.editorState != "") {
            this.setState({
                loading: true,
            })
            this.saveContent()
        } else {
            this.setState({
                loading: false,
            })
            alert("Please fill the contents...")
        }
    }

    saveContent() {

        const { editorState, heading, order, system, app, profileImg } = this.state;
        fetch(`http://192.168.1.217:1003/api/savecontent`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                contentId: "",
                libcode: "CLBITSOM",
                heading: heading,
                text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                SortOrder: order,
                imageType: ".jpg",
                Active: system,
                Show: app,
                contentimage: profileImg
            })
        }).then((result) => {
            result.json().then((resp) => {
                console.log("response :- ", resp)
                if (resp.response === "Success") {
                    this.setState({
                        loading: false,
                    })
                } else {
                    this.setState({
                        loading: false,
                    })
                    alert("Something wents wrong.")
                }
            })
        }).catch((error) => {
            this.setState({
                loading: false,
            })
            console.log("There is problem in your credentials." + error.message)
        }

        )
    }


    reset(){
        this.setState({
            editorState: "",
            profileImg: [],
            heading: "",
            order: false,
            system: false,
            app: false,
        })
    }





    render() {
        const { editorState, heading, order, system, app, profileImg } = this.state;
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
                                CONTENT - ADD/UPDATE
                                <div className="page-title-subheading">
                                    <p>Enter the details and click on SAVE button to save the details.</p>
                                </div>
                            </div>
                        </div>
                        <div className="page-title-actions">
                            <Link href="/showcontent">
                                <a>
                                    <button type="button" className="mr-1 btn btn-success" >
                                        <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}Show Contents
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
                            <div className="col-md-8 mb-1">
                                <label>Heading</label><span className="text-danger">*</span>

                                <input
                                    type="text"
                                    value={heading}
                                    onChange={(e) =>
                                        this.setState({ heading: e.target.value })
                                    }
                                    className="form-control"
                                    placeholder="Heading Name..."
                                    required=""
                                    autoFocus=""
                                    autoComplete="on"
                                />

                            </div>

                            <div className="col-md-3 mb-1 mt-1">
                                <label>Image</label>
                                <input
                                    className="form-control-file"
                                    id="contentimage"
                                    name="contentimage"
                                    type="file"
                                    value=""
                                    accept='image/*'
                                    onChange={this.imageHandler} />


                            </div>

                            <div className="col-md-1 mb-1">
                                <img src={profileImg} alt="" className='preImage' />
                            </div>
                        </div>


                        {/* <Link href="/newTexteditor">
                        <a ><h1>Next</h1></a>
                    </Link> */}
                        <div className="mrt-2">
                            <label>Content Description</label>
                            <span className="text-danger">*</span>
                        </div>

                        <div className="textEditor">



                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbar-class"
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                onEditorStateChange={this.onEditorStateChange}
                                // toolbarOnFocus
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'history'],
                                    inline: { inDropdown: false },
                                    list: { inDropdown: false },
                                    textAlign: { inDropdown: false },
                                    link: { inDropdown: false },
                                    history: { inDropdown: false },
                                    // image: {
                                    //     urlEnabled: false,
                                    //     uploadEnabled: false,
                                    //     uploadCallback: this.uploadImageCallBack,
                                    //     previewImage: false,
                                    //     alignmentEnabled: false,
                                    //     alt: { present: false, mandatory: false }
                                    // },
                                }}
                            />
                            {/* <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    /> */}
                        </div>


                        <div className="form-row" style={{ marginTop: '2%', marginBottom: "2%" }}>
                            <div className="col-md-2 mb-1" >
                                <label>Sort Order</label><span className="text-danger">*</span>
                                <input
                                    className="form-control"
                                    id="SortOrder"
                                    name="SortOrder"
                                    type="number"
                                    value={order}
                                    onChange={(e) => this.setState({
                                        order: e.target.value,
                                    })}
                                />
                            </div>


                            <div className="col-md-3 mb-1" style={{ marginLeft: '8%' }}>
                                <label>Keep Active in the System</label>
                                <div className="position-relative form-group m-2">
                                    <div>
                                        <div className="custom-checkbox custom-control">
                                            <input
                                                className="custom-control-input"
                                                id="exampleCustomInline6"
                                                name="Active"
                                                type="checkbox"
                                                onChange={() =>
                                                    this.setState({
                                                        system: system ? false : true,
                                                    })
                                                }
                                            />

                                            <input name="Active" type="hidden" value="false" />
                                            <label className="custom-control-label" htmlFor="exampleCustomInline6">Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 mb-1" style={{ marginLeft: '8%' }}>
                                <label>Keep showing on the app</label>
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
                                                        app: app ? false : true,
                                                    })
                                                }
                                            />
                                            <input name="Show" type="hidden" value="false" />
                                            <label className="custom-control-label" htmlFor="exampleCustomInline1">Show</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="card-footer">
                            <div className="col-md-12 mb-0 text-center">
                                {!this.state.loading ? (
                                    <>
                                        <input
                                            type="submit"
                                            name="created"
                                            value="SAVE"
                                            className="btn-wide btn btn-success"
                                            onClick={() => this.checkSaveContent()}
                                        />
                                        <input
                                            type="reset"
                                            value="RESET"
                                            className="btn-wide btn btn-light"
                                            id="btnClear"
                                            style={{ marginLeft: "2%" }}
                                            onClick={()=>this.reset()}
                                        />
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
        )
    }
}