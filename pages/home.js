import React, { Component } from 'react'
// import {EditorState} from "draft-js";

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
// import { convertFromRaw, convertToRaw } from 'draft-js';



const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from 'next/link';




export default class ArticleEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
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

    uploadImageCallBack = async (file) => {
        const imgData = await apiClient.uploadInlineImageForArticle(file);
        console.log(imgData)
        return Promise.resolve({
            data: {
                link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
            }
        });
    }
    render() {
        const { editorState } = this.state;
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        return (
            <div className='txt'>
                <div className='txtb'>

                    {/* <Link href="/newTexteditor">
                        <a ><h1>Next</h1></a>
                    </Link> */}

                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbar-class"
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        onEditorStateChange={this.onEditorStateChange}
                        // toolbarOnFocus
                        // toolbar={{
                        //     // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                        //     // inline: { inDropdown: true },
                        //     // list: { inDropdown: true },
                        //     // textAlign: { inDropdown: true },
                        //     // link: { inDropdown: true },
                        //     // history: { inDropdown: true },
                        //     // image: {
                        //     //     urlEnabled: true,
                        //     //     uploadEnabled: true,
                        //     //     uploadCallback: this.uploadImageCallBack,
                        //     //     previewImage: true,
                        //     //     alignmentEnabled: true,
                        //     //     alt: { present: false, mandatory: false }
                        //     // },
                        // }}
                    />
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                </div>
            </div>
        )
    }
}