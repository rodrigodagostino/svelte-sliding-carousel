<script lang="ts">
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselPaginationProps } from '$lib/types/props.js';

	let { ref = $bindable(null), ...restProps }: CarouselPaginationProps & { class?: string } =
		$props();

	const rootState = getCarouselRootState();

	const classes = $derived(['ssc-pagination', restProps.class]);

	function handleOnClick(index: number) {
		rootState.activeSlideIndex = index;
	}
</script>

<ul bind:this={ref} class={classes}>
	{#each rootState.slides as { id }, index (id)}
		<li>
			<button
				class="ssc-pagination__page"
				data-is-active={index === rootState.activeSlideIndex}
				aria-label={`Go to slide ${index + 1}`}
				onclick={() => handleOnClick(index)}
			></button>
		</li>
	{/each}
</ul>

<style>
	.ssc-pagination {
		display: flex;
		gap: 0.25rem;
		list-style-type: none;
		padding-inline-start: 0;
		margin-inline-start: 0;
	}

	.ssc-pagination__page {
		min-width: 0.5rem;
		min-height: 0.5rem;
	}
</style>
