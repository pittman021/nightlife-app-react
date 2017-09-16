import React from 'react';

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="left brand-logo">
          Nightlife App
        </a>
        <ul className="right">
          <li>
            <a href="/api/logout">Logout</a>
          </li>
          <li>
            <a href="/auth/google">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
