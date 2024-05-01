import LedgerHeader from "./LedgerHeader";
import LedgerProducts from "./LedgerProducts";
import ContentWrapper from "../../components/ContentWrapper";

import "./styles.css";

const Ledgers = () => {
  return (
    <ContentWrapper className="ledgers-container">
      <LedgerHeader />
      <LedgerProducts />
    </ContentWrapper>
  );
};

export default Ledgers;
