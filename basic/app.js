import React from 'react';
import clone from '../../lib/helpers/clone';
import DashCard from '../../lib/main';

var STYLES = {
  heading: {
    margin: 0,
    fontSize: 16
  },
  course: {
    boxSizing: 'border-box',
    position: 'relative',
    height: 145,
    padding: 20,
    fontSize: 12
  },
  actions: {
    backgroundColor: '#fff',
    borderTop: '1px solid #E8E8E8',
    boxSizing: 'border-box',
    height: 70
  },
  action: {
    width: '25%',
    height: 70,
    boxSizing: 'border-box',
    borderLeft: '1px solid #E8E8E8',
    display: 'inline-block',
    textAlign: 'center',
    color: 'rgb(124, 124, 124)',
    padding: 25,
    fontSize: 20
  },
  content: {
    position: 'absolute',
    bottom: 20,
    textShadow: '0 0 2px #999'
  },
  newCourse: {
    border: '3px dashed rgb(230, 230, 230)',
    boxSizing: 'border-box',
    width: 262,
    height: 217,
    float: 'left',
    flexGrow: 1,
    WebkitFlexGrow: 1,
    margin: 30,
    padding: 0,
    textAlign: 'center',
    color: 'rgb(230, 230, 230)'
  },
  strong: {
    display: 'block',
    fontSize: 150
  },
  label: {
    position: 'relative',
    top: -15
  }
};

var COURSES = [
  {
    background: '#43A047',
    name: 'Biology 101',
    code: 'BIO 101',
    semester: 'Spring 2015'
  },
  {
    background: '#8F3E97',
    name: 'Creative Writing',
    code: 'CRE WRT 1040',
    semester: 'Spring 2015'
  },
  {
    background: '#E71F63',
    name: 'Algebra 1040',
    code: 'ALG 1040',
    semester: 'Spring 2015'
  },
  {
    background: '#EF4437',
    name: 'Information Systems 4000',
    code: 'IS 4000',
    semester: 'Spring 2015'
  },
  {
    background: '#2083C5',
    name: 'Art History 3',
    code: 'ART HIS 3',
    semester: 'Spring 2015'
  }
];

var App = React.createClass({
  getInitialState() {
    return {
      courses: COURSES
    };
  },

  handleBackgroundChange(idx, color) {
    this.state.courses[idx].background = color;
    this.forceUpdate();
  },

  renderCourses() {
    var firstActionStyle = clone(STYLES.action);
    delete firstActionStyle.borderLeft;

    return this.state.courses.map(function (course, idx) {
      return (
        <DashCard
          key={idx}
          closeIcon={<i className="fa fa-times" style={{fontSize: 18}}/>}
          selectedIcon={<i className="fa fa-check"/>}
          settingsIcon={<i className="fa fa-cog" style={{fontSize: 18, opacity: 0.75}}/>}
          background={course.background}
          onBackgroundChange={this.handleBackgroundChange.bind(this, idx)}
        >
          <div style={STYLES.course}>
            <div style={STYLES.content}>
              <h3 style={STYLES.heading}>{course.name}</h3>
              <div>{course.code}</div>
              <div>{course.semester}</div>
            </div>
          </div>
          <div style={STYLES.actions}>
            <div style={firstActionStyle}><i className="fa fa-book"/></div>
            <div style={STYLES.action}><i className="fa fa-bullhorn"/></div>
            <div style={STYLES.action}><i className="fa fa-comment"/></div>
            <div style={STYLES.action}><i className="fa fa-folder-open"/></div>
          </div>
        </DashCard>
      );
    }.bind(this));
  },

  render() {
    return (
      <div>
        {this.renderCourses()}
        <div style={STYLES.newCourse}>
          <strong style={STYLES.strong}>+</strong>
          <label style={STYLES.label}>New Course</label>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('example'));
