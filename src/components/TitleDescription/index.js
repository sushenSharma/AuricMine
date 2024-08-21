const TitleDescription = ({ title, description, className }) => {
  return (
    <div
      className={`title-description-container${
        className ? " " + className : ""
      }`}
    >
      <div className="title-box">{title}</div>
      {description && <div className="description-box">{description}</div>}
    </div>
  );
};

export default TitleDescription;
