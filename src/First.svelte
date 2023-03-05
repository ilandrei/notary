<script>
    import MenuRight from "svelte-material-icons/MenuRight.svelte";

    import { fly } from "svelte/transition";
    let innerHeight = 0;

    const scroll = () => {
        window.scrollTo({
            top: innerHeight - 40,
            behavior: "smooth",
        });
    };
    const scrollBot = () => {
        window.scrollTo({
            top: 100000,
            behavior: "smooth",
        });
    };
</script>

<svelte:window bind:innerHeight />

<div class="page-container">
    <div class="background-container" />
    <div class="page-gradient" />
    <div class="page-content">
        <div class="title-row" transition:fly={{ y: 100, duration: 1000 }}>
            <img src="./logo.webp" alt="logo" class="big-logo" />
            <div class="title-text">
                <h2>Birou</h2>
                <h2>Individual</h2>
                <h2>Notarial</h2>
                <hr />
                <h2 style="color:black; font-weight: 400;">Ilie Cristian</h2>
            </div>
        </div>
        <section class="content">
            <h1 class="smaller-width-header">
                O bază solidă pentru nevoile dumneavoastră legale în Brașov
            </h1>
            <h4>
                Înțelegem nevoia de siguranță și eficiență în serviciul
                notarial, iar asta ne face să oferim soluții legale sigure,
                rapide și clare atât pentru dumneavoastră cât și pentru afacerea
                pe care o administrați.
            </h4>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="contact-button" on:click={() => scrollBot()}>
                <span> Contact </span>
                <span class="right-arrow"> <MenuRight size="40px" /></span>
            </div>
        </section>
        <footer>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="material-symbols-outlined" on:click={() => scroll()}>
                arrow_circle_down
            </span>
        </footer>
    </div>
</div>

<style>
    hr {
        border: 1px solid #bfbfbf;
        width: 100%;
    }
    .title-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        margin-top: 20px;
    }
    .title-text {
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    h2 {
        margin: 0;
        padding: 0;
        font-size: 42px;
        font-weight: 200;
        line-height: 100%;
        color: #4f4f4f;
        letter-spacing: 5px;
    }
    .material-symbols-outlined {
        height: 100px;

        font-size: 60px;
        color: #4f4f4f;
        font-weight: 200;
        user-select: none;
        cursor: pointer;
        transition: 0.2s;
    }
    .material-symbols-outlined:hover {
        font-size: 80px;
    }
    footer {
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }
    .right-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .smaller-width-header {
        width: 80%;
    }
    .contact-button {
        margin-top: 20px;
        margin-left: 40px;
        width: 200px;
        height: 60px;
        background-color: #b76262;
        color: white;
        font-size: 26px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px 0px 20px;
        cursor: pointer;
        box-shadow: rgba(32, 32, 61, 0.3) 0px 20px 20px -12px,
            rgba(0, 0, 0, 0.3) 0px 15px 30px -18px;
        transition: 0.3s;
    }
    .contact-button:hover {
        background-color: #cb7777;
    }
    h1 {
        font-size: 38px;
        color: rgb(79, 79, 79);
        font-weight: 600;
        line-height: 120%;
        padding: 0;
        margin: 0 40px;
    }
    h4 {
        font-size: 22px;
        color: rgb(79, 79, 79);
        font-weight: 400;

        margin: 0 40px;
    }
    .big-logo {
        width: 220px;
    }
    .content {
        width: 60%;
        padding-bottom: 40px;
    }
    .background-container {
        z-index: 1;
        background-image: url("../notary.webp");
        background-size: cover;

        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;

        position: absolute;
    }

    .page-content {
        z-index: 3;
        padding: 70px 50px 0 50px;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
    }
    .page-gradient {
        z-index: 2;
        position: absolute;
        width: 100vw;
        height: 100vh;

        background: #f8f4f4;
        background: linear-gradient(
            90deg,
            rgba(248, 244, 244, 0.9) 40%,
            rgba(248, 244, 244, 0.2) 80%
        );
    }
    .page-container {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
    @media screen and (max-width: 1200px) {
        .content {
            width: 80%;
        }
    }
    @media screen and (max-width: 800px) {
        .page-gradient {
            background: #f8f4f4;
            background: linear-gradient(
                rgba(248, 244, 244, 0.9) 40%,
                rgba(248, 244, 244, 0.4) 100%
            );
        }
        .background-container {
            background-image: url("../notary-mob.webp");
        }
        .content {
            width: 100%;
        }

        .big-logo {
            width: 200px;
        }

        .page-content {
            padding: 70px 30px 0 30px;
        }
        h2 {
            font-size: 36px;
        }
        .material-symbols-outlined {
            font-size: 40px;
            height: 60px;
        }
        .material-symbols-outlined:hover {
            font-size: 50px;
        }
        footer {
            height: 50px;
        }
    }

    @media screen and (max-width: 600px) {
        h1 {
            margin: 0;
            margin-top: 20px;
            font-size: 28px;
        }
        h2 {
            font-size: 24px;
        }
        h4 {
            margin: 0;
        }
        .big-logo {
            width: 100px;
        }
        .contact-button {
            margin-left: 0px;
            font-size: 20px;
            width: 160px;
            height: 50px;
        }
        .title-row {
            gap: 10px;
        }
        .content {
            padding-bottom: 20px;
        }
    }

    @media screen and (max-width: 400px) {
        h1 {
            margin: 0;
            margin-top: 10px;
            font-size: 24px;
        }
        h2 {
            font-size: 20px;
        }
        .big-logo {
            width: 80px;
        }
        h4 {
            font-size: 18px;
        }
        .content {
            padding-bottom: 20px;
        }
    }
    @media screen and (max-height: 800px) {
        .background-container {
            height: 800px;
        }
        .page-content {
            height: 800px;
        }
        .page-gradient {
            height: 800px;
        }
        .page-container {
            height: 800px;
        }
        .material-symbols-outlined {
            opacity: 0;

            pointer-events: none;
        }
    }
</style>
