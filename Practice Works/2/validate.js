window.onload = function () {

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input element 
    // they are initially hidden

    var span1 = document.createElement("span");
    span1.style.display = "none"; //hide the span element

    var span2 = document.createElement("span");
    span2.style.display = "none";

    var span3 = document.createElement("span");
    span3.style.display = "none";

    var username = document.getElementById("username");
    username.parentNode.appendChild(span1);
    var pwd = document.getElementById("password");
    pwd.parentNode.appendChild(span2);
    var email = document.getElementById("email");
    email.parentNode.appendChild(span3);



    function info(span) {
        span.innerHTML = "infoMessage";
        span.className = "info";
        span.style.display = "inline-block";
    }

    function validate(field, span, pattern) {
        span.style.display = "inline-block";
        if (field.value.length == 0) {
            span.style.display = "none";
            return;
        }
        span.className = field.value.match(pattern) ? "ok" : "error";
        span.innerHTML = field.value.match(pattern) ? "OK" : "Error";
    }

    username.onfocus = () => {
        info(span1);
    }
    pwd.onfocus = () => {
        info(span2)
    };
    email.onfocus = () => {
        info(span3)
    };

    username.onblur = () => {
        validate(username, span1, /^[A-Za-z0-9]+$/)
    };
    pwd.onblur = () => {
        validate(pwd, span2, /^\d{6,}$/)
    };
    email.onblur = () => {
        validate(email, span3, /^\w+@\w+\.\w+$/)
    };
}