import { spring } from 'react-motion';
const slideConfig = { stiffness: 330, damping: 30 };

export const slide = {
	willMount: {
		offsetX: 0,
		offsetY: 100,
	},
	willUnmount: {
		offsetX: 0,
		offsetY: spring(100, slideConfig),
	},
	// will enter from
	willEnter: {
		offsetX: 100,
		offsetY: 0,
	},
	willEnterPop: {
		offsetX: -100,
		offsetY: 0,
	},
	// will leave to
	willLeave: {
		offsetY: 0,
		offsetX: spring(-100, slideConfig),
	},
	willLeavePop: {
		offsetY: 0,
		offsetX: spring(100, slideConfig),
	},
	atRest: {
		offsetX: spring(0, slideConfig),
		offsetY: spring(0, slideConfig),
	},
	mapStyles: (styles) => {
		return {
			transform: `translate3d(${styles.offsetX}%, ${styles.offsetY}%, 0)`
		}
	}

}
