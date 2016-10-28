document.addEventListener("DOMContentLoaded", function(event) {

    function test_match_media_with_listener() {
        var mq = window.matchMedia("(max-width: 500px)");
        mq.addListener(WidthChange);
        WidthChange(mq);

        function WidthChange(mediaQuery) {
            if(mediaQuery.matches) {
                hideNav(navUl);
                turnOnNavMobile();
                showBtn(button);
                showBtn(filterBtn);
                hideNav(filter);
            }
            else {
                showNav(navUl);
                turnOffNavMobile();
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

    function showNav(nav) {
        nav.classList.remove("hidden-nav");
    }

    function hideNav(nav) {
        nav.classList.add("hidden-nav");
    }

    function showBtn(btn) {
        btn.classList.remove("hidden-btn");

    }

    function hideButton(btn) {
        btn.classList.add("hidden-btn");
    }

    function turnOnNavMobile() {
        navUl.classList.add("nav-mobile");
    }

    function turnOffNavMobile() {
        navUl.classList.remove("nav-mobile");
    }


    function toggleVisibilityOfNav() {
        navUl.classList.toggle('hidden-nav');
    }

    // Rozsuwanie menu w wersji mobile
    button.addEventListener('click', toggleVisibilityOfNav);


    // Wywołanie funkcji
    test_match_media_with_listener();


// ===============================================================

    // Zasunięcie pól filtra
    function hideFilterValues() {
        $(".values-list").hide(0);
    }

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
    var filterIsRunning = false;

    // Funkcje pobierające wybrane wartości kategorii z filtra
    function getCatagoryValues(h3Element) {
        var liElements = $(h3Element).next().children();
        var tab = [];

        liElements.each(function(index, element) {
            if ($(element).hasClass("checked")) {
                var value = $(element).data("value");
                tab.push(value);
            }
        });
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
                priceIsChecked = true;
            }
        });
        // console.log(priceIsChecked);

        if (priceIsChecked) {
            var min = liElements[0].dataset.value;
            var max = liElements[1].dataset.value;
            if (isNaN(min) || isNaN(max)) {
                tab = [];
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
            tab.push(min);
            tab.push(max);
        }
        return tab;
    }

    // funkcja sparawdzająca czy jakaś kategoria filtra jest zanaczona
    function noCategoryIsSelected() {
        var categories = $(".category-title");
        // console.log(categories);

        for (var i = 0; i < categories.length; i++) {
            if ($(categories[i]).hasClass("checked")) {
                return false;
            }
        }
        return true;
    }


    // // funkcja filtrująca markę - jeśli data-brand produktu zgadza się z którąś wartością kategorii brand, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    // function filterBrand(product) {
    //     var matches = false;
    //     brandsArray = getCatagoryValues($("#brand-title"));
    //
    //     // $(product).removeClass("selected");
    //     if (noCategoryIsSelected()) {
    //         $(products).removeClass("hidden");
    //         $(product).removeClass("selected");
    //     } else {
    //         filterIsRunning = true;
    //
    //         if (brandsArray.length !== 0) {
    //
    //             // Pętla po produktach
    //             for (var i = 0; i < products.length; i++) {
    //                 // Pętla po tablicy wartości brand
    //                 for (var i = 0; i < brandsArray.length; i++) {
    //                     if (brandsArray[i] === $(product).data("brand")) {
    //                         matches = true;
    //                     }
    //                 }
    //
    //                 if (filterIsRunning) { // jeżeli coś było już odfiltrowane
    //
    //                     if (matches && $(product).hasClass("selected")) {
    //                         // już jest odfiltrowany
    //
    //                     } else {
    //                         $(product).addClass("hidden");
    //                         $(product).removeClass("selected");
    //                     }
    //                 }
    //                 else {  // jeżeli jeszcze nic nie jest odfiltrowane
    //                     filterIsRunning = true;
    //                     if (matches) {
    //                         $(product).removeClass("hidden");
    //                         $(product).addClass("selected");
    //                     } else {
    //                         $(product).addClass("hidden");
    //                     }
    //                 }
    //             }
    //
    //         }
    //     }
    //     // else {
    //     //     $(product).addClass("selected");
    //     // }
    // }

    // funkcja sprawdzająca jakie kategorie zostały zaznaczone, zwraca tablicę z elementami h3 (tytuł kategorii)
    function selectedCategories() {
        var categories = $(".category-title");
        var tab = [];
        for (var i = 0; i < categories.length; i++) {
            if ($(categories[i]).hasClass("checked")) {
                tab.push(categories[i]);
            }
        }
        return tab;
    }


    // pętla dla brand
    function loopForBrand() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        var p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   !!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        } else {
            p = products;
        }


        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "brand") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {

            // products = $(".product.selected");  // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {

            // Pętla po produktach
            for (var i = 0; i < p.length; i++) {  // zmieniam products na p
                // console.log(brandMatches(p[i]));

                filterBrand(p[i]); // zmieniam priducts na p
                // products = $(".product");  // !!!!!!!!!!! Nadpisanie warotści zmiennej
            }
        }
    }

    // pętla dla sex
    function loopForSex() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        } else {
            p = products;
        }

        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "sex") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) { // zmieniam products na p
                // console.log(brandMatches(p[i]));

                filterSex(p[i]); // zmieniam products na p
            }
        }
    }

    // pętla dla price
    function loopForPrice() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        }

        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "price") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) { // zmieniam products na p

                filterPrice(p[i]); // zmieniam products na p
                // products = $(".product");   // !!!!!!!!!! Nadpisanie wartości zmiennj
            }
        }
    }

    // pętla dla color
    function loopForColor() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        }

        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "color") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;

            for (var i = 0; i < p.length; i++) {  // zmieniam products na p

                filterColor(p[i], ".product"); // zmieniam products na p
            }

        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) {  // zmieniam products na p

                filterColor(p[i], ".selected");  // zmieniam products na p
            }
        }
        // products = $(".product");   // !!!!!!!!!!!! Nadpisanie wartości zmiennej
    }

    // pętla dla strap
    function loopForStrap() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        }

        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "strap") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) {  // zmieniam products na p

                filterStrap(p[i]);  // zmieniam products na p
            }
        }
    }

    // pętla dla mechanism
    function loopForMechanism() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        }

        for (var i = 0; i < tab.length; i++) {
            if ((tab[i]).dataset.category !== "mechanism") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) { // zmieniam products na p

                filterMechanism(p[i]);  // zmieniam products na p
            }
        }
    }

    // pętla dla waterproof
    function loopForWaterproof() {
        var productMatches = false;
        var tab = selectedCategories();
        var otherCategoryIsChecked = false;
        p = products;

        if (tab.length > 1) {
            filterIsRunning = true;
            // products = $(".product.selected");   // !!!!!!!!!!!!!! Nadpisanie wartości zmiennej
            p = $(".product.selected");
        }

        for (var i = 0; i < tab.length; i++) {
            console.log(tab[i]);
            if ((tab[i]).dataset.category !== "waterproof") {
                otherCategoryIsChecked = true;
            }

        }
        if (otherCategoryIsChecked) {
            p = $(".product.selected");
        } else {
            // products = $(".product"); // !!!!!!!!!!!!! Nadpisanie wartości zmiennj
            p = products;
        }

        if (noCategoryIsSelected()) {
            $(products).removeClass("hidden");
            $(products).removeClass("selected");
            filterIsRunning = false;
        } else {
            // Pętla po produktach
            for (var i = 0; i < p.length; i++) { // zmieniam products na p

                filterWaterproof(p[i]); // zmieniam products na p
            }
        }
    }

    // funkcja filtrująca markę - jeśli data-brand produktu zgadza się z którąś wartością kategorii brand, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterBrand(product) {
        var matches = false;
        // Pobranie do tablicy zaznaczonych wartości kategorii z filtra
        brandsArray = getCatagoryValues($("#brand-title"));
        // $(product).removeClass("selected");

        if (brandsArray.length !== 0) {
            for (var i = 0; i < brandsArray.length; i++) {
                if (brandsArray[i] === $(product).data("brand")) {
                    matches = true;
                }
            }
            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        }
        else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }


    // funkcja filtrująca płeć - jeśli data-sex produktu zgadza się z którąś wartością kategorii sex, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterSex(product) {
        var matches = false;
        // Pobranie do tablicy zaznaczonych wartości kategorii z filtra
        sexArray = getCatagoryValues($("#sex-title"));

        if (sexArray.length !== 0) {
            for (var i = 0; i < sexArray.length; i++) {
                if (sexArray[i] === $(product).data("sex")) {
                    matches = true;
                }
            }

            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }

        } else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }

    // funkcja filtrująca cenę - jeśli data-sex produktu zgadza jest większy do wartości min i mniejszy od wartości max, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterPrice(product) {
        var matches = false;
        pricesArray = getPrices();

        if (pricesArray.length !== 0) {
            var min = pricesArray[0];
            var max = pricesArray[1];

            if ( ($(product).data("price") <= max) && ($(product).data("price") >= min) ) {
                matches = true;
            }

            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        }  else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }


    // funkcja filtrująca kolor - jeśli data-color produktu zgadza się z którąś wartością kategorii color, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterColor(product, selector) {
        var matches = false;
        colorsArray = getCatagoryValues($("#color-title"));

        if (colorsArray.length !== 0) {
            for (var i = 0; i < colorsArray.length; i++) {
                if (colorsArray[i] === $(product).data("color")) {
                    matches = true;
                }
            }
            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        } else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }

    // funkcja filtrująca pasek - jeśli data-strap produktu zgadza się z którąś wartością kategorii strap, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterStrap(product) {
        var matches = false;
        strapsArray = getCatagoryValues($("#strap-title"));

        if (strapsArray.length !== 0) {
            for (var i = 0; i < strapsArray.length; i++) {
                if (strapsArray[i] === $(product).data("strap")) {
                    matches = true;
                }
            }
            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        } else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }

    // funkcja filtrująca mechanizm - jeśli data-mechanism produktu zgadza się z którąś wartością kategorii mechanism, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterMechanism(product) {
        var matches = false;
        // Pobranie do tablic zaznaczonych wartości kategorii z filtra
        mechArray = getCatagoryValues($("#mechanism-title"));

        if (mechArray.length !== 0) {
            for (var i = 0; i < mechArray.length; i++) {
                if (mechArray[i] === $(product).data("mechanism")) {
                    matches = true;
                }
            }
            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        } else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }

    // funkcja filtrująca wodoodporność - jeśli data-waterproof produktu zgadza się z którąś wartością kategorii waterproof, usuwa klasę hidden, jeżeli nie, nadaje produktowi klasę hidden
    function filterWaterproof(product) {
        var matches = false;
        // Pobranie do tablic zaznaczonych wartości kategorii z filtra
        wproofArray = getCatagoryValues($("#waterproof-title"));

        if (wproofArray.length !== 0) {
            for (var i = 0; i < wproofArray.length; i++) {
                if (wproofArray[i] === $(product).data("waterproof")) {
                    matches = true;
                }
            }
            if (matches) {
                $(product).removeClass("hidden");
                $(product).addClass("selected");
            } else {
                $(product).addClass("hidden");
                $(product).removeClass("selected");
            }
        } else {
            // $(product).addClass("selected");
            // $(product).removeClass("hidden");
        }
    }


    // // funkcja filtrująca po marce
    // function brandFilter() {
    //     if (filterIsRunning) {
    //         products = $(".product.picked");
    //     }
    //     var h3Element = $("#brand-title");
    //     var liElements = h3Element.next().children();
    //     var x = [];
    //     var noCategoryIsSelected = true;
    //     var categories = $(".category-title");
    //
    //     categories.each(function(index, category) {
    //         if ($(category).hasClass("checked")) {
    //             console.log("zaznaczony");
    //             noCategoryIsSelected = false;
    //             // break;
    //         }
    //     });
    //
    //
    //     if(noCategoryIsSelected) {
    //         console.log("nic nie jest wybrane");
    //         products.removeClass("hidden");
    //     } else {
    //
    //         liElements.each(function(index, element) {
    //             if ($(element).hasClass("checked")) {
    //                 console.log($(element).data("value"));
    //                 x.push($(element).data("value"));
    //             }
    //         });
    //         console.log(x);
    //
    //         products.each(function(index, product) { // pętla po wszystkich produktach
    //             var flag = false;
    //             for (var i = 0; i < x.length; i++) {
    //                 if (x[i] === $(product).data("brand")) {
    //                     flag = true;
    //                 }
    //             }
    //             if (flag === true) {
    //                 $(product).removeClass("hidden");
    //                 $(product).addClass("picked"); // nadaje klasę wybranym produktom
    //             }
    //             else {
    //                 $(product).addClass("hidden"); // ukrywa produkt, który nie spełnia warunku
    //                 $(product).removeClass("picked");
    //             }
    //         });
    //     }
    // }

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
        // console.log(li);

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

        checkCategory($(".min-price")); // zaznaczenie/odznaczenie kategorii

        // filterProducts(); // wywołanie funkcji filtrowania produktów
        loopForPrice(); // wywołanie funkcji filtrowania produktów
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



    // obsługa filtrów innych niż cena
    // event na kategorii brand
    $("#brand .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForBrand(); // wywołanie funkcji filtrowania produktów
        // filterBrand();
    });

    // event na kategorii sex
    $("#sex .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForSex(); // wywołanie funkcji filtrowania produktów

    });

    // event na kategorii color
    $("#color .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForColor(); // wywołanie funkcji filtrowania produktów

    });

    // event na kategorii strap
    $("#strap .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForStrap(); // wywołanie funkcji filtrowania produktów

    });

    // event na kategorii mechanism
    $("#mechanism .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForMechanism(); // wywołanie funkcji filtrowania produktów

    });

    // event na kategorii waterproof
    $("#waterproof .values").on("click", function() {
        // var noOptionIsChecked = true;
        if (!$(this).hasClass("price")) {

            $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
        }

        checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
        loopForWaterproof(); // wywołanie funkcji filtrowania produktów
    });

    // Czyszczenie filtra
    $("#reset-btn").on("click", function() {
        $(products).removeClass("hidden");
        $(products).removeClass("selected");
        $(".checked").removeClass("checked");
        filterIsRunning = false;
        $(".values-list").slideUp();
        $("#min").val("");
        $("#max").val("");
    });

    // Rozsuwanie filtra w wersji mobile
    $(".filter-btn").on("click", function() {
        $(this).next().slideToggle();
    });

    // funkcja pobierająca zaznaczone wartości kaegorii i zwracająca tablicę dwuwymiarową
    function getCheckedValues() {
        var tab = [];
        $(".category-title").each(function(i, category) {
            var liElements = $(this).next().children();
            tab[i] = [];
            liElements.each(function(j, value) {
                if ($(value).hasClass("checked")) {
                    tab[i].push(value);
                }
            });
            // console.log(tab[i]);
        });
        console.log(tab);
        return tab;
    }

    hideFilterValues();
    filterSlideHandler();

});

    // obsługa filtrów innych niż cena
    // $(".values").on("click", function() {
    //     // var noOptionIsChecked = true;
    //     if (!$(this).hasClass("price")) {
    //
    //         $(this).toggleClass("checked"); // zaznaczenie lub odznaczenie opcji
    //     }
    //
    //     checkCategory($(this)); // zaznaczenie/odznaczenie kategorii
    //     filterProducts(); // wywołanie funkcji filtrowania produktów
    //     // filterBrand();
    // });

    // filtrowanie produktów
    // function filterProducts() {
    //     // var noCategoryIsChecked = true;
    //
    //     // $(products).addClass("hidden"); // ukrycie wszystkich produktów
    //
    //     $(products).each(function(index, product) { // pętla po wszystkich produktach
    //         var categories = $(".category-title");
    //
    //         $(categories).each(function(index, value) { // pętla po kategoriach
    //
    //             if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
    //                 noCategoryIsChecked = false;
    //
    //                 var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii
    //
    //                 $(categoryValues).each(function(index, value) { // pętla po wartościach kategorii
    //                     if ($(value).hasClass("checked")) { // jeżeli wartość kategorii jest zaznaczona
    //                         var category = $(value).data("category"); // pobranie nazwy kategorii z data set (string)
    //                         var categoryVal = $(value).data("value"); // pobranie vartości danej kategorii z data set (string)
    //
    //
    //                         // Jeżeli kategoria nie jest ceną - ukrywa produkty nie spełniające warunków filtrowania
    //                         if (category !== "price") {
    //                             if (($(product).data(category) !== categoryVal)) { // jeżeli wartość kategorii produktu pobrana z data set, nie jest równa zaznaczonej kategorii
    //                                 $(product).addClass("hidden"); // ukrywa produkt
    //                             }
    //                         }
    //
    //                         else { // Jeżeli kategoria jest ceną - ukrywa produkty nie spełniające warunków filtrowania
    //
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
    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     });
    //     if(noCategoryIsChecked) {   // jeżeli żadna kategoria nie została zaznaczona
    //             $(products).removeClass("hidden"); // pokarz wszystkie produkty
    //     }
    // }

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

    // var noCategoryIsChecked = true;
    // function filterProducts() {
    //     var values = $(".values");
    //     var categories = $(".category-title");
    //
    //     if (noCategoryIsChecked) {
    //         $(products).removeClass("hidden"); // pokazanie wszystkich produktów
    //     }
    //     $(categories).each(function(index, value) { // pętla po kategoriach
    //
    //         if ($(value).hasClass("checked")) { // jeżeli kategoria jest zaznaczona
    //             noCategoryIsChecked = false;
    //             var categoryValues = $(this).next().children(); // pobranie elementów li z danej kategorii
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
    //                         // Pierwsze filtrowanie (bez ceny) - ukrywa produkty nie spełniające warunków filtrowania
    //                         if (category !== "price") {
    //                             if ($(product).data(category) !== categoryVal) { // jeżeli wartość kategorii produktu pobrana z data set, nie jest równa zaznaczonej kategorii
    //                                 $(product).addClass("hidden"); // ukrywa produkty
    //                             }
    //                         }
    //                         else { // Drugie filtrowanie (cena) -  ukrywa prodkty, które nie spełniają warunków
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
    //                         }
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

    // function hideAllProducts() {
    //
    // }
