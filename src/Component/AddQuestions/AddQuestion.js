import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import "./AddQuestion.css";
import { Button } from "@mui/material";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

function AddQuestion() {

    
    var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
    const [loading,setLoading]= useState(false);

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const navigate= useNavigate();

    const handleChange = (value) => {
        setTags(value);
    }

    const handleQuill = (value) => {
        setBody(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( title !== "" && body!== "" ){
            setLoading(true);
            const bodyJSON = {
                title: title,
                body: body,
                tag: JSON.stringify(tags),
                created: dateTime,
                answer: [],
                comment: [],
            }

            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/");

            }
            else{
            await axios.post("http://localhost:3001/question/create",{
                question:{
                
                    title:bodyJSON.title,
                    body: bodyJSON.body,
                    tag: bodyJSON.tag,
                    created: bodyJSON.created,
                    answerDetails: bodyJSON.answer,
                    commentDetails: bodyJSON.comment,
                }}, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            }).then ((res) => {
                alert("Question added Successfully");
                navigate("/stack");
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
        }
    }
    return (
        <>
        
        <div className="add-question">
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>Be specific and imagine you're asking question to another person.</small>
                                <input value= {title} onChange={(e) => setTitle(e.target.value)}
                                type="text" placeholder="Add question title.." />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Body</h3>
                                <small>Include all the information,someone interested will answer to your question</small>
                                <ReactQuill value={body} onChange= {handleQuill} className="react-quill" theme="snow" />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Tags</h3>
                                <small>Add up to 5 tags to describe what your question is about.</small>
                                <TagsInput inputProps={{
                                    placeholder: 'Enter tags'
                                }}
                                    className='tag-box react-tagsinput'
                                    maxTags={5}
                                    value={tags}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <Button disabled={loading} variant="contained" style={{ width: "fit-content", margin: "10px 0px", }}
                type="submit" onClick={handleSubmit}
                >{ loading ? "Adding Question ..." : "Add Question"} </Button>
            </div>
        </div>
       </>
    );
}

export default AddQuestion;