import { getContext, setContext } from 'svelte';
import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

class CarouselRootState {
	ref: HTMLElement | null = $state(null);
	props: RootProps = $state({});
	track: HTMLElement | null = $state(null);
	slides: HTMLLIElement[] = $state([]);
	activeAbsoluteIndex: number = $state(0);
	activeIndex: number = $derived.by(() => {
		const count = this.slides.length;
		return count ? ((this.activeAbsoluteIndex % count) + count) % count : 0;
	});
	windowStart: number = $state(0);
	totalWidth: number = $state(0);
	isLooping: boolean = $derived(this.props.loop === true && this.slides.length >= 3);
	isRewinding: boolean = $derived(this.props.loop === 'rewind' && this.slides.length >= 2);

	#moveTo(position: number) {
		const count = this.slides.length;
		if (!count) return;
		const slack = count - Math.abs(position - this.activeAbsoluteIndex) - 1;
		const start = Math.min(position, this.activeAbsoluteIndex);
		this.windowStart = this.isLooping
			? start - Math.floor(Math.max(slack, 0) / 2)
			: Math.floor(position / count) * count;
		this.activeAbsoluteIndex = position;
	}

	goTo(index: number) {
		this.#moveTo(this.activeAbsoluteIndex + index - this.activeIndex);
	}

	canGoToPrev: boolean = $derived(this.isLooping || this.isRewinding || this.activeIndex > 0);
	goToPrev() {
		if (!this.canGoToPrev) return;
		if (this.isLooping || this.activeIndex > 0) this.#moveTo(this.activeAbsoluteIndex - 1);
		else this.goTo(this.slides.length - 1);
	}

	canGoToNext: boolean = $derived(
		this.isLooping || this.isRewinding || this.activeIndex < this.slides.length - 1
	);
	goToNext() {
		if (!this.canGoToNext) return;
		if (this.isLooping || this.activeIndex < this.slides.length - 1)
			this.#moveTo(this.activeAbsoluteIndex + 1);
		else this.goTo(0);
	}
}

const KEY = Symbol('Carousel.RootState');

export function setCarouselRootState() {
	return setContext(KEY, new CarouselRootState());
}

export function getCarouselRootState() {
	return getContext<ReturnType<typeof setCarouselRootState>>(KEY);
}
