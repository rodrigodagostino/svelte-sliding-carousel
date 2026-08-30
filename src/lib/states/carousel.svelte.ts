import { getContext, setContext } from 'svelte';
import type { CarouselRootStateContext as Context } from '$lib/types/index.js';

class CarouselRootState {
	props: Context['props'] = $state({});
	track: Context['track'] = $state(null);
	slides: Context['slides'] = $state([]);
	activeSlideIndex: Context['activeSlideIndex'] = $state(0);
}

const KEY = Symbol('Carousel.RootState');

export function setCarouselRootState() {
	return setContext(KEY, new CarouselRootState());
}

export function getCarouselRootState() {
	return getContext<ReturnType<typeof setCarouselRootState>>(KEY);
}
