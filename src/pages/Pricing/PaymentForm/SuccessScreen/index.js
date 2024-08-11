import TitleDescription from "../../../../components/TitleDescription";
import { getLabel } from "../../../../hooks/use-labels";

const SuccessScreen = ({ user = "" }) => {
  return (
    <div className="payment-success-screen-container">
      <TitleDescription
        className="payment-success-title"
        title={getLabel("congratulationsLabel")}
        description={`${user} ${getLabel("successContent")}`}
      />
    </div>
  );
};

export default SuccessScreen;
