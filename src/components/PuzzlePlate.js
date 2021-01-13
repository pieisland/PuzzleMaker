import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
import doll from "../../public/doll.jpg";
import { PuzzleFrameContext, PuzzleImageContext } from "../components/Buttons";

const Middle = styled.div`
  display: flex;
  justify-content: center;
`;

const WrapDiv = styled.div`
  margin: 10px;
`;

const PuzzlePieceWrap = styled.div`
  background-color: navy;
  width: 1000px;
  height: 150px;
`;

const PuzzlePlateDiv = styled.div`
  position: relative;

  width: ${(props) => `${props.width}px` || "100px"};
  height: ${(props) => `${props.height}px` || "100px"};

  background-color: beige;

  overflow: hidden;
`;

const PuzzleDiv = styled.div`
  width: ${(props) => `${props.width}px` || "100px"};
  height: ${(props) => `${props.height}px` || "100px"};

  background-image: ${(props) => `url(${props.src})` || `url(${doll})`};
  background-size: ${(props) =>
    `${props.bwidth}px ${props.bheight}px` || `200px`};

  background-position-x: ${(props) => `${props.bpx}%` || "0"};
  background-position-y: ${(props) => `${props.bpy}%` || "0"};
`;

const PuzzleWrap = styled.div`
  display: flex;
`;

const PuzzlePlate = ({ randomColIdx, randomRowIdx }) => {
  const { frameValues } = useContext(PuzzleFrameContext);
  const { imgInfo } = useContext(PuzzleImageContext);
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

  //let htmlStr = `<div>hi</div>`;
  /*for (let i = 0; i < 3; i++) {
    let tmpHtmlStr = `<PuzzleWrap>`;
    for (let j = 0; j < 4; j++) {
      tmpHtmlStr += `        <PuzzlePlateDiv
      key="puzzle"${i * 4 + j}
      onDragOver={dragOver}
      onDrop={drop}
      onDragLeave={dragLeave}
    ></PuzzlePlateDiv>
  `;
    }
    tmpHtmlStr += `</PuzzleWrap>`;
    htmlStr += tmpHtmlStr;
  }*/

  //

  return (
    <>
      <Middle>
        <WrapDiv>
          {[...Array(frameValues.row)].map((r, rindex) => {
            return (
              <PuzzleWrap key={`puzzleWrap${rindex}`}>
                {[...Array(frameValues.column)].map((c, cindex) => {
                  return (
                    <PuzzlePlateDiv
                      key={`puzzlePlate${rindex * frameValues.column + cindex}`}
                      onDragOver={dragOver}
                      onDrop={drop}
                      onDragLeave={dragLeave}
                      width={imgInfo.width / frameValues.column}
                      height={imgInfo.height / frameValues.row}
                    ></PuzzlePlateDiv>
                  );
                })}
              </PuzzleWrap>
            );
          })}
        </WrapDiv>

        <WrapDiv>
          {[...Array(frameValues.row)].map((r, rindex) => {
            return (
              <PuzzleWrap key={`puzzleWrap${rindex}`}>
                {[...Array(frameValues.column)].map((c, cindex) => {
                  return (
                    <PuzzlePlateDiv
                      key={`puzzlePlate${rindex * frameValues.column + cindex}`}
                      onDragOver={dragOver}
                      onDrop={drop}
                      onDragLeave={dragLeave}
                      width={imgInfo.width / frameValues.column}
                      height={imgInfo.height / frameValues.row}
                    >
                      <PuzzleDiv
                        key={`puzzle${cindex * frameValues.row + rindex}`}
                        draggable="true"
                        onDragStart={dragStart}
                        onDragEnd={dragEnd}
                        width={imgInfo.width / frameValues.column}
                        height={imgInfo.height / frameValues.row}
                        src={imgInfo.src}
                        bwidth={imgInfo.width}
                        bheight={imgInfo.height}
                        bpx={
                          (randomColIdx[cindex] / (frameValues.column - 1)) *
                          100
                        }
                        bpy={
                          (randomRowIdx[rindex] / (frameValues.row - 1)) * 100
                        }
                      ></PuzzleDiv>
                    </PuzzlePlateDiv>
                  );
                })}
              </PuzzleWrap>
            );
          })}
        </WrapDiv>
      </Middle>

      {/* <PuzzleWrap>
        {[...Array(frameValues.row)].map((r, rindex) => {
          return (
            <>
              {[...Array(frameValues.column)].map((c, cindex) => {
                return (
                  <PuzzleDiv
                    key={`puzzle${cindex * frameValues.row + rindex}`}
                    draggable="true"
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}
                    width={imgInfo.width / frameValues.column}
                    height={imgInfo.height / frameValues.row}
                    src={imgInfo.src}
                    bwidth={imgInfo.width}
                    bheight={imgInfo.height}
                    bpx={(cindex / (frameValues.column - 1)) * 100}
                    bpy={(rindex / (frameValues.row - 1)) * 100}
                  ></PuzzleDiv>
                );
              })}
            </>
          );
        })}
      </PuzzleWrap> */}
    </>
  );
};

export default PuzzlePlate;
