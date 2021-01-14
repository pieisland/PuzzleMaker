import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
import { PuzzleFrameContext } from "../components/Buttons";
import grid3x3 from "../../public/images/grids/3x3.png";
import grid3x4 from "../../public/images/grids/3x4.png";
import grid3x5 from "../../public/images/grids/3x5.png";
import grid4x3 from "../../public/images/grids/4x3.png";
import grid4x4 from "../../public/images/grids/4x4.png";
import grid4x5 from "../../public/images/grids/4x5.png";
import grid5x3 from "../../public/images/grids/5x3.png";
import grid5x4 from "../../public/images/grids/5x4.png";
import grid5x5 from "../../public/images/grids/5x5.png";

const FrameSettingBtnWrap = styled.div`
  display: flex;

  margin: 10px;
`;

const ColumnUpBtn = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;

  border-radius: 3px;
  background-color: pink;

  text-align: center;
  line-height: 27px;

  cursor: pointer;
`;
const ColumnDownBtn = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 3px;
  background-color: pink;

  text-align: center;
  line-height: 27px;

  cursor: pointer;
`;

const ColumnValue = styled.div`
  width: 20px;
  height: 30px;

  text-align: center;
  line-height: 27px;

  font-size: 20px;
`;

const RowValue = styled.div`
  width: 20px;
  height: 30px;

  font-size: 20px;
  text-align: center;
  line-height: 27px;
`;

const RowUpBtn = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 3px;
  background-color: pink;

  text-align: center;
  line-height: 27px;

  cursor: pointer;
`;

const RowDownBtn = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 3px;
  background-color: pink;

  text-align: center;
  line-height: 27px;

  cursor: pointer;
`;

const FrameSettingButtons = () => {
  const { frameValues, dispatch } = useContext(PuzzleFrameContext);

  const changeGrid = (col, row) => {
    //console.log(col, row);

    const img = document.getElementById("photoImg");

    const puzzleGrid = document.getElementById("photoGrid");
    puzzleGrid.style.width = `${img.width}px`;

    let src;
    if (col === 3) {
      if (row === 3) src = grid3x3;
      if (row === 4) src = grid4x3;
      if (row === 5) src = grid5x3;
    } else if (col === 4) {
      if (row === 3) src = grid3x4;
      if (row === 4) src = grid4x4;
      if (row === 5) src = grid5x4;
    } else if (col === 5) {
      if (row === 3) src = grid3x5;
      if (row === 4) src = grid4x5;
      if (row === 5) src = grid5x5;
    }

    puzzleGrid.src = src;
  };

  const columnDown = () => {
    if (frameValues.column <= 3) {
      return;
    }

    changeGrid(frameValues.column - 1, frameValues.row);

    dispatch({
      type: "frameValue",
      payload: { column: frameValues.column - 1, row: frameValues.row },
    });
  };

  const columnUp = () => {
    if (frameValues.column >= 5) {
      return;
    }

    changeGrid(frameValues.column + 1, frameValues.row);
    dispatch({
      type: "frameValue",
      payload: {
        column: Number(frameValues.column) + 1,
        row: frameValues.row,
      },
    });
  };

  const rowDown = () => {
    if (frameValues.row <= 3) {
      return;
    }

    changeGrid(frameValues.column, frameValues.row - 1);
    dispatch({
      type: "frameValue",
      payload: {
        column: frameValues.column,
        row: frameValues.row - 1,
      },
    });
  };

  const rowUp = () => {
    if (frameValues.row >= 5) {
      return;
    }
    changeGrid(frameValues.column, frameValues.row + 1);
    dispatch({
      type: "frameValue",
      payload: {
        column: frameValues.column,
        row: frameValues.row + 1,
      },
    });
  };

  return (
    <>
      <FrameSettingBtnWrap>
        Column:
        <ColumnDownBtn onClick={columnDown}>-</ColumnDownBtn>
        <ColumnValue>{frameValues.column}</ColumnValue>
        <ColumnUpBtn onClick={columnUp}>+</ColumnUpBtn>
        Row:
        <RowDownBtn onClick={rowDown}>-</RowDownBtn>
        <RowValue>{frameValues.row}</RowValue>
        <RowUpBtn onClick={rowUp}>+</RowUpBtn>
      </FrameSettingBtnWrap>
    </>
  );
};

export default FrameSettingButtons;
