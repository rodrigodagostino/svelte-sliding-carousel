import type { Snippet } from 'svelte';

export interface CarouselRootProps {
	/** Reference to the carousel element. `[$bindable]` */
	ref?: HTMLDivElement | null;
	/** Enables infinite looping. Default: `false`. */
	loop?: boolean | 'rewind';
	/** Separation between slides (numbers as pixels, strings as any CSS length). Default: `undefined`. */
	gap?: number;
	/** Controls the slide animation played when the track moves to another slide. Omitted fields fall back to their defaults. */
	transition?: {
		/** Time the track takes to slide to the target position (in milliseconds). Assign it a value of `0` to disable the animation and jump instantly. Default: `520`. */
		duration?: number;
		/** Rate at which the track’s translation progresses over the duration. Accepts any value valid for the CSS `transition-timing-function` property. Default: `cubic-bezier(0.32, 0.72, 0, 1)`. */
		easing?:
			| 'ease'
			| 'ease-in'
			| 'ease-out'
			| 'ease-in-out'
			| 'linear'
			| 'step-start'
			| 'step-end'
			| string;
	};
	/** Content to be rendered inside the carousel. */
	children?: Snippet;
}

export interface CarouselTrackProps {
	/** Reference to the track element. `[$bindable]` */
	ref?: HTMLDivElement | null;
	/** Content to be rendered inside the track. */
	children?: Snippet;
}

export interface CarouselSlideProps {
	/** Reference to the slide element. `[$bindable]` */
	ref?: HTMLLIElement | null;
	/** Unique identifier for each slide. */
	id: string;
	/** Position of the slide in the carousel. */
	index: number;
	/** Content to be rendered inside the slide. */
	children?: Snippet;
}

export interface CarouselButtonProps {
	/** Reference to the button element. `[$bindable]` */
	ref?: HTMLButtonElement | null;
	/** Content to be rendered inside the button. */
	children?: Snippet;
}

export interface CarouselPaginationProps {
	/** Reference to the pagination element. `[$bindable]` */
	ref?: HTMLUListElement | null;
}
