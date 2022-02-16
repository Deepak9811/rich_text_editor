// // // // import React, { Component } from 'react';

// // // // export default class imageP extends Component {
// // // //     constructor(props) {
// // // //       super(props)

// // // //       this.state = {
// // // //          profileImg:"data:image/jpeg;base64,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"
// // // //       }
// // // //     }


// // // //     imageHandler = (e) =>{
// // // //         const reader = new FileReader();
// // // //         reader.onload = ()=> {
// // // //             if(reader.readyState === 2){
// // // //                 this.setState({
// // // //                     profileImg:reader.result
// // // //                 })
// // // //             }
// // // //         }
// // // //         reader.readAsDataURL(e.target.files[0])
// // // //     }

// // // //   render() {
// // // //     return (
// // // //     <div>
// // // //         hello
// // // //         <img src={this.state.profileImg} alt="" id='img' />
// // // //         <input type="file" name='image-upload' id='input' accept='image/*' onChange={this.imageHandler} />

// // // //         <div>
// // // //             <label htmlFor="input">
// // // //                 click
// // // //             </label>
// // // //         </div>
// // // //     </div>);
// // // //   }
// // // // }



// // // import React, { Component } from 'react';
// // // import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
// // // // import { Editor } from 'react-draft-wysiwyg';
// // // import draftToHtml from 'draftjs-to-html';
// // // // import htmlToDraft from 'html-to-draftjs';
// // // import dynamic from 'next/dynamic';
// // // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// // // const Editor = dynamic(
// // //     () => import('react-draft-wysiwyg').then(mod => mod.Editor),
// // //     { ssr: false }
// // // )



// // // let htmlToDraft = null;
// // // if (typeof window === 'object') {
// // //     htmlToDraft = require('html-to-draftjs').default;
// // // }

// // // export default class EditorConvertToHTML extends Component {
// // //     constructor(props) {
// // //         super(props);
// // //         this.state = {
// // //             editorState: EditorState.createEmpty(),
// // //             contentState: ""
// // //         }
// // //     }

// // //     componentDidMount() {

// // //         const html = '<p>Hey this <strong>editor</strong> rocks d😀</p>';
// // //         const contentBlock = htmlToDraft(html);
// // //         console.log(contentBlock)
// // //         if (contentBlock) {
// // //             const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
// // //             const editorState = EditorState.createWithContent(contentState);
// // //             console.log(editorState)
// // //             this.setState(
// // //                 {
// // //                     editorState: EditorState.createWithContent(
// // //                         ContentState.createFromBlockArray(
// // //                             convertFromHTML(html)
// // //                         )
// // //                     )
// // //                 }
// // //             )


// // //             // this.setState({
// // //             //     editorState: EditorState.createWithContent(
// // //             //         ContentState.createFromBlockArray(
// // //             //             convertFromHTML(html)
// // //             //         )
// // //             //     )
// // //             // })
// // //         }



// // //     }

// // //     onEditorStateChange = (editorState) => {
// // //         this.setState({
// // //             editorState,
// // //         });
// // //     };

// // //     render() {
// // //         const { editorState, contentState } = this.state;
// // //         console.log(this.state.editorState.getCurrentContent())
// // //         return (
// // //             <div className='txt' id='pddd'>
// // //                 <Editor
// // //                     editorState={editorState}
// // //                     wrapperClassName="demo-wrapper"
// // //                     editorClassName="demo-editor"
// // //                     onEditorStateChange={this.onEditorStateChange}
// // //                 />
// // //                 <textarea
// // //                     disabled
// // //                     value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
// // //                 />
// // //             </div>
// // //         );
// // //     }
// // // }

// // import React, { Component } from 'react';
// // import DatePicker from 'react-datepicker';
// // import addDays from 'date-fns/addDays'
// // import "react-datepicker/dist/react-datepicker.css";

// // class App extends Component {
// //   constructor (props) {
// //     super(props)
// //     this.state = {
// //       startDate: new Date()
// //     };
// //     this.handleChange = this.handleChange.bind(this);
// //     this.onFormSubmit = this.onFormSubmit.bind(this);
// //   }
// //   handleChange(date) {
// //     this.setState({
// //       startDate: date
// //     })
// //   }
// //   onFormSubmit(e) {
// //     e.preventDefault();
// //     console.log(this.state.startDate)
// //   }
 
// //   render() {
// //     return (
// //       <form onSubmit={ this.onFormSubmit }>
// //         <div className="form-group">
// //           <DatePicker
// //               selected={ this.state.startDate }
// //               onChange={ this.handleChange }
// //               showTimeSelect
// //               timeFormat="HH:mm"
// //               timeIntervals={20}
// //               timeCaption="time"
// //               dateFormat="MMMM d, yyyy h:mm aa"
// //               minDate={new Date()}
// //               maxDate={addDays(new Date(), 7)}
// //           />
// //           <button className="btn btn-primary">Show Date</button>
// //         </div>
// //       </form>
// //     );
// //   }
  
// // }
// // export default App;

// import React from 'react';
// import TextField from '@material-ui/core/TextField';

// const App = () => {

// return (
// 	<div style={{
// 	margin: 'auto',
// 	display: 'block',
// 	width: 'fit-content'
// 	}}>
// 	<h3>How to create Time Picker in ReactJS?</h3>
// 	<TextField
// 		label="Choose Time"
// 		defaultValue="04:20"
// 		type="time"
// 		InputLabelProps={{
// 		shrink: true,
// 		}}
// 		// 5 minutes
// 		inputProps={{
// 		step: 300,
// 		}}
// 	/>
// 	</div>
// );
// }

// export default App;
