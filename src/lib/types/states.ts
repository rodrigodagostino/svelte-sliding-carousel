import type { CarouselRootProps as RootProps } from './props.js';

export interface CarouselRootStateContext {
	ref: HTMLUListElement | null;
	props: RootProps;
	track: HTMLDivElement | null;
	slides: HTMLLIElement[];
	activeSlideIndex: number;
}
