import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams from react-router-dom

function UpdatePage() {
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams(); // Access the id parameter from the URL using destructuring
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
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
    }, [id]);

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

    // Check if article is null (data is still loading)
    if (article === null) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Update Post</h1>
            <div className="nav-options">
                <div className="option-div">
                    <a className='home-opt' href="/">Home</a>
                    <a className="add-opt" href="/add">Add</a>
                </div>
            </div>
            <form>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="newTitle"
                        autoComplete="off"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Post</label>
                    <textarea
                        className="form-control"
                        name="newContent"
                        rows="5"
                        cols="30"
                        defaultValue={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="button" // Change the type to "button" to prevent form submission
                    className="btn btn-primary"
                    name="update-button"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdatePage;