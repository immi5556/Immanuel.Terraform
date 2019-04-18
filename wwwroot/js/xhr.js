var xhr = (function () {

    var ajax = function (data) {
        $.ajax({
            method: "POST",
            url: "api/aws/lambda",
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .done(function (msg) {
            //alert("Data Saved: " + msg);
            $("#pop-content").text(msg);
            popupOpenClose($(".popup.genrate-script"));
        });
    }

    return {
        ajax: ajax
    }
})()