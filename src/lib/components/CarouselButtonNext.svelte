<script lang="ts">
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselButtonProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: CarouselButtonProps & { class?: string } = $props();

	const rootState = getCarouselRootState();

	const classes = $derived(['ssc-button-next', restProps.class]);

	function handleOnClick() {
		rootState.goToNext();
	}
</script>

<button
	bind:this={ref}
	class={classes}
	aria-disabled={!rootState.canGoToNext}
	onclick={handleOnClick}
>
	{#if children}
		{@render children()}
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="m9 18 6-6-6-6" />
		</svg>
	{/if}
</button>

<style>
	.ssc-button-next {
		display: flex;
	}
</style>
