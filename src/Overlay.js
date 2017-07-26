import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { TransitionMotion, spring, presets } from 'react-motion';

class Overlay extends Component {

	constructor(props) {
		super(props);
		const {children} = this.props;
		this.items = [];
		React.Children.forEach(children.props.children,
 			child => this.items.push(child.props.path)
		);

	}
  willEnter = () => {
	const { history: {action} } = this.props
    return {
		value: this.direction === 'Y' ? 100 : action === 'POP' ? -100 : 100,
    }
  };


  willLeave = () => {
	const { history:{action} } = this.props
    return {
		value: this.direction === 'Y' ? spring(100, presets.stiff) : action === 'PUSH' ? spring(-100, presets.stiff) : spring(100, presets.stiff),
    }
  };

  getStyles = () => {
    const { children, location, history } = this.props
    const { pathname, state } = location
	const { action } = history;
    return [{
      data: {
		  handler: children
      },
      style: {
		  value: spring(0, presets.stiff)
      },
      key: pathname
    }]
  };

	render() {
		this.direction = 'X';
		if ( this.items.indexOf(this.props.location.pathname) === -1 ) {
			this.direction = 'Y';
		} else if ( this.previousLocation && this.items.indexOf(this.previousLocation) === -1 ) {
			this.direction = 'Y';
		}

		this.previousLocation = this.props.location.pathname;

		return (


	  <TransitionMotion
          styles={this.getStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {styles =>
            <div>
              {styles.map(({key, style, data}) => {
				  const styles = {
					  transform: `translate${this.direction}(${style.value}%)`
				  }
				  return (

				 this.items.indexOf(key) !== -1 && <div

				  className={this.props.className}
                  key={key}
                  style={styles}
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
