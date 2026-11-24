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

	const shift = $derived.by(() => {
		const { windowStart, slideOffsets, totalWidth } = rootState;
		if (!totalWidth) return 0;

		const offset = slideOffsets[index] ?? 0;
		return Math.ceil((windowStart - offset) / totalWidth - 1e-6) * totalWidth;
	});
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
	}

	:global(.ssc-root:not([data-slides-per-view='auto'])) .ssc-slide {
		width: calc(
			(100% - (var(--ssc-slides-per-view, 1) - 1) * var(--ssc-gap, 0px)) /
				var(--ssc-slides-per-view, 1)
		);
	}
</style>
