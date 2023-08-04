import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory from react-router-dom
import "./stylesheet.css";

function InputFields(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const [article, setArticle] = useState(null);
    const { id } = useParams(); // Access the id parameter from the URL using destructuring

    function sendDataToNode() {
        const dataToSend = {
            newTitle: title, // Replace this with the actual title input value
            newContent: content, // Replace this with the actual content input value
        };

        fetch("http://localhost:4000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    navigate("/")
                } else {
                    console.log(data.message);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (props.action === 'Update') {
            fetch(`http://localhost:4000/update/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(id);
                    console.log(data);
                    setArticle(data);
                    setTitle(data.title); // Set initial value for newTitle
                    setContent(data.content); // Set initial value for newContent        
                })
                .catch((error) => console.log("Error fetching data:", error));
        }
    }, [id, props.action]);

    // Check if article is null (data is still loading)
    if (article === null && props.action === 'Update') {
        return <p>Loading...</p>;
    }

    function handleUpdate() {
        const dataToSend = {
            newTitle: title, // Replace this with the actual title input value
            newContent: content, // Replace this with the actual content input value
        };
        fetch(`http://localhost:4000/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                navigate("/");
            })
            .catch((error) => console.log(error));
    }



    return (
        <form>
            <div className="main-form-div">
                <div className="title-input-div">
                    <label className="input-label">Title:</label>
                    <input
                        className="title-input"
                        type="text"
                        name="newTitle"
                        autoComplete="off"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="post-input-div">
                    <label className="input-label">Post:</label>
                    <textarea
                        className="content-input"
                        name="newContent"
                        rows="10"
                        cols="50"
                        defaultValue={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="submit-btn-div">
                    <button
                        type="button" // Change the type to "button" to prevent form submission
                        className="submit-btn"
                        name="button"
                        onClick={props.action === 'Add' ? sendDataToNode : handleUpdate}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </form>
    )
}

export default InputFields;