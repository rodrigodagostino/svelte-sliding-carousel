import { getContext, setContext } from 'svelte';
import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

class CarouselRootState {
	ref: HTMLElement | null = $state(null);
	props: RootProps = $state({});
	track: HTMLElement | null = $state(null);
	slides: HTMLLIElement[] = $state([]);
	activeSlideIndex: number = $state(0);
}

const KEY = Symbol('Carousel.RootState');

export function setCarouselRootState() {
	return setContext(KEY, new CarouselRootState());
}

export function getCarouselRootState() {
	return getContext<ReturnType<typeof setCarouselRootState>>(KEY);
}
