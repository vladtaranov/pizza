import React from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import cn from 'classnames';
import './frame.scss';

const Frame = ({ children, currentFrame, setFrame }) => {
  currentFrame !== frames.NONE
    ? document.body.classList.add('is-blocked')
    : document.body.classList.remove('is-blocked');

  const frameStyle = cn(
    'frame',
    { 'is-visible': currentFrame !== frames.NONE }
  );

  const onCloseClick = ({ target }) => {
    if (!target.closest('.frame__content')) {
      setFrame(frames.NONE);
    }
  };

  return (
    <section
      className={frameStyle}
      onClick={onCloseClick}>
      <div className="frame__content">
        {children}
      </div>
    </section>
  );
};

Frame.propTypes = {
  children: PropTypes.element.isRequired,
  currentFrame: PropTypes.string.isRequired,
  setFrame: PropTypes.func.isRequired
};

export default Frame;
