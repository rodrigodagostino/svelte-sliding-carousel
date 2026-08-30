<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource/rubik/400.css';
	import '@fontsource/rubik/600.css';
	import '@fontsource/jetbrains-mono/400.css';
	import './styles.css';

	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
</script>

<div id="app" class="app" data-page-pathname={page.url.pathname.replace('/', '')}>
	<main class="app-main">
		<div class="container">
			{@render children?.()}
		</div>
	</main>
</div>

<style>
	.app {
		width: 100%;
		min-height: 96vh;
		min-height: 96svh;
	}

	.container {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		margin: auto;
	}

	.app-main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr;
		min-height: 100%;
		padding: 3rem;
		scrollbar-gutter: stable;

		& .container {
			align-items: center;
		}
	}
</style>
