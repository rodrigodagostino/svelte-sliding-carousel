import { getContext, setContext } from 'svelte';
import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

class CarouselRootState {
	ref: HTMLElement | null = $state(null);
	props: RootProps = $state({});
	track: HTMLElement | null = $state(null);
	trackPosition: number = $state(0);
	slides: HTMLLIElement[] = $state([]);
	activeAbsoluteIndex: number = $state(0);
	activeIndex: number = $derived.by(() => {
		const count = this.slides.length;
		return count ? ((this.activeAbsoluteIndex % count) + count) % count : 0;
	});
	lastIndex: number = $derived(Math.max(this.slides.length - (this.props.slidesPerView ?? 1), 0));
	totalWidth: number = $state(0);

	isLooping: boolean = $derived(this.props.loop === true && this.lastIndex >= 2);
	isRewinding: boolean = $derived(this.props.loop === 'rewind' && this.lastIndex >= 1);

	windowStart: number = $derived.by(() => {
		const count = this.slides.length;
		if (!count) return 0;
		const target = this.activeAbsoluteIndex;
		if (!this.isLooping) return Math.floor(target / count) * count;
		const position = this.trackPosition;
		return target >= position
			? Math.floor(position)
			: Math.ceil(position + (this.props.slidesPerView ?? 1)) - count;
	});

	goTo(index: number) {
		this.activeAbsoluteIndex += index - this.activeIndex;
	}

	canGoToPrev: boolean = $derived(this.isLooping || this.isRewinding || this.activeIndex > 0);
	goToPrev() {
		if (!this.canGoToPrev) return;
		if (this.isLooping || this.activeIndex > 0) this.activeAbsoluteIndex -= 1;
		else this.goTo(this.lastIndex);
	}

	canGoToNext: boolean = $derived(
		this.isLooping || this.isRewinding || this.activeIndex < this.lastIndex
	);
	goToNext() {
		if (!this.canGoToNext) return;
		if (this.isLooping || this.activeIndex < this.lastIndex) this.activeAbsoluteIndex += 1;
		else this.goTo(0);
	}

	isHovered: boolean = $state(false);
	isFocused: boolean = $state(false);
	isVisible: boolean = $state(true);

	isPaused: boolean = $derived.by(() => {
		const { autoplay } = this.props;
		if (typeof autoplay !== 'object') return false;
		return !!(
			(autoplay.pauseOnHover && this.isHovered) ||
			(autoplay.pauseOnFocus && this.isFocused) ||
			(autoplay.pauseOnVisibilityChange && !this.isVisible)
		);
	});
	isStopped: boolean = $state(false);
	isPlaying: boolean = $derived(
		!!this.props.autoplay && !this.isStopped && !this.isPaused && this.canGoToNext
	);
}

const KEY = Symbol('Carousel.RootState');

export function setCarouselRootState() {
	return setContext(KEY, new CarouselRootState());
}

export function getCarouselRootState() {
	return getContext<ReturnType<typeof setCarouselRootState>>(KEY);
}
