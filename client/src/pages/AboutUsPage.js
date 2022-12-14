import React from "react";

function AboutUsPage(props) {
  return (
    <>
      <div className="col text-center">
        <h2 className="mb-3">About our project</h2>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          quidem adipisci nobis quia eum quaerat quos ducimus, deleniti
          exercitationem animi itaque iste illo reiciendis vitae atque
          necessitatibus voluptatum repellendus quisquam?
        </p>
        <h2 className="mb-3">About our Team</h2>
        <div className="row">
          <div className="col-lg-4">
            <h3>Arun Saini</h3>
            <p>
              Hi, I'm Arun! I'm currently pursing a Computer Science Degree at CUNY Hunter College and like spending my free
              time watching foregin movies and drinking flavored milks.
            </p>
          </div>
          <div className="col-lg-4">
            <h3>Tshetrim (Tim) Lhendup</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos in itaque nihil consectetur qui natus similique
              nostrum molestias, ipsa explicabo hic impedit aspernatur. Ipsa
              provident neque culpa alias incidunt amet.
            </p>
          </div>
          <div className="col-lg-4">
            <h3>Jaichyi Chen</h3>
            <p>
              Hello, I'm Jaichyi Chen a highly motivated and passionate
              individual currently purusing a computer science degree, at CUNY
              Queens College.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
