import React from "react";
import "./App.css";
import styled from "styled-components";
import Buttons from "./components/Buttons";
import PhotoFrame from "./components/PhotoFrame";

const App = () => {
  return (
    <div className="App">
      <h1>Puzzle Maker</h1>

      <Buttons></Buttons>

      <PhotoFrame></PhotoFrame>
    </div>
  );
};
export default App;
