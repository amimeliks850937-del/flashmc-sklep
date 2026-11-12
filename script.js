
let koszyk = [];

let produkty = JSON.parse(
    localStorage.getItem("flashmc_produkty")
) || [
    { nazwa: "SVIP", cena: 19.99 },
    { nazwa: "GVIP", cena: 29.99 },
    { nazwa: "BOSS", cena: 39.99 },
    { nazwa: "Klucz Premium", cena: 9.99 }
];

function pokazProdukty() {
    const lista = document.getElementById("lista-produktow");
    lista.innerHTML = "";

    produkty.forEach((produkt, index) => {
        lista.innerHTML += `
            <div class="product">
                <h3>${produkt.nazwa}</h3>
                <p>Produkt FLASHMC.PL</p>
                <strong>${Number(produkt.cena).toFixed(2)} zł</strong>
                <button onclick="dodajDoKoszyka(${index})">
                    Dodaj do koszyka
                </button>
            </div>
        `;
    });
}

function dodajDoKoszyka(index) {
    const produkt = produkty[index];

    koszyk.push({
        nazwa: produkt.nazwa,
        cena: Number(produkt.cena)
    });

    pokazKoszyk();
}

function pokazKoszyk() {
    const sekcja = document.getElementById("koszyk");
    let suma = 0;

    sekcja.innerHTML = `
        <h2>🛒 TWÓJ KOSZYK (${koszyk.length})</h2>
    `;

    if (koszyk.length === 0) {
        sekcja.innerHTML += "<p>Twój koszyk jest pusty.</p>";
    }

    koszyk.forEach((produkt, index) => {
        suma += produkt.cena;

        sekcja.innerHTML += `
            <div class="product">
                <h3>${produkt.nazwa}</h3>
                <strong>${produkt.cena.toFixed(2)} zł</strong>
                <button onclick="usunProdukt(${index})">Usuń</button>
            </div>
        `;
    });

    sekcja.innerHTML += `
        <h3>Łącznie: ${suma.toFixed(2)} zł</h3>
        <p class="demo">
            SKLEP DEMONSTRACYJNY – BRAK PRAWDZIWYCH PŁATNOŚCI
        </p>
    `;
}

function usunProdukt(index) {
    koszyk.splice(index, 1);
    pokazKoszyk();
}

pokazProdukty();
pokazKoszyk();
