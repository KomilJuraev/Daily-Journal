import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import "./stylesheet.css";
import { getSpecificArticle, postArticle, updateArticle } from "../services/api";

function InputFields(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const [article, setArticle] = useState(null);
    const { id } = useParams(); // Access the id parameter from the URL using destructuring

    function sendDataToNode() {
        const dataToSend = {
            newTitle: title, 
            newContent: content,
        };

        postArticle(dataToSend, navigate);
    };

    //returns single article based on id provided
    useEffect(() => {
        if (props.action === 'Update') {
            async function fetchArticle() {
                const data = await getSpecificArticle(id, "update");
                setArticle(data);
                setTitle(data.title);
                setContent(data.content);       
            };

            fetchArticle()
        }
    }, [id, props.action]);

    // Check if article is null (data is still loading)
    if (article === null && props.action === 'Update') {
        return <p>Loading...</p>;
    }

    async function handleUpdate(id, title, content) {
        const dataToSend = {
          newTitle: title,
          newContent: content,
        };
      
        try {
          await updateArticle(id, dataToSend, navigate);
        } catch (error) {
          console.error("Error updating article:", error);
        }
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
                        type="button"
                        className="submit-btn"
                        name="button"
                        onClick={() => (props.action === 'Add' ? sendDataToNode() : handleUpdate(id, title, content))}
                        >
                        Publish
                    </button>
                </div>
            </div>
        </form>
    )
}

export default InputFields;