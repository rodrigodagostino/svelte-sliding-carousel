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
			align: 'center',
			gap: 20,
		};
	});
</script>

<svelte:head>
	<title>Centered slides — Svelte Sliding Carousel</title>
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

	:global(.ssc-track) {
		padding-block: 3.125rem;
	}

	:global(.ssc-slide) {
		border-radius: 1rem;
		transition: scale var(--ssc-transition-duration) var(--ssc-transition-easing);
		overflow: hidden;
	}

	:global(.ssc-slide[data-is-active='true']) {
		scale: 1.4;
		z-index: 1;
	}

	.ssc-slide-image {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}
</style>
