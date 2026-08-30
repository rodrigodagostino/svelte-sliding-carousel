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
</script>

<li bind:this={ref} {id} class={classes} data-item-index={index}>
	{@render children?.()}
</li>

<style>
	.ssc-slide {
		flex-shrink: 0;
		width: 100%;
	}
</style>
