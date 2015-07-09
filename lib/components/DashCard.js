var React = require('react');
var DOM = React.DOM;
var PropTypes = React.PropTypes;
var CardDetails = React.createFactory(require('./CardDetails'));
var ColorPicker = React.createFactory(require('./ColorPicker'));

var STYLES = {
  container: {
    position: 'relative'
  }
};

module.exports = React.createClass({
  displayName: 'DashCard',

  propTypes: {
    background: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    onBackgroundChange: PropTypes.func
  },

  getInitialState: function () {
    return {
      showColorPicker: false
    };
  },

  componentDidUpdate: function () {
    if (this.focusColorPicker) {
      this.refs.colorpicker.getDOMNode().querySelector('a[aria-label]').focus();
      this.focusColorPicker = false;
    } else if (this.focusSettings) {
      this.refs.carddetails.getDOMNode().querySelector('a[aria-label]').focus();
      this.focusSettings = false;
    }
  },

  handleSettingsClick: function () {
    this.openColorPicker();
  },

  handleCancelClick: function () {
    this.closeColorPicker();
  },

  handleValueChange: function (value) {
    this.props.onBackgroundChange(value);
  },

  handleKeyDown: function (e) {
    if (this.state.showColorPicker && e.keyCode === 27) {
      this.closeColorPicker();
    }
  },

  openColorPicker: function () {
    this.focusColorPicker = true;
    this.setState({ showColorPicker: true });
  },

  closeColorPicker: function () {
    this.focusSettings = true;
    this.setState({ showColorPicker: false });
  },

  render: function () {    
    return (
      DOM.div(
        {
          style: STYLES.container,
          className: 'ReactDashCard',
          onKeyDown: this.handleKeyDown
        },
        this.state.showColorPicker && (
          ColorPicker({
            ref: 'colorpicker',
            value: this.props.background,
            defaultColors: this.props.colors,
            closeIcon: this.props.closeIcon,
            selectedIcon: this.props.selectedIcon,
            onCancelClick: this.handleCancelClick,
            onValueChange: this.handleValueChange
          })
        ),
        CardDetails({
          ref: 'carddetails',
          hidden: this.state.showColorPicker,
          children: this.props.children,
          background: this.props.background,
          settingsIcon: this.props.settingsIcon,
          onSettingsClick: this.handleSettingsClick
        })
      )
    );
  }
});
