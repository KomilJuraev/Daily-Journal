import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import NavigationBar from "../components/NavigationBar";
import BlogCard from "../components/BlogCard";

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
      <NavigationBar pageHdr={"Read More"} />
      <BlogCard
        title={article.title}
        content={article.content}
        createdTime={article.createdAt}
        id={article._id}
        readMore={true}
      />

    </div>
  );
}

export default PostPage;
