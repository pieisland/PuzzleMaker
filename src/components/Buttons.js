import React from "react";
import styled from "styled-components";
import "../commons/common.css";
import grid from "../../public/grid.png";
import PuzzlePlate from "../components/PuzzlePlate";

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

const Buttons = () => {
  const uploadImg = () => {
    const input = document.querySelector("#input");
    input.click();
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

      const puzzleMakeBtnWrapElement = document.querySelector(
        "#puzzleMakeBtnWrap"
      );
      puzzleMakeBtnWrapElement.className = "";
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

      <PuzzlePlate></PuzzlePlate>
    </>
  );
};

export default Buttons;
