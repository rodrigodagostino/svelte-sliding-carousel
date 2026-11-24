<script lang="ts">
	import { setCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselRootProps } from '$lib/types/index.js';

	let {
		ref = $bindable(null),
		loop = false,
		gap,
		transition,
		children,
		...restProps
	}: CarouselRootProps & { class?: string } = $props();

	const rootState = setCarouselRootState();

	$effect(() => {
		rootState.props = {
			ref,
			loop,
			gap,
			transition,
		};
	});

	const classes = $derived(['ssc-root', restProps.class]);
	const styleGap = $derived(typeof gap === 'number' ? `${gap}px` : gap);
	const styleTransitionDuration = $derived(
		typeof transition?.duration === 'number' ? `${transition.duration}ms` : undefined
	);
	const styleTransitionEasing = $derived(transition?.easing);
</script>

<div
	bind:this={ref}
	class={classes}
	style:--ssc-gap={styleGap}
	style:--ssc-transition-duration={styleTransitionDuration}
	style:--ssc-transition-easing={styleTransitionEasing}
>
	{@render children?.()}
</div>

<style>
	.ssc-root {
		position: relative;
	}
</style>
