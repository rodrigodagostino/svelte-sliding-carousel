<script lang="ts">
	import { onMount } from 'svelte';
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselSlideProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		id,
		index,
		children,
		...restProps
	}: CarouselSlideProps & { class?: string } = $props();

	const rootState = getCarouselRootState();

	onMount(() => {
		if (ref) rootState.slides.push(ref);

		return () => {
			rootState.slides = rootState.slides?.filter((slide) => slide !== ref);
		};
	});

	const classes = $derived(['ssc-slide', restProps.class]);

	const shift = $derived(
		rootState.slides.length
			? Math.ceil((rootState.windowStart - index) / rootState.slides.length) * rootState.totalWidth
			: 0
	);
</script>

<li
	bind:this={ref}
	{id}
	class={classes}
	style:transform={shift ? `translateX(${shift}px)` : undefined}
	data-item-index={index}
>
	{@render children?.()}
</li>

<style>
	.ssc-slide {
		flex-shrink: 0;
		width: calc(
			(100% - (var(--ssc-slides-per-view, 1) - 1) * var(--ssc-gap, 0px)) /
				var(--ssc-slides-per-view, 1)
		);
	}
</style>
