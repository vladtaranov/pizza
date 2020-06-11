import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message';

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasReactError: false
    };
  }

  componentDidCatch () {
    this.setState({
      hasReactError: true
    });
  }

  render () {
    const { hasReactError } = this.state;

    if (hasReactError) return <ErrorMessage />;

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
