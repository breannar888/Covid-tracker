import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../scss/covidtips.css";
import COVID_FACTS from "../data/covidtips.js";

const CovidTips = () => {
  return (
    <div className="frame">
      <h4>To help prevent the spread of COVID-19:</h4>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        interval={"9000"}
      >
        {COVID_FACTS.map((covidfacts) => (
          <div key={covidfacts.id}>{covidfacts.tips}</div>
        ))}
      </Carousel>
    </div>
  );
};
export default CovidTips;
