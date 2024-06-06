import { getLabel } from "../../hooks/use-labels";
import ImageContentBox from "../../components/ImageContentBox";
import "./styles.css";

const imgPath = "/assets/images";

const AboutUs = () => {
  return (
    <div className="abous-us-page">
      <section className="about-us-section">
        <ImageContentBox
          image={`${imgPath}/first-section-img.jpeg`}
          content={getLabel("aboutUsFirstContent")}
          className="about-us-first-content"
        />
      </section>
      <section className="about-us-section">
        <ImageContentBox
          image={`${imgPath}/section-section-image.jpeg`}
          content={getLabel("aboutUsSecondContent")}
          className="about-us-second-content"
        />
      </section>
    </div>
  );
};

export default AboutUs;
