<script>
	import { onMount } from 'svelte';
	import { Carousel } from '$lib/index.js';
	import { defaultRootProps, defaultSlides } from '../fixtures.js';
	import layoutState from '../states.svelte.js';
	import '$lib/styles.css';

	let slides = defaultSlides;

	onMount(() => {
		layoutState.props = {
			...defaultRootProps,
			slidesPerView: 3,
			gap: 20,
		};
	});
</script>

<svelte:head>
	<title>Slides per view — Svelte Sliding Carousel</title>
</svelte:head>

<Carousel.Root {...layoutState.props}>
	<Carousel.Track>
		{#each slides as { id, imgSrc }, index (id)}
			<Carousel.Slide id={`slide-${id}`} {index}>
				<img class="ssc-slide-image" src={imgSrc} alt="" />
			</Carousel.Slide>
		{/each}
	</Carousel.Track>
	<Carousel.ButtonPrev />
	<Carousel.ButtonNext />
	<Carousel.Pagination />
</Carousel.Root>

<style>
	:global(.ssc-root) {
		max-width: 64rem;
		margin-inline: auto;
	}

	.ssc-slide-image {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}
</style>
