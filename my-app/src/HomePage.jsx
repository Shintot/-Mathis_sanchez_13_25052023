import React from 'react';
import "./main.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const FeatureItem = ({ imgSrc, altText, title, children }) => (
  <div className="feature-item">
    <img src={imgSrc} alt={altText} className="feature-icon"/>
    <h3 className="feature-item-title">{title}</h3>
    <p>{children}</p>
  </div>
);

const HomePage = () => (
  <div>
    <Nav />
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only"> Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem
          imgSrc="https://res.cloudinary.com/dtx8credj/image/upload/v1684236287/icon-chat_smfk7z.png"
          altText="Chat Icon"
          title="You are our #1 priority"
        >
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </FeatureItem>
        <FeatureItem
          imgSrc="https://res.cloudinary.com/dtx8credj/image/upload/v1684236287/icon-money_zakkst.png"
          altText="Money Icon"
          title="More savings means higher rates"
        >
          The more you save with us, the higher your interest rate will be!
        </FeatureItem>
        <FeatureItem
          imgSrc="https://res.cloudinary.com/dtx8credj/image/upload/v1684236287/icon-security_ou2ak3.png"
          altText="Security Icon"
          title="Security you can trust"
        >
          We use top of the line encryption to make sure your data and money
          is always safe.
        </FeatureItem>
      </section>
    </main>
    <Footer />
  </div>
);

export default HomePage;
