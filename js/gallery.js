$(".start").click(function(event) {
    var maxGallery = 4;
    var mainImg = $(event.target);
    var parentGallery = mainImg.parent();
    var currentGallery, currentTrumbs, quantityPhotos, galleryImg, largeImage, largeImageHeight,nextGallery;
    var numberGallery = mainImg.attr("src").replace('images/big/', '').replace('/ (1).jpg', '');
    var topCurrentGallery = $(window).scrollTop() + ($(window).height() * 0.075);

    renderGallery(numberGallery);

        currentGallery.css({
            "display": "block",
            "overflow": "hidden",
            "padding-top": topCurrentGallery,
            "height": $("body").height(),
            "width": "100%",
            "z-index": 1000,
        });


    function renderGallery(numberGallery) {

        $("body").append(" <div class=\"gallery\"></div> ");

        currentGallery = $(".gallery");

        renderGalleryContainer(currentGallery, numberGallery);

        fillSmallImages(currentGallery, false);

        nextGallery = $("#nextGallery");
        largeImage = $('.largeImage');
        largeImageHeight = largeImage.height();
        
        setTimeout(createLinksGallery, 200);
        setTimeout(eventListen,300);
    }

    function createLinksGallery() {

        /*logic created links next or preveous*/

        nextGallery = $("#nextGallery");
        largeImageHeight = $('.largeImage').height();

        if (nextGallery.length && numberGallery < maxGallery) {
            return null;
        } else if ((+numberGallery == maxGallery) && (nextGallery.length)) {
            nextGallery.remove();
        } else if (+numberGallery == maxGallery) {
            createPreveousStrilka(currentGallery);
        } else if (+numberGallery == 1) {
            createNextLink(currentGallery);
        } else {

            createNextLink(currentGallery);
            createPreveousStrilka(currentGallery);
        }

        $("#nextGallery, #previousGallery").css({ "top": topCurrentGallery - 20 + (largeImageHeight / 2) });

        /*END*/
    }

    function fillSmallImages(currentGallery, next, prev) {
        currentTrumbs = currentGallery.find(".thumbs");
        if (next) {
            mainImg = mainImg.parent().next().children();
            quantityPhotos = mainImg.attr("data-quantity");
        }

        else if (prev) {
            mainImg = mainImg.parent().prev().children();
            quantityPhotos = mainImg.attr("data-quantity");
        }
        else {
            quantityPhotos = mainImg.attr("data-quantity");
        }

        for (var i = quantityPhotos; i > 0; i--) {
            currentTrumbs.append("<img src=\"images/thumbs/" + numberGallery + "/ (" + i + ").jpg\"/>");
        }
    }

    function renderGalleryContainer(currentGallery, numberGallery) {
        currentGallery.append("<div class=\"container\"><div class=\"col-md-11 col-xs-11 col-sm-11\"><div class=\"col-md-10 col-sm-12 col-xs-12\"><img class=\"largeImage\" src=\"images/big/" + numberGallery + "/ (1).jpg\" /></div><div class=\"thumbs col-md-2 col-sm-12 col-xs-12\"></div></div><div class=\"col-md-1 col-xs-1 col-sm-1\"><p class=\"close-gallery\">X</p></div></div>");
    }

    function createPreveousStrilka(currentGallery) {
        currentGallery.find(".container .col-md-11").before("<a id=\"previousGallery\" src=\"images/icons/arrow_left.png\"></a>");
    }

    function createNextLink(){
        currentGallery.find(".container .col-md-11").after("<a id=\"nextGallery\" src=\"images/icons/arrow_left.png\"></a>");
    }    

    function eventListen() {

         $("#previousGallery").click(function() {
            numberGallery = +numberGallery - 1;
            /*$(".thumbs img").remove();*/
            $(".gallery .container").remove();
            renderGalleryContainer(currentGallery, numberGallery);
            fillSmallImages(currentGallery, false,true);
            createLinksGallery();
            eventListen();

        });

        $("#nextGallery").click(function() {
            numberGallery = +numberGallery + 1;
            /*$(".thumbs img").remove();*/
            $(".gallery .container").remove();
            renderGalleryContainer(currentGallery, numberGallery);
            fillSmallImages(currentGallery, true ,false);
            createLinksGallery();
            eventListen();

        });


        $('.thumbs').delegate('img', 'click', function() {
            $('.largeImage').attr('src', $(this).attr('src').replace('/thumbs', '/big'));
            $('.thumbs img').css({
                "border": "none"
            });
            $(this).css({
                "border": "2px solid yellow"
            });
        });

        currentGallery.click(function(event) {
            if ($(event.target).closest(".gallery .container, #nextGallery , #previousGallery").length) return;
            currentGallery.hide("slow");
            setTimeout(destroyGallery, 500);
            event.stopPropagation();
        });

        $('.close-gallery').click(function(event) {
            currentGallery.hide("slow");
            setTimeout(destroyGallery, 500);
        });

    }

    function destroyGallery() {
        currentGallery.remove();
    }
});
