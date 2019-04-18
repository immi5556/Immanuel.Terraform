var util = (function () {

    var copyScript = function (el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        //var copyText = document.getElementById("pop-content");
        //copyText.select();
        document.execCommand("copy");
    }

    var downloadstring = function (filename, text) {
        // Set up the link
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        if (Blob !== undefined) {
            var blob = new Blob([text], { type: "text/plain" });
            link.setAttribute("href", URL.createObjectURL(blob));
        } else {
            link.setAttribute("href", "data:text/plain," + encodeURIComponent(text));
        }
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return {
        copyscript: copyScript,
        downloadstring: downloadstring
    }
})();