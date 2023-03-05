<script>
	import Third from "./Third.svelte";
	import Second from "./Second.svelte";
	import First from "./First.svelte";
	import Menu from "svelte-material-icons/Menu.svelte";

	import { fly } from "svelte/transition";

	export let size = "1em"; // string | number
	let height = size; // string | number
	let color = "white"; // string
	let showMobileButton = false;
	let scrollY = 0;
</script>

<svelte:window bind:scrollY />
<!-- Google Tag Manager (noscript) -->
<!-- svelte-ignore a11y-missing-attribute -->
<noscript
	><iframe
		src="https://www.googletagmanager.com/ns.html?id=GTM-M77J8GN"
		height="0"
		width="0"
		style="display:none;visibility:hidden"
	/></noscript
>

<!-- End Google Tag Manager (noscript) -->
<div class="nav-container">
	<div class="button-row">
		<div class="logo-container">
			<img src="logo.webp" alt="unnpr-logo" height="50px" width="50px" />

			{#if scrollY >= 200}
				<div
					class="logo-name"
					transition:fly={{ y: 30, duration: 1000 }}
				>
					<h5>Birou individual notarial</h5>
					<hr />
					<h5 style="color:white;font-weight:200">Ilie Cristian</h5>
				</div>
			{/if}
		</div>
		<div class="button-container">
			<a href="#home" class="nav-link">Prezentare</a>

			<a href="#services" class="nav-link">Servicii</a>

			<a href="#contact" class="nav-link">Contact</a>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="button-container-mobile"
			on:click={() => (showMobileButton = !showMobileButton)}
		>
			<Menu {color} size="1.4rem" width="1.4rem" height="1.4rem" />
		</div>
	</div>
</div>
{#if showMobileButton}
	<div class="mobile-nav-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="mobile-nav-link"
			on:click={() => {
				showMobileButton = false;
			}}
		>
			<a href="#home" class="nav-link">Prezentare</a>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="mobile-nav-link"
			on:click={() => {
				showMobileButton = false;
			}}
		>
			<a href="#services" class="nav-link">Servicii</a>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="mobile-nav-link"
			on:click={() => {
				showMobileButton = false;
			}}
		>
			<a href="#contact" class="nav-link">Contact</a>
		</div>
	</div>
{/if}
<main>
	<section id="home">
		<First />
	</section>
	<section id="services">
		<Second />
	</section>
	<section id="contact">
		<Third />
	</section>
</main>

<style>
	.logo-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
	}
	.logo-name {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	hr {
		width: 100%;
		margin: 1px 0px;
		padding: 0;
		border: 0.5px solid #535353;
	}
	h5 {
		margin: 0;
		padding: 0;
		line-height: 100%;
		letter-spacing: 1px;
		font-size: 18px;
		font-weight: 100;
		color: #c5c5c5;
	}
	main {
		height: 100vh;
		width: 100vw;
	}

	.nav-container {
		z-index: 99;
		height: 70px;
		position: fixed; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(20px);
		color: white;
	}

	.button-row {
		padding: 0px 20px;
		height: 70px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.nav-link {
		font-size: 1.5rem;
		cursor: pointer;
		color: white;
		text-decoration: none;
		font-weight: 200;
	}
	.button-container {
		display: flex;
		flex-direction: row;
		gap: 50px;
		align-items: center;
	}
	.button-container-mobile {
		display: none;
		cursor: pointer;
	}
	.mobile-nav-container {
		display: none;
		position: fixed;
		top: 70px;
		height: 270px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 98;
		flex-direction: column;
		backdrop-filter: blur(20px);
	}
	.mobile-nav-link {
		height: 90px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	@media screen and (max-width: 800px) {
		.button-container {
			display: none;
		}
		.button-container-mobile {
			display: flex;
			align-items: center;
			justify-content: center;

			background-color: rgba(0, 0, 0, 0.1);
			padding: 10px;
			border-radius: 5px;
		}
		.mobile-nav-container {
			display: flex;
		}
	}
</style>
