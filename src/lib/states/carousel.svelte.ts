import { getContext, setContext } from 'svelte';
import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

class CarouselRootState {
	ref: HTMLElement | null = $state(null);
	props: RootProps = $state({});
	track: HTMLElement | null = $state(null);
	trackPosition: number = $state(0);
	slides: HTMLLIElement[] = $state([]);
	slideWidths: number[] = $state([]);
	slideOffsets: number[] = $state([]);
	viewportWidth: number = $state(0);
	totalWidth: number = $state(0);
	maxScroll: number = $derived.by(() => {
		const last = this.slideOffsets.length - 1;
		if (last < 0) return 0;
		const end = this.slideOffsets[last] + (this.slideWidths[last] ?? 0);
		return Math.max(end - this.viewportWidth, this.slideOffsets[0]);
	});

	activeAbsoluteIndex: number = $state(0);
	activeIndex: number = $derived.by(() => {
		const count = this.slides.length;
		return count ? ((this.activeAbsoluteIndex % count) + count) % count : 0;
	});
	lastIndex: number = $derived.by(() => {
		const index = this.slideOffsets.findIndex((offset) => offset >= this.maxScroll - 0.5);
		return index === -1 ? Math.max(this.slides.length - 1, 0) : index;
	});

	isLooping: boolean = $derived.by(() => {
		const { slideOffsets: offsets, totalWidth } = this;
		if (this.props.loop !== true || !totalWidth || !offsets.length) return false;
		const maxSlot = Math.max(
			...offsets.map((offset, i) => (offsets[i + 1] ?? offsets[0] + totalWidth) - offset)
		);
		return totalWidth - this.viewportWidth >= 2 * maxSlot - 1;
	});
	isRewinding: boolean = $derived(this.props.loop === 'rewind' && this.lastIndex >= 1);

	targetOffset: number = $derived.by(() => {
		const count = this.slides.length;
		if (!count) return 0;
		const cycle = Math.floor(this.activeAbsoluteIndex / count) * this.totalWidth;
		const offset = this.slideOffsets[this.activeIndex] ?? 0;
		return cycle + (this.isLooping ? offset : Math.min(offset, this.maxScroll));
	});

	windowStart: number = $derived.by(() => {
		const { slideOffsets: offsets, totalWidth } = this;
		const count = this.slides.length;
		if (!count || !totalWidth || !offsets.length) return 0;
		const base = offsets[0];
		if (!this.isLooping) return Math.floor(this.activeAbsoluteIndex / count) * totalWidth + base;
		const position = this.trackPosition;
		if (this.targetOffset < position) return position + this.viewportWidth - totalWidth;
		const cycle = Math.floor((position - base) / totalWidth) * totalWidth;
		let start = base;
		for (const offset of offsets) if (offset <= position - cycle + 0.01) start = offset;
		return cycle + start;
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
