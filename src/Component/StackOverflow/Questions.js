import React from "react";
import { Link } from "react-router-dom";
import "./css/Questions.css";
import {Avatar} from "@mui/material";
import ReactHtmlParser from "react-html-parser";


function Questions({question}) {

  let tags= JSON.parse(question.tag);
    
    return(
       <div className="all-question">
        <div className="all-question-container">
            <div className="all-question-left">
                <div className="all-options">
                    <div className="all-option">
                        <p>0</p>
                        <span>Votes</span>
                    </div>
                    <div className="all-option">
                        <p>
                            {question.answerDetails.length} 
                            </p>
                        <span>Answers</span>
                    </div>
                    <div className="all-option">
                        <small>0 Views</small>
                    </div>
                </div>
            </div>
            <div className="question-answer">
                <Link to={`/question?id${question._id}`}>{question.title} </Link>
                <div style={{width: "80%" }}>
                    <div>{ReactHtmlParser(question.body)} </div>
                </div>
                <div style={{ display: "flex",}}>
                {
                    tags.map((_tag) => (<><div style={{ display: "flex" }}>
                    <span className="question-tags">{_tag}</span> </div></>))
                }
                </div>
               
                <div className="author">
                    <small>{question.created} </small>
                    <div className="author-details">
                        <Avatar/>
                        <p>UserName</p>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
}

export default Questions;