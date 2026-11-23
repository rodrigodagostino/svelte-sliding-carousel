<script lang="ts">
	import { setCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselRootProps } from '$lib/types/index.js';

	let {
		ref = $bindable(null),
		loop = false,
		children,
		...restProps
	}: CarouselRootProps & { class?: string } = $props();

	const rootState = setCarouselRootState();

	$effect(() => {
		rootState.props = {
			ref,
			loop,
		};
	});

	const classes = $derived(['ssc-root', restProps.class]);
</script>

<div bind:this={ref} class={classes}>
	{@render children?.()}
</div>

<style>
	.ssc-root {
		position: relative;
	}
</style>
