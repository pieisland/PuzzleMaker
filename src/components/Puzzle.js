import React, { useState } from "react";
import styled from "styled-components";
import "../commons/common.css";
import doll from "../../public/doll.jpg";

const PuzzleDiv = styled.div`
  background-image: url(${doll});
  background-size: 200px;
  width: 100px;
  height: 100px;

  background-position-x: ${(props) => props.bpx || "0"};
  background-position-y: ${(props) => props.bpy || "0"};
`;

const Puzzle = () => {
  const [draggingPuzzle, setDraggingPuzzle] = useState(null);

  const dragStart = (e) => {
    setDraggingPuzzle(e.target);

    setTimeout(() => e.target.classList.add("hidden"), 0);
  };

  const dragEnd = (e) => {
    e.target.classList.remove("hidden");
  };

  return (
    <>
      <PuzzleDiv
        id="tmpImg"
        draggable="true"
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      ></PuzzleDiv>
    </>
  );
};

export default Puzzle;
