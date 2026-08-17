document.addEventListener("DOMContentLoaded", function () {

    const flocage = document.getElementById("flocage");
    const zoneFlocage = document.getElementById("zoneFlocage");
    const prixFinal = document.getElementById("prixFinal");

    const livraisons = document.querySelectorAll(
        'input[name="livraison"]'
    );

    const PRIX_MAILLOT = 39.90;
    const PRIX_FLOCAGE = 1.00;
    const PRIX_EXPRESS = 3.90;


    function mettreAJourPrix() {

        let total = PRIX_MAILLOT;


        // +1 € si flocage

        if (flocage.checked) {
            total += PRIX_FLOCAGE;
        }


        // +3,90 € si livraison express

        const livraisonExpress =
            document.querySelector(
                'input[name="livraison"][value="3.90"]:checked'
            );

        if (livraisonExpress) {
            total += PRIX_EXPRESS;
        }


        // Affichage du prix

        prixFinal.textContent =
            total.toFixed(2).replace(".", ",") + " €";
    }


    // Flocage

    flocage.addEventListener("change", function () {

        if (flocage.checked) {

            zoneFlocage.classList.add("active");

        } else {

            zoneFlocage.classList.remove("active");

        }

        mettreAJourPrix();

    });


    // Livraison

    livraisons.forEach(function (radio) {

        radio.addEventListener("change", function () {

            mettreAJourPrix();

        });

    });


    // Prix initial

    mettreAJourPrix();

});
const ouvrirAvis = document.getElementById("ouvrirAvis");
const avisModal = document.getElementById("avisModal");
const fermerAvis = document.getElementById("fermerAvis");

ouvrirAvis.addEventListener("click", function () {
    avisModal.classList.add("active");
});

fermerAvis.addEventListener("click", function () {
    avisModal.classList.remove("active");
});

avisModal.addEventListener("click", function (event) {

    if (event.target === avisModal) {
        avisModal.classList.remove("active");
    }

});
