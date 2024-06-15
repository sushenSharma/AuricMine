import React from "react";

const ImageContentBox = ({ className, image, content, title }) => {
  return (
    <div className={className}>
      <div className="image-box">
        <img src={image} alt={image} />
      </div>
      {title && <h1 className="title">{title}</h1>}
      <div className="normal-text content-box">{content}</div>
    </div>
  );
};

export default ImageContentBox;
