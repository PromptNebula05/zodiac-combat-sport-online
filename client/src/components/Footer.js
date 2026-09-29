import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-brand">Nine Tigers Kung Fu</span>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Nine Tigers Kung Fu. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
