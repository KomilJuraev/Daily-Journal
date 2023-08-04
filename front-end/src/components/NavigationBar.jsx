import React from "react";
import "./stylesheet.css";

function NavigationBar(props) {
    return (
        <div className="nav-bar">
            <div className="nav-title">
                <div className="title-box"><h3>{props.pageHdr}</h3></div>
            </div>
            <div className="nav-options">
                <div className="option-div">
                    <a className='home-opt' href="/">Home</a>
                    <a className="add-opt" href="/add">Add</a>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;