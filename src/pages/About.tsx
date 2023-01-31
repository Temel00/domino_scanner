import React from "react";

export interface IAboutPageProps {}

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  return (
    <>
      <div id="About-page">
        <h1>About</h1>
        <div className="barcode-bin">
          <img src="/DominoBarcodes/Dom_0_1.png" alt="logo"></img>
          <img src="/DominoBarcodes/Dom_0_2.png" alt="logo"></img>
          <img src="/DominoBarcodes/Dom_0_3.png" alt="logo"></img>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
