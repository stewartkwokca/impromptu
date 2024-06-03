import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api_url = "http://localhost:8000";

const Prompt = ({user}) => {
    const [prompt, setPrompt] = useState("");
    const [editorContent, setEditorContent] = useState("Start editing...");
    const [charCount, setCharCount] = useState(0);
    const [maxMsg, setMaxMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        axios.get(`${api_url}/prompt`).then((res, err) => {
            console.log(res);
            setPrompt(res.data.text);
        }).catch((err) => {
                console.log(err);
            })
    }, [])

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    }

    const handleInput = (e) => {
        const content = e.currentTarget.innerHTML;
        setEditorContent(content);
        setCharCount(content.length);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) { {
          // if the account does exist
          console.log(e);
          const content = editorContent;
          if (content.length > 135) {
            //console.log("Please have less than 135 characters");
            setMaxMsg(true);
            return;
          }
          axios.post(`${api_url}/prompt/submit`, {"user": user.username, "text": content}, {withCredentials: true}).then((res, err) => {
            setSuccessMsg(true);
          }).catch((err) => {
            console.log("Got error: ")
            console.log(err);
          })
        }
      };
    }

    return (
        <div className="center">
            {maxMsg && <div className="flex justify-center items-center mb-3"><div className="w-full max-w-md p-8 rounded-lg shadow-md text-center bg-red-500"><h2 className="text-lg text-center font-bold text-white">Please use fewer than 135 characters</h2></div></div>}
            {successMsg && <div className="flex justify-center items-center mb-3"><div className="w-full max-w-md p-8 rounded-lg shadow-md text-center bg-green-500"><h2 className="text-lg text-center font-bold text-white">Successfully submitted!</h2></div></div>}
            <div className="place-content-center">
                <h1 className="text-2xl font-bold text-center mb-4">Prompt</h1>
                <p className="text-lg text-center mb-3">{prompt}</p>
            </div>
            {/* Rich Text Editor */}
            <div style={{ position: "relative" }}>
                <div id="editor"
                    contentEditable="true"
                    onInput={handleInput}
                    style={{ border: "1px solid #ccc", minHeight: "300px", padding: "10px" }}>
                </div>
                <div style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "10px",
                    fontSize: "12px",
                    color: "#888"
                }}>
                    {charCount}/135
                </div>
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
            <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "10px" }} className="mb-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Prompt;