import React, { useState, useReducer, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
//import grid from "../../public/grid.png";
import grid from "../../public/images/grids/3x3.png";

import PuzzlePlate from "../components/PuzzlePlate";
import FrameSettingButtons, {
  changeGrid,
} from "../components/FrameSettingButtons";

export const PuzzleFrameContext = React.createContext();
export const PuzzleImageContext = React.createContext();

// const PuzzleGrid = styled.div`
//   width: ${(props) => `${props.width}px` || "100px"};
//   height: ${(props) => `${props.height}px` || "100px"};

//   border: 1px solid black;
// `;

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

const ConfirmPuzzleSettingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px;
  width: 100px;
  height: 30px;

  background-color: salmon;
  color: white;

  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

function reducer(state, action) {
  switch (action.type) {
    case "frameValue":
      return { column: action.payload.column, row: action.payload.row };
    default:
      return state;
  }
}

function imgReducer(state, action) {
  switch (action.type) {
    case "imgInfo":
      return {
        width: action.payload.width,
        height: action.payload.height,
        src: action.payload.src,
      };
    default:
      return state;
  }
}

const Buttons = () => {
  const [frameValues, dispatch] = useReducer(reducer, { column: 3, row: 3 });
  const [imgInfo, imgDispatch] = useReducer(imgReducer, {
    width: 0,
    height: 0,
    src: null,
  });

  const [randomIdx, setRandomIdx] = useState([]);

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

  const makePuzzleRandomly = (col, row) => {
    let randomIndexArr = [];
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        randomIndexArr.push([i, j]);
      }
    }

    let tryCnt = col * row;
    while (tryCnt > 0) {
      let randomIdx = Math.floor(Math.random() * col * row);
      let tmpVal = randomIndexArr[randomIdx];
      randomIndexArr.splice(randomIdx, 1);

      randomIndexArr.push(tmpVal);
      tryCnt--;
    }

    return randomIndexArr;
  };

  const makePuzzle = () => {
    const img = document.getElementById("photoImg");
    //console.log(img.width, img.height);

    imgDispatch({
      type: "imgInfo",
      payload: { width: img.width, height: img.height, src: img.src },
    });

    dispatch({
      type: "frameValue",
      payload: { column: 3, row: 3 },
    });

    //grid가 나오는 순간
    const puzzleGrid = document.getElementById("photoGrid");
    puzzleGrid.classList.remove("hidden");
    puzzleGrid.style.width = `${img.width}px`;
    //puzzleGrid.src = grid;
    changeGrid(3, 3);

    // const photoGrid2 = document.getElementById("photoGrid2");
    // photoGrid2.style.width = `${img.width}px`;
    // photoGrid2.innerHTML = `<div>뭐 되긴 하나요</div>`;
    // let tmpHTML = "";
    // let gridWidth = img.width / 3;
    // let gridHeight = img.height / 3;
    // for (let i = 0; i < 3; i++) {
    //   tmpHTML += `<div width=${img.width}px height=${gridHeight}px>`;
    //   for (let j = 0; j < 3; j++) {
    //     tmpHTML += `<div width=${gridWidth}px height=${gridHeight}px></div>`;
    //   }
    //   tmpHTML += `</div>`;
    // }
    // photoGrid2.innerHTML = tmpHTML;

    const frameSettingBtnWrapElement = document.querySelector(
      "#frameSettingBtnWrap"
    );
    frameSettingBtnWrapElement.className = "";

    const frameSettingConfirmBtnWrapElement = document.querySelector(
      "#frameSettingConfirmBtnWrap"
    );
    frameSettingConfirmBtnWrapElement.className = "";
  };

  const confirmPuzzle = () => {
    document.querySelector("#puzzlePlateWrap").className = "";

    const hideIdList = [
      "imgUploadBtnWrap",
      "puzzleMakeBtnWrap",
      "frameSettingBtnWrap",
      "frameSettingConfirmBtnWrap",
      "photoWrap",
    ];

    hideIdList.forEach((id) => {
      document.getElementById(id).classList.add("hidden");
    });

    setRandomIdx(makePuzzleRandomly(frameValues.column, frameValues.row));
  };

  return (
    <>
      <HiddenInput id="input" type="file" onChange={getFile} accept="img/*" />

      <BtnWrap>
        <div id="imgUploadBtnWrap">
          <ImgUploadBtn onClick={uploadImg}>
            <div>사진 업로드</div>
          </ImgUploadBtn>
        </div>

        <div id="puzzleMakeBtnWrap" className="hidden">
          <PuzzleMakeBtn onClick={makePuzzle} id="puzzleBtn">
            <div>퍼즐로 변환</div>
          </PuzzleMakeBtn>
        </div>

        <PuzzleFrameContext.Provider value={{ frameValues, dispatch }}>
          <div id="frameSettingBtnWrap" className="hidden">
            <FrameSettingButtons></FrameSettingButtons>
          </div>
        </PuzzleFrameContext.Provider>

        <div id="frameSettingConfirmBtnWrap" className="hidden">
          <ConfirmPuzzleSettingBtn onClick={confirmPuzzle}>
            <div>프레임 확정</div>
          </ConfirmPuzzleSettingBtn>
        </div>
      </BtnWrap>

      <PuzzleFrameContext.Provider value={{ frameValues, dispatch }}>
        <PuzzleImageContext.Provider value={{ imgInfo, imgDispatch }}>
          <div id="puzzlePlateWrap" className="hidden">
            <PuzzlePlate randomIdx={randomIdx}></PuzzlePlate>
          </div>
        </PuzzleImageContext.Provider>
      </PuzzleFrameContext.Provider>
    </>
  );
};

export default Buttons;
