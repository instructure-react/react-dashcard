import React, {PropTypes} from 'react';
import clone from '../helpers/clone';

const STYLES = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  settings: {
    textShadow: '0 0 2px #999',
    textDecoration: 'none',
    color: 'inherit',
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1
  }
};

export default React.createClass({
  displayName: 'CardDetails',

  propTypes: {
    background: PropTypes.string,
    onSettingsClick: PropTypes.func.isRequired,
    settingsIcon: PropTypes.element,
    children: PropTypes.any
  },

  getDefaultProps() {
    return {
      settingsIcon: <span style={{fontSize: 25}}>⚙</span>
    };
  },

  handleSettingsClick() {
    this.props.onSettingsClick();
  },

  render() {
    const containerStyle = clone(STYLES.container);
    containerStyle.backgroundColor = this.props.background;

    return (
      <div
        style={containerStyle}
        className="ReactDashCard__CardDetails"
      >
        <a
          style={STYLES.settings}
          href="#"
          onClick={this.handleSettingsClick}
          aria-label="Open color picker"
        >
          {this.props.settingsIcon}
        </a>
        {this.props.children}
      </div>
    );
  }
});
