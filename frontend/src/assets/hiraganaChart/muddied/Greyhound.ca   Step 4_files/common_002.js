(function($) {
    var _nondigit = /[^\d]/g;
    var _emailreg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z][a-z]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    var pulsing_objects = new Array();
    var pulsing_opacity = 100;
    var pulsing_direction = 1;
    var pulsing_timer = null;

    $.qs = function(key) {
        var qsobject = $(document).data('qs');

        if (qsobject)
            return qsobject[key];

        var a = window.location.search.substring(1);
        var b = a.split('&');

        qsobject = {};

        $.each(b, function(x, y) {
            var temp = y.split('=');
            qsobject[temp[0]] = temp[1];
        });

        $(document).data('qs', qsobject);
    }
    $.isemail = function(text) {
        return _emailreg.test(text);
    }
    $.isblank = function(text) {
        return !text || !/\S/.test(text);
    }
    $.fn.isblank = function() {
        return $.isblank(this.text()) && (this.children().length == 0);
    }
    $.fn.setShow = function(display) {
        if (display)
            return this.show();
        return this.hide();
    }

    $.isCVVNumber = function(text) {
        var _CVVNumber = /^\d{3,4}$/;
        return _CVVNumber.test(text);
    }
    
    $.fn.setCursorPosition = function(pos) {
        if (pos == -1)
            pos = this.val().length;

        var e = this.get(0);
        if (e.setSelectionRange) {
            e.setSelectionRange(pos, pos);
        }
        else if (e.createTextRange) {
            var range = e.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
        return this;
    }
    $.numbers = function(input) {
        return input.replace(_nondigit, '');
    }
    $.numbersOnly = function(fields) {
        var $fields = (fields instanceof jQuery) ? fields : $(fields);
        $fields.keyup(function(event) {
            if (event.target.value.search(_nondigit) > -1)
                event.target.value = event.target.value.replace(_nondigit, '');
        });
        $fields.blur(function() {
            this.value = this.value.replace(_nondigit, '');
        });
    }
    $.phoneFields = function(fields) {
        var $fields = (fields instanceof jQuery) ? fields : $(fields);
        var length = $fields.length;
        var lengthMinus = length - 1;

        for (var i = 0; i < length; i++) {
            var $field = $($fields[i]);
            if (i > 0)
                $field.data('prev', $($fields[i - 1]));
            if (i < lengthMinus)
                $field.data('next', $($fields[i + 1]));
        }

        $fields.keypress(function(event) {
            var $field = $(event.target);
            var keyCode = event.which;

            var maxlength = parseInt($field.attr('maxlength'), 10);

            if (keyCode >= 49 && keyCode <= 57) {
                if ($field.val().length == maxlength) {
                    var $next = $field.data('next');
                    if ($next)
                        $next[0].focus();
                }
            } else if (keyCode == 8) {
                if ($field.val().length == 0) {
                    var $prev = $field.data('prev');
                    if ($prev) {
                        $prev[0].focus();
                        $prev.setCursorPosition(maxlength);
                        event.preventDefault();
                    }
                }
            }

        });
    }

})(jQuery);

Common = function() {

    var _radwins = {};

    var _resolveUrl = function(url) {
        return url.replace('~/', Common.Strings.AppPath);
    };

    var _getvalidators = function(group) {
        var vals = new Array();
        if (window.Page_Validators) {
            for (var i = 0; i < Page_Validators.length; i++) {
                var val = Page_Validators[i];
                if ((group == '*') || (val.validationGroup == group))
                    vals.push(val);
            }
        }
        return vals;
    };

    var _getvalidationsummaries = function(group) {
        var sums = new Array();
        if (typeof (Page_ValidationSummaries) != "undefined") {
            for (var i = 0; i < Page_ValidationSummaries.length; i++) {
                var sum = Page_ValidationSummaries[i];
                if ((group == '*') || (sum.validationGroup == group))
                    sums.push(sum);
            }
        }
        return sums;
    };

    return {

        GetValidationGroup: function(id) {
            var vals = _getvalidators('*');

            for (var i = 0; i < vals.length; i++) {
                if (vals[i].controltovalidate == id)
                    return vals[i].validationGroup;
            }

            return null;
        },

        DisableValidation: function(group, disable) {

            var vals = _getvalidators(group);
            var sums = _getvalidationsummaries(group);

            for (var i = 0; i < vals.length; i++) {
                var val = vals[i];
                val.isvalid = true;
                ValidatorUpdateDisplay(val);
                ValidatorEnable(val, !disable);
            }

            for (var j = 0; j < sums.length; j++) {
                sums[j].style.display = "none";
            }
        },

        ResetValidators: function(group) {
            var vals = _getvalidators(group);
            var sums = _getvalidationsummaries(group);

            for (var i = 0; i < vals.length; i++) {
                var val = vals[i];
                val.isvalid = true;
                ValidatorUpdateDisplay(val);
            }

            for (var j = 0; j < sums.length; j++) {
                sums[j].style.display = "none";
            }
        },

        LinkCalendars: function(calendar1, calendar2) {           
            var $c1 = $($find(calendar1));
            var $c2 = $($find(calendar2));

            $c1.data('DA', 'D').data('C', $c2);
            $c2.data('DA', 'R').data('C', $c1);

            $.each([$c1, $c2], function() {
                this[0].remove_dateSelected(Common.DateSelected);
                this[0].add_dateSelected(Common.DateSelected);
            });
            
        },

        CalendarOpening: function(sender, args) {           
        },

        DateSelected: function(sender, args) {
            var $sender = $(sender);
            var $cD, $cR, dD, dR;

            if ($sender.data('DA') == 'D') {
                $cD = $sender;
                $cR = $sender.data('C');
            } else {
                $cD = $sender.data('C');
                $cR = $sender;
            }

            dD = $cD[0].get_selectedDate();
            dR = $cR[0].get_selectedDate();

            if (dD && dR) {
                if (dR < dD)
                    $cR[0].clear();
            }

            // Set the return min data to be either the selected depart date, or the depart min date
            $cR[0].set_minDate(dD ? dD : $cD[0].get_minDate());
        },

        GetRadWindow: function() {
            if (window.radWindow)
                return window.radWindow;
            if (window.frameElement && window.frameElement.radWindow)
                return window.frameElement.radWindow;
            return null;
        },

        RadResizeCenter: function(w, h) {
            var win = Common.GetRadWindow();
            if (win) {
                win.setSize(w, h);
                win.center();
            }
        },

        RadClosed: function(win) {
        },

        ShowRad: function(w, h, key, title, url, modal, lock, title_loading, title_complete) {

            url = _resolveUrl(url);
            /*Below Script not used any where in code*/
            var script =
				"javascript: '" +
				"<!DOCTYPE HTML PUBLIC \" -//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n" +
				"<html>" +
				"   <head>" +
				"	    <link type=\"text/css\" href=\"" + Common.Strings.CssPathCulture + "wait.css\" rel=\"stylesheet\" />" +
				"   </head>" +
				"	<body>" +
				"			<div id=\"wait_content\"><img src=\"" + Common.Strings.ImagePathCulture + "wait.gif\"></div>" +
				"       <script>" +
				"           window.setTimeout(function() {" +
                "               location.replace(\"" + url + "\");" +
                "           }, 100);" +
				"       </script>" +
				"	</body>" +
				"</html>'";
            /*End*/
            var win = window.radopen(null, key);

            win.set_modal(modal);

            if ((w > 0) && (h > 0))
                win.setSize(w, h);

            win.set_title(title_loading ? title_loading : Common.Strings.Loading);
            win.key = key;

            if (lock)
                win.set_behaviors(Telerik.Web.UI.WindowBehaviors.None);
            else
                win.set_behaviors(Telerik.Web.UI.WindowBehaviors.Move + Telerik.Web.UI.WindowBehaviors.Close + Telerik.Web.UI.WindowBehaviors.Resize + Telerik.Web.UI.WindowBehaviors.Maximize);

            // removed the "fancy" wait scripting as this was causing firefox to not show the PDF.
            // was:  win.setUrl(script);
            win.setUrl(url);

            if (title_complete) { 
                var func = function() {
                    window.setTimeout(function() {
                        //************************************************************************************************************
                        //Mar 2014 - Modified by Deepika - INC6937659	-	Mobile Ticket Reprint Modifications
                        //added the try-catch block  
                        //in order to catch "Permission denied to access property 'href'" 
                        //when external site is loaded in the iframe due to "same-origin policy" of the browsers.
                        try{
                            var href = win.get_contentFrame().contentWindow.location.href;
                            var loaded = (href.lastIndexOf(url) === (href.length - url.length));

                            if (!loaded) {
                                func();
                            } else {
                                win.set_title(title_complete);
                            }
                        }
                        catch (e) {
                            //set the radwindow's title
                            win.set_title(title_complete);
                        }
                    }, 1000);
                };
                func();
            }

            win.center();
            return win;
        },

        HideRad: function(win) {
            if (win)
                win.Close();
        }
    }
} ();

// TODO: Move this into the common namespace above
function showWait(display) {
    if (display) {
        $("#wait")
			.modal({
			    close: false,
			    opacity: 30,
			    overlayId: 'modal-overlay'
			})
			.focus();
    } else {
        $.modal.close();
    }
}

/*Start Express*/
// $$$$ Start $$$$
///Express Expantion - Added new functions for Express pop-up redirect to WhereWeGoPage.

function GoToExpress() {
    // mfreder 2-17-2011 changed method to use promo info
    var promo = FareFinder.SearchControl.GetPromoPopupMatchResult();

    var listOrigItem = $find(SearchReferences.ListOrigin).get_selectedItem();
    var listDestItem = $find(SearchReferences.ListDestination).get_selectedItem();
    var orig_val = listOrigItem.get_value();
    var orig_location = orig_val.substring(0, orig_val.indexOf("|", 1));
    var dest_val = listDestItem.get_value();
    var dest_location = dest_val.substring(0, dest_val.indexOf("|", 1));
    var return_trip = $("input[name='tripType']:checked").val() == 2;
    var depart_date = $find(SearchReferences.DateDepart);
    var return_date = $find(SearchReferences.DateReturn);
    var depart_date = calendarValidate(depart_date, true).Value;
    var return_date = calendarValidate(return_date, return_trip).Value;
    var depart_time = timeValidate($find(SearchReferences.TimeDepart), false).Value;
    var return_time = timeValidate($find(SearchReferences.TimeReturn), false).Value;
    var adults = getListInt(SearchReferences.ListAdults);
    var seniors = getListInt(SearchReferences.ListSeniors);
    var children = getListInt(SearchReferences.ListChildren);
    var total_passanger = adults + seniors + children;
    window.location.href = promo.Origin.RedirectUrl +
        '&returntrip=' + return_trip +
        '&origin=' + promo.Origin.NewLocationCode + '&destination=' + promo.Destination.NewLocationCode +
    //        '&origin=' + orig_location + '&destination=' + dest_location +
        '&departdate=' + depart_date + '&returndate=' + return_date +
        '&departtime=' + depart_time + '&returntime=' + return_time +
        '&passangercount=' + total_passanger;
}

var getListInt = function(id) {
    return parseInt(getListVal(id), 10);
};

var getListVal = function(id) {
    return $find(id).get_selectedItem().get_value();
};

var timeValidate = function(sender, required) {
    var date = sender.get_selectedDate();
    var results = {
        'Valid': !required || (date != null),
        'Value': date != null ? date.getHours() : null
    };

    return results;
};

var calendarValidate = function(sender, required) {
    var date = sender.get_selectedDate();
    var results = {
        'Valid': !required || (date != null),
        'Value': required == true ? date.format("MM/dd/yyyy") : null
    };

    return results;
};
// $$$$ End $$$$
/*End Express*/

/*CHG40010*/
function showValidationAlert(message, width, height, title) {
    var oAlert = radalert(message, width, height, title);

    //Below code is to center the validation popup
    $("#RadWindowWrapper_" + oAlert._name).css("display", "table");
    $("#RadWindowWrapper_" + oAlert._name).css("position", "fixed");

    var top = ($(window).height() - $("#RadWindowWrapper_" + oAlert._name).css("height").replace('px', '')) / 2;
    var left = ($(window).width() - $("#RadWindowWrapper_" + oAlert._name).css("width").replace('px', '')) / 2;

    $("#RadWindowWrapper_" + oAlert._name).css("top", top);
    $("#RadWindowWrapper_" + oAlert._name).css("left", left);
}

//Below function modified for the INC2324664/CHG49753 - the 31st date issue
function getJavascriptDate(dateStr, dateSlot, dateSeperator) {
    var day, month, year;
    var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var dateFormatRegEx = new RegExp('^(\\d{1}|\\d{2}|\\d{4})(\\' + dateSeperator + ')\\d{1,2}(\\' + dateSeperator + ')(\\d{1}|\\d{2}|\\d{4})$');

    if (dateFormatRegEx.test(dateStr)) {
        var dateArr = dateStr.split(dateSeperator);

        day = dateArr[dateSlot.Day];
        month = dateArr[dateSlot.Month];
        year = dateArr[dateSlot.Year];
    }
    else
        return null;

    //check for day, month, year are numbers
    if (isNaN(day))
        return null;
    else
        day = parseInt(day, 10);

    if (isNaN(month))
        return null;
    else
        month = parseInt(month, 10);

    if (isNaN(year))
        return null;
    else
        year = parseInt(year, 10);

    //validate year
    if (year < 100)
        year += 2000;
    if (year < 1582 || year > 4881)
        return null;

    //validate month
    if (month < 1 || month > 12)
        return null;

    //validate day
    if (month == 2 && (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)))
        days[1] = 29;
    if (day < 1 || day > days[month - 1])
        return null;

    return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/*END*/


// TODO: Move this into the common namespace above
function scroll() {
    var target = $.qs(arguments.length == 0 ? 'ref' : arguments[0]);
    if (target) {
        var element = document.getElementById(target);
        if (element) {
            window.scrollTo(0, element.offsetTop);
        }
    }
}

// Added by deepika - Step 2 Not Loading Schedules Correctly in Greyhound.ca
function prototypeAppendFormat() {
    Sys.StringBuilder.prototype.appendFormat = function (mask) { this.append(String.format.apply(null, arguments)); };
}

$(document).ready(function () {
    // Added by deepika - Step 2 Not Loading Schedules Correctly in Greyhound.ca
    prototypeAppendFormat();

    if ($.modal) {
        $.extend($.modal.defaults, {
            opacity: 80,
            overlayId: 'modal-overlay'
        });
    }

    $('.popuplink').click(
        function(e) {
            e.preventDefault();

            var $this = $(this);
            var rel = $this.attr('rel');

            var h = 550, w = 600;
            var k = null, t = null;
            var m = false, l = false;

            if (rel) {
                var a = rel.split('|');
                if (a && a.length) {
                    if (a.length > 0) {
                        k = a[0];
                        if (a.length > 1) {
                            var x = a[1].split('x');
                            if (x && x.length == 2) {
                                w = parseInt(x[0], 10);
                                h = parseInt(x[1], 10);
                            }
                            if (a.length > 2) {
                                m = (a[2] == 'T');
                                if (a.length > 3) {
                                    l = (a[3] == 'T');
                                }
                            }
                        }
                    }
                }
            }

            Common.ShowRad(w, h, k, null, $this.attr('href'), m, l);
        }
    );
    });

    /*
        CHG50004  Coded by Ganesh - 7-Eleven Credit Card Decline Error Message Update  10/20/11  dmk
        This function shows the RADWindow to show the credit card error message
    */
    var overrideStep3Redirect = false;
    function showErrorWindow(title, content, code, radwindowId) {
        //storeErrorCode(code);
        try {
            overrideStep3Redirect = ((parseInt(code) != 1300) && (parseInt(code) != 1100));
        }
        catch (e) { }
        $('#contentplaceholder').html(content);
        var oWnd = $find(radwindowId);
        oWnd.SetTitle(title);
        oWnd.show();
    }
    
    //Added for error pop-up
    //var errorCode;
    //function storeErrorCode(code) {
    //   errorCode = code;   
    //}

    //Added by kittu for Time Out
    function showTimeoutMessage(title, content, radwindowId) {
        $('#TimeoutErrorContent').html(content);
        var oWnd = $find(radwindowId);
        oWnd.SetTitle(title);
        oWnd.show();
    }

    /* Start INC7511877 - Print at Home Verbiage Update for Greyhound CA */
    function showTicketPurchaseMessage(title, content, radwindowId) {

        $('#DisplayTicketPurchaseMessage').html(content);
        var radwnd = $("div[id$=" + radwindowId + "]")
        var radwndId = 'ctl00_' + radwindowId
        if (radwnd.length > 1)
            radwnd = radwnd[1].id;
        else if (radwnd.length == 1)
            radwnd = radwnd[0].id;
        var oWnd = $find(radwnd);
        oWnd.SetTitle(title);
        oWnd.show();
        oWnd.moveTo(350, 250);
    }
    /* End INC7511877 - Print at Home Verbiage Update for Greyhound CA */

    /*
        Added by Ganesh -  21/3
        CHG55150 - CC - out-of-country date, regional and language setting problem for other than US country
        INC3231408 - Error with date when processing a ticket sale on greyhound.ca and .com with lang other than english
        INC3223722 - French IE Explorer not working on .CA
            
        This function converts the date object to actual local date of customer without LocalDateString() function of javascript.        
    */
    
    Date.prototype.toValidDateStringFormat = function() {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = this.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var output = date + " " + months[this.getMonth()] + " " + this.getFullYear();
        return output;
    }

    /*/
        Added by Ganesh | 5/24/2012
        CHG56691 - CC - Cardholder Not Traveling Content Change
    */
    function showCreditCardHolderNotTravelWindow(title, content, radwindowId) {
        $('#CreditCardHolderNotTravelcontentplaceholder').html(content);
        var oWnd = $find('ctl00_body_CreditCardHolderNotTravelWindow');
        oWnd.SetTitle(title);
        oWnd.show();
    }

    /*
    Update by Aftab 08/01/2013
    Added by Ganesh  - 12/14/2012
    INC4761642 - Credit Card Purchase Errors on Greyhound.ca - Error Message
    */
    function showDuplicateReservationMessage(title, content, radwindowId) {
        $('#DuplicateTranasctionContent').html(content);
        var oWnd = $find(radwindowId);
        oWnd.SetTitle(title);
        oWnd.show();
    } 
    function showTimeOutAlert(message, width, height, title) {
        var oAlert = radalert(message, width, height, title);

        //Below code is to center the validation popup
        $("#RadWindowWrapper_" + oAlert._name).css("display", "table");
        $("#RadWindowWrapper_" + oAlert._name).css("position", "fixed");

        var top = ($(window).height() - $("#RadWindowWrapper_" + oAlert._name).css("height").replace('px', '')) / 2;
        var left = ($(window).width() - $("#RadWindowWrapper_" + oAlert._name).css("width").replace('px', '')) / 2;

        $("#RadWindowWrapper_" + oAlert._name).css("top", top);
        $("#RadWindowWrapper_" + oAlert._name).css("left", left);
        oAlert.add_close(function () { window.location.href = "/"; });

    }
    /* Added by kittu for Round Trip Fare Quotes*/
    function showRadPopup(contentPanel, title, content, radwindowId) {
        var name = '#' + contentPanel;
        $(name).html(content);

        var radwnd = $("div[id$=" + radwindowId + "]")
        var radwndId = 'ctl00_body_PriceConflictRadWindow';
        if (radwnd.length > 1)
            radwnd = radwnd[1].id;
        else if (radwnd.length == 1)
            radwnd = radwnd[0].id;

        var oWnd = $find(radwnd);

        oWnd.SetTitle(title);
        oWnd.show();
    }

//    function showCardHolderNotTrvellingRadPopup(contentPanel, title, content, radwindowId) {
//        var name = '#' + contentPanel;
//        $(name).html(content);

//        var radwnd = $("div[id$=" + radwindowId + "]")
//        var radwndId = 'ctl00_body_PriceConflictRadWindow';
//        if (radwnd.length > 1)
//            radwnd = radwnd[1].id;
//        else if (radwnd.length == 1)
//            radwnd = radwnd[0].id;

//        var oWnd = $find(radwnd);

//        oWnd.SetTitle(title);
//        oWnd.show();
//       
//    }
      /*Common Code for Cross Border and Credit Card Purchase Error INC6782667*/
    function showradWindowPopupMessage(contentPanel, title, content, radwindowId) {
       // debugger;
        var name = '#' + contentPanel;
        $(name).html(content);
        var radwnd = $("div[id$=" + radwindowId + "]")
        var radwndId = 'ctl00_' + radwindowId;
        if (radwnd.length > 1)
            radwndId = radwnd[1].id;
        else if (radwnd.length == 1)
            radwndId = radwnd[0].id;

        var oWnd = $find(radwndId);

        oWnd.SetTitle(title);
        oWnd.show();
    }
      /*added by prachi for INC6782667 Cross-Border Enhancement*/
        function closeRadPopupMessage(radwindowId) {
       
        //debugger;
            try {

                var radwnd = $("div[id$=" + radwindowId + "]")
                var radwndId = 'ctl00_' + radwindowId;
                if (radwnd.length > 1)
                    radwndId = radwnd[1].id;

                var oWnd = $find(radwndId);
                if (oWnd) {
              
                    oWnd.close();
                }
                else
                    window.location = htmlEnc(window.location.href);
    }
            catch (e) {
                window.location = htmlEnc(window.location.href);
    }
    } 
    
    //end
    
    
    /* Added by kittu for Round Trip Fare Quotes*/
    function closeRadPopupPriceConflict(radwindowId) {
        try {

            var radwnd = $("div[id$=" + radwindowId + "]")
            var radwndId = 'ctl00_body_PriceConflictRadWindow';
            if (radwnd.length > 1)
                radwnd = radwnd[1].id;

            var oWnd = $find(radwnd);
            if (oWnd)
                oWnd.close();
            else
                window.location = htmlEnc(window.location.href);
        }
        catch (e) {
            window.location = htmlEnc(window.location.href);
        }
    }
    function gotoStep3() {
        //var code = errorCode;
        //if (code != null && code != "") {
        //    if (code == '1300') {
        //        window.location = 'step3.aspx?SessionId=' + window.name;
        //    }
        //    else {
        //        window.location.href = "/";
        //    }
        //}
        //else{
        //    window.location.href = "/";
        //}
        if (overrideStep3Redirect)
        {
            window.location.href = "/";
        }
        else
        {
            window.location = 'step3.aspx?SessionId=' + htmlWhiteList(window.name);
            overrideStep3Redirect = false;
        }

    }

    function gotoStep2() {

        if ((window.name != null) || (window.name.length != 0)) {
            //top.location.href = 'step2.aspx?SessionId=' + window.name;
            top.location.href = '<%=Resources.GetString("STEP2_COMPLETEURL")%>'.concat(window.name);
        }
    }
        //function gotoStep2() {
        //    top.location.href = 'step2.aspx?SessionId=' + window.name;
        //}

        function redirectStep3() {
            top.location.href = 'step3.aspx?cht=N&SessionId=' + htmlWhiteList(window.name);
            window.location = 'step3.aspx';
            //var oWndChild = Common.GetRadWindow();
            //oWndChild.close();
            //oBrowserWnd.location.reload();
            //window.location = 'step3.aspx';
        }

        // PCI Issue: htmlEncoding - for Cross-Site Scripting DOM Issue fix
        function htmlEnc(s) {

            var retString = String(s).replace(/&/g, "&amp;")
                             .replace(/</g, "&lt;")
                             .replace(/>/g, "&gt;")
                             .replace(/'/g, "&#39;")
                             .replace(/"/g, "&#34;")
                             .replace(/%/g, "&#37;");
            return retString;
        }

        function htmlWhiteList(str) {
            var rtnstr = String(str).replace(/[^a-zA-Z0-9\-]/g, '');
            return rtnstr;
        }

    