import React, { useState } from "react";
import styled from "styled-components";
import "../commons/common.css";
import doll from "../../public/doll.jpg";

const PuzzlePlateDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: beige;

  position: relative;

  overflow: hidden;
`;

const PuzzleDiv = styled.div`
  background-image: url(${doll});
  background-size: 200px;
  width: 100px;
  height: 100px;

  background-position-x: ${(props) => props.bpx || "0"};
  background-position-y: ${(props) => props.bpy || "0"};
`;

const PuzzleWrap = styled.div`
  display: flex;
`;

const PuzzlePlate = () => {
  const [draggingPuzzle, setDraggingPuzzle] = useState(null);

  const dragStart = (e) => {
    setDraggingPuzzle(e.target);

    setTimeout(() => e.target.classList.add("hidden"), 0);
  };

  const dragEnd = (e) => {
    e.target.classList.remove("hidden");
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "blue";
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "beige";
  };

  const drop = (e) => {
    e.target.style.backgroundColor = "beige";
    e.target.append(draggingPuzzle);
  };

  return (
    <>
      <PuzzleWrap>
        <PuzzlePlateDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzlePlateDiv>

        <PuzzlePlateDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzlePlateDiv>
      </PuzzleWrap>

      <PuzzleWrap>
        <PuzzlePlateDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzlePlateDiv>

        <PuzzlePlateDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzlePlateDiv>
      </PuzzleWrap>

      <PuzzleWrap>
        <PuzzleDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
        ></PuzzleDiv>

        <PuzzleDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"100%"}
          bpy={"100%"}
        ></PuzzleDiv>

        <PuzzleDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"100%"}
          bpy={"0"}
        ></PuzzleDiv>

        <PuzzleDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"0"}
          bpy={"100%"}
        ></PuzzleDiv>
      </PuzzleWrap>
    </>
  );
};

export default PuzzlePlate;
