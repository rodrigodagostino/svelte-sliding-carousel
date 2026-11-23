<script lang="ts">
	import { setCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselRootProps } from '$lib/types/index.js';

	let {
		ref = $bindable(null),
		loop = false,
		gap,
		children,
		...restProps
	}: CarouselRootProps & { class?: string } = $props();

	const rootState = setCarouselRootState();

	$effect(() => {
		rootState.props = {
			ref,
			loop,
			gap,
		};
	});

	const classes = $derived(['ssc-root', restProps.class]);
	const styleGap = $derived(typeof gap === 'number' ? `${gap}px` : gap);
</script>

<div bind:this={ref} class={classes} style:--ssc-gap={styleGap}>
	{@render children?.()}
</div>

<style>
	.ssc-root {
		position: relative;
	}
</style>
