///Base app control

$(function () {
    $(document).on("click", "#sel-plat li", function () {
        $(".platforms").addClass("hidden");
        $(".services").addClass("hidden");
        $("#" + $(this).attr("data-value")).removeClass("hidden");
    });
});

$(function () {
    $(document).on("click", "#aws-service li", function () {
        $(".services").addClass("hidden");
        $("#" + $(this).attr("data-value")).removeClass("hidden");
    });
});


//select control
//courtesy to the super coder I can't recall
! function (e) {
    "use strict";

    function t(e) {
        return new RegExp("(^|\\s+)" + e + "(\\s+|$)")
    }

    function s(e, t) {
        var s = l(e, t) ? i : n;
        s(e, t)
    }
    var l, n, i;
    "classList" in document.documentElement ? (l = function (e, t) {
        return e.classList.contains(t)
    }, n = function (e, t) {
        e.classList.add(t)
    }, i = function (e, t) {
        e.classList.remove(t)
    }) : (l = function (e, s) {
        return t(s).test(e.className)
    }, n = function (e, t) {
        l(e, t) || (e.className = e.className + " " + t)
    }, i = function (e, s) {
        e.className = e.className.replace(t(s), " ")
    });
    var c = {
        hasClass: l,
        addClass: n,
        removeClass: i,
        toggleClass: s,
        has: l,
        add: n,
        remove: i,
        toggle: s
    };
    "function" == typeof define && define.amd ? define(c) : e.classie = c
}(window),
    function (e) {
        "use strict";

        function t(e, t) {
            if (!e) return !1;
            for (var s = e.target || e.srcElement || e || !1; s && s != t;) s = s.parentNode || !1;
            return s !== !1
        }

        function s(e, t) {
            for (var s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
            return e
        }

        function l(e, t) {
            this.el = e, this.options = s({}, this.options), s(this.options, t), this._init()
        }
        l.prototype.options = {
            newTab: !0,
            stickyPlaceholder: !0,
            onChange: function () {
                //console.log(this);
                return !1
            }
        }, l.prototype._init = function () {
            var e = this.el.querySelector("option[selected]");
            this.hasDefaultPlaceholder = e && e.disabled, this.selectedOpt = e || this.el.querySelector("option"), this._createSelectEl(), this.selOpts = [].slice.call(this.selEl.querySelectorAll("li[data-option]")), this.selOptsCount = this.selOpts.length, this.current = this.selOpts.indexOf(this.selEl.querySelector("li.cs-selected")) || -1, this.selPlaceholder = this.selEl.querySelector("span.cs-placeholder"), this._initEvents()
        }, l.prototype._createSelectEl = function () {
            var e = "",
                t = function (e) {
                    var t = "",
                        s = "",
                        l = "";
                    return !e.selectedOpt || this.foundSelected || this.hasDefaultPlaceholder || (s += "cs-selected ", this.foundSelected = !0), e.getAttribute("data-class") && (s += e.getAttribute("data-class")), e.getAttribute("data-link") && (l = "data-link=" + e.getAttribute("data-link")), "" !== s && (t = 'class="' + s + '" '), "<li " + t + l + ' data-option data-value="' + e.value + '"><span>' + e.textContent + "</span></li>"
                };
            [].slice.call(this.el.children).forEach(function (s) {
                if (!s.disabled) {
                    var l = s.tagName.toLowerCase();
                    "option" === l ? e += t(s) : "optgroup" === l && (e += '<li class="cs-optgroup"><span>' + s.label + "</span><ul>", [].slice.call(s.children).forEach(function (s) {
                        e += t(s)
                    }), e += "</ul></li>")
                }
            });
            var s = '<div class="cs-options"><ul>' + e + "</ul></div>";
            this.selEl = document.createElement("div"), this.selEl.className = this.el.className, this.selEl.tabIndex = this.el.tabIndex, this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + "</span>" + s, this.el.parentNode.appendChild(this.selEl), this.selEl.appendChild(this.el)
        }, l.prototype._initEvents = function () {
            var e = this;
            this.selPlaceholder.addEventListener("click", function () {
                e._toggleSelect()
            }), this.selOpts.forEach(function (t, s) {
                t.addEventListener("click", function () {
                    e.current = s, e._changeOption(), e._toggleSelect()
                })
            }), document.addEventListener("click", function (s) {
                var l = s.target;
                e._isOpen() && l !== e.selEl && !t(l, e.selEl) && e._toggleSelect()
            }), this.selEl.addEventListener("keydown", function (t) {
                var s = t.keyCode || t.which;
                switch (s) {
                    case 38:
                        t.preventDefault(), e._navigateOpts("prev");
                        break;
                    case 40:
                        t.preventDefault(), e._navigateOpts("next");
                        break;
                    case 32:
                        t.preventDefault(), e._isOpen() && "undefined" != typeof e.preSelCurrent && -1 !== e.preSelCurrent && e._changeOption(), e._toggleSelect();
                        break;
                    case 13:
                        t.preventDefault(), e._isOpen() && "undefined" != typeof e.preSelCurrent && -1 !== e.preSelCurrent && (e._changeOption(), e._toggleSelect());
                        break;
                    case 27:
                        t.preventDefault(), e._isOpen() && e._toggleSelect()
                }
            })
        }, l.prototype._navigateOpts = function (e) {
            this._isOpen() || this._toggleSelect();
            var t = "undefined" != typeof this.preSelCurrent && -1 !== this.preSelCurrent ? this.preSelCurrent : this.current;
            ("prev" === e && t > 0 || "next" === e && t < this.selOptsCount - 1) && (this.preSelCurrent = "next" === e ? t + 1 : t - 1, this._removeFocus(), classie.add(this.selOpts[this.preSelCurrent], "cs-focus"))
        }, l.prototype._toggleSelect = function () {
            this._removeFocus(), this._isOpen() ? (-1 !== this.current && (this.selPlaceholder.textContent = this.selOpts[this.current].textContent), classie.remove(this.selEl, "cs-active")) : (this.hasDefaultPlaceholder && this.options.stickyPlaceholder && (this.selPlaceholder.textContent = this.selectedOpt.textContent), classie.add(this.selEl, "cs-active"))
        }, l.prototype._changeOption = function () {
            "undefined" != typeof this.preSelCurrent && -1 !== this.preSelCurrent && (this.current = this.preSelCurrent, this.preSelCurrent = -1);
            var t = this.selOpts[this.current];
            this.selPlaceholder.textContent = t.textContent, this.el.value = t.getAttribute("data-value");
            var s = this.selEl.querySelector("li.cs-selected");
            s && classie.remove(s, "cs-selected"), classie.add(t, "cs-selected"), t.getAttribute("data-link") && (this.options.newTab ? e.open(t.getAttribute("data-link"), "_blank") : e.location = t.getAttribute("data-link")), this.options.onChange(this.el.value)
        }, l.prototype._isOpen = function () {
            return classie.has(this.selEl, "cs-active")
        }, l.prototype._removeFocus = function () {
            var e = this.selEl.querySelector("li.cs-focus");
            e && classie.remove(e, "cs-focus")
        }, e.SelectFx = l
    }(window),
    function () {
        [].slice.call(document.querySelectorAll("select.cs-select")).forEach(function (e) {
            new SelectFx(e)
        })
    }();


//radio button

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        //FastClick.attach(document.body);
    }, false);
}


///input textbox

$(document).ready(function () {
    $('.nice-textbox').blur(function () {
        if ($(this).val().length === 0) {
            $('.nice-label').removeClass("focus");
        }
        else { return; }
    })
        .focus(function () {
            $('.nice-label').addClass("focus")
        });
});

///Button

function hover() {
    $(".button").on("mouseenter", function () {
        return $(this).addClass("hover");
    });
}

function hoverOff() {
    $(".button").on("mouseleave", function () {
        return $(this).removeClass("hover");
    });
}

function active() {
    $(".button").on("click", function () {
        return $(this).addClass("active");
    });
}

hover();
hoverOff();
active();

//popup

function popupOpenClose(popup) {

    /* Add div inside popup for layout if one doesn't exist */
    if ($(".wrapper").length == 0) {
        $(popup).wrapInner("<div class='wrapper' style='overflow: auto;'></div>");
    }

    /* Open popup */
    $(popup).show();

    /* Close popup if user clicks on background */
    $(popup).click(function (e) {
        if (e.target == this) {
            if ($(popup).is(':visible')) {
                $(popup).hide();
            }
        }
    });

    /* Close popup and remove errors if user clicks on cancel or close buttons */
    $(popup).find("button[name=close]").on("click", function () {
        if ($(".formElementError").is(':visible')) {
            $(".formElementError").remove();
        }
        $(popup).hide();
    });
}

///copy

$(function () {
    $("#copy-script").on("click", function () {
        util.copyscript($("#pop-content")[0]);
    });

    $("#btnBudget").on("click", function () {
        lamdda.loadbudget();
        popupOpenClose($(".popup.budget"));
    });

    $("#downlaod-script").on("click", function () {
        util.downloadstring("terraform.tf", $("#pop-content").html());
    });

    $("#chkAccess").on("click", function () {
        alert('In Progress.. coming soon...');
    });
});