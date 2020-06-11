import React from 'react';

import './error-message.scss';

const ErrorMessage = () => {
  return (
    <section className="error-message">
      <h2 className="error-message__title">
        Oops, etwas passiert!
      </h2>
      <p className="error-message__text">
        Wir wissen bereits über den&nbsp;Vorfall.
        Wir haben alle unsere Bemühungen zu&nbsp;beseitigen geworfen.
        Kommen Sie in&nbsp;10&nbsp;Minuten zurück, bitte.
      </p>
    </section>
  );
};

export default ErrorMessage;
