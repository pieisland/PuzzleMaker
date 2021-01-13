import React from "react";
import styled from "styled-components";

const PhotoWrapper = styled.div`
  //height: 30%;
  position: relative;
`;

const PhotoImg = styled.img`
  //max-height: 100%;
  //width: auto;
  height: 400px;
  position: absolute;
`;

const PhotoGrid = styled.img`
  height: 400px;
  position: absolute;
`;

const PhotoFrame = () => {
  return (
    <>
      <div id="photoWrap">
        <PhotoWrapper id="photoWrapper">
          <PhotoImg id="photoImg"></PhotoImg>
          <PhotoGrid id="photoGrid"></PhotoGrid>
        </PhotoWrapper>
      </div>
    </>
  );
};

export default PhotoFrame;
