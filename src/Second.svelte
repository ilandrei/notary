<script>
    import CheckCircle from "svelte-material-icons/CheckCircle.svelte";
    import Information from "svelte-material-icons/Information.svelte";
    let services = [
        {
            title: "Contracte",
            body: `Contract de Vânzare, Promisiune de vânzare-cumpărare (Antecontract), Contract de Schimb,
Contract de Donație, Act de Partaj, Contract de Întreținere, Contract de Ipotecă Imobiliară,
Contract de Împrumut, Contract de Închiriere, etc.`,
        },
        {
            title: "Succesiuni",
            body: `Dezbaterea succesiunii este o procedură necesară care poate fi soluționată în mod eficient
urmând pașii indicați și explicați în detaliu de către notarul public, care se va ocupa de
formalitățile necesare soluționării procedurii succesorale și eliberării Certificatului de
moștenitor.`,
        },
        {
            title: "Declarații și procuri",
            body: `Această categorie are în componență de la declarații simple precum cele necesare la înființarea societăților până la acorduri complexe exprimate de către părți în formă autentică, precum și procuri de orice tip.`,
        },
        {
            title: "Divorțuri",
            body: `Notarul public este abilitat, în baza art. 375 din Noul Cod Civil, să constate divorțul prin acordul soților și să elibereze certificatul de divorț.`,
        },
        {
            title: "Convenții matrimoniale",
            body: `Deși regimul matrimonial al comunității legale de bunuri reprezintă regula în materia raporturilor patrimoniale ale soților, legislația civilă permite ca soții sau viitorii soți să poată opta pentru regimul comunității convenționale de bunuri sau cel al separației de bunuri, prin încheierea unei convenții matrimoniale.`,
        },
        {
            title: "Testamente",
            body: `Testamentul autentificat de către notarul public în forma și condițiile stabilite prin Legea
nr.36/1995 a notarilor publici și a Codului Civil va beneficia de siguranța, validitatea și
avantajele înscrisurilor autentice notariale.`,
        },
        {
            title: "Alte proceduri",
            body: `Dintre procedurile notariale comune, amintim: legalizarea copiilor de pe înscrisuri, legalizarea
traducerilor și semnăturilor, eliberarea de duplicate, legalizarea specimenului de semnătură,
darea de dată certă a înscrisurilor, etc.`,
        },
    ];
</script>

<div class="page-container">
    <div class="title-container">
        <h1>Servicii</h1>
    </div>
    <div class="card-container">
        {#each services as sv}
            <div class="card">
                <div class="card-title-row">
                    <CheckCircle size="30px" color="#b76262" />
                    <h4>{sv.title}</h4>
                </div>
                <div class="card-body">
                    {sv.body}
                </div>
            </div>
        {/each}
        <div class="large-card">
            <Information size="24px" color="#b76262" />
            <span>
                Pentru perfectarea actelor și procedurilor notariale vă așteptăm
                la sediul biroului notarial sau ne puteți contacta direct pe
                adresa de e-mail, WhatsApp sau telefonic și veniți direct la
                semnare. Apreciem timpul dumneavoastră, iar rezolvarea rapidă și
                sigură a problemelor juridice este prioritatea noastră.
            </span>
        </div>
    </div>
</div>

<style>
    h1 {
        font-size: 54px;
        color: rgb(79, 79, 79);
        font-weight: 700;
        padding: 0;
        margin: 0;
        margin-top: 100px;
    }
    .title-container {
        width: 90%;
    }
    .page-container {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(248, 244, 244, 1);
    }
    .card-container {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 50px;
    }
    .card {
        width: 320px;
        height: 340px;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
            rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
            rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        display: flex;
        flex-direction: column;
        padding: 15px;
    }
    .large-card {
        width: 90%;

        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
            rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
            rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

        font-size: 22px;
        color: rgb(79, 79, 79);
        font-weight: 600;
        padding: 20px;
        text-align: center;
    }
    .card-title-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: 5px;
    }
    h4 {
        padding: 0;
        margin: 0;
        margin-left: 5px;
        font-size: 22px;
        color: #b76262;
        font-weight: 600;
    }
    .card-body {
        font-weight: 300;
        font-size: 16px;
        text-align: justify;

        color: rgb(115, 115, 115);
    }
    @media screen and (max-width: 800px) {
        .card {
            width: 45%;
            height: auto;
            min-height: 320px;
        }
        .card-body {
            font-size: 14px;
        }
        .card-container {
            width: 95%;
        }
        .large-card {
            font-size: 18px;
        }

        h1 {
            font-size: 46px;
        }
    }
    @media screen and (max-width: 600px) {
        h1 {
            font-size: 40px;
        }
        .card {
            width: 95%;
        }
        .card-container {
            gap: 10px 0;
        }
        .card-body {
            font-size: 18px;
        }
    }
</style>
