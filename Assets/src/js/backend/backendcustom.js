$(document).ready(function () {
  if ($("#related_insights .d-none").length == 0) {
    $("#related_insights_link").hide();
  }
  var count = 0;
  $("#related_insights_link").click(function () {
    if ($("#related_insights .d-none").length > 0) {
      if (count == 0) {
        $("#related_insights").addClass("tablet-view");
        count++;
      }
      $("#related_insights .d-none").slice(0, 3).removeClass("d-none");
      if ($("#related_insights .d-none").length == 0) {
        $("#related_insights_link").hide();

      }
    }
    else {
      $("#related_insights_link").hide();
    }
  });

  if ($("#related_insights .d-none").length == 0) {
    $("#related_insights_button").hide();
  }
  var count = 0;
  $("#related_insights_button").click(function () {
    if ($("#related_insights .d-none").length > 0) {
      if (count == 0) {
        $("#related_insights").addClass("tablet-view");
        count++;
      }
      $("#related_insights .d-none").slice(0, 3).removeClass("d-none");
      if ($("#related_insights .d-none").length == 0) {
        $("#related_insights_button").hide();

      }
    }
    else {
      $("#related_insights_button").hide();
    }
  });

  if ($("#related_experts .d-none").length == 0) {
    $("#related_experts_button").hide();
  }
  $("#related_experts_button").click(function () {

    if ($("#related_experts .d-none").length > 0) {
      $("#related_experts .d-none").slice(0, 3).removeClass("d-none");
      if ($("#related_experts .d-none").length == 0) {
        $("#related_experts_button").hide();

      }
    }
    else {
      $("#related_experts_button").hide();
    }

  });

  $("#content_selector_button").click(function () {
    area = $('#areaList').find('.active').attr('value');
    industry = $('#industryList').find('.active').attr('value');
    if (area != null && area != "" && industry != null && industry != "") {
      pageRedirect = window.location.origin + industry + area;
      window.location = pageRedirect;
    }
  });

  $("#selectbox-1,#selectbox-2").on('click', function () {
    if ($('.btn-main').css('display') == 'none') {
      area = $('#areaList').find('.active').attr('value');
      industry = $('#industryList').find('.active').attr('value');
      if (area != null && area != "" && industry != null && industry != "") {
        pageRedirect = window.location.origin + industry + area;
        window.location = pageRedirect;
      }
    }
  });


  //CTA-Full-image

  $(window).bind("load resize", function () {
    if (($('#cta-full-desktop').length > 0 && $('#cta-full-desktop').css('display') != 'none') || ($('#cta-full-tablet').length > 0 && $('#cta-full-tablet').css('display') != 'none') || ($('#cta-full-mobile').length > 0 && $('#cta-full-mobile').css('display') != 'none')) {
      $('.cta-full').removeClass('d-none');
    }
    else {
      $('.cta-full').addClass('d-none');
    }
  });

  //Hero-Large
  if ($(".large-banner-bg iframe").length < 1 && $(".large-banner-bg video").length < 1) {
    $(".large-banner-img").css("display", "block");
  }

  //Hero-Small
  if ($(".hero-wrapper-small iframe").length < 1 && $(".hero-wrapper-small video").length < 1) {
    $(".small-banner-img").css("display", "block");
  }


  //Insights Landing Load more event

  if (window.location.pathname.toLowerCase().split('/')[1] != 'insights' && window.location.pathname.toLowerCase().split('/')[1] != 'case-studies') {
    localStorage.setItem('clickCount', 0);
  }

  var hashCount = parseInt(localStorage.getItem('clickCount'));

  $("#insights_list_button").click(function () {
    var lastIndex = parseInt($("#hidden").val());
    if (parseInt(localStorage.getItem('clickCount')) > 0) {
      $("#hidden").val(parseInt(lastIndex + 8));
    }
    LoadmoreInsights(0);
  });

  if (parseInt(localStorage.getItem('clickCount')) >= 1 && window.location.pathname.toLowerCase() == "/insights") {
    $("#hidden").val($('#hidden').attr('data-content'));
    LoadmoreInsights(parseInt(localStorage.getItem('clickCount')));
  }

  function LoadmoreInsights(hasCount) {
    var lastIndex = parseInt($("#hidden").val());
    $.ajax({
      type: "GET",
      url: "/api/sitecore/PageContent/InsightsListingLoadMore",
      contentType: "application/html; charset=utf-8",
      data: { lastIndex: lastIndex, fetchInsight: hasCount > 0 ? hasCount * 8 : 0 },
      dataType: "html",
      success: function (result) {
        $('#insights_list').append(result);
        if (hasCount <= 0) {
          if (parseInt(localStorage.getItem('clickCount')) >= 1) {
            localStorage.setItem('clickCount', parseInt(localStorage.getItem('clickCount')) + 1);
          }
          else {
            localStorage.setItem('clickCount', 1);
          }
        }
        if (hasCount > 0) {
          $("#hidden").val(parseInt(lastIndex + (parseInt(localStorage.getItem('clickCount')) * 8) - 8));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  //News and Events Landing Load more event

  if (window.location.pathname.toLowerCase().split('/')[1] != 'news' && window.location.pathname.toLowerCase().split('/')[1] != 'events' && window.location.pathname.toLowerCase().split('/')[1] != 'news-and-events') {
    localStorage.setItem('NewsEventsclickCount', 0);
  }

  var hashCountNews = parseInt(localStorage.getItem('clickCount'));

  $("#newsEvents_list_button").click(function () {
    var lastIndex = parseInt($("#hiddenNews").val());
    if (parseInt(localStorage.getItem('NewsEventsclickCount')) > 0) {
      $("#hiddenNews").val(parseInt(lastIndex + 8));
    }
    LoadmoreNewsEvents(0);
  });

  if (parseInt(localStorage.getItem('NewsEventsclickCount')) >= 1 && window.location.pathname.toLowerCase() == "/news-and-events") {
    $("#hiddenNews").val($('#hiddenNews').attr('data-content'));
    LoadmoreNewsEvents(parseInt(localStorage.getItem('NewsEventsclickCount')));
  }

  function LoadmoreNewsEvents(hasCount) {
    var lastIndex = parseInt($("#hiddenNews").val());
    $.ajax({
      type: "GET",
      url: "/api/sitecore/PageContent/NewsAndEventsListingLoadMore",
      contentType: "application/html; charset=utf-8",
      data: { lastIndex: lastIndex, fetchNews: hasCount > 0 ? hasCount * 8 : 0 },
      dataType: "html",
      success: function (result) {
        $('#newsEvents_list').append(result);
        if (hasCount <= 0) {
          if (parseInt(localStorage.getItem('NewsEventsclickCount')) >= 1) {
            localStorage.setItem('NewsEventsclickCount', parseInt(localStorage.getItem('NewsEventsclickCount')) + 1);
          }
          else {
            localStorage.setItem('NewsEventsclickCount', 1);
          }
        }
        if (hasCount > 0) {
          $("#hiddenNews").val(parseInt(lastIndex + (parseInt(localStorage.getItem('NewsEventsclickCount')) * 8) - 8));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  $('.description-large h4').addClass('xs');


  //Jump To section
  if ($(".jump-to-navigation-left").length > 0) {
    $(".jump-to-navigation-left .secondary_header_item").each(function () {
      $(this).addClass("jump_to_section");
    })
  }
  $('.jump-to-navigation-left .jump_to_section').each(function (i) {

    if ($(this).attr('id') != '') {
      $(this).addClass('jump');
    }
  })


  //Cta-Full-Detail
  if ($(".cta-full").length > 0) {
    $(".insight-left .cta-full").removeClass("cta-full-section");
    $(".insight-left .cta-full").addClass("cta-full-detail");
  }


  //Insight Filter On Page Load Action
  var Path = "";
  var flag = 0;
  var mobileFlag = 0;
  var page = 0;
  if (window.innerWidth <= 898) {
    $('.data-apply-clr-btns').css('display', 'none');
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('industry') != null || urlParams.get('service') != null || urlParams.get('type') != null || urlParams.get('search') != null) {
    Path = "/api/sitecore/PageContent/InsightFacetedFilteringParamResult";
    flag = 0;
    if (urlParams.get('page') != null) {
      page = parseInt(urlParams.get('page'));
    }

    FilterResult();
    FilterFacetParam();

  }


  //More insight filter option
  $(document).on('click', '.more', function (e) {
    const list = document.getElementById(e.currentTarget.parentNode.id);
    list.classList.toggle('full');
  })

  //Insight Filter checkbox change event
  $(document).on('change', '.indus', function (e) {
    var unselected = "";
    mobileFlag = 1;
    if (e.target.checked != true) {
      unselected = e.target.id;
    }
    FilterFacetParam(unselected);
  });

  function FilterFacetParam(unselected) {
    var ItemId = [];
    var TypeItemId = [];
    var activEleName = $('.active').attr('id');

    $('input[name="Industry"]:checked').each(function () {
      ItemId.push(this.id);
    });
    $('input[name="subService"]:checked').each(function () {
      if (unselected != "" && unselected == this.id) {

      }
      else {
        ItemId.push(this.id);
      }
    });
    $('input[name="Type"]:checked').each(function () {
      TypeItemId.push(this.id);
    });

    $.ajax({
      type: "GET",
      url: "/api/sitecore/PageContent/InsightFacetedFilteringParam",
      contentType: "application/html; charset=utf-8",
      data: { ItemId: ItemId.join('|'), TypeItemId: TypeItemId.join('|') },
      dataType: "html",
      beforeSend: function () {
        $('#loader').removeClass('hidden')
      },
      success: function (result) {
        $('.news-dropdown').replaceWith(result);
        if (window.innerWidth <= 898) {
          if (mobileFlag != 0) {
            $(".news-dropdown").css('display', 'block');
          }
          mobileFlag++;
          if ((ItemId.length + TypeItemId.length) > 0) {
            $('.data-apply-clr-btns').css('display', 'flex');
          }
          else {
            $('.data-apply-clr-btns').css('display', 'none');
          }
        }
        $(".clear-btn").each(function () {
          $(this).text($(this).text().replace($(this).text(), "Clear (" + (ItemId.length + TypeItemId.length) + ")"))
        });
      },
      complete: function () {
        $('#loader').addClass('hidden')
        $('#' + activEleName).addClass('active');
        $(`.${activEleName}`).css('display', 'block');
      },
      error: function (error) {
        console.log(error);
      }
    });
  }




  //Insight Filter Apply button click event
  $(document).on('click', '#filterFacted', function () {
    var paramId = [];
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    window.history.replaceState({}, document.title, clean_uri);

    const url = new URL(location);

    if (window.innerWidth <= 898) {
      $('.filter-cross-icon').removeClass('activee');
      $('.news-dropdown').css('display', 'none');
      $('footer').removeClass('d-none');
      $('news-faceted').removeClass('news-active');
    }

    if ($('input[name="Industry"]:checked').length > 0) {
      $('input[name="Industry"]:checked').each(function () {
        paramId.push($("#" + this.id).attr('data-content'));
      });
      url.searchParams.set("industry", paramId.join('|'));
      history.pushState({}, "", decodeURIComponent(url));
      paramId = [];
    }

    if ($('input[name="subService"]:checked').length > 0) {
      $('input[name="subService"]:checked').each(function () {
        if (paramId.includes($("#" + this.id).attr('data-content')) == false) {
          paramId.push($("#" + this.id).attr('data-content'));
        }
      });
      url.searchParams.set("service", paramId.join('|'));
      history.pushState({}, "", decodeURIComponent(url));
      paramId = [];
    }

    if ($('input[name="Type"]:checked').length > 0) {
      $('input[name="Type"]:checked').each(function () {
        paramId.push($("#" + this.id).attr('data-content'));
      });
      url.searchParams.set("type", paramId.join('|'));
      history.pushState({}, "", decodeURIComponent(url));
      paramId = [];
    }

    page = 1;
    Path = "/api/sitecore/PageContent/InsightFacetedFilteringParamResult";
    flag = 0;
    FilterResult();
  });


  //Insight Filter Clear all click event

  $(document).on('click', ".clear", function () {
    history.replaceState(null, null, location.href.replace(location.search, ""));

    // Reload the page
    location.reload();
  })

  $(document).on('click', ".clear-btn", function () {
    history.replaceState(null, null, location.href.replace(location.search, ""));

    // Reload the page
    location.reload();
  })

  //Insight Filter Load more click event
  $(document).on('click', '#filterLoadMore', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const url = new URL(location);
    if (urlParams.get('page') != null) {
      page = parseInt(urlParams.get('page'));
    }
    Path = "/api/sitecore/PageContent/InsightFacetedFilteringParamResultLoadMore";
    flag = 1;
    FilterResult();
  });

  $(document).on('click', '.filter-selected-btn img', function (e) {
    if ($('.filter-selected-btn img').length <= 1) {
      history.replaceState(null, null, location.href.replace(location.search, ""));
      // Reload the page
      location.reload();
    }
    var filterID = $("#" + e.target.id.replace("{", "").replace("}", "").toLowerCase()).attr("data-content");
    $("[data-content=" + filterID + "]").removeAttr("checked");
    FilterFacetParam();
    $("#filterFacted").click();
    if (window.innerWidth <= 898) {
      $('.news-dropdown').css('display', 'none');
    }
    mobileFlag = 0;
  });

  function FilterResult(clear) {

    var search = [];
    var SelectId = [];
    var searchtxt = "";

    var activEleName = $('.active').attr('id');
    const urlParams = new URLSearchParams(window.location.search);
    const url = new URL(location);

    if (urlParams.get('industry') != null) {
      urlParams.get('industry').split('|').forEach(function (e) {
        $('[data-content=' + e + ']').attr('checked', 'checked');
        search.push(e);
      });
    }
    if (urlParams.get('service') != null) {
      urlParams.get('service').split('|').forEach(function (e) {
        $('[data-content=' + e + ']').attr('checked', 'checked');
        search.push(e);
      });
    }
    if (urlParams.get('type') != null) {
      urlParams.get('type').split('|').forEach(function (e) {
        $('[data-content=' + e + ']').attr('checked', 'checked');
        search.push(e);
      });
    }


    var i = 0;
    search.forEach(function () {
      SelectId.push($('[data-content=' + search[i] + ']').attr('id'))
      i++;
    });
    if (SelectId.length < 1) {
      history.replaceState(null, null, location.href.replace(location.search, ""));

      // Reload the page
      location.reload();
    }

    if (clear == 1) {
      SelectId = [];
    }

    $.ajax({
      type: "GET",
      url: Path,
      contentType: "application/html; charset=utf-8",
      data: { SelectId: SelectId.join('|'), Page: page },
      dataType: "html",
      beforeSend: function () {
        $('#loader').removeClass('hidden');
      },
      success: function (result) {
        $(".clear-btn").each(function () {
          $(this).text($(this).text().replace($(this).text(), "Clear (" + SelectId.length + ")"))
        });
        if (flag == 0) {
          $('#filter-label').remove();
          if ($(".filter-section-data").length > 0) {
            $(".filter-section-data").replaceWith(result);
          }
          else {
            $(result).insertAfter(".news-faceted");
          }
          if (result != "" && page != 0) {
            if (urlParams.get('page') == null) {
              url.searchParams.set("page", 1);
              history.pushState({}, "", decodeURIComponent(url));
            }
          }
          if ($("#filterCount").length > 0) {
            $('#filterLoadMore').addClass('d-none');
          }
        }
        else {
          $('#filterSection').append(result);
          if (result == "") {
            $('#filterLoadMore').addClass('d-none');
          }
          else {
            if (urlParams.get('page') != null) {
              url.searchParams.set("page", page + 1);
              history.pushState({}, "", decodeURIComponent(url));
              if ($("#filterCount").length > 0) {
                $('#filterLoadMore').addClass('d-none');
              }
            }
            else {
              url.searchParams.set("page", 1);
              history.pushState({}, "", decodeURIComponent(url));
            }
          }
        }
      },
      complete: function () {
        if (window.innerWidth <= 898) {
          $('.news-faceted').removeClass('news-active');
          $('.news-dropdown').css('display', 'none');
        }
        $("#resultCount").text($("#resultCount").text().replace("{a}", $("#totalResultCount").attr('data-content')));
        $('#loader').addClass('hidden')
        $('#' + activEleName).removeClass('active');
        $(`.${activEleName}`).css('display', 'none');
        $("section").addClass("d-none");
        $("#filter-label, .hero-wrapper-insight, .news-faceted, .filter-section-data, .newslatter-wrapper").removeClass("d-none");
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

});



