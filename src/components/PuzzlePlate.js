import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../commons/common.css";
import doll from "../../public/doll.jpg";
import { PuzzleFrameContext, PuzzleImageContext } from "../components/Buttons";

const PuzzlePlateDiv = styled.div`
  width: ${(props) => `${props.width}px` || "100px"};
  height: ${(props) => `${props.height}px` || "100px"};
  background-color: beige;

  position: relative;

  overflow: hidden;
`;

const PuzzleDiv = styled.div`
  background-image: ${(props) => `url(${props.src})` || `url(${doll})`};
  //url(${doll});
  background-size: ${(props) =>
    `${props.bwidth}px ${props.bheight}px` || `200px`};
  width: ${(props) => `${props.width}px` || "100px"};
  height: ${(props) => `${props.height}px` || "100px"};

  background-position-x: ${(props) => `${props.bpx}%` || "0"};
  background-position-y: ${(props) => `${props.bpy}%` || "0"};
`;

const PuzzleWrap = styled.div`
  display: flex;
`;

const PuzzlePlate = () => {
  const { frameValues, dispatch } = useContext(PuzzleFrameContext);
  const { imgInfo, imgDispatch } = useContext(PuzzleImageContext);

  //console.log(frameValues, imgInfo);

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

  return (
    <>
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

      {/* <PuzzleWrap>
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
      </PuzzleWrap> */}

      <PuzzleWrap>
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
      </PuzzleWrap>

      {/* <PuzzleWrap>
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
      </PuzzleWrap> */}
    </>
  );
};

export default PuzzlePlate;
