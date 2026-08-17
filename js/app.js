document.addEventListener("DOMContentLoaded", function () {

    const prixBase = 39.90;
    const prixFlocage = 1.00;
    const prixLivraisonExpress = 3.90;

    const flocage = document.getElementById("flocage");
    const zoneFlocage = document.getElementById("zoneFlocage");
    const livraison = document.getElementById("livraison");
    const prixFinal = document.getElementById("prixFinal");

    function mettreAJourPrix() {

        let total = prixBase;

        // Flocage +1 €
        if (flocage && flocage.checked) {
            total += prixFlocage;
        }

        // Livraison express +3,90 €
        if (livraison && livraison.value === "3.90") {
            total += prixLivraisonExpress;
        }

        // Affichage
        prixFinal.textContent =
            total.toFixed(2).replace(".", ",") + " €";
    }


    // Flocage
    if (flocage) {

        flocage.addEventListener("change", function () {

            if (this.checked) {
                zoneFlocage.style.display = "flex";
            } else {
                zoneFlocage.style.display = "none";
            }

            mettreAJourPrix();
        });

    }


    // Livraison
    if (livraison) {

        livraison.addEventListener("change", function () {
            mettreAJourPrix();
        });

    }


    // Prix au chargement
    mettreAJourPrix();

});
