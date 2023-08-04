import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import PostPage from "./pages/PostPage";
import UpdatePage from "./pages/UpdatePage";

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
