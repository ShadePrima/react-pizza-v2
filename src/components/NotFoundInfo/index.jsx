import React from 'react';

import styles from './styles.module.scss';
console.log(styles);

const NotFoundInfo = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128533;</span>
        <br />
        Not Found :(
      </h1>
      <p>Unfortunately, the page is not found in our online store</p>
    </div>
  );
};

export default NotFoundInfo;
