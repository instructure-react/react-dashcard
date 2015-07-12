import React, {DOM, PropTypes} from 'react';
var CardDetails = React.createFactory(require('./CardDetails'));
var ColorPicker = React.createFactory(require('./ColorPicker'));

var STYLES = {
  container: {
    position: 'relative'
  }
};

export default React.createClass({
  displayName: 'DashCard',

  propTypes: {
    background: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    onBackgroundChange: PropTypes.func
  },

  getInitialState() {
    return {
      showColorPicker: false
    };
  },

  componentDidUpdate() {
    if (this.focusColorPicker) {
      this.refs.colorpicker.getDOMNode().querySelector('a[aria-label]').focus();
      this.focusColorPicker = false;
    } else if (this.focusSettings) {
      this.refs.carddetails.getDOMNode().querySelector('a[aria-label]').focus();
      this.focusSettings = false;
    }
  },

  handleSettingsClick() {
    this.openColorPicker();
  },

  handleCancelClick() {
    this.closeColorPicker();
  },

  handleValueChange(value) {
    this.props.onBackgroundChange(value);
  },

  handleKeyDown(e) {
    if (this.state.showColorPicker && e.keyCode === 27) {
      this.closeColorPicker();
    }
  },

  openColorPicker() {
    this.focusColorPicker = true;
    this.setState({ showColorPicker: true });
  },

  closeColorPicker() {
    this.focusSettings = true;
    this.setState({ showColorPicker: false });
  },

  render() {    
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
