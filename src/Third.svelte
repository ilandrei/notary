<script>
    import Instagram from "svelte-material-icons/Instagram.svelte";
    import Facebook from "svelte-material-icons/Facebook.svelte";
    import Phone from "svelte-material-icons/Phone.svelte";
    import Email from "svelte-material-icons/Email.svelte";
    import MapMarker from "svelte-material-icons/MapMarker.svelte";
</script>

<div class="page-container">
    <div class="background-container" />
    <div class="page-gradient" />
    <div class="page-content">
        <section>
            <div class="first-section-half section-half">
                <h1>Contact</h1>
                <h4>
                    <Phone size="24px" color="#4f4f4f" /> Mobil:
                    <a class="contact-link" href="tel:+40-767-23-63-64"
                        >0767 236 364</a
                    >
                    (Notar);
                    <br />
                    <Phone size="24px" color="#4f4f4f" /> Mobil:
                    <a class="contact-link" href="tel:+40-773-80-66-47"
                        >0773 806 647</a
                    > (Secretariat)
                </h4>
                <h4>
                    <Email size="24px" color="#4f4f4f" /> Email:
                    <a
                        class="contact-link"
                        href="mailto: notariliecristian@gmail.com"
                        >notariliecristian@gmail.com</a
                    >
                </h4>
                <h4>
                    <MapMarker size="24px" color="#4f4f4f" /> Adresa:
                    <a
                        class="contact-link"
                        href="https://www.google.com/maps/place/Bloc+2,+Strada+13+Decembrie+24,+Bra%C8%99ov+500199/@45.6540641,25.6032523,17z/data=!3m1!4b1!4m5!3m4!1s0x40b35b8682167e4b:0x36cf29abc12fb9ab!8m2!3d45.6540604!4d25.605441"
                    >
                        Strada 13 Decembrie, Nr 24, Ap 2,Mun Brasov (Langa
                        statia de autobuz Onix)</a
                    >
                </h4>
                <h4>
                    Va asteptam de luni pana vineri intre orele 08:00 - 16:00
                </h4>
                <h4>Pentru orice detalii nu ezitati sa ne contactati!</h4>

                <div class="social-row">
                    <span>Ne gasiti si pe:</span>
                    <a
                        href="https://www.instagram.com/notariatbrasov/"
                        class="social-link"
                    >
                        <Instagram size="30px" color="#b76262" />
                    </a>

                    <a
                        href="https://www.instagram.com/notariatbrasov/"
                        class="social-link"
                    >
                        <Facebook size="24px" color="#b76262" />
                    </a>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    .contact-link {
        color: #b76262;
    }
    .social-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #4f4f4f;

        font-size: 20px;
        font-weight: 400;
    }
    .social-link {
        margin-top: 10px;
        margin-left: 10px;
    }
    .background-container {
        z-index: 1;
        background-image: url("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+555555(25.6053,45.6539)/25.604,45.654,16.55,0/1280x1080@2x?access_token=pk.eyJ1IjoiaWxhbmRyZWkiLCJhIjoiY2xidjkyZXFmMDV4YTNwbzFpdXk3NXh4NiJ9.6kgPKWMg3Sn0bAPNi4JZIQ");
        background-size: cover;

        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
        position: absolute;
    }

    .page-content {
        z-index: 3;
        padding: 80px 20px;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
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
            rgba(248, 244, 244, 1) 40%,
            rgba(248, 244, 244, 0.2) 60%
        );
    }
    .page-container {
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    section {
        flex-grow: 1;
        width: 95%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    h1 {
        font-size: 54px;
        color: #4f4f4f;
        font-weight: 700;
        padding: 0;
        margin: 0;
    }
    h4 {
        color: rgb(79, 79, 79);
        font-weight: 400;
        margin-bottom: 0;
        font-size: 20px;
    }
    a {
        color: #3500d3;
    }

    .first-section-half {
        width: 40%;
        height: 60%;
        border-radius: 5px;
        padding: 10px;
    }
</style>
