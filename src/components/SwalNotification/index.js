import Swal from "sweetalert2";

const SwalNotification = ({ title, text, btnLabel, iconType }) => {
  return Swal.fire({
    title,
    text,
    icon: iconType,
    confirmButtonText: btnLabel,
  });
};

export default SwalNotification;
