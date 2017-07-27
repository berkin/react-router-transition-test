import { spring } from 'react-motion';
const slideConfig = { stiffness: 330, damping: 30 };

export const slide = {
	willOpen: {
		offsetY: 100,
	},
	willClose: {
		offsetY: spring(100, slideConfig),
	},
	// will enter from
	willEnter: {
		offsetX: 100,
	},
	// will leave to
	willLeave: {
		offsetX: spring(-100, slideConfig),
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
