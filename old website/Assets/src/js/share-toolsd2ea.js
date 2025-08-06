$(document).ready(function () {
  'use strict';

  var $header,
    $shareTrigger,
    $shareShow,
    $shareChild,
    /*utils,*/

    //functions
    toggleMenu,



    //state variables
    isExpanded



  setup();

  function setup() {
    $header = $('.share-tools-container');
    $shareTrigger = $header.find('.share-tool-button');
    $shareChild = $header.find('.sharecontainer');
    $shareShow = $header.find('.share-tools_wrapper');

    isExpanded = true;

    /*utils = require('../utils');*/

    addEventListeners();
  }

  function addEventListeners() {
    $shareTrigger.on('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      $shareChild.addClass("clicked");
      toggleMenu(false);
    });
    $('.nav-share').on('click', function (ev) {
      $('.sharethis-sticky-share-buttons').toggle();
    });
    window.onscroll = function () {
      toggleMenu(true)
    }
  }

  function toggleMenu(isScrolling) {
    if (!isExpanded && !isScrolling) {
      $shareShow.slideDown();
      $shareShow.show();
      isExpanded = true;
      $shareTrigger.addClass("clicked");
      $shareShow.addClass("expanded");
      return;
    }
    else if (isExpanded) {
      $shareShow.slideUp();
      $shareShow.hide();
      isExpanded = false;
      $shareTrigger.removeClass("clicked");
      $shareShow.removeClass("expanded");
      $shareChild.removeClass("clicked");
      return;
    }
  }
}());
