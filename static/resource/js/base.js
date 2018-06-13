$(".zl_drop_down").click(function (e) {
    e.stopPropagation();
    $(".zl_contact_dialog").show();
});

$("body").click(function (e) {
    let elem = e.target||e.srcElement;
    while (elem) {
        if (elem.className==='zl_contact_dialog') {
            return;
        }
        elem = elem.parentNode;
    }
    $(".zl_contact_dialog").hide();
});

function toLearnMore(target) {
    // to show more details
    $(".zl_main_page aside").css({
        "transform":"translateX(130%)"
        /* should hide the aside img..? */
    });
    $(".zl_main_page main >p").css({
        "display":"none"
    });

    $(".zl_main_page main").css({
        "width":"50%",
        "margin":"20px auto",
        "padding":"18px"
    });
    $(".zl_detail").fadeIn();
    $(target).fadeOut();
}
function hideLearnMore() {
    // to hide more details
    $(".zl_main_page aside").css({
        "transform":"translateX(0)"
    });
    $(".zl_main_page main >p").css({
        "display":"block"
    });

    $(".zl_main_page main").css({
        "width":"30%",
        "margin":"100px 0 0 250px",
        "padding":"0"
    });
    $(".zl_detail").fadeOut();
    $(".zl_learn_more").fadeIn();
}

function onSubmit() {
    //get values
    //reset input after be submitted
}

/* about search function */
