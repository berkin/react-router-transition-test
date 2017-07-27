import React, { Component } from 'react';
import { Route, matchPath } from 'react-router-dom'
import { TransitionMotion, spring, presets } from 'react-motion';

class Overlay extends Component {

	constructor(props) {
		super(props);
		const {children} = this.props;

		this.items = [];
		React.Children.forEach(children.props.children,
			child => this.items.push(child.props)
		);

		this.willMount = this.isMatched(this.props.location.pathname);
		this.willUnmount = false;

	}

	componentWillReceiveProps(nextProps) {
		const isPrevPathMatched = this.isMatched(this.props.location.pathname);
		const isNextPathMatched = this.isMatched(nextProps.location.pathname);
		this.willMount = false;
		this.willUnmount = false;

		if ( !isPrevPathMatched && isNextPathMatched ) {
			this.willMount = true;
		} else if ( isPrevPathMatched && !isNextPathMatched ) {
			this.willUnmount = true;
		}

		this.previousLocation = this.props.location.pathname
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.location.pathname !== this.previousLocation;
	}

	isMatched(pathname) {
		return this.items.some(item => matchPath(pathname, item))
	}

	willEnter = () => {
		const { history: { action } } = this.props
		if ( this.willMount ) {
			return this.props.willMount;
		} else {
			return action === 'POP' && this.props.willEnterPop ?
				this.props.willEnterPop :
				this.props.willEnter;
		}
	};


	willLeave = () => {
		const { history: { action } } = this.props
		if ( this.willUnmount ) {
			return this.props.willUnmount;
		} else {
			return action === 'POP' && this.props.willLeavePop ?
				this.props.willLeavePop :
				this.props.willLeave;
		}
	};

	getDefaultStyles = () => {
		const { children, location, history } = this.props
		const { pathname, state } = location
		return [
			{
				key: pathname,
				data: {
					handler: children
				},
				style: this.willMount ? this.props.willMount : this.props.willEnter,
			},
		];
	}

	getStyles = () => {
		const { children, location, history } = this.props
		const { pathname, state } = location
		return [{
			data: {
				handler: children
			},
			style: this.props.atRest,
			key: pathname,
		}]
	};

	render() {
		return (
			<TransitionMotion
				defaultStyles={this.getDefaultStyles()}
				styles={this.getStyles()}
				willEnter={this.willEnter}
				willLeave={this.willLeave}
			>
			{styles =>
				<div>
				{styles.map(({key, style, data}) => {
					const styles = this.props.mapStyles(style)
					return (
						this.isMatched(key) &&
						<div
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
