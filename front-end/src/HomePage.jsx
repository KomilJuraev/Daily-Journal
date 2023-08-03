import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom

function HomePage() {
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch("http://localhost:4000/")
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Check the data received from the backend
                setArticles(data); // Update the state with the array of articles
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:4000/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if(response.ok) {
                console.log("Successfully deleted");

                setArticles((rmArticle) =>
                    rmArticle.filter((article) => article._id !== id)
                );
            } else {
                console.error("Failed to delete article");
            }
          })
          .catch(error => console.log(error));
    }

    function handleUpdate(id) {
        navigate(`/update/${id}`)
    }

    return (
        <div className="App">
            <div className="nav-bar">
                <div className="nav-title">Daily Journal</div>
                <div className="nav-options">
                    <div className="option-div">
                        <a className='home-opt' href="/">Home</a>
                        <a className="add-opt" href="/add">Add</a>
                    </div>
                </div>
            </div>
            <div>
                {articles.map((article) => (
                    <div className="container-fluid" key={article._id}>
                        <h1>{article.title}</h1>
                        <p>{article.content}</p>
                        <p>{article.createdAt}</p>
                        <a href={"/post/" + article._id}>Read More</a>
                        <button type="button" name="delete-button" onClick={() => handleDelete(article._id)}>Delete</button>
                        <button type="button" name="delete-button" onClick={() => handleUpdate(article._id)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;

