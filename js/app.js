document.addEventListener("DOMContentLoaded", function(event) {

    function test_match_media_with_listener() {
        var mq = window.matchMedia("(max-width: 200px)");
        mq.addListener(WidthChange);
        WidthChange(mq);

        function WidthChange(mediaQuery) {
            if(mediaQuery.matches) {
                // console.log('yes');
                hideNav();
                turnOnNavMobile();
                showBtn();
            }
            else {
                // console.log('no');
                showNav();
                turnOffNavMobile();
                hideButton();
            }
        }
    }


    var button = document.querySelector('.nav-button');
    var nav = document.querySelector('.nav');
    var navUl = document.querySelector('.nav-ul');

    function showNav() {
        var navUl = document.querySelector('.nav-ul');
        navUl.classList.remove("hidden-nav");
    }

    function hideNav() {
        var navUl = document.querySelector('.nav-ul');
        navUl.classList.add("hidden-nav");
    }


    function showBtn() {
        button.classList.remove("hidden-btn");
    }

    function hideButton() {
        button.classList.add("hidden-btn");
    }

    function turnOnNavMobile() {
        var navUl = document.querySelector('.nav-ul');
        // navUl.classList.add("nav-mobile");
    }

    function turnOffNavMobile() {
        var navUl = document.querySelector('.nav-ul');
        // navUl.classList.remove("nav-mobile");
    }


    function toggleVisibilityOfNav() {
        var navUl = document.querySelector('.nav-ul');
        navUl.classList.toggle('hidden-nav');
    }

    // button.addEventListener('click', toggleVisibilityOfNav);

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
    // test_match_media_with_listener();
    // _btnMenuInit();
    console.log($(".values-list"));
    $(".values-list").hide(0);

    console.log($(".category"));
    // Rozsuwanie pól filtra
    $(".category-title").on("click", function() {
        $(this).next().slideToggle();
    });

    console.log($(".values"));
    // Zaznaczanie opcji
    $(".values").on("click", function() {
        $(this).toggleClass("checked");
        $(this).parent().children().each(function(index, value) {
            // if (value.hasClass("checked")) {
                $(this).parent().prev().addClass("text-color");
                console.log(value);
            // }
            // else {
            //     $(this).parent().prev().removeClass("text-color");
            // }

        });

    });

    console.log($(".filter-btn"));
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


});
