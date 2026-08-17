const flocage = document.getElementById("flocage");
const zoneFlocage = document.getElementById("zoneFlocage");

const prixFinal = document.getElementById("prixFinal");

const livraisons = document.querySelectorAll(
    'input[name="livraison"]'
);

const prixBase = 39.90;
const prixFlocage = 1.00;
const prixExpress = 3.90;


function calculerTotal() {

    let total = prixBase;


    // Flocage

    if (flocage.checked) {
        total += prixFlocage;
    }


    // Livraison

    const livraisonSelectionnee =
        document.querySelector(
            'input[name="livraison"]:checked'
        );

    if (
        livraisonSelectionnee &&
        livraisonSelectionnee.value === "3.90"
    ) {
        total += prixExpress;
    }


    prixFinal.textContent =
        total.toFixed(2).replace(".", ",") + " €";
}


flocage.addEventListener("change", function () {

    if (flocage.checked) {

        zoneFlocage.classList.add("active");

    } else {

        zoneFlocage.classList.remove("active");

    }

    calculerTotal();

});


livraisons.forEach(function (livraison) {

    livraison.addEventListener(
        "change",
        calculerTotal
    );

});


calculerTotal();
