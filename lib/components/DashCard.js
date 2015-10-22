import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import FlipCard from 'react-flipcard';
import CardDetails from './CardDetails';
import ColorPicker from './ColorPicker';

const STYLES = {
  container: {
    position: 'relative'
  }
};

export default React.createClass({
  displayName: 'DashCard',

  propTypes: {
    background: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.shape({
      hex: PropTypes.string,
      name: PropTypes.string
    })),
    onBackgroundChange: PropTypes.func,
    closeIcon: PropTypes.element,
    selectedIcon: PropTypes.element,
    settingsIcon: PropTypes.element,
    children: PropTypes.any
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
      findDOMNode(this.refs.colorpicker).querySelector('a[aria-label]').focus();
    }
  },

  handleKeyDown(e) {
    if (this.state.showColorPicker && e.keyCode === 27) {
      this.closeColorPicker();
    }
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
  },

  openColorPicker() {
    this.setState({ showColorPicker: true });
  },

  closeColorPicker() {
    this.setState({ showColorPicker: false });
  }
});
