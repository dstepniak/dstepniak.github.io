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

    var products = $(".product");

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


        // // console.log("input");
        // // console.log($(this).val());
        // var li = $(this).parent().parent();
        //
        //
        // $(li).attr("data-value", $(this).val())
        // // console.log($(this).parent().parent());
        // // console.log($(li).attr("data-value"));
        // if ($(li).attr("data-value") !== "") {  // jeżeli data set jest ustawiony
        //     $(li).addClass("checked"); // zaznaczenie opcji
        // }
        // else {
        //     $(li).removeClass("checked"); // odznaczenie opcji
        // }
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

        filterProducts(); // wywołanie funkcji filtrowania produktów
    });


    // console.log($(".filter-btn"));
    // Rozsuwanie filtra w wersji mobile
    $(".filter-btn").on("click", function() {
        $(this).next().slideToggle();

        // $(".values-list").each(function(index, value) {
        //     $(this).slideUp();
        // });
        // $(".values").each(function(index, value) {
        //     $(this).removeClass("checked");
        // });
    });


    // filtrowanie produktów
    function filterProducts() {
        var values = $(".values");
        var categories = $(".category-title");
        var noCategoryIsChecked = true;
        // console.log(categories);
        // console.log(products);

        $(categories).each(function(index, value) { // pętla po kategoriach

            if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
                noCategoryIsChecked = false;
                var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii

                $(products).addClass("hidden"); // ukrycie wszystkich produktów

                // console.log(categoryValues);
                // dla każdego elementu li z danej kategorii
                $(categoryValues).each(function(index, value) {
                    if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
                        var category = $(value).data("category"); // pobranie nazwy kategorii z data set (string)
                        var categoryVal = $(value).data("value"); // pobranie vartości danej kategorii z data set (string)
                        var li = $(value);
                        // console.log(category);
                        // console.log(categoryVal);
                        $(products).each(function(index, product) { // pętla przez wszystkie produkty
                            console.log($(product));
                            // console.log(category);
                            console.log($(product).data(category));
                            // console.log(categoryVal);

                            // Pierwsze filtrowanie (bez ceny) - pokazuje pridukty spełniające warunki filtrowania
                            if ((category !== "price") && ($(product).data(category) === categoryVal)) { // jeżeli wartość kategorii produktu pobrana z data set, jest równa zaznaczonej kategorii
                                        $(product).removeClass("hidden"); // pokazuje produkty
                            }

                            // Drugie filtrowanie (cena) - spośród odfiltrowanych ukrywa prodkty, które nie spełniają warunków
                            if ((category === "price") && !($(product).hasClass("hidden"))) {
                                // console.log("produkt" + $(product).data(category));
                                // console.log("zaznaczony" + categoryVal);
                                // if(($(product).data(category) <= )

                                // console.log($(".min-price").attr("data-value"));
                                // console.log($(".max-price").attr("data-value"));
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




                                // if ((($(product).data(category) <= categoryVal) && $(li).hasClass("max-price"))) {
                                //
                                //     $(product).removeClass("hidden"); // pokazuje produkty
                                // }
                                // else if ((($(product).data(category) >= categoryVal) && $(li).hasClass("min-price"))) {
                                //
                                //     $(product).removeClass("hidden"); // pokazuje produkty
                                // }

                                // if ((($(product).data(category) >= categoryVal) && $(li).hasClass("min-price")) &&  (($(product).data(category) <= categoryVal) && $(li).hasClass("max-price")) ) {
                                //     $(product).removeClass("hidden"); // pokazuje produkty
                                // }
                            }
                            // else if ($(product).data(category) === categoryVal) { // jeżeli wartość kategorii produktu pobrana z data set, jest równa zaznaczonej kategorii
                            //         $(product).removeClass("hidden"); // pokazuje produkty
                            //
                            // }

                        });
                    }
                });
            }
        });
        if(noCategoryIsChecked) {   // jeżeli żadna kategoria nie została zaznaczona
            $(products).removeClass("hidden"); // pokarz wszystkie produkty
        }
    }

    function hideAllProducts() {

    }

    hideFilterValues();
    filterSlideHandler();


});
