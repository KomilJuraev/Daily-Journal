import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import NavigationBar from "../components/NavigationBar";
import BlogCard from "../components/BlogCard";
import "../index.css";
import { fetchArticles, deleteSpecificArticle } from "../services/api";

function HomePage() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchArticles()
            .then((data) => {
                setArticles(data);
            })
    }, []);

    async function handleDelete(id) {
        const deletedId = await deleteSpecificArticle(id);

        if (deletedId === id) {
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article._id !== id)
          );
        }
    
    }

    function handleUpdate(id) {
        navigate(`/update/${id}`)
    }

    return (
        <div className="App">
            <NavigationBar pageHdr={"Daily Jurnal"} />
            <div>
                {articles.map((article) => (
                    <div className="outter-card-div" key={article._id}>
                        <BlogCard
                            title={article.title}
                            content={article.content}
                            createdTime={article.createdAt}
                            id={article._id}
                            readMore={false}
                        />
                        <div className="card-button-div">
                            <button type="button" name="delete-button" onClick={() => handleDelete(article._id)}>Delete</button>
                            <button type="button" name="delete-button" onClick={() => handleUpdate(article._id)}>Update</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;

