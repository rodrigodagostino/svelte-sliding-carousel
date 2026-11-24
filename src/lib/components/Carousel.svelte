<script lang="ts">
	import { setCarouselRootState } from '$lib/states/carousel.svelte.js';
	import type { CarouselRootProps } from '$lib/types/index.js';

	let {
		ref = $bindable(null),
		loop = false,
		autoplay = false,
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
			autoplay: autoplay && {
				delay: 4000,
				pauseOnHover: true,
				pauseOnFocus: true,
				pauseOnVisibilityChange: true,
				stopOnLastSlide: false,
				...(autoplay === true ? {} : autoplay),
			},
			gap,
			transition,
		};
	});

	$effect(() => {
		if (autoplay) rootState.isStopped = false;
	});

	$effect(() => {
		const position = rootState.activeAbsoluteIndex;
		const { autoplay } = rootState.props;
		if (!rootState.isPlaying || typeof autoplay !== 'object') return;
		const timeout = setTimeout(() => {
			if (rootState.activeAbsoluteIndex !== position) return;
			rootState.goToNext();
			if (autoplay.stopOnLastSlide && rootState.activeIndex === rootState.slides.length - 1)
				rootState.isStopped = true;
		}, autoplay.delay);
		return () => clearTimeout(timeout);
	});

	function onfocusout(event: FocusEvent) {
		if (!ref?.contains(event.relatedTarget as Node | null)) rootState.isFocused = false;
	}

	const classes = $derived(['ssc-root', restProps.class]);
	const styleGap = $derived(typeof gap === 'number' ? `${gap}px` : gap);
	const styleTransitionDuration = $derived(
		typeof transition?.duration === 'number' ? `${transition.duration}ms` : undefined
	);
	const styleTransitionEasing = $derived(transition?.easing);
</script>

<svelte:document
	onvisibilitychange={() => (rootState.isVisible = document.visibilityState === 'visible')}
/>

<div
	bind:this={ref}
	class={classes}
	style:--ssc-gap={styleGap}
	style:--ssc-transition-duration={styleTransitionDuration}
	style:--ssc-transition-easing={styleTransitionEasing}
	onpointerenter={() => (rootState.isHovered = true)}
	onpointerleave={() => (rootState.isHovered = false)}
	onfocusin={() => (rootState.isFocused = true)}
	{onfocusout}
>
	{@render children?.()}
</div>

<style>
	.ssc-root {
		position: relative;
	}
</style>
