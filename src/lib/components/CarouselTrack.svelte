<script lang="ts">
	import { getCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselTrackProps } from '$lib/types/props.js';

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: CarouselTrackProps & { class?: string } = $props();

	let inner: HTMLUListElement | null = $state(null);

	const rootState = getCarouselRootState();

	$effect(() => {
		rootState.track = ref;
	});

	$effect(() => {
		void rootState.props.gap;
		const { slides } = rootState;
		if (!inner) return;
		const track = inner;
		const observer = new ResizeObserver(() => {
			const first = slides[0];
			const last = slides[slides.length - 1];
			const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
			rootState.viewportWidth = track.offsetWidth;
			rootState.slideOffsets = slides.map((slide) => slide.offsetLeft);
			rootState.slideWidths = slides.map((slide) => slide.offsetWidth);
			rootState.totalWidth =
				first && last ? last.offsetLeft + last.offsetWidth - first.offsetLeft + gap : 0;
		});
		observer.observe(track);
		for (const slide of slides) observer.observe(slide);
		return () => observer.disconnect();
	});

	$effect(() => {
		const target = rootState.targetOffset;
		if (!rootState.isLooping || !inner) {
			rootState.trackPosition = target;
			return;
		}
		const track = inner;
		let frame = requestAnimationFrame(function sync() {
			const { transform } = getComputedStyle(track);
			const position = transform === 'none' ? 0 : -new DOMMatrixReadOnly(transform).m41;
			if (Math.abs(position - target) < 0.5) {
				rootState.trackPosition = target;
				return;
			}
			rootState.trackPosition = position;
			frame = requestAnimationFrame(sync);
		});
		return () => cancelAnimationFrame(frame);
	});

	const classes = $derived(['ssc-track', restProps.class]);
	const styleTransform = $derived(`translate3d(${-rootState.targetOffset}px, 0, 0)`);
</script>

<div bind:this={ref} class={classes}>
	<ul bind:this={inner} class="ssc-track__inner" style:transform={styleTransform}>
		{@render children?.()}
	</ul>
</div>

<style>
	.ssc-track {
		overflow: hidden;
	}

	.ssc-track__inner {
		display: flex;
		gap: var(--ssc-gap, 0);
		list-style: none;
		padding-inline-start: 0;
		margin-inline-start: 0;
		transition: transform var(--ssc-transition-duration, 520ms)
			var(--ssc-transition-easing, cubic-bezier(0.32, 0.72, 0, 1));
		backface-visibility: hidden;
		position: relative;
	}

	@media (prefers-reduced-motion: reduce) {
		.ssc-track__inner {
			transition: none;
		}
	}
</style>
