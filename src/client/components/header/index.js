import React from 'react';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';

import currencies from '../../constants/currencies';
import frames from '../../constants/frames';
import cn from 'classnames';
import './header.scss';
import './header.mobile.scss';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false
    };
  }

  @boundMethod
  toggleMenu () {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }

  @boundMethod
  onCartClick () {
    const { currentFrame, setFrame } = this.props;
    currentFrame === frames.CART
      ? setFrame(frames.NONE)
      : setFrame(frames.CART);
  }

  render () {
    const {
      currency: currentCurrency,
      cartCount,
      setCurrency } = this.props;

    const menuIconStyle = cn(
      'header__menu-icon',
      { 'is-open': this.state.isMobileMenuOpen }
    );
    const mobileMenuStyle = cn(
      'header__mobile-menu',
      { 'is-open': this.state.isMobileMenuOpen }
    );

    return (
      <header className="header">
        <div className="wrapper header__wrapper">
          <div
            className={menuIconStyle}
            onClick={this.toggleMenu}>
          </div>

          <a className="header__logo" href="/">
            <span>
              Pizza München
            </span>
          </a>

          <div className={mobileMenuStyle}>

            <div className="header__account">
              <div className="header__login">
                Anmelden
              </div>
              <div className="header__register">
                Registrieren
              </div>
            </div>
            <ul className="header__currency">
              {
                Object.values(currencies).map((currency) => {
                  const style = cn(
                    'header__currency-item',
                    { 'is-active': currency.value === currentCurrency }
                  );
                  const onClick = () => {
                    if (currency.value !== currentCurrency) {
                      setCurrency(currency.value);
                    }
                  };

                  return (
                    <li
                      key={currency.value}
                      className={style}
                      onClick={onClick}>
                      {currency.title}
                    </li>
                  );
                })
              }
            </ul>
          </div>

          <div
            className="header__cart js__header-cart"
            onClick={this.onCartClick}>
            <div className="header__cart-title">
              Warenkorb
            </div>
            <div className="header__cart-count">
              {cartCount}
            </div>
          </div>

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  currency: PropTypes.string.isRequired,
  cartCount: PropTypes.number.isRequired,
  currentFrame: PropTypes.string.isRequired,
  setFrame: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired
};

export default Header;
