import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './textarea.scss';

const TextArea = (props) => {
  const {
    style,
    name,
    value,
    placeholder,
    title,
    caption,
    rows,
    hasError
  } = props;

  const containerStyle = cn(
    'textarea',
    style
  );

  const textareaStyle = cn(
    'textarea__input',
    { 'is-invalid': hasError }
  );

  return (
    <label className={containerStyle}>
      <div className="textarea__title-and-caption">
        <div className="textarea__title">
          {title}
        </div>
        <div className="textarea__caption">
          {caption}
        </div>
      </div>

      <textarea
        className={textareaStyle}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        rows={rows}/>
    </label>
  );
};

TextArea.defaultProps = {
  rows: 3
};

TextArea.propTypes = {
  style: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  rows: PropTypes.number,
  hasError: PropTypes.bool
};

export default TextArea;
