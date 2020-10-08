$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: './js/data.json',
        dataType: 'json',
        success: function (images) {
            $.each(images, function (index, object) {
                var li = `<li><img src="images/square/${object.path}" data-path="${object.path}" alt= "${object.title}"
                data-taken = "${object.taken}" data-city = "${object.city}" data-country = "${object.country}"/></li>`;
                $('.gallery').append(li);
            });
        }
    });

    $(document).on("mouseenter", ".gallery img", function (object) {
        var path = $(this).data("path");
        var title = $(this).attr("alt");
        var taken = $(this).data("taken");
        var city = $(this).data("city");
        var country = $(this).data("country");
        $(this).addClass("gray");
        $("body").append('<div id="preview"> </div>');
        $("#preview").append(`<li><img src="images/medium/${path}" data-img="${path}" /></li>`);
        $("#preview").css("display", "block");
        $("#preview").append(`<p> ${title} <br>  ${city}, ${country} [${taken}] </p>`);
        $("#preview").css("top", object.pageY);
        $("#preview").css("left", object.pageX);
    });

    $(document).on("mouseleave", ".gallery img", function () {
        $(this).removeClass("gray");
        $("#preview").html("");
    });
    $(document).on("mousemove", ".gallery img", function (obj) {
        $("#preview").css("left", obj.pageX + 10);
        $("#preview").css("top", obj.pageY + 10);
    });
});