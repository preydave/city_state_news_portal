/* Navbar component for journalist dashboard */
import React from "react";

const Navbar = () => {
  return (
    <div style={styles.nav}>
      <h3>Welcome Journalist 👋</h3>
    </div>
  );
};

const styles = {
  nav: {
    marginLeft: "220px",
    padding: "15px",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default Navbar;