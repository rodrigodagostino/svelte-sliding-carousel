import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

export const defaultRootProps: RootProps = {
	loop: false,
	autoplay: false,
	gap: 0,
	transition: {
		duration: 520,
		easing: 'cubic-bezier(0.2, 1, 0.1, 1)',
	},
};

export const defaultSlides = [
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
