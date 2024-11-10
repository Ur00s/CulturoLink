import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Welcome to Your Dashboard!</h2>
      <div className="dashboard-content">
        <section className="upcoming-events">
          <h3>Upcoming Cultural Events</h3>
          <div className="carousel">
            <div className="event-item">
              <h4>Art & Music Festival</h4>
              <p>Join us for an exciting cultural celebration.</p>
            </div>
            <div className="event-item">
              <h4>Traditional Dance Show</h4>
              <p>A showcase of traditional dances from around the world.</p>
            </div>
          </div>
        </section>

        <section className="culture-buddy">
          <h3>Find a Culture Buddy</h3>
          <button>
            <Link to="/find-buddy">Find Your Match</Link>
          </button>
        </section>

        <section className="recommendations">
          <h3>Personalized Recommendations</h3>
          <div className="recommendation-cards">
            <div className="card">
              <h4>Module: Global Traditions</h4>
              <p>Explore traditional festivals worldwide.</p>
              <Link to="/modules/traditions">Start Learning</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
