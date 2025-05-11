const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <h1>About JobPortal</h1>
        <p>Connecting talented professionals with great opportunities</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>
            JobPortal was founded with a simple mission : <br/> To make the job search process 
            easier and more effective for both candidates and employers. We believe 
            that everyone deserves to find work they're passionate about and that 
            companies should have access to the best talent.
          </p>
        </section>

        <section>
          <h2>Our Team</h2>
          <p>Our team is a perfect blend of passionate individuals, each bringing expertise in different areas from frontend design to backend development, database management, and system integration.
Every member played a key role in building this project, contributing their unique skills to create a seamless, full-stack solution.
We believe it's our teamwork, shared vision, and dedication that turned this project into a complete and reliable platform.</p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <p>
            We serve both job seekers and employers through technology-driven solutions 
            tailored to meet evolving needs.
            We connect ambitious job seekers with top employers across multiple industries. Whether you're a fresh graduate, an experienced professional, or an employer looking for the perfect hire, we provide the tools, resources, and opportunities to make the right match.
          </p>
        </section>
      </div>

      <div className="card-section">
        <div className="info-card">
          <img src="/aarya.jpg" alt="Aarya Dange" />
          <h3>Aarya Sanjay Dange</h3>
          <h4>( Frontend )</h4>
          
          <p>Designed and developed user interface (UI) to ensure a smooth, interactive experience. 
Used HTML, CSS, JavaScript, and front-end frameworks (React, Bootstrap) for UI development.
</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aryadange25@gmail.com" target="_blank">aryadange25@gmail.com</a>
          <br></br>🔗<a href="https://www.linkedin.com/in/aarya-dange-6272b7231" target="_blank"> LinkedIn </a>
          🔗<a href="https://www.linkedin.com/in/aarya-dange-6272b7231" target="_blank"> Github </a>
          
        </div>
        <div className="info-card">
          <img src="/amol.jpg" alt="Amol Gavit" />
          <h3>Amol Nethu Gavit</h3>
          <h4>( Backend )</h4>
          
          <p>Developed and managed the server-side logic and application functionalities. Worked with database for data storage and retrieval. Ensured data integrity and system reliability through proper architecture.</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=amolgavit158121@gmail.com" target="_blank">amolgavit158121@gmail.com</a>
          <br></br>🔗<a href="https://www.linkedin.com/in/amolgavit26/" target="_blank"> LinkedIn </a>
          🔗<a href="hhttps://github.com/amolgavit26" target="_blank"> Github </a>
          
        </div>
        <div className="info-card">
          <img src="/aditya.jpg" alt="Aditya Raj Harsh" />
          <h3>Aditya Raj Harsh</h3>
          <h4>( Frontend )</h4>
          
          <p>Collaborated with developers to translate UI/UX wireframes into functional code.
Optimized web performance for faster load times and smooth navigation.
Implemented responsive design so website works well on all devices.

</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adityarajharsh52@gmail.com" target="_blank">adityarajharsh52@gmail.com</a>
          <br></br>🔗<a href="https://www.linkedin.com/in/aditya-raj-harsh-24a41421b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"> LinkedIn </a>
          🔗<a href="https://github.com/AdityaRajHarsh" target="_blank"> Github </a>
          
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .about-wrapper {
          padding: 40px 60px;
          background-color:rgb(0, 35, 34);
          color:rgb(255, 255, 255);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size:20px;
          }

        .about-hero h1 {
          color:rgb(216, 245, 227);
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .about-hero p {
          color:rgb(255, 255, 255);
          font-size: 1.3rem;
          margin-bottom: 30px;
        }

        .about-content section {
          margin-bottom: 40px;
        }

        .about-content h2 {
          color:rgb(216, 245, 227);
          margin-bottom: 10px;
        }

        .about-content p {
          line-height: 1.6;
        }

        .card-section {
         margin-left:5%;
         margin-right:5%;
          display: flex;
          justify-content: space-between;
          gap: 90px;
          // width:90%;
          margin-top: 50px;
        }

        .info-card {
          text-align:center;
          
          flex: 1;
          background-color:rgb(73, 91, 86);
          border: 1px solid #333;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.3s;
        }
          .info-card a{
            text-decoration:none;
            color:rgb(216, 245, 227);
          }

        .info-card:hover {
          transform: translateY(-5px);
          border-color: #e8e7f3;
        }

        .info-card img {
          // padding-left:20%;
          width: 50%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .info-card h3 {
          color:rgb(216, 245, 227);
          margin-bottom: 10px;
        }
          .info-card h4 {
          color:rgb(216, 245, 227);
          margin-bottom: 10px;
        }

        .info-card p {
          color:whitesmoke;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .card-section {
            flex-direction: column;
          }

          .info-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
