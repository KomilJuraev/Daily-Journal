import React, { useState } from "react";
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom

function AddPage() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate(); // Initialize useNavigate

  const sendDataToNode = () => {
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
        if(data.success) {
          navigate("/")
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Add Post</h1>
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Post</label>
          <textarea
            className="form-control"
            name="newContent"
            rows="5"
            cols="30"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button" // Change the type to "button" to prevent form submission
          className="btn btn-primary"
          name="button"
          onClick={sendDataToNode}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default AddPage;
