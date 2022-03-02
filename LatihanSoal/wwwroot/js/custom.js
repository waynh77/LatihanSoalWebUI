/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */

var custom = (function (custom) {

    custom.windowOptions = {
        modal: true,
        width: 890,
        maxHeight: $(window).height() * 9 / 10,
        visible: false,
        refresh: function () { this.center(); },
        animation: {
            open: { effects: "slideIn:down fadeIn", duration: 350 },
            close: { effects: "slideIn:up fadeIn", reverse: true, duration: 200 }
        }, close: function () { $(this.element).empty() },
    };

    custom.showLoading = function () {
        const containerClass = 'body-content',
              overlayClass = 'card-overlay',
              circleClass = 'theme_tail',
              paceActivityClass = 'pace_activity';

        // Elements
        var element = document.getElementById('pageLoading');
        const parentContainer = element.closest(`.${containerClass}`),
                                overlayElement = document.createElement('div'),
                                circleElement = document.createElement('div'),
                                paceActivityElement = document.createElement('div'),
                                overlayElementIcon = document.createElement('i');

        // Append overlay with icon
        overlayElement.classList.add(overlayClass);
        overlayElement.classList.add('page-loading');
        parentContainer.appendChild(overlayElement);

        circleElement.classList.add(circleClass);
        overlayElement.appendChild(circleElement);

        paceActivityElement.classList.add(paceActivityClass);
        circleElement.appendChild(paceActivityElement);

        overlayElementIcon.classList.add('icon-spinner2', 'spinner');
        overlayElement.appendChild(overlayElementIcon);
    };

    custom.hideLoading = function () {
        const elements = document.getElementsByClassName('card-overlay');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    };

    custom.correctLetter = function (e) {
        let re = /(^|[.!?]\s+)([a-z])/g;

        let $this = $(this),
            val = $this.val().replace(re, (m, $1, $2) => $1 + $2.toUpperCase());
        $this.val(val);
    };

    custom.validatorOptions = {
        rules: {
            val_required: function (input) {

                if (input.is("[data-val-required]") && input.is("[data-val='true']")) {
                    return (input.val().toString().trim() == "" || input.val().toString().trim() == "day month year") ? false : true;
                }
                return true;
            },

            val_remote: function (input) {
                var remoteAttr = input.attr("data-val-remote-url");
                if (typeof remoteAttr === 'undefined' || remoteAttr === false) {
                    return true;
                }

                var isInvalid = true;
                var errorMessage = "Message";
                var data = {};

                data[input.attr("name")] = input.val();

                var additionalFieldsAttr = input.attr("data-val-remote-additionalfields");
                if (additionalFieldsAttr != 'undefined') {
                    var additionalFields = additionalFieldsAttr.split(",");
                    $.each(additionalFields,
                        function (index, arrayEl) {
                            data[arrayEl.substring(2)] = $("#" + arrayEl.substring(2)).val();
                        });
                }

                $.ajax({
                    url: remoteAttr,
                    mode: "abort",
                    port: "validate" + input.attr("name"),
                    dataType: "json",
                    type: input.attr("data-val-remote-type"),
                    data: data,
                    async: false,
                    success: function (response) {
                        if (response == true || response == false) {
                            isInvalid = response;
                        } else {
                            errorMessage = response;
                        }

                    }
                });

                if (errorMessage != "Message") {
                    //alert(errorMessage);
                    return errorMessage;
                }
                return !isInvalid;

            }
        },
        messages: {
            val_required: function (input) {
                return input.data("val-required");
            },
            val_remote: function (input) {
                return input.data("val-remote");
            }
        }
    }

    custom.dtonDrawCallbackCheckbox = function (settings) {
        var dtId = settings.sTableId;
        var listId = settings.json !== undefined ? settings.json.listAllId : custom[dtId + "_listAllId"];

        var listAllName = dtId + "_list_all";
        var listCheckedName = dtId + "_list_checked";
        var drawCountName = dtId + "_draw_count";

        custom[drawCountName] = settings.iDraw;

        if (custom[listAllName] === undefined || custom[drawCountName] === 1) {
            custom[listAllName] = [];
        }
        if (custom[listCheckedName] === undefined || custom[drawCountName] === 1) {
            custom[listCheckedName] = [];
        }

        if (listId !== undefined) {
            for (var i = 0; i < listId.length; i++) {
                var id = listId[i];
                custom[listAllName].push(id);
            }
        }
        else {
            swal("Something Wrong", "error code: ids", {
                icon: "error"
            });
        }

        var listCheckbox = $("#" + dtId + " input[type='checkbox']").not("#" + dtId + "-selectAll");

        for (var i = 0; i < listCheckbox.length; i++) {
            BindCheckbox(listCheckbox[i]);
            var dataId = listCheckbox[i].value;
            if (custom[listCheckedName].indexOf(dataId) >= 0) {
                listCheckbox[i].checked = true;
            }
        }

        var labelSelected = custom[listCheckedName].length + " item(s) selected from " + listId.length;
        if ($("#" + dtId + "-labelSelected").length === 0) {
            $("#" + dtId + "_wrapper").after("<div id='" + dtId + "-labelSelected'>" + labelSelected + "</div>");
        }

        $("#" + dtId + "-selectAll").unbind("click");
        $("#" + dtId + "-selectAll").click(function () {
            if (this.checked) {
                custom[listCheckedName] = JSON.parse(JSON.stringify(listId));//Sebenernya ada beberapa cara seperti [...object] dan Array.from(object), tapi keterbatasan di browser yg bhuluk...
            }
            else {
                custom[listCheckedName] = [];
            }
            $("#" + dtId + " input[type='checkbox']").prop('checked', this.checked);

            var labelSelected = custom[listCheckedName].length + " item(s) selected from " + listId.length;
            $("#" + dtId + "-labelSelected").text(labelSelected);
        });

        this.api().columns.adjust();

        function BindCheckbox(item) {
            $(item).unbind("click");
            $(item).click(function () {
                var checkboxVal = $(item).val();
                const index = custom[listCheckedName].indexOf(checkboxVal);

                if (this.checked) {
                    if (index === -1) {
                        custom[listCheckedName].push(checkboxVal);
                    }
                }
                else {
                    if (index > -1) {
                        custom[listCheckedName].splice(index, 1);
                    }
                }
                $(item).prop('checked', this.checked);
                var labelSelected = custom[listCheckedName].length + " item(s) selected from " + listId.length;
                $("#" + dtId + "-labelSelected").text(labelSelected);
            });
        }
    }

    custom.GetErrorMessage = function (jqXHR) {
        var errorCode = jqXHR.status;
        var originErrorMessage = jqXHR.responseJSON.ErrorMessage;

        var errorMessage = "";
        if (errorCode == "403") {
            if (originErrorMessage === "Token expired") {
                errorMessage = "Token expired, please refresh browser!";
            }
            else {
                errorMessage = "Please try again!";
            }
        }
        else if (errorCode = "500") {
            if (jqXHR.responseText.includes("Could not open a connection to SQL Server")) {
                errorMessage = "You're not connected to the network!";
            }
            else {
                errorMessage = "Please try again!";
            }
        }
        else {
            errorMessage = "Please try again!";
        }

        return errorMessage;
    }

    return custom;
})(custom || {});
$(function () {
    $(".correct-case").on("input", custom.correctLetter);
});
