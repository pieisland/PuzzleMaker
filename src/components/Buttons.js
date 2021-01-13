import React, { useReducer, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
//import grid from "../../public/grid.png";
import grid from "../../public/images/grids/3x3.png";

import PuzzlePlate from "../components/PuzzlePlate";
import FrameSettingButtons from "../components/FrameSettingButtons";

export const PuzzleFrameContext = React.createContext();
export const PuzzleImageContext = React.createContext();

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

    //여기서만 해도 되는지는 좀 의문이긴 해요.
    imgDispatch({
      type: "imgInfo",
      payload: { width: img.width, height: img.height, src: img.src },
    });

    dispatch({
      type: "frameValue",
      payload: { column: 3, row: 3 },
    });

    const puzzleGrid = document.getElementById("photoGrid");
    puzzleGrid.classList.remove("hidden");
    puzzleGrid.style.width = `${img.width}px`;
    puzzleGrid.src = grid;

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
    //console.log("확정");
    //console.log(imgInfo.width, imgInfo.height);

    document.querySelector("#puzzlePlateWrap").className = "";

    //확정버튼
    //조절 버튼
    //퍼즐 변환버튼
    //원래 있던 이미지
    //console.log(document.querySelector(".confirmHide"));
    //puzzleGrid.classList.add("hidden");c
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

    //현재 보이는 것들을 좀 숨겨야 할 필요다 있다. 일단은..;
    //class로 다 묶어서 hidden을 넣어버리는 것도 좋을 것 같다.
    //크기에 맞게 틀을 만들어 줘야 한다.
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
            <PuzzlePlate></PuzzlePlate>
          </div>
        </PuzzleImageContext.Provider>
      </PuzzleFrameContext.Provider>
    </>
  );
};

export default Buttons;
