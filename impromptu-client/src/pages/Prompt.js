import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api_url = "http://localhost:8000";

const Prompt = () => {
    const [tops, setTops] = useState([]);
    const [editorContent, setEditorContent] = useState("Start editing...");

    useEffect(() => {
        axios.get(`${api_url}/prompt`).then((res, err) => {
            console.log(res);
            setTops(res.data.prompt);
        }).catch((err) => {
                console.log(err);
            })
    }, [])

    const renderItems = tops.map((content, index) => 
        <div className="border rounded border-sky-300 first:text-amber-400 place-content-center">
            <p className="mx-8 my-2">{content.response}</p>
        </div>
    );

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    }

    const insertImage = () => {
        const url = prompt('Enter the image URL:');
        if (url) {
            document.execCommand('insertImage', false, url);
        }
    }

    return (
        <div className="center">
            <div className="place-content-center">
                <h1 className="text-2xl font-bold text-center mb-10">Prompt</h1>
            </div>
            <div className="mx-20 grid grid-cols-2 gap-4 flex">
                {renderItems}
            </div>
            {/* Rich Text Editor */}
            <div className="toolbar">
                <button onClick={() => formatText('bold')}><b>B</b></button>
                <button onClick={() => formatText('italic')}><i>I</i></button>
                <button onClick={() => formatText('underline')}><u>U</u></button>
                <button onClick={() => formatText('strikeThrough')}><s>S</s></button>
                <button onClick={() => formatText('justifyLeft')}>Left</button>
                <button onClick={() => formatText('justifyCenter')}>Center</button>
                <button onClick={() => formatText('justifyRight')}>Right</button>
                <button onClick={() => formatText('justifyFull')}>Justify</button>
                <button onClick={() => formatText('insertOrderedList')}>OL</button>
                <button onClick={() => formatText('insertUnorderedList')}>UL</button>
                <button onClick={() => formatText('createLink', prompt('Enter URL:'))}>Link</button>
                <button onClick={insertImage}>Image</button>
                <button onClick={() => formatText('removeFormat')}>Clear</button>
                <select onChange={(e) => formatText('fontSize', e.target.value)}>
                    <option value="1">Small</option>
                    <option value="3">Normal</option>
                    <option value="5">Large</option>
                </select>
                <input type="color" onChange={(e) => formatText('foreColor', e.target.value)}/>
                <button onClick={() => formatText('hiliteColor', prompt('Enter a background color:'))}>Highlight</button>
                <select onChange={(e) => formatText('fontName', e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>
            <div id="editor" 
                 contentEditable="true" 
                 dangerouslySetInnerHTML={{__html: editorContent}}
                 onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
                 style={{border: "1px solid #ccc", minHeight: "300px", padding: "10px"}}>
            </div>
            {/* Inline CSS for simplicity */}
            <style>{`
                .toolbar {
                    margin-bottom: 10px;
                }
                .toolbar button, .toolbar select, .toolbar input[type="color"] {
                    margin-right: 5px;
                    padding: 5px;
                    font-size: 16px;
                }
                #editor {
                    border: 1px solid #ccc;
                    min-height: 300px;
                    padding: 10px;
                }
            `}</style>
        </div>
    );
}

export default Prompt;