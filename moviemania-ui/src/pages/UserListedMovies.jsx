import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../componenets/Card";
import styled from "styled-components";
import Navbar from "../componenets/Navbar";
// import { getUsersLikedMovies } from "../store/Index";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLikedMovies } from "../store/Index";
import { fetchMovies} from "../store/Index";


export default function UserListedMovies() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.moviemania.movies);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState(undefined);
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  useEffect(() => {
    if(email){
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  
  // console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;