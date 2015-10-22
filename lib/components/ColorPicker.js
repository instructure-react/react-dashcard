import React, {PropTypes} from 'react';
import clone from '../helpers/clone';
const isSafari = navigator && /safari/i.test(navigator.userAgent);

const STYLES = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2
  },
  colors: {
    boxSizing: 'border-box',
    height: 148,
    padding: 15,
    // Standard
    display: isSafari ? '-webkit-flex' : 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    // Safari
    WebkitFlexFlow: 'row wrap',
    WebkitAlignItems: 'center',
    WebkitJustifyContent: 'space-around'
  },
  tile: {
    width: '15%',
    height: 36,
    float: 'left',
    border: '0 none',
    borderRadius: 5,
    boxSizing: 'border-box',
    color: '#fff',
    fontSize: '16px',
    margin: 5,
    padding: '9px 12px',
    textAlign: 'center'
  },
  cancel: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'absolute',
    top: 5,
    right: 10
  },
  control: {
    margin: '10px 20px 8px'
  },
  colorPreview: {
    width: '16%',
    height: 36,
    border: '0 none',
    borderRight: '1px solid rgb(208, 208, 208)',
    display: 'inline-block',
    'WebkitBorderTopLeftRadius': 5,
    'WebkitBorderBottomLeftRadius': 5,
    'MozBorderRadiusTopleft': 5,
    'MozBorderRadiusBottomleft': 5,
    'borderTopLeftRadius': 5,
    'borderBottomLeftRadius': 5
  },
  colorInput: {
    border: '0 none',
    boxSizing: 'border-box',
    width: '55%',
    height: 36,
    padding: 9,
    position: 'relative',
    top: -14
  },
  colorButton: {
    backgroundColor: 'rgb(1, 152, 227)',
    border: '0 none',
    color: '#fff',
    height: 36,
    width: '27%',
    marginLeft: 1,
    position: 'relative',
    top: -14,
    'WebkitBorderTopRightRadius': 5,
    'WebkitBorderBottomRightRadius': 5,
    'MozBorderRadiusTopright': 5,
    'MozBorderRadiusBottomright': 5,
    'borderTopRightRadius': 5,
    'borderBottomRightRadius': 5
  },
  screenreaderOnly: {
    overflow: 'hidden',
    position: 'absolute',
    top: 'auto',
    left: -10000,
    width: 1,
    height: 1
  }
};

const COLORS = [
  {hex: '#EF4437', name: 'Red'},
  {hex: '#E71F63', name: 'Pink'},
  {hex: '#8F3E97', name: 'Purple'},
  {hex: '#65499D', name: 'Deep Purple'},
  {hex: '#4554A4', name: 'Indigo'},
  {hex: '#2083C5', name: 'Blue'},
  {hex: '#35A4DC', name: 'Light Blue'},
  {hex: '#09BCD3', name: 'Cyan'},
  {hex: '#009688', name: 'Teal'},
  {hex: '#43A047', name: 'Green'},
  {hex: '#8BC34A', name: 'Light Green'},
  {hex: '#FDC010', name: 'Yellow'},
  {hex: '#F8971C', name: 'Orange'},
  {hex: '#F0592B', name: 'Deep Orange'},
  {hex: '#F06291', name: 'Light Pink'}
];

function randomId() {
  return Math.floor(Math.random() * Math.pow(2, 64)).toString(36);
}

export default React.createClass({
  displayName: 'ColorPicker',

  propTypes: {
    value: PropTypes.string,
    defaultColors: PropTypes.arrayOf(PropTypes.shape({
      hex: PropTypes.string,
      name: PropTypes.string
    })),
    onValueChange: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    closeIcon: PropTypes.element,
    selectedIcon: PropTypes.element
  },

  getDefaultProps() {
    return {
      defaultColors: COLORS,
      closeIcon: <span style={{fontSize: 25}}>×</span>,
      selectedIcon: <span>✓</span>
    };
  },

  getInitialState() {
    this.inputId = randomId();

    return {
      value: ''
    };
  },

  handleTileClick(value) {
    this.commit(value);
    this.close();
  },

  handleTileKeyDown(value, event) {
    if (event.keyCode === 13 /* enter */ ||
        event.keyCode === 32 /* spacebar */) {
      event.preventDefault();
      this.commit(value);
      this.close();
    }
  },

  handleApplyClick() {
    this.commit(this.refs.input.value);
    this.close();
  },

  handleCancelClick() {
    this.close();
  },

  handleInputKeyUp() {
    this.setState({ value: this.refs.input.value });
  },

  getValue() {
    return this.state.value || this.props.value;
  },

  renderColorTiles() {
    return this.props.defaultColors.map((color) => {
      const title = color.name + ' (' + color.hex + ')';
      const selected = color.hex === this.getValue().toUpperCase();
      const tileStyle = clone(STYLES.tile);
      tileStyle.backgroundColor = color.hex;

      return (
        <button
          key={color.hex}
          role="option"
          aria-selected={selected}
          data-value={color.hex}
          style={tileStyle}
          onClick={this.handleTileClick.bind(this, color.hex)}
          onKeyDown={this.handleTileKeyDown.bind(this, color.hex)}
          tabIndex={0}
        >
          <span style={STYLES.screenreaderOnly}>
            {title}
          </span>
          <span aria-hidden={true}>
            {selected ? this.props.selectedIcon : ' '}
          </span>
        </button>
      );
    });
  },

  render() {
    const previewStyle = clone(STYLES.colorPreview);
    previewStyle.backgroundColor = this.getValue();

    return (
      <div
        style={STYLES.container}
        className="ReactDashCard__ColorPicker"
      >
        <a
          style={STYLES.cancel}
          href="#"
          onClick={this.handleCancelClick}
          aria-label="Close color picker"
        >
        {this.props.closeIcon}
        </a>
        <div
          style={STYLES.colors}
          tabIndex={0}
          role="listbox"
        >
          {this.renderColorTiles()}
        </div>
        <div
          style={STYLES.control}
        >
          <div style={previewStyle}/>
          <label
            style={STYLES.screenreaderOnly}
            htmlFor={this.inputId}
          >
            Enter a hexadecimal value to use a custom color
          </label>
          <input
            id={this.inputId}
            ref="input"
            type="text"
            style={STYLES.colorInput}
            defaultValue={this.props.value}
            onKeyUp={this.handleInputKeyUp}
          />
          <button
            type="button"
            style={STYLES.colorButton}
            onClick={this.handleApplyClick}
          >
            Apply
          </button>
        </div>
      </div>
    );
  },

  commit(value) {
    this.props.onValueChange(value);
  },

  close() {
    this.props.onCancelClick();
  }
});
