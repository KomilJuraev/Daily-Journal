import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

function PostPage() {
  const [article, setArticle] = useState(null);
  const { id } = useParams(); // Access the id parameter from the URL using destructuring

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        console.log(data);
        setArticle(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [id]);

  // Add conditional rendering to handle the case when article is null
  if (article === null) {
    return <div>Loading...</div>; // You can show a loading message or a spinner
  }

  return (
    <div>
      <div className="container-fluid" key={article._id}>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <p>{article.createdAt}</p>
      </div>
    </div>
  );
}

export default PostPage;
