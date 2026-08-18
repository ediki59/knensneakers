document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       PRIX
    ========================= */

    const prixBase = 39.90;

    const prixFlocage = 1.00;

    const prixLivraisonExpress = 3.90;


    /* =========================
       ELEMENTS
    ========================= */

    const flocage =
        document.getElementById("flocage");

    const zoneFlocage =
        document.getElementById("zoneFlocage");

    const livraison =
        document.getElementById("livraison");

    const prixFinal =
        document.getElementById("prixFinal");

    const taille =
        document.getElementById("taille");


    /* =========================
       CALCUL DU TOTAL
    ========================= */

    function calculerPrix() {

        let total = prixBase;


        /* FLOCCAGE */

        if (
            flocage &&
            flocage.checked
        ) {

            total += prixFlocage;

        }


        /* LIVRAISON */

        if (
            livraison &&
            livraison.value === "3.90"
        ) {

            total += prixLivraisonExpress;

        }


        /* AFFICHAGE */

        if (prixFinal) {

            prixFinal.textContent =
                total
                .toFixed(2)
                .replace(".", ",")
                + " €";

        }


        return total;

    }


    /* =========================
       FLOCCAGE
    ========================= */

    if (flocage) {

        flocage.addEventListener(
            "change",
            function () {


                if (this.checked) {

                    zoneFlocage.style.display =
                        "flex";

                } else {

                    zoneFlocage.style.display =
                        "none";

                }


                calculerPrix();

            }
        );

    }


    /* =========================
       LIVRAISON
    ========================= */

    if (livraison) {

        livraison.addEventListener(
            "change",
            function () {

                calculerPrix();

            }
        );

    }


    /* =========================
       PRIX INITIAL
    ========================= */

    calculerPrix();


    /* =========================
       AVIS
    ========================= */

    const ouvrirAvis =
        document.getElementById(
            "ouvrirAvis"
        );

    const avisModal =
        document.getElementById(
            "avisModal"
        );

    const fermerAvis =
        document.getElementById(
            "fermerAvis"
        );


    if (
        ouvrirAvis &&
        avisModal
    ) {

        ouvrirAvis.addEventListener(
            "click",
            function () {

                avisModal.classList.add(
                    "active"
                );

            }
        );

    }


    if (
        fermerAvis &&
        avisModal
    ) {

        fermerAvis.addEventListener(
            "click",
            function () {

                avisModal.classList.remove(
                    "active"
                );

            }
        );

    }


    if (avisModal) {

        avisModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === avisModal
                ) {

                    avisModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                avisModal
            ) {

                avisModal.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================
       PAYPAL
    ========================= */

    if (
        typeof paypal !== "undefined"
    ) {


        paypal.Buttons({

            style: {

                layout: "vertical",

                color: "gold",

                shape: "rect",

                label: "paypal",

                height: 45

            },


            /* =========================
               CREATION COMMANDE
            ========================= */

            createOrder: function (
                data,
                actions
            ) {


                const total =
                    calculerPrix();


                return actions.order.create({

                    purchase_units: [

                        {

                            description:
                                "SO-KIT — Maillot rétro 2016/2017",

                            amount: {

                                currency_code:
                                    "EUR",

                                value:
                                    total.toFixed(2)

                            }

                        }

                    ]

                });

            },


            /* =========================
               PAIEMENT APPROUVÉ
            ========================= */

            onApprove: function (
                data,
                actions
            ) {


                return actions.order
                    .capture()
                    .then(function (
                        details
                    ) {


                        alert(
                            "Paiement réussi ! Merci " +
                            details.payer.name.given_name +
                            " pour votre commande SO-KIT."
                        );


                        console.log(
                            "Paiement PayPal réussi :",
                            details
                        );

                    });

            },


            /* =========================
               ANNULATION
            ========================= */

            onCancel: function (
                data
            ) {

                console.log(
                    "Paiement annulé :",
                    data
                );

            },


            /* =========================
               ERREUR
            ========================= */

            onError: function (
                error
            ) {

                console.error(
                    "Erreur PayPal :",
                    error
                );


                alert(
                    "Une erreur est survenue avec PayPal. Veuillez réessayer."
                );

            }

        })
        .render(
            "#paypal-button-container"
        );


    } else {


        console.error(
            "PayPal SDK non chargé."
        );


        const container =
            document.getElementById(
                "paypal-button-container"
            );


        if (container) {

            container.innerHTML =
                "<p>Impossible de charger PayPal.</p>";

        }

    }

});
