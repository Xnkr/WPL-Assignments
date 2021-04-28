$(document).ready(function () {
    let year = "";
    let gender = "";
    $("#submit").click(function () {
        year = $("#year").val();
        gender = $("#gender").val();
        console.log(year, gender)
        $.ajax({
            type: "POST",
            url: "babynames.php",
            cache: "false",
            dataType: "html",
            data: {
                year: year,
                gender: gender
            },
            success: function (result) {
                $("#results").html(result);
            },
            error: function (error) {
                alert("Error")
            }
        })
    })
})