$(document).ready(function () {
    // *************************************************************************
    // smooth scroll to footer

      $('a[href=#footer]').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                    && location.hostname === this.hostname) {

            //mobile menue toggle
            $('#mobile-menu').slideUp();
            $('#overlay').fadeOut();

                  var $target = $(this.hash);
                  $target = $target.length && $target
                          || $('[name=' + this.hash.slice(1) + ']');
                  if ($target.length) {
                        var targetOffset = $target.offset().top;
                var docHeight = $(document).height();
                var windowHeight = $(window).height();
                if (docHeight - targetOffset < windowHeight) {
                    targetOffset = docHeight - windowHeight;
                }
                        $('html,body')
                                .animate({scrollTop: targetOffset}, 700, "linear", function () {
                            $('footer').flash('255,0,0', 1000);
                        });
                       return false;
                  }
            }
      });

    jQuery.fn.flash = function (color, duration)
    {
        var current = this.css('color');
        this.animate({color: 'rgb(' + color + ')'}, duration / 2);
        this.animate({color: current}, duration / 2);
    }

});

// *************************************************************************
// sticky footer

var $stickyFooter = $("#stickyFooter"),
        $footer = $('footer'),
        $window = $(window),
        $document = $(document);

checkSticky();

$window.on('scroll', function (e) {
    checkSticky();
});


function checkSticky(e) {
    // check if footer is out of visible range && sitckyFooter is not visble
    if ($window.scrollTop() + $window.height() > $footer.offset().top + $stickyFooter.height()) {
        if (!$stickyFooter.hasClass("hide")) {
            $stickyFooter.addClass("hide");
        }

        // check if footer is in sight
    } else if ($window.scrollTop() + $window.height() < $footer.offset().top + $stickyFooter.height()) {
        $stickyFooter.removeClass("hide");

    }
}


// *************************************************************************
// mobile navigation button

$(document).ready(function () {
    $('.background').prepend('<div id="overlay" style="display:none;" class="overlay"></div>');

    var menu = $('.menu');
    var mobileMenu = $('#mobile-menu');
    var overlay =  $('#overlay');
    var navWrapper = $('#nav-wrapper');
    // on interaction do ..
   menu.click(function () {
       mobileMenu.slideToggle();
       overlay.fadeToggle();
    });

   overlay.click(function () {
       mobileMenu.slideUp();
       overlay.fadeOut();
    });

    navWrapper.click(function () {
       mobileMenu.slideUp();
       overlay.fadeOut();
    });

    //check if scroll was down or up
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 400) { //fadein if near bottom
            menu.fadeIn();
        } else if (st > lastScrollTop) {
           mobileMenu.slideUp();
            menu.fadeOut();
           overlay.fadeOut();
        } else {
           mobileMenu.slideUp();
            menu.fadeIn();
           overlay.fadeOut();
        }

        lastScrollTop = st;
    });

});


// *************************************************************************
// check if mailto worked

$(document).ready(function () {
    var emailModal = $('#emailModal');
    var emailDisplay = $('#emailText');

    $('a[href^=mailto]').each(function () {
        var mail = $(this).attr('href');
        mail = mail.replace('mailto:', '');
        mail = mail.split('?')[0];

        $(this).click(function () {
            var t;
            $(window).blur(function () {
                // The browser apparently responded, so stop the timeout.
                clearTimeout(t);
            });
            t = setTimeout(function () {
                // The browser did not respond after 500ms, so open an alternative URL.
                $(emailDisplay).text(mail);
                $(emailModal).foundation('reveal', 'open');
            }, 500);
        });
    });
});


// *************************************************************************
// track outbound links

//$(document).ready(function(){
//    attachTrackAllOutbound();
//});
//
//function attachTrackAllOutbound (){
//   var links = $("a[href^='http']");
//   console.log(links);
//}
//
///**
//* Function that tracks a click on an outbound link in Google Analytics.
//* This function takes a valid URL string as an argument, and uses that URL string
//* as the event label. Setting the transport method to 'beacon' lets the hit be sent
//* using 'navigator.sendBeacon' in browser that support it.
//*/
//var trackOutboundLink = function(url) {
//   ga('send', 'event', 'outbound', 'click', url, {
//     'transport': 'beacon',
//     'hitCallback': function(){document.location = url;}
//   });
//}