import type { Snippet } from 'svelte';

export interface CarouselRootProps {
	/** Reference to the carousel element. `[$bindable]` */
	ref?: HTMLDivElement | null;
	/** Enables infinite looping. */
	loop?: boolean | 'rewind';
	/** Separation between slides (numbers as pixels, strings as any CSS length). */
	gap?: number;
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
