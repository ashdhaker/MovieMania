import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/Movies";
import Player from "./pages/Player";
import Moviemania from "./pages/Moviemania";
import TVShows from "./pages/TVShows";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserListedMovies from "./pages/UserListedMovies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tvshows" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Moviemania />} />
      </Routes>
    </BrowserRouter>
  );
}