import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './input.scss';

const Input = (props) => {
  const {
    style,
    type,
    name,
    value,
    placeholder,
    inputMode,
    title,
    caption,
    hasError,
    onChange
  } = props;

  const containerStyle = cn(
    'input',
    style
  );

  const inputStyle = cn(
    'input__input',
    { 'is-invalid': hasError }
  );

  return (
    <label className={containerStyle}>
      <div className="input__title-and-caption">
        <div className="input__title">
          {title}
        </div>
        <div className="input__caption">
          {caption}
        </div>
      </div>

      <input
        className={inputStyle}
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={onChange} />
    </label>
  );
};

Input.defaultProps = {
  type: 'text',
  inputMode: 'text'
};

Input.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  inputMode: PropTypes.string,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Input;
