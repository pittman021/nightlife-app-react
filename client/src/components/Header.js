import React from 'react';

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="left brand-logo">
          Nightlife App
        </a>
        <ul className="right">
          <a href="/auth/google">Login</a>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
