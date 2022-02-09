import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div style={{marginLeft:'20%',width:'900px',marginTop:'50px',marginBottom:'2%'}}>
        <div>
          <div className="app-page-title">
            <div className="page-title-wrapper">
              <div className="page-title-heading">
                <div className="page-title-icon">
                  <svg viewBox="0 0 640 512">
                    <path
                      fill="currentColor"
                      d="M480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm0-160c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm0-192c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80zm80.1 212c-33.4 0-41.7 12-80.1 12-38.4 0-46.7-12-80.1-12-36.3 0-71.6 16.2-92.3 46.9C7.2 341.3 0 363.4 0 387.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-44.8c0-23.8-7.2-45.9-19.6-64.3-20.7-30.7-56-46.9-92.3-46.9zM352 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-44.8c0-16.6 4.9-32.7 14.1-46.4 13.8-20.5 38.4-32.8 65.7-32.8 27.4 0 37.2 12 80.2 12s52.8-12 80.1-12c27.3 0 51.9 12.3 65.7 32.8 9.2 13.7 14.1 29.8 14.1 46.4V432zm271.7-114.9C606.4 291.5 577 278 546.8 278c-27.8 0-34.8 10-66.8 10s-39-10-66.8-10c-13.2 0-26.1 3-38.1 8.1 15.2 15.4 18.5 23.6 20.2 26.6 5.7-1.6 11.6-2.6 17.9-2.6 21.8 0 30 10 66.8 10s45-10 66.8-10c21 0 39.8 9.3 50.4 25 7.1 10.5 10.9 22.9 10.9 35.7V408c0 4.4-3.6 8-8 8H416c0 17.7.3 22.5-1.6 32H600c22.1 0 40-17.9 40-40v-37.3c0-19.9-6-38.3-16.3-53.6z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <label style={{ marginRight: "40%" }}>
                    CONTENT - ADD/UPDATE
                  </label>

                  <div className="page-title-subheading">
                    <p>
                      Enter the details and click on SAVE button to save the
                      details.
                    </p>
                  </div>
                </div>
              </div>
              <div className="page-title-actions">
                <button
                  type="button"
                  className="mr-1 btn btn-success"
                  onClick="location.href='/Contents/List/)'"
                >
                  <svg className="svgshowcontent" viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                    ></path>
                  </svg>
                  Show Contents
                </button>
              </div>
            </div>
          </div>

          <div className="main-card mb-0 card">
            <div className="card-header bg-info text-white">CONTENT DETAILS</div>
            <div className="card-body">
              <div className="form-row">
                <div className="col-md-8 mb-1">
                  <label style={{ float: "left" }}>Heading</label>
                  <span style={{ float: "left" }} className="text-danger">
                    *
                  </span>
                  <input
                    className="contentheading"
                    data-val="true"
                    data-val-required="Enter the heading"
                    id="heading"
                    name="heading"
                    placeholder="Content heading..."
                    type="text"
                  ></input>
                  <span
                    className="field-validation-valid text-danger"
                   
                  ></span>
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-3 mb-1 mt-1">
                  <label>Image</label>
                  <input
                    className="form-control-file"
                    id="contentimage"
                    name="contentimage"
                    type="file"
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-12 mb-1">
                <label style={{ float: "left", marginLeft: "2%" }}>
                  Content Description
                </label>
                <span style={{ float: "left" }} className="text-danger">
                  *
                </span>
              </div>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="form-row" style={{ marginTop: "2%" }}>
              <div className="col-md-2 mb-1">
                <label style={{ float: "left", marginLeft: "12.5%" }}>
                  Sort Order
                </label>
                <span style={{ float: "left" }} className="text-danger">
                  *
                </span>
                <input type="number" className="sortinput"></input>
              </div>

              <div className="col-md-3 mb-1" style={{ marginLeft: "8%" }}>
                <label>Keep Active in the System</label>
                <div className="position-relative form-group m-2">
                  <div>
                    <div
                      className="custom-checkbox custom-control"
                      style={{ marginRight: "47%" }}
                    >
                      <input
                        className="custom-control-input"
                        data-val="true"
                        data-val-required="The Active field is required."
                        id="exampleCustomInline6"
                        name="Active"
                        type="checkbox"
                        value="true"
                      ></input>
                      <input name="Active" type="hidden" value="false"></input>

                      <label
                        className="custom-control-label"
                        htmlFor="exampleCustomInline6"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-1" style={{ marginLeft: "8%" }}>
                <label>Keep showing on the app</label>
                <div className="position-relative form-group m-2">
                  <div>
                    <div
                      className="custom-checkbox custom-control"
                      style={{ marginRight: "47%" }}
                    >
                      <input
                        className="custom-control-input"
                        data-val="true"
                        data-val-required="The Show field is required."
                        id="exampleCustomInline1"
                        name="Show"
                        type="checkbox"
                        value="true"
                      ></input>
                      <input name="Show" type="hidden" value="false"></input>
                      <label
                        className="custom-control-label"
                        htmlFor="exampleCustomInline1"
                      >
                        Show
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="col-md-12 mb-0 text-center">
                <input
                  style={{ marginRight: "1%" }}
                  type="submit"
                  name="created"
                  value="SAVE"
                  className="btn-wide btn btn-success"
                ></input>
                <input
                  type="reset"
                  value="RESET"
                  className="btn-wide btn btn-light"
                  id="btnClear"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
