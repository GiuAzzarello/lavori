
var cambi = new XMLHttpRequest();

var tassi = {};

// Il valore dell'euro è 1
tassi["EUR"] = 1;

cambi.open("GET", "eurofxref-daily.xml", true);

cambi.onreadystatechange = function() {

    if (cambi.readyState == 4 && cambi.status == 200) {

        var xml = cambi.responseXML;

        var valute = xml.getElementsByTagName("Cube");

        for (var i = 0; i < valute.length; i++) {

            var valuta = valute[i].getAttribute("currency");
            var cambio = valute[i].getAttribute("rate");

            if (valuta != null) {
                tassi[valuta] = parseFloat(cambio);
            }
        }
    }
};

cambi.send();


function converti() {

    var valuta = document.getElementById("valuta_arrivo").value;

    var quantita = parseFloat(
        document.getElementById("quantita").value.replace(",", ".")
    );

    var cambio = tassi[valuta];

    if (isNaN(quantita) || quantita <= 0) {
        document.getElementById("risultato").innerHTML =
            "Inserisci una quantità valida.";
        return;
    }

    if (cambio === undefined) {
        document.getElementById("risultato").innerHTML =
            "Cambio non disponibile.";
        return;
    }

    var risultato = quantita * cambio;

    document.getElementById("risultato").innerHTML =
        "Risultato: " + risultato.toFixed(2) + " " + valuta;
}
