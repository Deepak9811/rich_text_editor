import React, { Component } from 'react'

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { FiUsers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from 'next/link';

import DatePicker from "react-datepicker";
import { TailSpin } from 'react-loader-spinner'

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
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

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // this.props.handleContent(
    //     convertToRaw(editorState.getCurrentContent()
    // ));
  };


  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          showimage: reader.result
        })
        let png = reader.result
        png = png.includes('data:image/png;base64,')

        let jpg = reader.result
        jpg = jpg.includes('data:image/jpg;base64,')

        let jpeg = reader.result
        jpeg = jpeg.includes('data:image/jpeg;base64,')

        if (png === true) {
          let data = reader.result.replace("data:image/png;base64,", " ")
          this.setState({
            profileImg: data
          })
          console.log("replace png :- ", data)
        } else if (jpg === true) {
          let data = reader.result.replace("data:image/jpg;base64,", " ")
          this.setState({
            profileImg: data
          })
          console.log("replace jpg :- ", data)
        } else if (jpeg === true) {
          let data = reader.result.replace("data:image/jpeg;base64,", " ")
          this.setState({
            profileImg: data
          })
          console.log("replace jpeg :- ", data)
        }
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }




  checkSaveContent() {
    if (this.state.eventName != "" && this.state.editorState != "") {
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

    const { editorState, eventName, physical, system, virtual, profileImg, validFrom, validUpto, location, registrationLink, type } = this.state;
    fetch(`http://192.168.1.217:1003/api/saveevent`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        libcode: "CLBITSOM",
        eventName: eventName,
        type: type,
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        organiser: "BITSoM",
        imageType: ".jpg",
        virtualMode: virtual,
        physicalMode: physical,
        validFrom: validFrom,
        validUpto: validUpto,
        location: location,
        registrationLink: registrationLink,
        active: system,
        contentImage: profileImg
      })
    }).then((result) => {
      result.json().then((resp) => {
        console.log("response :- ", resp)
        if (resp.response === "Success") {
          this.state.physical = false,
            this.state.system = false,
            this.state.virtual = false,
            this.setState({
              loading: false,
              editorState: "",
              eventName: "",

              profileImg: "",
              validFrom: "",
              validUpto: "",
              location: "",
              registrationLink: "",
              type: ""
            })
          alert(resp.message)
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
      loading: false,
      editorState: "",
      eventName: "",

      profileImg: "",
      validFrom: "",
      validUpto: "",
      location: "",
      registrationLink: "",
      type: ""
    })
}


  render() {
    const { editorState, eventName, physical, system, virtual, profileImg, validFrom, validUpto, location, registrationLink, type } = this.state;
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
                EVENT - ADD/UPDATE
                <div className="page-title-subheading">
                  <p>Enter the details and click on SAVE button to save the details.</p>
                </div>
              </div>
            </div>
            <div className="page-title-actions">
              <Link href="/showevent">
                <a>

                  <button type="button" className="mr-1 btn btn-success" >
                    <BsQuestionCircle className="fa pe-7s-help1" style={{ marginBottom: "3%" }} /> {" "}Show Events
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>



        <div className='txtb'>


          <div className="card-header bg-info text-white">CONTENT DETAILS</div>

          <div style={{ padding: "1.25rem" }}>
            <div className="form-row mb-1">
              <div className="col-md-8 mb-1">
                <label>Event Name</label><span className="text-danger">*</span>

                <input
                  type="text"
                  value={eventName}
                  onChange={(e) =>
                    this.setState({ eventName: e.target.value })
                  }
                  className="form-control"
                  placeholder="Event Name..."
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />
              </div>

              <div className="col-md-3 mb-1 ">
                <label>Image</label>
                <input
                  className="form-control-file"
                  id="contentimage"
                  name="contentimage"
                  type="file"
                  value=""
                  accept="image/*"
                  onChange={this.imageHandler} />


              </div>

              <div className="col-md-1 mb-1">
                <img src={this.state.showimage} alt="" className='preImage' />
              </div>
            </div>


            <div className="form-row">
              <div className="col-md-8 mb-1">
                <label>Location</label><span className="text-danger">*</span>

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

              <div className="col-md-3 mb-1 ">
                <label>valid From</label><span className="text-danger">*</span>
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
            </div>

            <div className="form-row">
              <div className="col-md-8 mb-1">
                <label>Registration Link</label><span className="text-danger">*</span>

                <input
                  type="text"
                  value={registrationLink}
                  onChange={(e) =>
                    this.setState({ registrationLink: e.target.value })
                  }
                  className="form-control"
                  placeholder="Registration Link..."
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />
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
            </div>

            <div className="form-row">
              <div className="col-md-3 mb-1">
                <label>Type</label><span className="text-danger">*</span>

                <input
                  type="text"
                  value={type}
                  onChange={(e) =>
                    this.setState({ type: e.target.value })
                  }
                  className="form-control"
                  placeholder="Type..."
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />
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

              <div className="col-md-3 mb-1" >
                <label>Is Physical Mode</label>
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
                            physical: physical ? false : true,
                          })
                        }
                      />

                      <input name="Active" type="hidden" value="false" />
                      <label className="custom-control-label" htmlFor="exampleCustomInline6">Physical</label>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-md-3 mb-1" style={{ marginLeft: '8%' }}>
                <label>Is Virtual Mode</label>
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



              <div className="col-md-3 mb-1" style={{ marginLeft: '8%' }}>
                <label>Keep Active in the System</label>
                <div className="position-relative form-group m-2">
                  <div>
                    <div className="custom-checkbox custom-control">
                      <input
                        className="custom-control-input"
                        id="systemActivity"
                        name="Active"
                        type="checkbox"
                        onChange={() =>
                          this.setState({
                            system: system ? false : true,
                          })
                        }
                      />

                      <input name="Active" type="hidden" value="false" />
                      <label className="custom-control-label" htmlFor="systemActivity">Active</label>

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




