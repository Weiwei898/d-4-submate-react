import React from "react";
import { Link } from "react-router-dom";

const HelpCta = () => {
  return (
    <section id="help-cta">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="help-cta rounded-3 border shadow-sm text-center py-5 my-5">
              <div className="colorCircle1"></div>
              <div className="colorCircle2"></div>
              <h3 className="fw-bold mb-3 fs-4 fs-md-3">
                找不到你想問的問題嗎？
              </h3>
              <p className="mb-4 fs-6 fs-md-4 text-primary">
                歡迎填寫工單，我們將盡快為您服務
              </p>

              <Link
                className="btn btn-primary btn-lg rounded-pill px-4 text-light"
                to="/support"
              >
                填寫工單
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCta;
