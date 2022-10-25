import React from "react";
import "../StackOverflow/css/index.css";
import MainQuestion from "./MainQuestion";
import Sidebar from "../StackOverflow/Sidebar";

function index(){
    return(
        <>
        
        <div className="stack-index">
        <div className="stack-index-content">
            <Sidebar/>
            <MainQuestion/>
        </div>
    </div>
    </>
    )
}

export default  index;