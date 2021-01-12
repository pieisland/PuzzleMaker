import React, { useState } from "react";
import styled from "styled-components";
import "../commons/common.css";
import grid from "../../public/grid.png";
import doll from "../../public/doll.jpg";

const PuzzleWrap = styled.div`
  display: flex;
`;

const BtnWrap = styled.div`
  display: flex;
`;

const ImgUploadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px;
  width: 100px;
  height: 30px;

  background-color: orange;
  color: white;

  cursor: pointer;
`;

const PuzzleMakeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px;
  width: 100px;
  height: 30px;

  background-color: blue;
  color: white;

  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PuzzleDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: beige;

  //draggable: true;

  position: relative;

  overflow: hidden;
`;

const TmpDiv = styled.div`
  background-image: url(${doll});
  background-size: 200px;
  width: 100px;
  height: 100px;

  background-position-x: ${(props) => props.bpx || "0"};
  background-position-y: ${(props) => props.bpy || "0"};
`;

const Buttons = () => {
  const [draggingPuzzle, setDraggingPuzzle] = useState(null);
  const uploadImg = () => {
    const input = document.querySelector("#input");
    input.click();
  };

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

  //https://doolyit.tistory.com/182
  const getFile = (e) => {
    const file = e.target.files[0]; //선택된 파일
    const reader = new FileReader();

    //readAsDataURL을 마친 후 실행. state가 2가 됨.
    reader.onload = (e) => {
      const photoImg = document.getElementById("photoImg");
      photoImg.src = reader.result;
      const puzzleGrid = document.getElementById("photoGrid");
      puzzleGrid.classList.add("hidden");
    };

    reader.readAsDataURL(file); //파일을 읽는 메서드
  };

  const makePuzzle = () => {
    const img = document.getElementById("photoImg");
    //console.log(img.width, img.height);

    const puzzleGrid = document.getElementById("photoGrid");
    puzzleGrid.classList.remove("hidden");
    puzzleGrid.style.width = `${img.width}px`;
    puzzleGrid.src = grid;
  };

  return (
    <>
      <HiddenInput id="input" type="file" onChange={getFile} accept="img/*" />

      <BtnWrap>
        <ImgUploadBtn onClick={uploadImg}>
          <div>사진 업로드</div>
        </ImgUploadBtn>

        <div id="puzzleMakeBtnWrap" className="hidden">
          <PuzzleMakeBtn onClick={makePuzzle} id="puzzleBtn">
            <div>퍼즐로 변환</div>
          </PuzzleMakeBtn>
        </div>
      </BtnWrap>

      <PuzzleWrap>
        <PuzzleDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzleDiv>

        <PuzzleDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzleDiv>
      </PuzzleWrap>

      <PuzzleWrap>
        <PuzzleDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzleDiv>

        <PuzzleDiv
          id="obj"
          onDragOver={dragOver}
          onDrop={drop}
          onDragLeave={dragLeave}
        ></PuzzleDiv>
      </PuzzleWrap>

      <PuzzleWrap>
        <TmpDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
        ></TmpDiv>

        <TmpDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"100%"}
          bpy={"100%"}
        ></TmpDiv>

        <TmpDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"100%"}
          bpy={"0"}
        ></TmpDiv>

        <TmpDiv
          id="tmpImg"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          bpx={"0"}
          bpy={"100%"}
        ></TmpDiv>
      </PuzzleWrap>
    </>
  );
};

export default Buttons;
