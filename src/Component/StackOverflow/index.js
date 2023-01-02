import React,{useState,useEffect} from "react";
import "./css/index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function Index(){
    const [questions,setQuestions] = useState([]);

    const navigate= useNavigate();

    useEffect( () => {
        async function getQuestion() {

            const decodedToken = jwt.decode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate("/");

            }
            else{
            await axios.get("https://stackoverflow-clone-kxvr.onrender.com/question/get", {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log(res.data);
                setQuestions(res.data.reverse());
            }).catch((err) => {
                console.error(err);
            })
        }
        }
        getQuestion();
    }, [] );

    return(
        <>
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar/>
                <Main questions = {questions} />
            </div>
        </div>
        </>
    )

}

export default Index;
