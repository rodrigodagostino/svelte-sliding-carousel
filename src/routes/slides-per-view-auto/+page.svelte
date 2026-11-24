<script>
	import { onMount } from 'svelte';
	import { Carousel } from '$lib/index.js';
	import { defaultRootProps, defaultSlides } from '../fixtures.js';
	import layoutState from '../states.svelte.js';
	import '$lib/styles.css';

	const widths = ['24rem', '16rem', '32rem', '20rem', '28rem', '16rem'];

	let slides = [...widths, ...widths].map((width, index) => ({
		...defaultSlides[index % defaultSlides.length],
		id: `slide-${index + 1}`,
		width,
	}));

	onMount(() => {
		layoutState.props = {
			...defaultRootProps,
			slidesPerView: 'auto',
			gap: 20,
		};
	});
</script>

<svelte:head>
	<title>Slides per view: auto — Svelte Sliding Carousel</title>
</svelte:head>

<Carousel.Root {...layoutState.props}>
	<Carousel.Track>
		{#each slides as { id, imgSrc, width }, index (id)}
			<Carousel.Slide id={`slide-${id}`} {index}>
				<img class="ssc-slide-image" src={imgSrc} alt="" style:width />
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
		display: block;
		height: 18rem;
		object-fit: cover;
	}
</style>
