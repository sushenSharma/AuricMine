import "./styles.css";

const Notification = ({ message, className }) => {
  return (
    <div
      className={`${
        className ? "notification-content " + className : "notification-content"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
