import React from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import "./stylesheet.css";

function BlogCard(props) {
    const modifiedContent = (props.content.length > 100 && props.readMore === false) ? props.content.substring(0, 100) + " ..." : props.content;

    return (
        <div className="card-info">
            <div className="inner-card-div">
                <div className="card-title"><h1>{props.title}</h1></div>
                <div className="card-content">
                    <p>{modifiedContent}</p>
                    {props.readMore === false && <a href={"/post/" + props.id}>Read More</a>}
                </div>
                <div className="card-time"><p>{formatDistanceToNow(new Date(props.createdTime), { addSuffix: true })}</p></div>
            </div>
        </div>
    );
}

export default BlogCard;