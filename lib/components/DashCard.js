import React, {PropTypes} from 'react';
import FlipCard from 'react-flipcard';
import CardDetails from './CardDetails';
import ColorPicker from './ColorPicker';

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

  handleSettingsClick() {
    this.openColorPicker();
  },

  handleCancelClick() {
    this.closeColorPicker();
  },

  handleValueChange(value) {
    this.props.onBackgroundChange(value);
  },

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.colorpicker.getDOMNode().querySelector('a[aria-label]').focus();
    }
  },

  handleKeyDown(e) {
    if (this.state.showColorPicker && e.keyCode === 27) {
      this.closeColorPicker();
    }
  },

  openColorPicker() {
    this.setState({ showColorPicker: true });
  },

  closeColorPicker() {
    this.setState({ showColorPicker: false });
  },

  render() {
    return (
      <div
        style={STYLES.container}
        className="ReactDashCard"
        onKeyDown={this.handleKeyDown}
      >
        <FlipCard
          disabled={true}
          flipped={this.state.showColorPicker}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <CardDetails
            ref="carddetails"
            background={this.props.background}
            settingsIcon={this.props.settingsIcon}
            onSettingsClick={this.handleSettingsClick}
          >
            {this.props.children}
          </CardDetails>
          <ColorPicker
            ref="colorpicker"
            value={this.props.background}
            defaultColors={this.props.colors}
            closeIcon={this.props.closeIcon}
            selectedIcon={this.props.selectedIcon}
            onCancelClick={this.handleCancelClick}
            onValueChange={this.handleValueChange}
          />
        </FlipCard>
      </div>
    );
  }
});
