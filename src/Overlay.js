import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { TransitionMotion, spring, presets } from 'react-motion';

class Overlay extends Component {

  state = {
    transitionDirection: 1
  };

  componentWillReceiveProps({location: {state}}) {
    const numState = state || 0
    const _state = this.props.location.state
    if (numState > _state) {
      this.setState({transitionDirection: -1})
    } else {
      this.setState({transitionDirection: 1})
    }
  }

  willEnter = () => {
    const toLeft = this.state.transitionDirection < 0
    return {
      y: toLeft ? -100 : 100,
    }
  };

  willLeave = () => {
    const toLeft = this.state.transitionDirection < 0
    return {
      y: toLeft ? spring(-100, presets.stiff) : spring(100, presets.stiff),
    }
  };

  getStyles = () => {
    const { children, location } = this.props
    const { pathname, state } = location
	let child = null;
	  children.forEach(item => {
		  if ( item.props.path === pathname )
			  child = item;
	  })
    return [{
      data: {
        handler: React.cloneElement(child, {direction: this.state.transitionDirection}),
        state
      },
      style: {
		  y: pathname === '/' ? -100 : spring(0, presets.stiff)
      },
      key: pathname
    }]
  };


	render() {
		return (

	  <TransitionMotion
          styles={this.getStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {styles =>
            <div>
              {styles.map(({key, style, data}) =>
                <div
				  className="animated-page-wrapper"
                  key={key}
                  style={{
                    transform: `translateX(${style.y}%)`
                  }}
                >
                 {data.handler}
                </div>
              )}
       		</div>
		  }
		</TransitionMotion>
		)
	}
}

export default Overlay;
