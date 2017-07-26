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
	const { history } = this.props
	  const { action } = history
    return {
      y: action === 'POP' ? -100 : 100,
    }
  };


  willLeave = () => {
	const { history } = this.props
	  const { action } = history
    return {
      y: action === 'PUSH' ? spring(-100, presets.stiff) : spring(100, presets.stiff),
    }
  };

  getStyles = () => {
    const { children, location, history } = this.props
    const { pathname, state } = location
	const { action } = history;
    return [{
      data: {
        handler: React.cloneElement(children, {direction: this.state.transitionDirection}),
        state
      },
      style: {
		  y: spring(0, presets.stiff)
      },
      key: pathname
    }]
  };


	render() {
		const {children} = this.props;
		this.items = [];
		React.Children.forEach(children.props.children,
 			child => this.items.push(child.props.path))

		return (


	  <TransitionMotion
          styles={this.getStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {styles =>
            <div>
              {styles.map(({key, style, data}) => {
				  return (

				 this.items.indexOf(key) !== -1 && <div

				  className="animated-page-wrapper"
                  key={key}
                  style={{
                    transform: `translateX(${style.y}%)`
                  }}
                >
                 {data.handler}
                </div>
				  )
			  }
              )}
       		</div>
		  }
		</TransitionMotion>
		)
	}
}

export default Overlay;
