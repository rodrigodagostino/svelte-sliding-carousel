import type { CarouselRootProps as RootProps } from '$lib/types/index.js';

export const defaultRootProps: RootProps = {
	loop: false,
	autoplay: false,
	slidesPerView: 1,
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
			'https://images.pexels.com/photos/31473508/pexels-photo-31473508.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-2',
		imgSrc:
			'https://images.pexels.com/photos/7349943/pexels-photo-7349943.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
	},
	{
		id: 'slide-3',
		imgSrc:
			'https://images.pexels.com/photos/7000918/pexels-photo-7000918.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-4',
		imgSrc:
			'https://images.pexels.com/photos/2959714/pexels-photo-2959714.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-5',
		imgSrc:
			'https://images.pexels.com/photos/2247894/pexels-photo-2247894.png?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-6',
		imgSrc:
			'https://images.pexels.com/photos/14278500/pexels-photo-14278500.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-7',
		imgSrc:
			'https://images.pexels.com/photos/15036890/pexels-photo-15036890.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-8',
		imgSrc:
			'https://images.pexels.com/photos/16264424/pexels-photo-16264424.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-9',
		imgSrc:
			'https://images.pexels.com/photos/2300679/pexels-photo-2300679.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-10',
		imgSrc:
			'https://images.pexels.com/photos/29093279/pexels-photo-29093279.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-11',
		imgSrc:
			'https://images.pexels.com/photos/38183514/pexels-photo-38183514.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
	{
		id: 'slide-12',
		imgSrc:
			'https://images.pexels.com/photos/16152087/pexels-photo-16152087.jpeg?auto=compress&cs=tinysrgb&h=1280&dpr=1',
	},
];
