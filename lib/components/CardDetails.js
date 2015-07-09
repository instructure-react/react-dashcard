var React = require('react');
var DOM = React.DOM;
var PropTypes = React.PropTypes;
var clone = require('../helpers/clone');

var STYLES = {
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

module.exports = React.createClass({
  displayName: 'CardDetails',

  propTypes: {
    hidden: PropTypes.bool,
    background: PropTypes.string,
    onSettingsClick: PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      settingsIcon: DOM.span({style: {fontSize: 25}}, '⚙')
    };
  },

  handleSettingsClick: function () {
    this.props.onSettingsClick();
  },

  render: function () {
    var containerStyle = clone(STYLES.container);
    containerStyle.backgroundColor = this.props.background;

    return (
      DOM.div(
        {
          'aria-hidden': this.props.hidden,
          style: containerStyle,
          className: 'ReactDashCard__CardDetails'
        },
        DOM.a(
          {
            style: STYLES.settings,
            href: 'javascript://',
            onClick: this.handleSettingsClick,
            'aria-label': 'Open color picker'
          },
          this.props.settingsIcon
        ),
        this.props.children
      )
    );
  }
});
