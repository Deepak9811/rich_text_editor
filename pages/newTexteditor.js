import React, { Component } from 'react';
import dynamic from 'next/dynamic';
// import JoditEditor from "jodit-react";


const JoditEditor = dynamic(
    () => import('jodit-react').then(mod => mod.JoditEditor),
    { ssr: false }
)



export default class newTexteditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: null,
            content:"",
            readonly: true
        };
    }

    // componentDidCatch(){
    //     config = {
    //         readonly: false // all options from https://xdsoft.net/jodit/doc/
    //     }
    // }

    render() {
        return (
            <div className='txt'>
                <JoditEditor
                    ref={this.state.editor}
                    value={this.state.content}
                    config={ this.state.readonly= false}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => { }}
                />
            </div>
        )
    }
}
