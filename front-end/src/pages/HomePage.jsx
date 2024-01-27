import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import NavigationBar from "../components/NavigationBar";
import BlogCard from "../components/BlogCard";
import "../index.css";
import { fetchArticles, deleteSpecificArticle } from "../services/api";
import Spinner from "../components/Spinner";

function HomePage() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchArticles()
            .then((data) => {
                setArticles(data);
                setLoading(false);
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
                { loading ? (
                    <Spinner />
                ) : articles.length > 0 ? (
                    articles.map((article) => (
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
                    ))
                ) : (
                    <div className="no-data-available">
                        <h3>No Data Available</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;