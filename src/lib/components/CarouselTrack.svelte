<script lang="ts">
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselTrackProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: CarouselTrackProps & { class?: string } = $props();

	let offsetWidth: number = $state(0);

	const rootState = getCarouselRootState();

	$effect(() => {
		rootState.track = ref;
	});

	const classes = $derived(['ssc-track', restProps.class]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function getStyleTransform(...args: unknown[]) {
		return `translate3d(-${rootState.slides[rootState.activeSlideIndex]?.offsetLeft}px, 0, 0)`;
	}

	const styleTransform = $derived(getStyleTransform(rootState.activeSlideIndex, offsetWidth));
</script>

<div bind:this={ref} class={classes}>
	<ul bind:offsetWidth class="ssc-track__inner" style:transform={styleTransform}>
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
