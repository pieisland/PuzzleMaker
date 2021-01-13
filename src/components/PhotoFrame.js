import React from "react";
import styled from "styled-components";

const PhotoWrapper = styled.div`
  position: relative;
`;

const PhotoImg = styled.img`
  position: absolute;

  height: 400px;
`;

const PhotoGrid = styled.img`
  position: absolute;

  height: 400px;
`;

// const PhotoGrid2 = styled.div`
//   height: 400px;
//   position: absolute;
//   background-color: rgba(230, 30, 20, 0.5);
// `;

const PhotoFrame = () => {
  return (
    <>
      <div id="photoWrap">
        <PhotoWrapper id="photoWrapper">
          <PhotoImg id="photoImg"></PhotoImg>
          <PhotoGrid id="photoGrid"></PhotoGrid>
          {/* <PhotoGrid2 id="photoGrid2"></PhotoGrid2> */}
        </PhotoWrapper>
      </div>
    </>
  );
};

export default PhotoFrame;
