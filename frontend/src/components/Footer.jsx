import React from 'react'

const Footer = () => {
  return (
    <div>
      <div style={styles.div}>
      {/* <p style={styles.text}>© {new Date().getFullYear()} Job Portal. All rights reserved.</p> */}
      <p style={styles.text}> Made with ❤️ from Aarya , Amol & Aditya</p>
      </div>
    </div>
  );
};
const styles = {
  div: {
    backgroundColor: 'rgb(0, 35, 34)',
    color: '#ffffff',
    textAlign: 'center',
    padding: '10px 0',
    // position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  text: {
    margin: 0,
    fontSize: '17px',
  }
};

export default Footer
