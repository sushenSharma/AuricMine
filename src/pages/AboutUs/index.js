import { getLabel } from "../../hooks/use-labels";
import ImageContentBox from "../../components/ImageContentBox";
import firstImage from "../../assets/resources/AustalianMine.png";
import secondImage from "../../assets/resources/brazlilian.png";
import "./styles.css";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="about-us-section">
        <ImageContentBox
          image={firstImage}
          content={getLabel("aboutUsFirstContent")}
          className="about-us-first-content"
        />
      </section>
      <section className="about-us-section">
        <ImageContentBox
          image={secondImage}
          content={getLabel("aboutUsSecondContent")}
          className="about-us-second-content"
        />
      </section>
    </div>
  );
};

export default AboutUs;
