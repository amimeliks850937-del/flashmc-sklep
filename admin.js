
let produkty = JSON.parse(localStorage.getItem("flashmc_produkty")) || [
    { nazwa: "SVIP", cena: 19.99 },
    { nazwa: "GVIP", cena: 29.99 },
    { nazwa: "BOSS", cena: 39.99 },
    { nazwa: "Klucz Premium", cena: 9.99 }
];

function zapiszProdukty() {
    localStorage.setItem("flashmc_produkty", JSON.stringify(produkty));
}

function pokazProdukty() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    produkty.forEach((produkt, index) => {
        lista.innerHTML += `
            <div class="product">
                <h3>${produkt.nazwa}</h3>
                <strong>${produkt.cena.toFixed(2)} zł</strong>
                <br><br>
                <button onclick="zmienCene(${index})">Zmień cenę</button>
                <button onclick="usunProdukt(${index})">Usuń</button>
            </div>
        `;
    });
}

function dodajProdukt() {
    const nazwa = document.getElementById("nazwa").value.trim();
    const cena = Number(document.getElementById("cena").value);

    if (!nazwa || !Number.isFinite(cena) || cena <= 0) {
        alert("Wpisz poprawną nazwę i cenę!");
        return;
    }

    produkty.push({ nazwa, cena });
    zapiszProdukty();

    document.getElementById("nazwa").value = "";
    document.getElementById("cena").value = "";

    pokazProdukty();
}

function zmienCene(index) {
    const nowaCena = Number(prompt("Podaj nową cenę:"));

    if (!Number.isFinite(nowaCena) || nowaCena <= 0) {
        alert("Niepoprawna cena!");
        return;
    }

    produkty[index].cena = nowaCena;
    zapiszProdukty();
    pokazProdukty();
}

function usunProdukt(index) {
    produkty.splice(index, 1);
    zapiszProdukty();
    pokazProdukty();
}

pokazProdukty();

