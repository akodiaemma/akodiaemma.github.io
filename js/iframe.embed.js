$(document).ready(function () {
    if (!window.document.location.hash) {
        console.log("reloading");
        window.location = window.location + "#reloaded";
        window.location.reload(true);
    }

    $("iframe").outerWidth($(window).innerWidth());
    $("iframe").outerHeight($(window).innerHeight());
});