import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { Bookmark, History } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import ReactHtmlParser from "react-html-parser";

function MainQuestion() {
    const [show,setShow]= useState(false);

    const navigate= useNavigate();

    const [questionData, setQuestionData] = useState();

    let search= window.location.search
    const params= new URLSearchParams(search);
    const id= params.get("q");

    useEffect( () => {
        async function getQuestionDetails() {

            
            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/");

            }
            else{
            await axios.get(`https://stackoverflow-clone-kxvr.onrender.com/question/get/${id}`,{
                headers: {
                    accesstoken: localStorage.getItem("token"),
                }
            }).then ((res) => {
            console.log(res.data);    
            setQuestionData(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
        getQuestionDetails();
    },[id]);

        return(
       <div className="main">
        <div className="main-container">
            <div className="main-top">
                <h2 className="main-question">{questionData.title} </h2>
                <Link to= "/add-question">
                    <Button variant="contained">Add Question</Button>
                </Link>
            </div>
            <div className="main-desc">
                <div className="info">
                    <p>{questionData.created} </p>
                    <p>Active <span>today</span></p>
                    <p>viewed <span>43 times</span></p>
                </div>
            </div>
            <div className="all-question">
                <div className="all-question-container">
                    <div className="all-question-left">
                        <div className="all-options">
                            <p className="arrow">▲</p>
                            <p className="arrow">0</p>
                            <p className="arrow">▼</p>
                            <Bookmark/>
                            <History/>
                        </div>
                    </div>
                    <div className="question-answer">
                        <p>{ReactHtmlParser(questionData.body)}</p>
                        <div className="author">
                            <small>asked "TimeStamp"</small>
                            <div className="auth.details">
                                <Avatar/>
                                <p>Author Name</p>
                            </div>
                        </div>
                        <div className="comments">
                            <div className="comment">
                                <p>This is comment <span>user name</span> <small>TimeStamp</small></p>
                            </div>
                            <p onClick={ () => setShow(!show)}>Add a Comment</p>
                            {show && (<div className="title">
                                <textarea type="text" 
                                placeholder="Add your Comment"
                                rows={5}
                                style={{ margin: "5px 0px",
                                padding: "10px",
                                border: "1px solid rgba(0,0,0,0.2)",
                                borderRadius: "3px",
                                outline: "none",
                            }}
                                >
                                </textarea>
                                <Button variant="contained" style={{ maxWidth: "fit-content"}}>Add Comment</Button>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="all-question" style={{flexDirection: "column"}}>
                <p style={{fontSize: "22px",
                margin: "10px 0",
                fontWeight: "400"
            }}>{questionData.answerDetails.length} </p>
                <div className="all-question-container">
                    <div className="all-question-left">
                        <div className="all-options">
                            <p className="arrow">▲</p>
                            <p className="arrow">0</p>
                            <p className="arrow">▼</p>
                            <Bookmark/>
                            <History/>
                        </div>
                    </div>
                    <div className="question-answer">
                        <p>This is Question Body</p>
                        <div className="author">
                            <small>asked "TimeStamp"</small>
                            <div className="auth.details">
                                <Avatar/>
                                <p>Author Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="main-answer">
            <h3>Your Answers</h3>
            <ReactQuill className="react-quill" theme="snow" style={{ height: "200px"}} />
        </div>
        <Button variant="contained" style={{ maxWidth: "fit-content", margin: "70px"}}>Post your answer</Button>
       </div>
    )
}

export default MainQuestion;
