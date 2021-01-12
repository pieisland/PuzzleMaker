import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
import { PuzzleFrameContext } from "../components/Buttons";

const FrameSettingBtnWrap = styled.div`
  display: flex;
  margin: 10px;
`;

const ColumnUpBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background-color: pink;

  text-align: center;
  line-height: 27px;

  cursor: pointer;

  margin-right: 10px;
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
  font-size: 20px;
  width: 20px;
  height: 30px;

  text-align: center;
  line-height: 27px;
`;

const RowValue = styled.div`
  font-size: 20px;
  width: 20px;
  height: 30px;

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
  //const [frameValues, setFrameValues] = useState([3, 3]);
  const { frameValues, dispatch } = useContext(PuzzleFrameContext);

  const columnDown = () => {
    if (frameValues.column > 3) {
      dispatch({
        type: "frameValue",
        payload: { column: frameValues.column - 1, row: frameValues.row },
      });
      //setFrameValues([frameValues.column - 1, frameValues.row);
    }
  };

  const columnUp = () => {
    if (frameValues.column < 5) {
      dispatch({
        type: "frameValue",
        payload: {
          column: Number(frameValues.column) + 1,
          row: frameValues.row,
        },
      });
      //   setFrameValues([frameValues[0] + 1, frameValues[1]]);
    }
  };

  const rowDown = () => {
    if (frameValues.row > 3) {
      dispatch({
        type: "frameValue",
        payload: {
          column: frameValues.column,
          row: frameValues.row - 1,
        },
      });
      //   setFrameValues([frameValues[0], frameValues[1] - 1]);
    }
  };

  const rowUp = () => {
    if (frameValues.row < 5) {
      //   setFrameValues([frameValues[0], frameValues[1] + 1]);
      dispatch({
        type: "frameValue",
        payload: {
          column: frameValues.column,
          row: frameValues.row + 1,
        },
      });
    }
  };

  return (
    <>
      <FrameSettingBtnWrap>
        column:
        <ColumnDownBtn onClick={columnDown}>-</ColumnDownBtn>
        <ColumnValue>{frameValues.column}</ColumnValue>
        <ColumnUpBtn onClick={columnUp}>+</ColumnUpBtn>
        row:
        <RowDownBtn onClick={rowDown}>-</RowDownBtn>
        <RowValue>{frameValues.row}</RowValue>
        <RowUpBtn onClick={rowUp}>+</RowUpBtn>
      </FrameSettingBtnWrap>
    </>
  );
};

export default FrameSettingButtons;
