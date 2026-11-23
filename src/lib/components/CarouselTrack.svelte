<script lang="ts">
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselTrackProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: CarouselTrackProps & { class?: string } = $props();

	let inner: HTMLUListElement | null = $state(null);
	let offsetWidth: number = $state(0);

	const rootState = getCarouselRootState();

	$effect(() => {
		rootState.track = ref;
	});

	$effect(() => {
		const first = rootState.slides[0];
		const last = rootState.slides[rootState.slides.length - 1];
		if (!inner || !offsetWidth || !first || !last) {
			rootState.totalWidth = 0;
			return;
		}
		const gap = parseFloat(getComputedStyle(inner).columnGap) || 0;
		rootState.totalWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft + gap;
	});

	const classes = $derived(['ssc-track', restProps.class]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function getStyleTransform(...args: unknown[]) {
		const { slides, activeIndex, activeAbsoluteIndex, totalWidth } = rootState;
		const cycle = slides.length ? Math.floor(activeAbsoluteIndex / slides.length) * totalWidth : 0;
		const offset = (slides[activeIndex]?.offsetLeft ?? 0) + cycle;
		return `translate3d(${-offset}px, 0, 0)`;
	}

	const styleTransform = $derived(getStyleTransform(rootState.activeAbsoluteIndex, offsetWidth));
</script>

<div bind:this={ref} class={classes}>
	<ul bind:this={inner} bind:offsetWidth class="ssc-track__inner" style:transform={styleTransform}>
		{@render children?.()}
	</ul>
</div>

<style>
	.ssc-track {
		overflow: hidden;
	}

	.ssc-track__inner {
		display: flex;
		list-style: none;
		padding-inline-start: 0;
		margin-inline-start: 0;
		transition: transform 520ms cubic-bezier(0.32, 0.72, 0, 1);
		backface-visibility: hidden;
		position: relative;
	}
</style>
