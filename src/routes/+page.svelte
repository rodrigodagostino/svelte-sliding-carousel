<script>
	import { Carousel } from '$lib/index.js';
	import '$lib/styles.css';

	let slides = [
		{
			id: 'slide-1',
			imgSrc:
				'https://images.pexels.com/photos/2247894/pexels-photo-2247894.png?auto=compress&cs=tinysrgb&h=1280&dpr=1',
		},
		{
			id: 'slide-2',
			imgSrc:
				'https://images.pexels.com/photos/2959714/pexels-photo-2959714.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
		},
		{
			id: 'slide-3',
			imgSrc:
				'https://images.pexels.com/photos/7349943/pexels-photo-7349943.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
		},
		{
			id: 'slide-4',
			imgSrc:
				'https://images.pexels.com/photos/14278500/pexels-photo-14278500.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
		},
	];
</script>

<svelte:head>
	<title>Basic — Svelte Sliding Carousel</title>
</svelte:head>

<Carousel.Root>
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
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}
</style>
