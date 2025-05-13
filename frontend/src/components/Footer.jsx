import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer className="footer text-light">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <h5 className="footer-heading mb-3">
                💼 Online Job Application Portal
              </h5>
              <p className="footer-text">
                Empowering individuals to find and apply for their dream jobs,
                while helping recruiters connect with top talent.
              </p>
            </div>

            <div className="col-md-6 d-flex flex-column align-items-md-end">
              <h5 className="footer-heading mb-3">🔗 Quick Links</h5>
              <nav aria-label="Footer Navigation">
                <div className="d-flex flex-wrap gap-3 justify-content-md-end">
                  <a href="/about" className="footer-link">About Us</a>
                  <a href="/contact" className="footer-link">Contact</a>
                  <a href="/feedback" className="footer-link">Feedback</a>
                </div>
              </nav>
            </div>
          </div>

          <hr className="my-4 bg-secondary" />

          <div className="text-center">
            <p className="footer-text small mb-0">
              By continuing past this page, you agree to our Terms of Service,
              Cookie Policy, Privacy Policy and Content Policies.
              <br />
              All trademarks are properties of their respective owners. <br />
              <strong>2025 © Online Job Application Portal™ Ltd. All rights reserved.</strong>
              <br /><br />
              Made with ❤️ by <strong>Aarya</strong>, <strong>Amol</strong> & <strong>Aditya</strong>
            </p>
          </div>
        </div>
      </footer>

      <style>
        {`
          .footer {
            background-color: #002322;
            color: #ADD3C9;
            margin-top: 50px;
          }
          .footer-heading {
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffffff;
          }
          .footer-text {
            font-size: 1.05rem;
            color: #cccccc;
            line-height: 1.6;
          }
          .footer-link {
            font-size: 1rem;
            color: #f8f9fa;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            text-decoration: underline;
            color: #ffffff;
          }
        `}
      </style>
    </>
  );
};

export default Footer;
