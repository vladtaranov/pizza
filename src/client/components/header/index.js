import React from 'react';
import { boundMethod } from 'autobind-decorator';
import cn from 'classnames';
import './header.scss';
import './header.mobile.scss';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false
    };

    this.currencies = [
      { value: 'EUR', title: '€', isActive: true },
      { value: 'USD', title: '$' }
    ];
  }

  @boundMethod
  toggleMenu () {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }

  render () {
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
                this.currencies.map((currency) => {
                  const style = cn(
                    'header__currency-item',
                    { 'is-active': currency.isActive }
                  );

                  return (
                    <li key={currency.value} className={style}>
                      {currency.title}
                    </li>
                  );
                })
              }
            </ul>
          </div>

          <div className="header__cart">
            <div className="header__cart-title">
              Warenkorb
            </div>
            <div className="header__cart-count">
              0
            </div>
          </div>

        </div>
      </header>
    );
  }
}

export default Header;
