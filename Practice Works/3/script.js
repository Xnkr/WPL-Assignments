
$(document).ready(function () {

    $(".trash").hide();
    $("#input-box").hide();

    $("#add").click(function () {
        $("#input-box").val('');
        $("#input-box").show();

    });

    $(document.body).delegate("input:text", "keypress", function (e) {
        if (e.which === 13) {
            e.preventDefault();
            var item = $("#input-box").val();
            var listItem = "<li class='list-group-item'><i class='fa fa-trash trash'></i>" + item + "</li>";
            $(".list-group").append(listItem);
            $(".trash").hide();
        }
    });

    $("#input-box").on("focus", function () {
        $(this).css('border', '5px solid blue');
    });

    $("#input-box").on("blur", function () {
        $("#input-box").hide();
    });

    $(".list-group").on("click", "li", function () {
        $(this).toggleClass("strike");
    })

    $(".list-group").on("mouseover", "li", function (e) {
        $(e.currentTarget.firstElementChild).fadeIn();
    });

    $(".list-group").on("mouseleave", "li", function (e) {
        $(e.currentTarget.firstElementChild).fadeOut();
    });

    $(".list-group").on("click", ".trash", function (e) {
        e.currentTarget.parentNode.remove();
    });


});


