import React from "react";

const ImageContentBox = ({ className, image, content }) => {
  return (
    <div className={className}>
      <div className="image-box">
        <img src={image} alt={image} />
      </div>
      <div className="normal-text content-box">{content}</div>
    </div>
  );
};

export default ImageContentBox;
