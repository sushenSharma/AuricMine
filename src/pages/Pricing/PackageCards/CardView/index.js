import { whiteTickIcon } from "../../../../svgImages";
import LedgerButton from "../../../../ui-kit/Buttons/LedgerButton";

const CardView = (props) => {
  const {
    packageType,
    packageTypeLiner,
    packageTypePrice,
    packageTypeDuration,
    packageTypePaymentDuration,
    packageTypeBtnLink,
    packageTypePlanIncludes,
    packageTypePlanList,
  } = props;

  return (
    <div className="card-view-container">
      <div className="card-view-header">
        <div className="card-view-header-title">
          <span className="card-view-tag">{packageType}</span>
        </div>
        <div className="card-view-header-liner">
          <span className="card-view-tag">{packageTypeLiner}</span>
        </div>
      </div>
      <div className="card-view-content">
        <div className="card-view-pricing-content">
          <div className="card-view-pricing-meta">
            <span className="card-view-price">{packageTypePrice}</span> /{" "}
            <span className="card-view-price-duration">
              {packageTypeDuration}
            </span>
          </div>
          <div className="card-view-billing-duration">
            {packageTypePaymentDuration}
          </div>
        </div>

        <div className="card-view-billing-btn">
          <LedgerButton
            label={packageTypeBtnLink}
            type="primary"
            size="md"
            onClick={() => console.log("btn")}
          />
        </div>

        <div className="card-view-offer-listing-containe">
          <div className="card-view-offer-title">{packageTypePlanIncludes}</div>
          <ul className="card-view-offer-list">
            {packageTypePlanList.map((item, index) => {
              return (
                <li key={index} className="card-view-offer-list-item">
                  <span>{whiteTickIcon}</span> {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardView;
