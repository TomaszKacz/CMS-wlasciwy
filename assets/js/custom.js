(function ($) {
  "use strict";

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  $(".filters ul li").click(function () {
    $(".filters ul li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: true,
    masonry: {
      columnWidth: ".all",
    },
  });

  const Accordion = {
    settings: {
      first_expanded: false,
      toggle: false,
    },

    openAccordion: function (toggle, content) {
      if (content.children.length) {
        toggle.classList.add("is-open");
        let final_height = Math.floor(content.children[0].offsetHeight);
        content.style.height = final_height + "px";
      }
    },

    closeAccordion: function (toggle, content) {
      toggle.classList.remove("is-open");
      content.style.height = 0;
    },

    init: function (el) {
      const _this = this;

      let is_first_expanded = _this.settings.first_expanded;
      if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
      let is_toggle = _this.settings.toggle;
      if (el.classList.contains("is-toggle")) is_toggle = true;

      const sections = el.getElementsByClassName("accordion");
      const all_toggles = el.getElementsByClassName("accordion-head");
      const all_contents = el.getElementsByClassName("accordion-body");
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const toggle = all_toggles[i];
        const content = all_contents[i];

        toggle.addEventListener("click", function (e) {
          if (!is_toggle) {
            for (let a = 0; a < all_contents.length; a++) {
              _this.closeAccordion(all_toggles[a], all_contents[a]);
            }
            _this.openAccordion(toggle, content);
          } else {
            if (toggle.classList.contains("is-open")) {
              _this.closeAccordion(toggle, content);
            } else {
              _this.openAccordion(toggle, content);
            }
          }
        });

        if (i === 0 && is_first_expanded) {
          _this.openAccordion(toggle, content);
        }
      }
    },
  };

  (function () {
    const accordions = document.getElementsByClassName("accordions");
    for (let i = 0; i < accordions.length; i++) {
      Accordion.init(accordions[i]);
    }
  })();

  (function init() {
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }

    function initializeClock(endtime) {
      var timeinterval = setInterval(function () {
        var t = getTimeRemaining(endtime);

        // Ensure these elements exist before accessing them
        var daysElement = document.querySelector(".days > .value");
        var hoursElement = document.querySelector(".hours > .value");
        var minutesElement = document.querySelector(".minutes > .value");
        var secondsElement = document.querySelector(".seconds > .value");

        if (daysElement) daysElement.innerText = t.days;
        if (hoursElement) hoursElement.innerText = t.hours;
        if (minutesElement) minutesElement.innerText = t.minutes;
        if (secondsElement) secondsElement.innerText = t.seconds;

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }, 1000);
    }
    initializeClock(new Date().getFullYear() + 1 + "/1/1");
  })();

  var context;
  var $window = $(window);

  // run this right away to set context
  if ($window.width() <= 768) {
    context = "small";
  } else if (768 < $window.width() < 970) {
    context = "medium";
  } else {
    context = "large";
  }

  $(window).resize(function () {
    if ($window.width() <= 768 && context != "small") {
      location.reload();
    } else if (768 < $window.width() < 970 && context != "medium") {
      location.reload();
    } else if (context != "large") {
      location.reload();
    }
  });

  $("#modal_trigger").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close",
  });

  $(function () {
    $("#login_form").click(function () {
      $(".social_login").hide();
      $(".user_login").show();
      return false;
    });

    $("#register_form").click(function () {
      $(".social_login").hide();
      $(".user_register").show();
      $(".header_title").text("Register");
      return false;
    });

    $(".back_btn").click(function () {
      $(".user_login").hide();
      $(".user_register").hide();
      $(".social_login").show();
      $(".header_title").text("Login");
      return false;
    });
  });

  $(document).on("click", ".naccs .menu div", function () {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
      $(".naccs .menu div").removeClass("active");
      $(".naccs ul li").removeClass("active");

      $(this).addClass("active");
      $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .addClass("active");

      var listItemHeight = $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .innerHeight();
      $(".naccs ul").height(listItemHeight + "px");
    }
  });

  $(".owl-testimonials").owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    nav: false,
    autoplay: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  });

  $(".owl-features").owlCarousel({
    items: 3,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      800: { items: 2 },
      1000: { items: 3 },
    },
  });

  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));

      if (refElement.length) {
        // Sprawdzamy, czy element istnieje
        if (
          refElement.position().top <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $(".nav ul li a").removeClass("active");
          currLink.addClass("active");
        } else {
          currLink.removeClass("active");
        }
      }
    });
  }

  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  const dropdownOpener = $(".main-nav ul.nav .has-sub > a");

  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      var $this = $(this);
      $this.on("click", function (event) {
        event.preventDefault();
        if (!$this.hasClass("active")) {
          dropdownOpener.removeClass("active");
          $this.addClass("active");
        } else {
          $this.removeClass("active");
        }
        return false;
      });
    });
  }
})(jQuery);
