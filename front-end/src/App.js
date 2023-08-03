import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import AddPage from "./AddPage";
import PostPage from "./PostPage";
import UpdatePage from "./UpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/add"
          element={<AddPage />}
        />
        <Route
          path="/post/:id"
          element={<PostPage />}
        />
        <Route 
          path="/update/:id"
          element={<UpdatePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
