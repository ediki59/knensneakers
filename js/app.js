document.addEventListener("DOMContentLoaded", function () {

    const prixBase = 39.90;
    const prixFlocage = 1.00;
    const prixLivraisonExpress = 3.90;

    const flocage = document.getElementById("flocage");
    const zoneFlocage = document.getElementById("zoneFlocage");
    const livraison = document.getElementById("livraison");
    const prixFinal = document.getElementById("prixFinal");
    const boutonCommander = document.getElementById("commander");

    /* =========================
       CALCUL DU PRIX
    ========================= */

    function calculerPrix() {

        let total = prixBase;

        if (flocage && flocage.checked) {
            total += prixFlocage;
        }

        if (livraison && livraison.value === "3.90") {
            total += prixLivraisonExpress;
        }

        if (prixFinal) {
            prixFinal.textContent =
                total.toFixed(2).replace(".", ",") + " €";
        }

        return total;
    }


    /* =========================
       FLOCCAGE
    ========================= */

    if (flocage) {

        flocage.addEventListener("change", function () {

            if (this.checked) {

                zoneFlocage.style.display = "flex";

            } else {

                zoneFlocage.style.display = "none";

            }

            calculerPrix();

        });

    }


    /* =========================
       LIVRAISON
    ========================= */

    if (livraison) {

        livraison.addEventListener(
            "change",
            calculerPrix
        );

    }


    /* =========================
       PRIX AU CHARGEMENT
    ========================= */

    calculerPrix();


    /* =========================
       BOUTON COMMANDER
    ========================= */

    if (boutonCommander) {

        boutonCommander.addEventListener(
            "click",
            function () {

                const total = calculerPrix();

                alert(
                    "Commande de " +
                    total.toFixed(2).replace(".", ",") +
                    " €"
                );

            }
        );

    }

});
