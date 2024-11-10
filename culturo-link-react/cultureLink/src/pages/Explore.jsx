import React from "react";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div>
      <h2>Explore Cultural Content</h2>
      <div className="module-categories">
        <div className="category-card">
          <h3>Art & Music</h3>
          <p>
            Explore the world of music, visual arts, and cultural expressions.
          </p>
          <Link to="/modules/art-music">Explore</Link>
        </div>

        <div className="category-card">
          <h3>Traditions</h3>
          <p>Learn about cultural traditions from around the world.</p>
          <Link to="/modules/traditions">Explore</Link>
        </div>
      </div>
      <section className="featured-module">
        <h3>Featured Module: "World Festivals"</h3>
        <p>Learn about festivals celebrated globally.</p>
        <Link to="/modules/world-festivals">Start Learning</Link>
      </section>
    </div>
  );
}

export default Explore;
