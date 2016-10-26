document.addEventListener("DOMContentLoaded", function(event) {

    function test_match_media_with_listener() {
        var mq = window.matchMedia("(max-width: 500px)");
        mq.addListener(WidthChange);
        WidthChange(mq);

        function WidthChange(mediaQuery) {
            if(mediaQuery.matches) {
                // console.log('yes');
                hideNav(navUl);
                turnOnNavMobile();
                // showBtn();
                showBtn(button);
                showBtn(filterBtn);
                hideNav(filter);
            }
            else {
                // console.log('no');
                showNav(navUl);
                turnOffNavMobile();
                // hideButton();
                hideButton(button);
                hideButton(filterBtn);
                showNav(filter);
                filter.removeAttribute("style");
            }
        }
    }


    var button = document.querySelector('.nav-button');
    var nav = document.querySelector('.nav');
    var navUl = document.querySelector('.nav-ul');
    var filterBtn = document.getElementById('filter-btn');
    var filter = document.querySelector('.filter');
    console.log(filter);

    function showNav(nav) {
        // var navUl = document.querySelector('.nav-ul');
        nav.classList.remove("hidden-nav");
    }

    function hideNav(nav) {
        // var navUl = document.querySelector('.nav-ul');
        nav.classList.add("hidden-nav");
    }


    // function showBtn() {
    //     button.classList.remove("hidden-btn");
    // }
    //
    // function hideButton() {
    //     button.classList.add("hidden-btn");
    // }
    function showBtn(btn) {
        btn.classList.remove("hidden-btn");

    }

    function hideButton(btn) {
        btn.classList.add("hidden-btn");
    }

    function turnOnNavMobile() {
        // var navUl = document.querySelector('.nav-ul');
        navUl.classList.add("nav-mobile");
    }

    function turnOffNavMobile() {
        // var navUl = document.querySelector('.nav-ul');
        navUl.classList.remove("nav-mobile");
    }


    function toggleVisibilityOfNav() {
        // var navUl = document.querySelector('.nav-ul');
        navUl.classList.toggle('hidden-nav');
    }

    // function toggleVisibilityOfFilter() {
    //     filter.classList.toggle('hidden-nav');
    // }

    // Rozsuwanie menu w wersji mobile
    button.addEventListener('click', toggleVisibilityOfNav);

    // // Rozsuwanie filtra w wersji mobile
    // filterBtn.addEventListener('click', toggleVisibilityOfFilter);



    // Wersja bez użycia toggle dla classList - rozpisane warunki włączenia i wyłączenia menu
    // button.addEventListener('click', function(event) {
    //
    //     var ulClassList = navUl.classList;
    //
    //     var navIsHidden = false;
    //     for (var i = 0; i < ulClassList.length; i++) {
    //         // console.log(ulClassList[i]);
    //         if (ulClassList[i] == "hidden-nav") {
    //             console.log("navIsHidden");
    //             navIsHidden = true;
    //             break;
    //         }
    //     }
    //     if (navIsHidden) {
    //         showNav();
    //     }
    //     else {
    //         hideNav();
    //     }
    // });

    // Wywołanie funkcji
    test_match_media_with_listener();
    // _btnMenuInit();


// ===============================================================

    // var products = $(".product");
    // var filterIsRunning = false;

    // Zasunięcie pól filtra
    function hideFilterValues() {
        // console.log($(".values-list"));
        $(".values-list").hide(0);
    }

    // console.log($(".category"));
    // Rozsuwanie pól filtra
    function filterSlideHandler() {
        $(".category-title").on("click", function() {
            $(this).next().slideToggle();
        });
    }


    // Zmienne
    var products = document.querySelectorAll(".product");
    var brandsArray = [];
    var sexArray = [];
    var pricesArray = [];
    var colorsArray = [];
    var strapsArray = [];
    var mechArray = [];
    var wproofArray = [];

    // Funkcje pobierające wybrane wartości kategorii z filtra
    function getCatagoryValues(h3Element) {
        var liElements = $(h3Element).next().children();
        var tab = [];

        liElements.each(function(index, element) {
            if ($(element).hasClass("checked")) {
                // console.log($(element).data("value"));
                $(tab).push($(element).data("value"));
            }
        });
        console.log(tab);
        return tab;
    }
    // Funkcja pobierająca wartości ceny
    function getPrices() {
        var h3Element = $("#price-title");
        var liElements = h3Element.next().children();
        var tab = [];
        var priceIsChecked = false;

        liElements.each(function(index, element) {
            if ($(element).hasClass("checked")) {
                var priceIsChecked = false;
            }
        });

        if (priceIsChecked) {
            var min = $(liElements[0]).data("value");
            var max = $(liElements[1]).data("value");
            if (isNaN(min) || isNaN(max)) {
                return tab;
            }
            if (min === "") {
                min = 0;
            }
            if (max == "") {
                max = 100000;
            }
            min = parseInt(min);
            max = parseInt(max);
        }

        $(tab).push(min).push(max);

        console.log(tab);
        return tab;
    }

    // function getBrands() {
    //     var h3Element = $("#brand-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }
    //
    // function getSex() {
    //     var h3Element = $("#sex-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }

    // function getColors() {
    //     var h3Element = $("#color-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }
    //
    // function getStraps() {
    //     var h3Element = $("#strap-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }
    //
    // function getMechs() {
    //     var h3Element = $("#mechanism-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }
    //
    // function getWproofs() {
    //     var h3Element = $("#waterproof-title");
    //     var liElements = h3Element.next().children();
    //     var tab = [];
    //
    //     liElements.each(function(index, element) {
    //         if ($(element).hasClass("checked")) {
    //             // console.log($(element).data("value"));
    //             $(tab).push($(element).data("value"));
    //         }
    //     });
    //     console.log(tab);
    //     return tab;
    // }


    // funkcja sparawdzająca czy jakaś kategoria filtra jest zanaczona
    function noCategoryIsSelected() {
        var categories = $(".category-title");

        categories.each(function(index, category) {
            if ($(category).hasClass("checked")) {
                console.log("zaznaczony");
                return false;
            }
        });
        return true;
    }

    // funkcja filtrująca produkty
    function filterProducts() {
        var productMatches = false;

        // Pobranie do tablic zaznaczonych wartości kategorii z filtra
        brandsArray = getCatagoryValues($("#brand-title"));
        sexArray = getCatagoryValues($("#sex-title"));
        pricesArray = getPrices();
        colorsArray = getCatagoryValues($("#color-title"));
        strapsArray = getCatagoryValues($("#strap-title"));
        mechArray = getCatagoryValues($("#mechanism-title"));
        wproofArray = getCatagoryValues($("#waterproof-title"));

        if (noCategoryIsSelected()) {

        }

        // Pętla po produktach
        for (var i = 0; i < products.length; i++) {
            if (brandMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (sexMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (priceMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (colorMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (strapMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (mechanismMatches(products[i])) {
                productMatches = true;
                break;
            }
            if (waterproofMatches(products[i])) {
                productMatches = true;
                break;
            }
        }

        if (productMatches) {
            $(products[i]).removeClass("hidden");
        } else {
            $(products[i]).addClass("hidden");
        }
    }


    function brandMatches(product) {
        
    }
    function sexMatches(product) {

    }
    function priceMatches(product) {

    }
    function colorMatches(product) {

    }
    function strapMatches(product) {

    }
    function mechanismMatches(product) {

    }
    function waterproofMatches(product) {

    }
















    // funkcja filtrująca po marce
    function brandFilter() {
        if (filterIsRunning) {
            products = $(".product.picked");
        }
        var h3Element = $("#brand-title");
        var liElements = h3Element.next().children();
        var x = [];
        var noCategoryIsSelected = true;
        var categories = $(".category-title");

        categories.each(function(index, category) {
            if ($(category).hasClass("checked")) {
                console.log("zaznaczony");
                noCategoryIsSelected = false;
                // break;
            }
        });


        if(noCategoryIsSelected) {
            console.log("nic nie jest wybrane");
            products.removeClass("hidden");
        } else {

            liElements.each(function(index, element) {
                if ($(element).hasClass("checked")) {
                    console.log($(element).data("value"));
                    x.push($(element).data("value"));
                }
            });
            console.log(x);

            products.each(function(index, product) { // pętla po wszystkich produktach
                var flag = false;
                for (var i = 0; i < x.length; i++) {
                    if (x[i] === $(product).data("brand")) {
                        flag = true;
                    }
                }
                if (flag === true) {
                    $(product).removeClass("hidden");
                    $(product).addClass("picked"); // nadaje klasę wybranym produktom
                }
                else {
                    $(product).addClass("hidden"); // ukrywa produkt, który nie spełnia warunku
                    $(product).removeClass("picked");
                }
            });
        }
    }

    // funkcja filtrująca po płci


    // funkcja filtrująca po cenie

    // funkcja filtrująca po kolorze

    // funkcja filtrująca po pasku

    // funkcja filtrująca po mechaniźmie

    // funkcja filtrująca po wodoszczelności

    // funkcja sprawdzająca, która kategoria jest zaznaczona




















    // Obsługa filtra cena
    $("input").on("change", function() {

        var li = $(".price");
        console.log(li);

        $(li).removeClass("checked"); // usunięcie zaznaczenia wartośći min i max

        $(".min-price").attr("data-value", $("#min").val()); // przypisanie wartości inputa do data set
        $(".max-price").attr("data-value", $("#max").val()); // przypisanie wartości inputa do data set


        $(".price").each(function(index, value) {
            if ($(value).attr("data-value") !== "") {  // jeżeli data set jest ustawiony
                $(value).addClass("checked"); // zaznaczenie opcji
            }
            else {
                $(value).removeClass("checked");
            }
        });

        checkCategory($(".price-title"));
        filterProducts(); // wywołanie funkcji filtrowania produktów
    });

    // Zaznaczanie lub odznaczanie kategorii
    function checkCategory(li) {
        var noOptionIsChecked = true;
        $(li).parent().children().each(function(index, value) {

            if ($(value).hasClass("checked")) { // jeżeli którakolwiek opcja jest zaznaczona
                $(value).parent().prev().addClass("checked"); // zmiana koloru przycisku kategorii
                noOptionIsChecked = false;
            }
        });
        if (noOptionIsChecked) { // jeżeli nic nie zostało zaznaczone
            $(li).parent().prev().removeClass("checked"); // usuwa kolor przycisku kategorii
        }
    }


    // console.log($(".values"));
    // obsługa filtrów innych niż cena
    $(".values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this));

        brandFilter();

        // filterProducts(); // wywołanie funkcji filtrowania produktów
    });



    // Rozsuwanie filtra w wersji mobile
    $(".filter-btn").on("click", function() {
        $(this).next().slideToggle();
    });


    // filtrowanie produktów
    function filterProducts() {
        // var noCategoryIsChecked = true;

        // $(products).addClass("hidden"); // ukrycie wszystkich produktów

        $(products).each(function(index, product) { // pętla po wszystkich produktach
            var categories = $(".category-title");

            $(categories).each(function(index, value) { // pętla po kategoriach

                if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
                    noCategoryIsChecked = false;

                    var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii

                    $(categoryValues).each(function(index, value) { // pętla po wartościach kategorii
                        if ($(value).hasClass("checked")) { // jeżeli wartość kategorii jest zaznaczona
                            var category = $(value).data("category"); // pobranie nazwy kategorii z data set (string)
                            var categoryVal = $(value).data("value"); // pobranie vartości danej kategorii z data set (string)


                            // Jeżeli kategoria nie jest ceną - ukrywa produkty nie spełniające warunków filtrowania
                            if (category !== "price") {
                                if (($(product).data(category) !== categoryVal)) { // jeżeli wartość kategorii produktu pobrana z data set, nie jest równa zaznaczonej kategorii
                                    $(product).addClass("hidden"); // ukrywa produkt
                                }
                            }

                            else { // Jeżeli kategoria jest ceną - ukrywa produkty nie spełniające warunków filtrowania

                                var min = $(".min-price").attr("data-value");
                                var max = $(".max-price").attr("data-value");
                                if (min === "") {
                                    min = 0;
                                }
                                if (max == "") {
                                    max = 100000;
                                }
                                if ( ($(product).data(category) > max) && ($(product).data(category) < min) ) {

                                    $(product).addClass("hidden"); // ukrywa produkty, które nie spełniają warunków filtra
                                }
                            }
                        }
                    });
                }
            });
        });
        if(noCategoryIsChecked) {   // jeżeli żadna kategoria nie została zaznaczona
                $(products).removeClass("hidden"); // pokarz wszystkie produkty
        }
    }













    // function filterProducts() {
    //     var values = $(".values");
    //     var categories = $(".category-title");
    //     var noCategoryIsChecked = true;
    //
    //     $(categories).each(function(index, value) { // pętla po kategoriach
    //
    //         if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
    //             noCategoryIsChecked = false;
    //             var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii
    //
    //             $(products).addClass("hidden"); // ukrycie wszystkich produktów
    //
    //
    //             // dla każdego elementu li z danej kategorii
    //             $(categoryValues).each(function(index, value) {
    //                 if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
    //                     var category = $(value).data("category"); // pobranie nazwy kategorii z data set (string)
    //                     var categoryVal = $(value).data("value"); // pobranie vartości danej kategorii z data set (string)
    //                     var li = $(value);
    //
    //                     $(products).each(function(index, product) { // pętla przez wszystkie produkty
    //                         // console.log($(product));
    //                         // console.log(category);
    //                         // console.log($(product).data(category));
    //                         // console.log(categoryVal);
    //
    //                         // Pierwsze filtrowanie (bez ceny) - pokazuje produkty spełniające warunki filtrowania
    //                         if ((category !== "price") && ($(product).data(category) === categoryVal)) { // jeżeli wartość kategorii produktu pobrana z data set, jest równa zaznaczonej kategorii
    //                                     $(product).removeClass("hidden"); // pokazuje produkty
    //                         }
    //
    //                         // Drugie filtrowanie (cena) - spośród odfiltrowanych ukrywa prodkty, które nie spełniają warunków
    //                         if ((category === "price") && !($(product).hasClass("hidden"))) {
    //                             // console.log("produkt" + $(product).data(category));
    //                             // console.log("zaznaczony" + categoryVal);
    //                             // if(($(product).data(category) <= )
    //
    //                             // console.log($(".min-price").attr("data-value"));
    //                             // console.log($(".max-price").attr("data-value"));
    //                             var min = $(".min-price").attr("data-value");
    //                             var max = $(".max-price").attr("data-value");
    //                             if (min === "") {
    //                                 min = 0;
    //                             }
    //                             if (max == "") {
    //                                 max = 100000;
    //                             }
    //                             if ( ($(product).data(category) > max) && ($(product).data(category) < min) ) {
    //
    //                                 $(product).addClass("hidden"); // ukrywa produkty, które nie spełniają warunków filtra
    //                             }
    //
    //
    //
    //
    //                             // if ((($(product).data(category) <= categoryVal) && $(li).hasClass("max-price"))) {
    //                             //
    //                             //     $(product).removeClass("hidden"); // pokazuje produkty
    //                             // }
    //                             // else if ((($(product).data(category) >= categoryVal) && $(li).hasClass("min-price"))) {
    //                             //
    //                             //     $(product).removeClass("hidden"); // pokazuje produkty
    //                             // }
    //
    //                             // if ((($(product).data(category) >= categoryVal) && $(li).hasClass("min-price")) &&  (($(product).data(category) <= categoryVal) && $(li).hasClass("max-price")) ) {
    //                             //     $(product).removeClass("hidden"); // pokazuje produkty
    //                             // }
    //                         }
    //                         // else if ($(product).data(category) === categoryVal) { // jeżeli wartość kategorii produktu pobrana z data set, jest równa zaznaczonej kategorii
    //                         //         $(product).removeClass("hidden"); // pokazuje produkty
    //                         //
    //                         // }
    //
    //                     });
    //                 }
    //             });
    //         }
    //     });
    //     if(noCategoryIsChecked) {   // jeżeli żadna kategoria nie została zaznaczona
    //         $(products).removeClass("hidden"); // pokarz wszystkie produkty
    //     }
    // }





    var noCategoryIsChecked = true;
    function filterProducts() {
        var values = $(".values");
        var categories = $(".category-title");

        if (noCategoryIsChecked) {
            $(products).removeClass("hidden"); // pokazanie wszystkich produktów
        }
        $(categories).each(function(index, value) { // pętla po kategoriach

            if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
                noCategoryIsChecked = false;
                var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii

                // dla każdego elementu li z danej kategorii
                $(categoryValues).each(function(index, value) {
                    if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
                        var category = $(value).data("category"); // pobranie nazwy kategorii z data set (string)
                        var categoryVal = $(value).data("value"); // pobranie vartości danej kategorii z data set (string)
                        var li = $(value);

                        $(products).each(function(index, product) { // pętla przez wszystkie produkty
                            // console.log($(product));
                            // console.log(category);
                            // console.log($(product).data(category));
                            // console.log(categoryVal);

                            // Pierwsze filtrowanie (bez ceny) - ukrywa produkty nie spełniające warunków filtrowania
                            if (category !== "price") {
                                if ($(product).data(category) !== categoryVal) { // jeżeli wartość kategorii produktu pobrana z data set, nie jest równa zaznaczonej kategorii
                                    $(product).addClass("hidden"); // ukrywa produkty
                                }
                            }
                            else { // Drugie filtrowanie (cena) -  ukrywa prodkty, które nie spełniają warunków
                                var min = $(".min-price").attr("data-value");
                                var max = $(".max-price").attr("data-value");
                                if (min === "") {
                                    min = 0;
                                }
                                if (max == "") {
                                    max = 100000;
                                }
                                if ( ($(product).data(category) > max) && ($(product).data(category) < min) ) {

                                    $(product).addClass("hidden"); // ukrywa produkty, które nie spełniają warunków filtra
                                }
                            }

                        });
                    }
                });
            }
        });
        if(noCategoryIsChecked) {   // jeżeli żadna kategoria nie została zaznaczona
            $(products).removeClass("hidden"); // pokarz wszystkie produkty
        }
    }

    // function hideAllProducts() {
    //
    // }

    hideFilterValues();
    filterSlideHandler();


});
