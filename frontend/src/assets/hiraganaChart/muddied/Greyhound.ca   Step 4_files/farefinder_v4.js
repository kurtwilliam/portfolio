/*CHG40010*/
var DateType = { Departure: 1, Return: 2 }
var ErrorType = { RequiredField: 1, InvalidField: 2 }
/*END*/
/*Start: Coded by Aftab CHG51533 - .CA Credit Card Error Message & Continue Shopping Button 12/01/2011*/
var CCDeclineErrorCode = new Array('000000', '581501', '581514', '581557', '5815581513', '16091609', '16101610', '58185818', '16111611', '5833', '58335833', '58175817CS', '5817CN');
/*End CHG51533*/
var COMPANY_CODE = null;
var _outboundSchedule;
var _returnboundSchedule;

var qs_selectedCardHolderType;

var showWaitPopup = false;  //added by prachi for INC6782667 Cross-Border Enhancement

//Jan 2014- Deepika - INC7215225-"Similar Travel Options" code update in .CA
var _locationSimilarTravelOrigins = null;

var _pricingDetail;
var _passengerDetail;

//#region FareFinder

FareFinder = function() {

    //#region Private Methods

    //#region Callbacks

    var _callback_getdetails_complete = function(r, context) {
        var html = '';
        if (r.Items) {
            var h = new Sys.StringBuilder();
            var strings = FareFinder.Strings.Schedule.Detail;

            h.append('<table width="100%" border="0" cellpadding="5" cellspacing="0"><tbody>');
            h.append('<tr valign="top" align="left" class="routeDetailsTableHeader">');
            h.appendFormat('<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Location);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Arrives);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Departs);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Layover);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Carrier);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.Meals);
            h.appendFormat('		<th class="routeDetailsTableCell" align="left">{0}</th>', strings.ScheduleNbr);
            h.append('	</tr>');

            for (var x = 0; x < r.Items.length; x++) {
                var i = r.Items[x];

                h.appendFormat('	<tr valign="top" align="left" class="routeDetailsTableRow{0}">', x % 2 == 0 ? 'Shaded' : '');
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Location);
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Arrives);
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Departs);
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Layover ? i.Layover : '&nbsp;');
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Carrier);
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Meal ? i.Meal : '&nbsp;');
                h.appendFormat('		<td class="routeDetailsTableCell">{0}</td>', i.Schedule);
                h.append('</tr>');
            }

            h.append('</tbody></table>');
            html = h.toString();
        }
        $('#' + context.ID).html(html);
        context.Link.data('loaded', true);

        _showdetails(context.ID);
    }

    var _callback_getdetails_error = function(e, context) {
        alert('_getdetails_error: ' + e.get_message());
    };


    //#endregion

    //#region Misc

    var _hidedetails = function(id) {
        $("#" + id + "Hide").hide();
        $("#" + id + "Show").show();
        $("#" + id).slideUp("");
    };

    var _showdetails = function(id) {
        $("#" + id + "Hide").show();
        $("#" + id + "Show").hide();
        $("#" + id).slideDown("");
    };

    //#endregion

    //#endregion

    //#region Public Methods

    return {

        Settings: {
            MaxPassengers: 5
        },

        ShowWait: function(display) {
            showWait(display);
        },

        GetHoverStyle: function(odd) {
            return {
                On: "2px solid #000000",
                Off: "2px solid " + (odd ? '#ffffff' : '#dde6eb')
            };
        },
        // Added by Deepika - To add “Passenger Name” to the Summary of Charges.
        // CHG57718 CC - Summary of Charges - Passenger Name .CA
        func_printPassengerNames: function() {
            var h = new Sys.StringBuilder();
            $("#tblpassengers tr:gt(0)").each(function(index) {
                var $this = $(this);
                var f_first = $this.find('[name=psngrFirst]');
                var f_last = $this.find('[name=psngrLast]');

                h.appendFormat('{0}<br/>', f_first.val() + " " + f_last.val());
            });

            $("#lblPassengerNamePriceTable").html(h.toString());


        },

        ShowDetailsForRoute: function(link, whatRoute, key) {

            var l = $(link);
            var loaded = l.data('loaded');

            if (loaded) {
                _showdetails(whatRoute);
                return;
            }

            var context = { Link: l, ID: whatRoute }
            var q = {
                __type: 'Greyhound.Website.DataObjects.ClientScheduleDetailRequest',
                Key: key
            };
            q.FareFinderDatakey = window.name.toString();
            Greyhound.Website.Services.FareFinderService.GetScheduleDetails(q, _callback_getdetails_complete, _callback_getdetails_error, context);
        },

        HideDetailsForRoute: function(id) {
            _hidedetails(id);
        },

        RenderPricingTable: function(r, flag) {

            /*                 
            Added by Ganesh : 11/8 : To render the trips summary details along with schedules and bus transfer information.
            CHG50221	CC - Update Summary of Charges in Payment Process
            */
            var h = new Sys.StringBuilder();
            var func_printschedule = function(schedulelist) {
                for (var x = 0; x < schedulelist.length; x++) {
                    var schedule = schedulelist[x];
                    h.append('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
                    h.append('<tr valign="top" align="left">');

                    if ((schedule.Arrives == "") && (schedule.Location.indexOf("START") != -1)) {
                        h.appendFormat('<td>{0}&nbsp;{1}-{2}*', schedule.DepartsDateTime, schedule.Carrier, schedule.Schedule);
                        var loc = schedule.Location.split('-');
                        h.appendFormat('&nbsp;&nbsp;&nbsp;&nbsp;{0}&nbsp;{1}</td>', FareFinder.Strings.Schedule.Depart, loc[1] == null ? schedule.Location : loc[1]);
                    }
                    else if ((schedule.Departs == "") && (schedule.Location.indexOf("END") != -1)) {
                        h.appendFormat('<td>{0}&nbsp;{1}-{2}*', schedule.ArrivesDateTime, schedule.Carrier, schedule.Schedule);
                        var loc = schedule.Location.split('-');
                        h.appendFormat('&nbsp;&nbsp;&nbsp;&nbsp;{0}&nbsp;{1}</td>', FareFinder.Strings.Schedule.Arrive, loc[1] == null ? schedule.Location : loc[1]);
                    }
                    
                    h.append('</tr>');
                    h.append('</table>');
                }
            }

            if (_outboundSchedule != null) {
                var fareType = $('.curIntinFareTypeCol').text();
                var departureList = eval(_outboundSchedule)

                if (departureList.length > 0) {
                    h.append('<table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody>');
                    h.append('<tr valign="top" align="left">');
                    h.appendFormat('<td><br/>' + FareFinder.Strings.Schedule.FareType + '<br/></td>', fareType.split(FareFinder.Strings.Schedule.SelectedFareType)[1]);
                    h.append('</tr>');
                    h.append('<tr valign="top" align="left">');
                    h.appendFormat('<td><br/>{0}</td>', FareFinder.Strings.Schedule.TravelInfo);
                    h.append('</tr>');
                    h.append('<tr valign="top" align="left">');
                    h.appendFormat('<td><br/>' + FareFinder.Strings.Schedule.TripTo + '</td>', departureList[departureList.length - 1].Location.split('-')[1]);
                    h.append('</tr>');
                    h.append('<tr valign="top" align="left"><td>&nbsp;</td></tr>');
                    h.append('<tr valign="top" align="left"><td>');
                    func_printschedule(departureList);
                    h.append('</tr></td>');
                    if (r.RT && _returnboundSchedule != null) {
                        var returnList = eval(_returnboundSchedule);
                        if (returnList.length > 0) {
                            h.append('<tr valign="top" align="left">');
                            h.appendFormat('<td><br/>' + FareFinder.Strings.Schedule.TripTo + '</td>', returnList[returnList.length - 1].Location.split('-')[1]);
                            h.append('</tr>');
                            h.append('<tr valign="top" align="left"><td>&nbsp;</td></tr>');
                            h.append('<tr valign="top" align="left"><td>');
                            func_printschedule(returnList);
                            h.append('</tr></td>');
                        }
                    }
                    h.append('<tr valign="top" align="left">');
                    h.appendFormat('<td><br/>{0}<br/><br/></td>', FareFinder.Strings.Schedule.SummaryCharges);
                    h.append('</tr>');
                    h.append('</table>');
                    $('#departureDetailsSummary').html(h.toString());
                }
            }

            $('#pricetable tr').remove();
            if (r.Items) {

                var $table = $('#pricetable');
                var groups = new Object();

                for (var x = 0; x < r.Items.length; x++) {
                    var i = r.Items[x];
                    if (!groups[i.Group])
                        groups[i.Group] = new Array();
                    groups[i.Group].push(i);
                }

                var func_row = function() {
                    return $('<tr valign="top" align="left"></tr>"');
                }
                var func_printHeader = function(text) {
                    func_row()
						.append(
							$('<td colspan="2"></td>')
								.append($('<span></span>').attr('class', 'ticketPriceBoxBigText').text(text))
						)
						.appendTo($table);
                }
                var func_printItem = function(text, value) {
                    func_row()
						.append(
							$('<td></td>').append($('<span></span>').text(text))
						)
						.append(
							$('<td align="right"></td>').append($('<span></span>').text(value))
						)
						.appendTo($table);
                }
                var func_printDiv = function() {
                    func_row()
						.append($('<td colspan="2" style="padding:8px 0;"><div class="ticketPriceBoxDivider"></div></td>'))
						.appendTo($table);
                }
                var func_printGroup = function(group) {
                    for (var x = 0; x < groups[group].length; x++) {
                        var i = groups[group][x];
                        func_printItem(i.Name, i.Amount);
                    }
                }
                //To add “Passenger Name” to the Summary of Charges.
                if (flag == 0) {
                    func_printHeader(FareFinder.Strings.Purchase.PassengerName);
                    var func_PassengerName = function() {
                        func_row()
						.append(
							$('<td colspan="2"></td>').append($('<span id="lblPassengerNamePriceTable"></span>'))
						)
					.appendTo($table);
                    }
                    func_PassengerName();
                    FareFinder.func_printPassengerNames();
                    func_printDiv();
                }


                func_printHeader(r.RT ? FareFinder.Strings.Purchase.HeaderRT : FareFinder.Strings.Purchase.HeaderOW);
                func_printGroup(0);
                func_printDiv();

                func_printGroup(3);
                func_printDiv();

                if (groups[1]) {
                    func_printHeader(FareFinder.Strings.Purchase.Adjustments);
                    func_printGroup(1);
                    func_printDiv();
                }
                /*Added for Taxes*/
                if (groups[2]) {
                    func_printHeader(FareFinder.Strings.Purchase.Taxes);
                    func_printGroup(2);
                    func_printDiv();
                }
                /*End*/

                func_printGroup(4);
                $('tbody tr:last td span', $table).attr('class', 'ticketPriceBoxBigText');
            }
        },

        AddRewardsLogoutHandler: function() {
            if (typeof (Rewards) !== 'undefined' && Rewards != null) {
                Sys.Application.add_load(function() {
                    Rewards.BeforeLogout(
                        function(context) {
                            var c = confirm(FareFinder.Strings.LogoutMessage);
                            if (c) {
                                Rewards.AfterLogout(
                                    function(context) {
                                        window.location = 'step1.aspx';
                                    }
                                );
                                return true;
                            }
                            return false;
                        }
                    );
                });
            }
        }
    };

    //#endregion

} ();

//#endregion

//#region FareFinder.SearchControl

FareFinder.SearchControl = function () {
    //#region Private Methods
    var LOCATION_MIN_LENGTH = 3;
    var _searchResultHandler;
    /*Start Express*/
    // mfreder 2-18-2011 initialize popup origins
    var _promoPopupOrigins = null;
    var _promoPopupMatchResult = { Found: false, Origin: null, Destination: null };

    var _alreadyODPairStored = false;
    var _similarTravelOptionOrigin = null;
    var _similarTravelOptionDestination = null;

    var _micrositeOrigins = null;
    var _micrositeMatchResult = { Found: false, Origin: null, Destination: null };

    /*End Express*/
    var _handleInvalid = function (r) {
        if (r.Messages && r.Messages.length > 0) {
            //alert(r.Messages.join('\n'));
            showValidationAlert(r.Messages.join('\n'), 0, 100, FareFinder.Strings.ValidationAlertTitle);
        }
    };

    var _handleResults = function (r, c) {
        var handled = false;

        if (typeof (_searchResultHandler) !== 'undefined' && _searchResultHandler != null)
            handled = _searchResultHandler(r, c);

        if (!handled) {

            if (r.Valid) {
                var $form = $('<form/>').attr('action', r.RedirectUrl).attr('method', r.RedirectMethod);
                var data = r.RedirectData;

                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var e = data[i], d = e[1] ? e[1] : '';
                        $form.append($('<input type="hidden" id="' + e[0] + '" name="' + e[0] + '"/>').val(d));
                    }
                }

                $('body').append($form);
                $form.submit();

            }
        }
    };
    /**Start Express*/
    // mfreder 2-18-2011 initialize popup origins
    var _get_popuporigins_complete = function (r, c) {
        _promoPopupOrigins = r;
        FareFinder.ShowWait(false);
    };
    var _get_popuporigins_error = function (e, c) {
        _promoPopupOrigins = null;
        FareFinder.ShowWait(false);
        alert('search_error: ' + e.get_message());
    };

    var _get_micrositeorigins_complete = function (r, c) {
        _micrositeOrigins = r;
        FareFinder.ShowWait(false);
    };
    var _get_micrositeorigins_error = function (e, c) {
        _micrositeOrigins = null;
        FareFinder.ShowWait(false);
        alert('search_error: ' + e.get_message());
    };


    var _get_locationsimilartravelorigins_complete = function (r, c) {
        _locationSimilarTravelOrigins = r;

        //Jan 2014- Deepika - INC7215225-"Similar Travel Options" code update in .CA
        CheckSimilarTravelExists();

        FareFinder.ShowWait(false);
    };

    var _get_locationsimilartravelorigins_error = function (e, c) {
        _locationSimilarTravelOrigins = null;
        FareFinder.ShowWait(false);
        alert('search_error: ' + e.get_message());
    };
    /*End Express*/


    var _search_complete = function (r, c) {
        //added by prachi for INC6782667
        var pageUrl = window.location.href.toLowerCase();
        var isTicketCenterUrl = false;
        if (r.RedirectUrl != null) {
            if (r.RedirectUrl.toLowerCase().indexOf("farefinder") > 0)
                isTicketCenterUrl = false; //check for farefinder url
            else // if (r.RedirectUrl.indexOf("ticketcenter") > 0)
                isTicketCenterUrl = true; //check for ticket center url
        }
        //alert(pageUrl.indexOf("step2"));
        if (pageUrl.indexOf("step2") > 0 && isTicketCenterUrl != true) {

            showmodifySearch();
        }
        //END-------------------------------------
        if (!r.Valid) {
        	FareFinder.ShowWait(false);
        	_handleInvalid(r, c);
        } else {
        	_handleResults(r, c);
        	if (FF && FF.searchCallback)
        		FF.searchCallback();
        }
    };

    var _search_error = function (e, c) {
        FareFinder.ShowWait(false);
        alert('search_error: ' + e.get_message());
    };
    /*added by prachi for INC6782667 Cross-Border Enhancement */
    var _search_complete_IsCrossCountryLocation = function (r, c) {
    
        if (r == true) {

            var radwnd = $("div[id$=RedirecttoGreyhoundRadWindow]").attr("id");
            var listOrig = $find(SearchReferences.ListOrigin).get_value();
            var listDest = $find(SearchReferences.ListDestination).get_value();

            var adults = $find(SearchReferences.ListAdults).get_value();
            var seniors = $find(SearchReferences.ListSeniors).get_value();
            var children = $find(SearchReferences.ListChildren).get_value();

            var dateDepart = $find(SearchReferences.DateDepart).get_dateInput().get_value();
            var dateReturn = $find(SearchReferences.DateReturn).get_dateInput().get_value();

            //    var discount = $find(SearchReferences.ListDiscounts).get_value();

            var originCity = listOrig.split('|')[1];
            var originState = originCity.split('/')[1];

            var destinationCity = listDest.split('|')[1];
            var destinationState = listDest.split('/')[1];


            var urlString = 'redirect=y&version=1.0';
            urlString = urlString + '&origincity=' + originCity.split('/')[0];
            urlString = urlString + '&originstate=' + originState;
            urlString = urlString + '&destinationcity=' + destinationCity.split('/')[0];
            urlString = urlString + '&destinationstate=' + destinationState;

            urlString = urlString + '&adults=' + adults;
            urlString = urlString + '&seniors=' + seniors;
            urlString = urlString + '&children=' + children;

            // urlString = urlString + '&discount=' + discount;


            if (dateDepart.indexOf('/') == -1) {
                urlString = urlString + '&dyear=' + dateDepart.split('-')[0];
                urlString = urlString + '&dmonth=' + dateDepart.split('-')[1];
                urlString = urlString + '&dday=' + dateDepart.split('-')[2];

                if (dateReturn != null && dateReturn != '')
                    urlString = urlString + '&legs=2';
                urlString = urlString + '&ryear=' + dateReturn.split('-')[0];
                urlString = urlString + '&rmonth=' + dateReturn.split('-')[1];
                urlString = urlString + '&rday=' + dateReturn.split('-')[2];
            }
            else {
                urlString = urlString + '&dyear=' + dateDepart.split('/')[2];
                urlString = urlString + '&dmonth=' + dateDepart.split('/')[1];
                urlString = urlString + '&dday=' + dateDepart.split('/')[0];

                if (dateReturn != null && dateReturn != '')
                    urlString = urlString + '&legs=2';
                urlString = urlString + '&ryear=' + dateReturn.split('/')[2];
                urlString = urlString + '&rmonth=' + dateReturn.split('/')[1];
                urlString = urlString + '&rday=' + dateReturn.split('/')[0];
            }
            $('#redirecttoGreyhoundcom').click(function (e) {
                //debugger;
                e.preventDefault();
                //modified by Deepika - To allow the cross border redirect to .com  work even when accessed thru direct server
                var strURL = $('#redirecttoGreyhoundcom').attr('href');
                window.location.href = strURL + "?" + urlString;
            });

            var h = new Sys.StringBuilder();
            FareFinder.ShowWait(false);
            showradWindowPopupMessage("RedirecttoGreyhoundContent", FareFinder.Strings.Purchase.InterstitialAlertTitle, FareFinder.Strings.Purchase.InterstitialAlertMessage, "RedirecttoGreyhoundRadWindow");

        }
        else {
            FareFinder.SearchControl.Submit(true);
        }
    };
    var _search_error_IsCrossCountryLocation = function (e, c) {
        //debugger;
        FareFinder.ShowWait(false);
        alert('search_error: ' + e.get_message());
    };
    /*END*/
    var _location_showdropimage = function (sender) {
        $(sender.get_imageDomElement().parentNode).removeClass('rcbArrowCellHidden');
    };

    var _location_hidedropimage = function (sender) {
        $(sender.get_imageDomElement().parentNode).addClass('rcbArrowCellHidden');
    };

    var _location_setdropdownwidth = function (sender) {
    };

    //#endregion

    //#region Public Methods

    return {
        Location_Load: function (sender, eventArgs) {

            sender.set_emptyMessage(FareFinder.Strings.Search.EmptyMessage);

            sender.hasResults = false;
            sender.enforceMinimumCharactersRule = true;
            sender.recursiveSearching = false;
            sender.type = "auto-complete";
            sender.id = sender.get_id();
        },

        Location_DropDownOpening: function (sender, eventArgs) {
            eventArgs.set_cancel(!sender.hasResults || (sender.get_text().length < LOCATION_MIN_LENGTH));
        },

        Location_ItemsRequesting: function (sender, eventArgs) {
            if (sender.get_appendItems() && sender.get_endOfItems()) {
                eventArgs.set_cancel(true);
                return;
            }
            if (sender.enforceMinimumCharactersRule && (sender.get_text().length < LOCATION_MIN_LENGTH)) {
                eventArgs.set_cancel(true);
            }
        },

        Location_ItemsRequested: function (sender, eventArgs) {

            sender.hasResults = (sender.get_items().get_count() > 0);
            sender.resultsText = sender.get_text();

            if (sender.get_items().get_count() == 1)
                sender.get_items().getItem(0).select();

            if (sender.hasResults) {

                _location_showdropimage(sender);
                _location_setdropdownwidth(sender);

                var resultsMsg = sender.get_moreResultsBoxMessageElement();
                var results = resultsMsg.innerHTML.split("|");
                var template = FareFinder.Strings.Search.ResultsMessage;

                resultsMsg.innerHTML = template.replace("{0}", results[0]).replace("{1}", results[1]);

                if (!sender.get_dropDownVisible())
                    sender.showDropDown();
            }
            else {
                _location_hidedropimage(sender);

                if (sender.get_dropDownVisible()) {
                    sender.hideDropDown();
                }
            }
        },

        Location_Blur: function (sender, eventArgs) {
            if (!sender.get_selectedItem() && sender.hasResults) {
                var item = sender.findItemByText(sender.get_text());
                if (item) {
                    item.select();
                    return;
                }
                sender.get_items().getItem(0).select();
            }
        },

        Time_Clear: function (sender, args) {
            var view = $find(sender);
            var picker = $find(view._ownerDatePickerID);

            picker.set_selectedDate(null);
            picker.clear();

            picker.hideTimePopup();
        },

        Time_Opening: function (sender, args) {
            if (sender.get_selectedDate() == null) {
                var id = sender.get_timeView().get_element().id + '_selectedCell';
                $('#' + id).removeClass('rcSelected').attr('id', null);
            }
        },

        /* Start Here: Added new method on 08/Feb/2011 */
        Discount_ChangedFromCS: function (id) {
            switch (id) {
                case "CD": case "VA":
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').show(); $('#val_card').show();
                    $('#lbl_expiration').show(); $('#val_expiration').show();
                    break;
                case "":
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_promoCode').show(); $('#val_promoCode').show();
                    break;
                default:
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    break;
            }
        },

        Discount_ChangedFromJS: function (id) {
            switch ($find(SearchReferences.ListDiscounts)._value) {
                case "CD": case "VA":
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').show(); $('#val_card').show();
                    $('#lbl_expiration').show(); $('#val_expiration').show();
                    break;
                case "":
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_promoCode').show(); $('#val_promoCode').show();
                    break;
                default:
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    break;
            }
        },
        /* End Here*/

        Discount_Changed: function (sender, args) {
            switch (args.get_item().get_value()) {
                case "CD": case "VA":
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').show(); $('#val_card').show();
                    $('#lbl_expiration').show(); $('#val_expiration').show();
                    break;
                case "":
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_promoCode').show(); $('#val_promoCode').show();
                    break;
                default:
                    $('#lbl_promoCode').hide(); $('#val_promoCode').hide();
                    $('#lbl_card').hide(); $('#val_card').hide();
                    $('#lbl_expiration').hide(); $('#val_expiration').hide();
                    break;
            }
        },

        SetSearchResultHandler: function (func) {
            //_handleResults = func;
            _searchResultHandler = func;
        },

        AttachReward: function (name, value) {

            var list = $find(SearchReferences.ListDiscounts);
            var item = new Telerik.Web.UI.RadComboBoxItem();

            // If you change this logic, you'll need to change RemoveRewards here and
            // SearchControl.cs
            item.set_value(value);
            item.set_text(FareFinder.Strings.Search.RewardPrefix + name);
            item.get_attributes().setAttribute('reward', '1');

            list.get_items().add(item);
        },

        RemoveRewards: function () {

            var list = $find(SearchReferences.ListDiscounts);
            var items = list.get_items();

            for (var i = items.get_count() - 1; i >= 0; i--) {

                var item = items.getItem(i);

                if (item.get_attributes().getAttribute('reward') == '1')
                    items.removeAt(i);
            }
        },
        InitializeCompanyCode: function (companyCode) {
            COMPANY_CODE = companyCode;
        },
        /*Start Express*/
        InitializeMicrosite: function (micrositeList) {
            _micrositeOrigins = eval(micrositeList);
        },

        InitializeSmilarOption: function () {
            if (SearchReferences.Mode == 2) {
                Greyhound.Website.Services.LocationSimilarTravelService.GetOrigins(_get_locationsimilartravelorigins_complete, _get_locationsimilartravelorigins_error);
            }
        },

        IsMicroSiteExpressODPair: function () {
            _micrositeMatchResult = { Found: false, Origin: null, Destination: null };
            //We only offer the promo from the Home Page search box
            if (SearchReferences.Mode == 0 || SearchReferences.Mode == 2) {
                var listOrig = $find(SearchReferences.ListOrigin);
                var listDest = $find(SearchReferences.ListDestination);
                var listOrigItem = listOrig.get_selectedItem();
                var listDestItem = listDest.get_selectedItem();
                if (listOrigItem != null && listDestItem != null) {
                    //we have both an origin and a destination.
                    //now let's see if it's a pair we care about
                    orig_val = listOrigItem.get_value();
                    origin_loc = orig_val.substring(0, orig_val.indexOf("|", 1));
                    dest_val = listDestItem.get_value();
                    destination_loc = dest_val.substring(0, dest_val.indexOf("|", 1));

                    for (var i = 0; i < _micrositeOrigins.length; i++) {
                        if (_micrositeOrigins[i].LocationCode == origin_loc) {
                            var destination = eval(_micrositeOrigins[i].Destinations);
                            if (destination != null) {
                                for (var j = 0; j < destination.length; j++) {
                                    if (destination[j].LocationCode == destination_loc) {
                                        _micrositeMatchResult.Origin = _micrositeOrigins[i];
                                        _micrositeMatchResult.Destination = destination[j];
                                        _micrositeMatchResult.Found = true;
                                    }
                                }
                            }
                        }
                    }
                }
                //return not found
                return _micrositeMatchResult;
            }
        },

        //when user click the Similar Travel Pair option then excute this function and show the next travel options.
        ShowExpressSimilarTravelODPair: function () {
            /*Start INC7427614 - Modify Search button is displayed along with a '+' sign on click of Similar travel option on step2 for .ca */
            ModifySearchOnSimilarTravel();
            /*End INC7427614 - Modify Search button is displayed along with a '+' sign on click of Similar travel option on step2 for .ca */
            $("#step2ModifySearchPanel").show();
            var listOrig = $find(SearchReferences.ListOrigin);
            var listDest = $find(SearchReferences.ListDestination);
            var listOrigItem = listOrig.get_selectedItem();
            var listDestItem = listDest.get_selectedItem();

            if (!_alreadyODPairStored) {
                if (listOrigItem != null && listDestItem != null) {
                    //we have both an origin and a destination.
                    //now let's see if it's a pair we care about
                    orig_val = listOrigItem.get_value();
                    origin_loc = orig_val.substring(0, orig_val.indexOf("|", 1));
                    dest_val = listDestItem.get_value();
                    destination_loc = dest_val.substring(0, dest_val.indexOf("|", 1));

                    $.each(_locationSimilarTravelOrigins, function (i, origin) {
                        if (origin.LocationCode == origin_loc) {
                            //let's see if the destination matches as well                           
                            $.each(origin.Destinations, function (i, destination) {
                                //the destination matches or it is zero for any destination. ("zero" wildcard only valid for destinations)
                                if (destination_loc == destination.LocationCode || destination.LocationCode == 0) {
                                    _similarTravelOptionOrigin = origin.NewLocationCode;
                                    _similarTravelOptionDestination = destination.NewLocationCode;
                                    _alreadyODPairStored = true;
                                }
                            });
                        }
                    });
                }
            }
            listOrig.trackChanges();
            listOrig.get_items().clear();
            listOrig.clearSelection();

            listDest.trackChanges();
            listDest.get_items().clear();
            listDest.clearSelection();

            for (var i = 0; i < _locationSimilarTravelOrigins.length; i++) {
                if (_locationSimilarTravelOrigins[i].LocationCode == origin_loc) {
                    for (var j = 0; j < _locationSimilarTravelOrigins[i].Destinations.length; j++) {
                        if (destination_loc == _locationSimilarTravelOrigins[i].Destinations[j].LocationCode || _locationSimilarTravelOrigins[i].Destinations[j].LocationCode == 0) {

                            var comboItem = new Telerik.Web.UI.RadComboBoxItem();
                            comboItem.set_text(_locationSimilarTravelOrigins[i].DisplayName + ', ' + _locationSimilarTravelOrigins[i].State);
                            comboItem.set_value((_locationSimilarTravelOrigins[i].NewLocationCode) + '|' + (_locationSimilarTravelOrigins[i].DisplayName) + '/' + (_locationSimilarTravelOrigins[i].State));
                            listOrig.get_items().add(comboItem);

                            var destinationcomboItem = new Telerik.Web.UI.RadComboBoxItem();
                            destinationcomboItem.set_text(_locationSimilarTravelOrigins[i].Destinations[j].DisplayName + ', ' + _locationSimilarTravelOrigins[i].Destinations[j].State);
                            destinationcomboItem.set_value((_locationSimilarTravelOrigins[i].Destinations[j].NewLocationCode) + '|' + (_locationSimilarTravelOrigins[i].Destinations[j].DisplayName) + '/' + (_locationSimilarTravelOrigins[i].Destinations[j].State));
                            listDest.get_items().add(destinationcomboItem);

                            _similarTravelOptionOrigin = _locationSimilarTravelOrigins[i].NewLocationCode;
                            _similarTravelOptionDestination = _locationSimilarTravelOrigins[i].Destinations[j].NewLocationCode;
                            break;
                        }
                    }
                }
            }

            listOrig.commitChanges();
            listDest.commitChanges();

            //Now we are setting origin and destination
            var originitems = listOrig.get_items();
            for (var k = 0; k < originitems.get_count(); k++) {

                var originLoc = originitems.getItem(k).get_value().substring(0, originitems.getItem(k).get_value().indexOf("|", 1));
                if (originLoc == _similarTravelOptionOrigin)
                    originitems.getItem(k).select();
            }

            var destinationitems = listDest.get_items();
            for (var k = 0; k < destinationitems.get_count(); k++) {

                var destinationLoc = destinationitems.getItem(k).get_value().substring(0, destinationitems.getItem(k).get_value().indexOf("|", 1));
                if (destinationLoc == _similarTravelOptionDestination)
                    destinationitems.getItem(k).select();
            }
        },

        IsExpressODPair: function () {
            _promoPopupMatchResult = { Found: false, Origin: null, Destination: null };

            //We only offer the promo from the Home Page search box
            if (SearchReferences.Mode == 0) {
                var listOrig = $find(SearchReferences.ListOrigin);
                var listDest = $find(SearchReferences.ListDestination);
                var listOrigItem = listOrig.get_selectedItem();
                var listDestItem = listDest.get_selectedItem();
                if (listOrigItem != null && listDestItem != null) {
                    //we have both an origin and a destination.
                    //now let's see if it's a pair we care about
                    orig_val = listOrigItem.get_value();
                    origin_loc = orig_val.substring(0, orig_val.indexOf("|", 1));
                    dest_val = listDestItem.get_value();
                    destination_loc = dest_val.substring(0, dest_val.indexOf("|", 1));


                    $.each(_promoPopupOrigins, function (i, origin) {
                        if (origin.LocationCode == origin_loc) {
                            // Yes this origin does dont have destination setup in promopopupconfiguration table
                            // hence we are setting destination as null for origin and while redirecting to
                            // Express it take destination as empty in querystring        
                            if (origin.Destinations.length == 0) {
                                _promoPopupMatchResult.Origin = origin;
                                _promoPopupMatchResult.Destination = null;
                                _promoPopupMatchResult.Found = true;
                            }
                            //let's see if the destination matches as well
                            $.each(origin.Destinations, function (i, destination) {
                                //the destination matches or it is zero for any destination. ("zero" wildcard only valid for destinations)
                                if (destination_loc == destination.LocationCode || destination.LocationCode == 0) {
                                    _promoPopupMatchResult.Origin = origin;
                                    _promoPopupMatchResult.Destination = destination;
                                    _promoPopupMatchResult.Found = true;
                                    return false;
                                }
                            });
                            // mfreder 10/14/2011 if found then exit loop - not having this causes it to find the very last occurence and prevents the specific to general prioritization
                            if (_promoPopupMatchResult.Found) {
                                return false;
                            }
                        }
                    });
                }
            }
            //return not found
            return _promoPopupMatchResult;
        },

        /******Start IsCrossborder Check*****/
        //  added by prachi for INC6782667 Cross-Border Enhancement
        IsCrossCountryLocation: function () {

            /*CHG40010*/
            var errors = new Array();
            /*End*/

            /*CHG40010*/
            // Gather Data
            var getVal = function (id) {
                return $('#' + id).val();
            };
            var showErrors = function (e, errorType) {
                var flag = false;

                for (var i = 0; i < e.length; i++) {
                    if (e[i].ErrorType == errorType) {
                        e[i].AssociateControl.addClass('errorHilited');
                        e[i].AssociateControl.append('<span class="astrk"> *</span>');
                        flag = true;
                    }
                }

                return flag;
            };
            var displayInvalidFields = function (e) {
                if (showErrors(e, ErrorType.RequiredField)) {
                    $('#validationError').html(FareFinder.Strings.Purchase.RequiredMessage);
                }
                else {
                    for (var i = 0; i < e.length; i++) {
                        e[i].AssociateControl.addClass('errorHilited');
                        e[i].AssociateControl.append('<span class="astrk"> *</span>');
                        $('#validationError').html(e[i].ErrorMessage);
                        return;
                    }
                }
            };
            var locationValidate = function (sender, associateControlId) {
                clearError(associateControlId);
                var item = sender.get_selectedItem();

                if (item == null) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                return item.get_value();
            };
            var addError = function (error) {
                errors.push(error);
            };
            var clearError = function (controlId) {
                var $control = $(controlId);

                $control.removeClass('errorHilited');
                $control.find('.astrk').remove();
            };
            var dateValidate = function (dateStr, dateSlot, dateSperator, associateControlId) {
                if ($.isblank(dateStr)) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                var date = getJavascriptDate(dateStr, dateSlot, dateSperator);

                if (date == null) {
                    // TODO: Replace the error message from RequiredMessage to InvalidDateMessage
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                return date;
            };
            //Below function modified for Date Issue for leaving for today occured during INC2324664/CHG49753 - 31st Date Issue
            var departDateValidate = function (sender, associateControlId) {
                clearError(associateControlId);

                var minDate = new Date(sender.get_minDate().getFullYear(), sender.get_minDate().getMonth(), sender.get_minDate().getDate(), 0, 0, 0, 0);
                var maxDate = new Date(sender.get_maxDate().getFullYear(), sender.get_maxDate().getMonth(), sender.get_maxDate().getDate(), 0, 0, 0, 0);
                var departDate = dateValidate(sender.get_dateInput().get_textBoxValue(), sender._dateInput._dateFormatInfo._data.DateSlots, sender._dateInput._dateFormatInfo.DateSeparator, associateControlId);

                if ((departDate != null) && ((departDate < minDate) || (departDate > maxDate))) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDepartDateMessage });
                    return null;
                }

                return departDate;
            };
            //Below function modified for Date Issue for leaving for today occured during INC2324664/CHG49753 - 31st Date Issue
            var returnDateValidate = function (sender, departDate, associateControlId) {
                clearError(associateControlId);

                var maxDate = new Date(sender.get_maxDate().getFullYear(), sender.get_maxDate().getMonth(), sender.get_maxDate().getDate(), 0, 0, 0, 0);
                var returnDate = dateValidate(sender.get_dateInput().get_textBoxValue(), sender._dateInput._dateFormatInfo._data.DateSlots, sender._dateInput._dateFormatInfo.DateSeparator, associateControlId);

                if ((departDate != null && returnDate != null) && (returnDate < departDate || returnDate > maxDate)) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidReturnDateMessage });
                    return null;
                }

                return returnDate;
            };

            var valid = true;
            var rt = $("input[name='tripType']:checked").val() == 2;



            var adults = getListInt(SearchReferences.ListAdults);
            var seniors = getListInt(SearchReferences.ListSeniors);
            var children = getListInt(SearchReferences.ListChildren);

            var promoCode = getVal(SearchReferences.PromoCode);
            var discountCode = getListVal(SearchReferences.ListDiscounts);

            var card = getVal(SearchReferences.Card);
            var cardExpiration = getListVal(SearchReferences.CardExpiration);

            var listOrig = $find(SearchReferences.ListOrigin);
            var listDest = $find(SearchReferences.ListDestination);

            var dateDepart = $find(SearchReferences.DateDepart);
            var dateReturn = $find(SearchReferences.DateReturn);

            var timeDepart = $find(SearchReferences.TimeDepart);
            var timeReturn = $find(SearchReferences.TimeReturn);

            var dataOrig = locationValidate(listOrig, '#titleOrigin');
            var dataDest = locationValidate(listDest, '#titleDestination');


            if (dataOrig == dataDest)
                addError({ AssociateControl: $('#titleDestination'), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDestinationMessage });

            var dataDepartDate = departDateValidate(dateDepart, '#titleDepart');
            var dataReturnDate = rt ? returnDateValidate(dateReturn, dataDepartDate, '#titleReturn') : null;

            $v = $('#validationError');
            /*END*/

            if (errors.length == 0) {//CHG40010
                $v.addClass('hidden');

                if (adults + seniors + children <= 0) {
                    showValidationAlert(String.format(FareFinder.Strings.Search.NoPassengersMessage), 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }

                if (adults + seniors + children > FareFinder.Settings.MaxPassengers) {
                    //alert(String.format(FareFinder.Strings.Search.MaxPassengersMessage, FareFinder.Settings.MaxPassengers));
                    showValidationAlert(String.format(FareFinder.Strings.Search.MaxPassengersMessage, FareFinder.Settings.MaxPassengers), 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }

                if ((children > 0) && (adults + seniors == 0)) {
                    //alert(FareFinder.Strings.Search.NoChildrenMessage);
                    showValidationAlert(FareFinder.Strings.Search.NoChildrenMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }

                var checktrue = true;

                var originId = $find(SearchReferences.ListOrigin)._value.split('|')[0];
                var destinationId = $find(SearchReferences.ListDestination)._value.split('|')[0];


                FareFinder.Step2.ModifySearch();
                //$("#step2ModifySearchPanel").show();

                FareFinder.ShowWait(true);

                window.setTimeout(function () {
                    Greyhound.Website.Services.FareFinderService.IsCrossCountryLocation(originId, destinationId, _search_complete_IsCrossCountryLocation, _search_error_IsCrossCountryLocation, null);
                }, 0);
                return true;

            } else {
                $v.removeClass('hidden');
                displayInvalidFields(errors); //CHG40010
            }

            return false;

        },
        /*****END IsCrossBorder *****/
        //END
        //Submit: function() {
        /*End Express*/
        Submit: function (showExpressPopup) {

            if (showWaitPopup) //To avaoid javascript error for express od pairs  //  added by prachi for INC6782667 Cross-Border Enhancement
                FareFinder.ShowWait(true); //  added by prachi for INC6782667 Cross-Border Enhancement
            /*CHG40010*/
            var errors = new Array();
            /*End*/
            // Quick helper functions
            var getVal = function (id) {
                return $('#' + id).val();
            };
            var getListVal = function (id) {
                return $find(id).get_selectedItem().get_value();
            };
            var getListInt = function (id) {
                return parseInt(getListVal(id), 10);
            };

            /*CHG40010*/
            var addError = function (error) {
                errors.push(error);
            };
            var clearError = function (controlId) {
                var $control = $(controlId);

                $control.removeClass('errorHilited');
                $control.find('.astrk').remove();
            };

            var showErrors = function (e, errorType) {
                var flag = false;

                for (var i = 0; i < e.length; i++) {
                    if (e[i].ErrorType == errorType) {
                        e[i].AssociateControl.addClass('errorHilited');
                        e[i].AssociateControl.append('<span class="astrk"> *</span>');
                        flag = true;
                    }
                }

                return flag;
            };
            var displayInvalidFields = function (e) {
                if (showErrors(e, ErrorType.RequiredField)) {
                    $('#validationError').html(FareFinder.Strings.Purchase.RequiredMessage);
                }
                else {
                    for (var i = 0; i < e.length; i++) {
                        e[i].AssociateControl.addClass('errorHilited');
                        e[i].AssociateControl.append('<span class="astrk"> *</span>');
                        $('#validationError').html(e[i].ErrorMessage);
                        return;
                    }
                }
            };
            var locationValidate = function (sender, associateControlId) {
                clearError(associateControlId);
                var item = sender.get_selectedItem();

                if (item == null) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                return item.get_value();
            };

            var dateValidate = function (dateStr, dateSlot, dateSperator, associateControlId) {
                if ($.isblank(dateStr)) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                var date = getJavascriptDate(dateStr, dateSlot, dateSperator);

                if (date == null) {
                    // TODO: Replace the error message from RequiredMessage to InvalidDateMessage
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.RequiredField, ErrorMessage: FareFinder.Strings.Purchase.RequiredMessage });
                    return null;
                }

                return date;
            };
            //Below function modified for Date Issue for leaving for today occured during INC2324664/CHG49753 - 31st Date Issue
            var departDateValidate = function (sender, associateControlId) {
                clearError(associateControlId);
                var minDate = new Date(sender.get_minDate().getFullYear(), sender.get_minDate().getMonth(), sender.get_minDate().getDate(), 0, 0, 0, 0);
                var maxDate = new Date(sender.get_maxDate().getFullYear(), sender.get_maxDate().getMonth(), sender.get_maxDate().getDate(), 0, 0, 0, 0);
                var departDate = dateValidate(sender.get_dateInput().get_textBoxValue(), sender._dateInput._dateFormatInfo._data.DateSlots, sender._dateInput._dateFormatInfo.DateSeparator, associateControlId);

                //Added new by Swapnil  for INC6839578 
                if ((departDate != null) && (departDate > maxDate)) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDepartDateMessage });
                    return null;
                }
                else if ((departDate != null) && (departDate < minDate)) {
                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDepartDateLessThanSystemDateMessage });
                    return null;
                }
                /*End*/
                return departDate;
            };
            //Below function modified for Date Issue for leaving for today occured during INC2324664/CHG49753 - 31st Date Issue
            var returnDateValidate = function (sender, departDate, associateControlId) {
                clearError(associateControlId);
                //Added new by Swapnil  for INC6839578 
                var CurrentDateTime = new Date();
                var CurrentDate = new Date(CurrentDateTime.format('MM/dd/yyyy'));
                /*End*/

                var minDate = new Date(sender.get_minDate().getFullYear(), sender.get_minDate().getMonth(), sender.get_minDate().getDate(), 0, 0, 0, 0);
                var maxDate = new Date(sender.get_maxDate().getFullYear(), sender.get_maxDate().getMonth(), sender.get_maxDate().getDate(), 0, 0, 0, 0);
                var returnDate = dateValidate(sender.get_dateInput().get_textBoxValue(), sender._dateInput._dateFormatInfo._data.DateSlots, sender._dateInput._dateFormatInfo.DateSeparator, associateControlId);
                //Added new by Swapnil  for INC6839578 
                if ((departDate != null && returnDate != null) && (returnDate > maxDate)) {

                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidReturnDateMessage });
                    return null;
                }

                else if ((departDate != null && returnDate != null) && (returnDate < maxDate && returnDate >= CurrentDate && returnDate < departDate)) {

                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidReturnDateDepartDateMessage });
                    return null;
                }
                else if ((departDate != null && returnDate != null) && ((returnDate < CurrentDate) && (departDate < CurrentDate))) {

                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDepartDateLessThanSystemDateMessage });
                    return null;
                }
                else if ((departDate != null && returnDate != null) && (returnDate < CurrentDate)) {

                    addError({ AssociateControl: $(associateControlId), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDepartDateLessThanSystemDateMessage });
                    return null;
                }
                return returnDate;
            };

            /*Start BugZilla 8029*/
            var timeValidate = function (sender, required) {
                var date = sender.get_selectedDate();
                var results = {
                    'Valid': !required || (date != null),
                    'Value': date != null ? date.getHours() : null
                };

                return results;
            };
            /*End 8029*/

            /*End*/

            /*CHG40010*/
            // Gather Data
            var valid = true;
            var rt = $("input[name='tripType']:checked").val() == 2;

            var adults = getListInt(SearchReferences.ListAdults);
            var seniors = getListInt(SearchReferences.ListSeniors);
            var children = getListInt(SearchReferences.ListChildren);

            var promoCode = getVal(SearchReferences.PromoCode);
            var discountCode = getListVal(SearchReferences.ListDiscounts);

            var card = getVal(SearchReferences.Card);
            var cardExpiration = getListVal(SearchReferences.CardExpiration);

            var listOrig = $find(SearchReferences.ListOrigin);
            var listDest = $find(SearchReferences.ListDestination);

            var dateDepart = $find(SearchReferences.DateDepart);
            var dateReturn = $find(SearchReferences.DateReturn);

            var timeDepart = $find(SearchReferences.TimeDepart);
            var timeReturn = $find(SearchReferences.TimeReturn);

            var dataOrig = locationValidate(listOrig, '#titleOrigin');
            var dataDest = locationValidate(listDest, '#titleDestination');


            if (dataOrig == dataDest)
                addError({ AssociateControl: $('#titleDestination'), ErrorType: ErrorType.InvalidField, ErrorMessage: FareFinder.Strings.Purchase.InvalidDestinationMessage });

            var dataDepartDate = departDateValidate(dateDepart, '#titleDepart');
            var dataReturnDate = rt ? returnDateValidate(dateReturn, dataDepartDate, '#titleReturn') : null;

            $v = $('#validationError');
            /*END*/

            if (errors.length == 0) {//CHG40010
                $v.addClass('hidden');

                if (adults + seniors + children <= 0) {
                    showValidationAlert(String.format(FareFinder.Strings.Search.NoPassengersMessage), 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }

                if (adults + seniors + children > FareFinder.Settings.MaxPassengers) {
                    //alert(String.format(FareFinder.Strings.Search.MaxPassengersMessage, FareFinder.Settings.MaxPassengers));
                    showValidationAlert(String.format(FareFinder.Strings.Search.MaxPassengersMessage, FareFinder.Settings.MaxPassengers), 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }

                if ((children > 0) && (adults + seniors == 0)) {
                    //alert(FareFinder.Strings.Search.NoChildrenMessage);
                    showValidationAlert(FareFinder.Strings.Search.NoChildrenMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
                    return false;
                }
                /*Start Express*/
                //code to show the Express Service popup
                //First, we will call FareFinder.SearchControl.IsExpressODPair
                //If that returns true, we will display the popup
                //The "close" button on the popup will call FareFinder.SearchControl.Submit(false)
                //The "Book Now" button on the popup will redirect to /Express/WhereWeGo.aspx
                //If it returns false, we will just call FareFinder.SearchControl.Submit(false) from here

                // mfreder 2-18-2011 get o/d info from promo search and changed name of method to show promo popup
                if (Common.Strings.Culture == "en" && showExpressPopup) {
                    var promoMatch = FareFinder.SearchControl.IsExpressODPair();
                    if (promoMatch.Found) {
                        // show popup and if popup cannot be found, then continue with submit
                        FareFinder.ShowWait(false); //  added by prachi for INC6782667 Cross-Border Enhancement
                        showWaitPopup = true; //  added by prachi for INC6782667 Cross-Border Enhancement
                        var popup = $('#' + promoMatch.Origin.DivName);
                        if (popup.length != 0) {
                            $(popup).modal({
                                close: false,
                                opacity: 80,
                                overlayId: 'modal-overlay'
                            }).focus();
                            return false;
                        }
                    }
                }
                /*End Express*/


                var q = new Greyhound.Website.DataObjects.ClientSearchRequest();

                q.Mode = SearchReferences.Mode;
                /*CHG40010*/
                q.Origin = dataOrig;
                q.Destination = dataDest;

                //q.Departs = dataDepartDate;
                //q.Returns = dataReturnDate;
                /* INC2098219 */
                if (dataDepartDate != null) {
                    //  Added by Ganesh -  21/3 - CHG55150/INC3231408/INC3223722
                    q.Departs = dataDepartDate.toValidDateStringFormat();
                }
                else {
                    q.Departs = dataDepartDate;
                }
                if (dataReturnDate != null) {
                    //  Added by Ganesh -  21/3 - CHG55150/INC3231408/INC3223722
                    q.Returns = dataReturnDate.toValidDateStringFormat();
                }
                else {
                    q.Returns = dataReturnDate;
                }

                q.TimeDeparts = timeValidate(timeDepart, false).Value;
                q.TimeReturns = timeValidate(timeReturn, false).Value;
                /*End*/

                q.RT = rt;

                q.Adults = adults;
                q.Seniors = seniors;
                q.Children = children;

                q.PromoCode = promoCode;
                q.DiscountCode = discountCode;

                q.Card = card
                q.CardExpiration = cardExpiration;
                q.FareFinderDatakey = window.name.toString(); //Added to store the unique session key in the request

                //FareFinder.ShowWait(true); //  commented by prachi for INC6782667 Cross-Border Enhancement

                window.setTimeout(function () {
                    Greyhound.Website.Services.FareFinderService.Search(q, _search_complete, _search_error, null);
                }, 0);

                return true;

            } else {
                $v.removeClass('hidden');
                displayInvalidFields(errors); //CHG40010
            }

            return false;
        },
        /*Start Express */
        // mfreder 2-18-2011 
        GetPromoPopupMatchResult: function () {
            return _promoPopupMatchResult;
        },
        /*End Express*/
        Initialize: function () {

            /* $("input[name='tripType']")
            .click(function() {
            var display = ($("input[name='tripType']:checked").val() == 2);
            $.each(
            ['#w_return1', '#w_return2'],
            function(index, value) { $(value).setShow(display); }
            );
            });
            */
            var $tti = $("input[name='tripType']");

            $tti
				.click(function () {
				    var display = ($("input[name='tripType']:checked").val() == 2);
				    $.each(
        				['#w_return1', '#w_return2'],
        				function (index, value) { $(value).setShow(display); }
        			);
				});


            if (SearchReferences.RT == 2) {
                $tti.eq(1)[0].checked = true;
                $tti.eq(1).trigger('click');
            }
            $('#ticketsSearchSchedules').click(function (e) {
                //debugger;
                e.preventDefault();
                /*added by prachi for INC6782667 Cross-Border Enhancement */
                // FareFinder.SearchControl.IsCrossCountryLocation();
                //END
                var validateSearch = true;
                //validateSearch = FareFinder.SearchControl.Submit(true); /*commented by prachi for INC6782667 Cross-Border Enhancement */
                validateSearch = FareFinder.SearchControl.IsCrossCountryLocation();
                /*added by prachi for INC6782667 Cross-Border Enhancement */
                var pageUrl = window.location.href.toLowerCase();
                if (pageUrl.indexOf("step2") < 0) {

                    //prachi 
                    if (validateSearch == true) {
                        showmodifySearch(); /*added by prachi for INC6782667 Cross-Border Enhancement */
                    }
                }

                //---------------------------

            });
            /*Start Express*/
            // mfreder 2-18-2011 generic close for any popup 
            //TODO:change name to 'popupClose'
            $('.expClose').click(function (e) {
                e.preventDefault();
                $.modal.close();
                FareFinder.SearchControl.Submit(false);
            });

            // mfreder 2-18-2011 initialize popup origins
            //We only offer the promo from the Home Page search box
            if (SearchReferences.Mode == 0) {
                Greyhound.Website.Services.PromoPopupService.GetOrigins(_get_popuporigins_complete, _get_popuporigins_error);
            }
            /*End Express*/

            $('#validationError').html(FareFinder.Strings.Purchase.RequiredMessage);

            if ($.browser.mozilla) {
                $(document).ready(function () {
                    FareFinder.SearchControl.CommonLinkCalenders(); //mearge code in single function CommonLinkCalenders 
                });
            } else {
                Sys.Application.add_load(function () {
                    FareFinder.SearchControl.CommonLinkCalenders(); //mearge code in single function CommonLinkCalenders 
                });
            }
        },
        //Aftab: Separated out date selection changes 
        CommonLinkCalenders: function () {
            Common.LinkCalendars(SearchReferences.DateDepart, SearchReferences.DateReturn);

            if (typeof (Rewards) !== 'undefined' && Rewards != null) {
                Rewards.AfterLogout(function (context) { FareFinder.SearchControl.RemoveRewards() });
            }
        }
        //End Separated Code
    };

    //#endregion
} ();

//#endregion

//#region FareFinder.Step1

FareFinder.Step1 = function() {
    //#region Public Methods
    return {
        Initialize: function() {
            FareFinder.SearchControl.Initialize();
        }
    }
    //#endregion
} ();

//#endregion

//#region FareFinder.Step2

FareFinder.Step2 = function() {
    //#region Private Variables

    var _data = null;
    var _fCnt = null;
    var _found_outbound = false;
    var _found_return = false;
    var _adults = 0;  // set in _handleResults
    var _seniors = 0;
    var _children = 0;
    var _totalPax = 0;
    var FARE_LIMIT_ZERO_MARGIN = 0;  // when all fares are sold, trips still reports 0 left, so 0 = "sold out" or "none left".
    var SEAT_LIMIT_ZERO_MARGIN = 0;  // when all seats are sold, trips reports 0 left, so 0 = "sold out" or "none left".
    var COUNTDOWN_THRESHOLD = 5;     // at 5 or less, show number of fares or seats left.

    //#endregion

    //#region Private Methods

    var _confirm_complete = function(r, c) {

        if (!r.DRM) {
            /* Added by kittu for Round Trip Fare Quotes*/
            if (r.Valid && !r.IsPriceConflict) {
                /*/
                Added by Ganesh | 5/24/2012
                CHG56691 - CC - Cardholder Not Traveling Content Change
                */
                if ((window.name != null) || (window.name.length != 0))

                {

                    top.location.href = 'step3.aspx?cht=N&SessionId=' + window.name;
                    window.location = 'step3.aspx?SessionId=' + window.name;

                    //Fortify fixed
                    //top.location.href = '<%=Resources.GetString("STEP3_COMPLETEURL")%>'.concat(window.name);
                    //window.location = 'step3.aspx?SessionId='.concat(window.name);
                    //Fortify fixed end
                }
                return; 
            }
            if (r.IsPriceConflict) {
                var h = new Sys.StringBuilder();
                h.appendFormat(FareFinder.Strings.Schedule.PriceConflictMessages, r.KeyOutBoundFare, r.PriceConfirmationResponceFare)
                var radwnd = 'PriceConflictRadWindow';

                var pageUrl = window.location.href;

                // if (pageUrl.indexOf('step2') > 0)
                showRadPopup('PriceConflictPanelContent', FareFinder.Strings.Schedule.PriceConflictTitle, h.toString(), radwnd);
                //else {
                //RadWindowManager3
                //showCardHolderNotTrvellingRadPopup('PriceConflictPanelContent', FareFinder.Strings.Schedule.PriceConflictTitle, h.toString(), radwnd);
                //}
            }
            else if (r.Status == 'TimedOut') {
                showTimeOutAlert(FareFinder.Strings.Schedule.TimeOut, 0, 100, FareFinder.Strings.ValidationAlertTitle);
            }
            else if (r.Status == 'Error') {
                showValidationAlert(FareFinder.Strings.Schedule.FaresErrorMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
            }
            else {
                //alert('not valid');
                showValidationAlert(FareFinder.Strings.Schedule.PriceConflictMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
            }
        }
        FareFinder.ShowWait(false)
    };

    var _confirm_error = function(e, c) {
        //alert('validate_error: ' + e.get_message());
        var errorMsg = e.get_message();

        if (errorMsg.indexOf('fare index lookup error') > 0) {
            showValidationAlert(FareFinder.Strings.Purchase.PurchaseDeclinedMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
        }
        else if (errorMsg.indexOf('PurchaseMaster') >= 0) {
            showValidationAlert(FareFinder.Strings.Purchase.PurchaseDeclinedMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
        }
        else if (errorMsg.indexOf('AdjustfareIndex') > 0) {
            showValidationAlert(FareFinder.Strings.Purchase.PurchaseDeclinedMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
        }
        else {
            showTimeOutAlert(FareFinder.Strings.Schedule.TimeOut, 0, 100, FareFinder.Strings.ValidationAlertTitle);
        }
        FareFinder.ShowWait(false)
    };

    var _handleResults = function(r, permitRedirect, init) {

        if (!r.Valid && permitRedirect) {
            window.location = 'step1.aspx';
            return;
        }

        _data = r;
        _fCnt['f1'] = 0, _fCnt['f2'] = 0, _fCnt['f3'] = 0, _fCnt['f4'] = 0;
        _found_outbound = false; _found_return = false;

        $('#head_dateDepart').text(r.DisplayDepartDate);
        $('#head_dateReturn').text(r.DisplayReturnDate);

        var $holder = $('#return_holder');
        var filterVis, dataDepart = null, dataReturn = null;

        if (r.Valid) {
            dataDepart = r.SchedulesDepart;
            dataReturn = r.RT ? r.SchedulesReturn : null;
            filterVis = ":visible";
        }
        else
            filterVis = ":hidden";

        // Now, render the data
        $('.sr_dest').text(r.DestinationCity + ', ' + r.DestinationState);
        $('.sr_orig').text(r.OriginCity + ', ' + r.OriginState);
        var $tDepart = $('#tableDepart');

        //Aftab: Bug 8399,
        var $express_reservation = $('#express_reservation');
        $express_reservation.hide();

        //_renderGrid($tDepart, dataDepart, r.KeyOutbound, r.DRM, true);

        // mfreder 3/17/2011 get the passenger counts
        _adults = getListInt(SearchReferences.ListAdults);
        _seniors = getListInt(SearchReferences.ListSeniors);
        _children = getListInt(SearchReferences.ListChildren);
        _totalPax = _children + _seniors + _adults;

        var avlbDepartValue = false;
        avlbDepartValue = _renderGrid($tDepart, r.SchedulesDepart, r.KeyOutbound, r.DRM, r.Valid, true);

        if (r.RT) {
            //_renderGrid($('#tableReturn'), dataReturn, r.KeyReturn, r.DRM, false);
            _renderGrid($('#tableReturn'), r.SchedulesReturn, r.KeyReturn, r.DRM, r.Valid, false);
            if (_found_return)
                $("input[name='fareO']:checked", $tDepart).trigger('click');
            $holder.show();
        }
        else {
            $holder.hide();
        }

        //-----------added by prachi on 10 Jun 2013 INC5407272 to hide continue button and online discount applied text
        if (r.SchedulesDepart.length == 0 || avlbDepartValue == false) {
            $('#td_steps_continue').hide();
        }
        else {
            $('#td_steps_continue').show();

        }
        //------------------------------------------------------------------------------------------------------

        var $discounts = $('#discounts_holder');
        //express flag


        if (r.Discounts && r.Discounts.length > 0) {
            var $list = $('<ol class="discounts_list"/>');
            for (var i = 0; i < r.Discounts.length; i++) {
                $list.append(
                        $('<li/>')
                            .append($('<sup/>').text(r.Discounts[i][0]))
                            .append(' ' + r.Discounts[i][1])
                    );
            }
            $discounts.html('').append($list).show();
            //Code Added by Chandan for INC4190031-Code-BR_CHG61946
            //$express_reservation.show();
        } else {
            $discounts.hide();
        }

        var canContinue = !r.DRM && (dataDepart.length);

        if (r.RT)
            canContinue = canContinue && dataReturn.length;

        $('.continueBtn').setShow(canContinue);
        $('#validationErrorS').addClass('hidden');

        FareFinder.ShowWait(false);

        /*if ($("#step2ModifySearchPanel").is(filterVis))
        window.setTimeout(function() { $("#modifySearchLink").trigger('click'); }, 0);*/
        if (init) {
        } else {
            if ($("#step2ModifySearchPanel").is(filterVis))
                window.setTimeout(function() { $("#modifySearchLink").trigger('click'); }, 0);
        }
    };

    //var _renderGrid = function($table, data, key, drm, outbound) {
    var _renderGrid = function($table, data, key, drm, valid, outbound) {
        //#INC612308 Start
        var valTrue = "false";
        var firstCheck = "false";

        $table.find('tr:not(:first-child)').remove();
        $table.find('tr:eq(0) a').each(function() { $(this).data('dir', 'a'); });

        if (!valid)
            return;

        var renderFare, fareClass;

        if (outbound) {
            renderFare = _renderFareO;
            fareClass = 'fareS';
        } else {
            renderFare = _renderFareR;
            fareClass = 'fareU';
        }

        var $tbody = $('> tbody', $table);

        var id = $table.attr('id');
        var h = new Sys.StringBuilder();
        // Added by deepika - Step 2 Not Loading Schedules Correctly in Greyhound.ca
        var checkifexists = h.appendFormat;
        if (checkifexists == undefined || checkifexists == null) {
            prototypeAppendFormat();
        }
        var dateText = new Date();

        if (data.length) {
            for (var m = 0; m < data.length; m++) {
                if (firstCheck == 'false') {
                    var str = data[m].Available;
                    if ((str == true)) {
                        valTrue = "true";
                        firstCheck = "true";
                        break;
                    }
                }
            }
        }

        var rowIndex = 0;

        if (valTrue == 'true') {
            /*Aftab: Bug 8223*/
            //Inserted code snippet to get departure date with time and if condition to check the departure time is not in 30 min duration of todays date
            var checkBetweenDates = { todaysDate: null, todaysDateAddMin: null, deptDate: null };

            checkBetweenDates.todaysDate = new Date();
            checkBetweenDates.todaysDateAddMin = new Date()
            checkBetweenDates.todaysDateAddMin.setMinutes(checkBetweenDates.todaysDate.getMinutes() + 30);
            var meargDateTime;
            var deptDateTime;
            var isScheduleAvailable = false;
            var isScheduleInBetweenTodaysDates = false
            var tempDate;
            for (var iDate = 0; iDate < data.length; iDate++) {
                if (data[iDate].Available) {
                    tempDate = data[iDate].DepartureDate;
                    tempDate = tempDate.replace(new RegExp('-', 'g'), '/');
                    deptDateTime = new Date(tempDate); //data[iDate].DepartureDate);
                    if (checkBetweenDates.todaysDateAddMin.getTime() < deptDateTime.getTime()) {
                        isScheduleAvailable = true;
                        break;
                    }
                }
            }


            var isExpressPair;
            if (COMPANY_CODE != null && COMPANY_CODE == "CA") {
                isExpressPair = FareFinder.SearchControl.IsMicroSiteExpressODPair();
            }
            else {
                isExpressPair = { Found: false, Origin: null, Destination: null };
            }
            /*/
            Added by Ganesh | 5/24/2012
            CHG56691 - CC - Cardholder Not Traveling Content Change
            */
            var requestFromStep3 = window.location.href.lastIndexOf('CardHolderNotTravel.aspx');
            if (isScheduleAvailable) {
                for (var x = 0; x < data.length; x++) {
                    //if (data[x].Available) {
                    var i = data[x];
                    var odd = (rowIndex & 1);

                    var rowID = id + '_r' + rowIndex;
                    var detailID = id + rowIndex + 'detail';

                    var hover = FareFinder.GetHoverStyle(odd);
                    h.appendFormat('<tr id="{0}" class="outerRow"><td class="routeRow{1}" onmouseover="this.style.border=\'{2}\'" onmouseout="this.style.border=\'{3}\'">', rowID, odd ? '' : 'Shaded', hover.On, hover.Off);
                    /*/
                    Added by Ganesh | 5/24/2012
                    CHG56691 - CC - Cardholder Not Traveling Content Change
                    */

                    h.append('<table width="763" border="0" cellspacing="0" cellpadding="0" style="font-size:8pt; margin:0 0 8px 0;"><tbody>');
                    h.append('<tr valign="top" align="left" class="innerRow">');
                    h.appendFormat('<td class="ptStep2departCol">{0}</td>', i.DisplayDeparts);
                    h.appendFormat('<td class="ptStep2arriveCol">{0}</td>', i.DisplayArrives);

				// **************************************************************
				// Apply the fare icon under the Travel Time column here...
				if (i.TravelTimeImageUrl)
					h.appendFormat('<td class="ptStep2travelTimeCol">{0} <br/> <img src="' + i.TravelTimeImageUrl + '" title="' + i.TravelTimeImageTooltip + '" style="max-height: 30px;"/></td>', i.Time);
				else
					h.appendFormat('<td class="ptStep2travelTimeCol">{0}</td>', i.Time);


                    h.appendFormat('<td class="ptStep2transfersCol">{0}</td>', i.Transfers);

                    /*Aftab: Bug 8223*/
                    //Inserted code snippet to get departure date with time and if condition to check the departure time is not in 30 min duration of todays date
                    isScheduleInBetweenTodaysDates = false
                    tempDate = i.DepartureDate;
                    tempDate = tempDate.replace(new RegExp('-', 'g'), '/');
                    deptDateTime = new Date(tempDate);
                    checkBetweenDates.deptDate = deptDateTime;
                    if (checkBetweenDates.todaysDate.getTime() <= deptDateTime.getTime() && checkBetweenDates.todaysDateAddMin.getTime() >= deptDateTime.getTime()) {
                        isScheduleInBetweenTodaysDates = true;
                    }

                    
                    if (requestFromStep3 == -1) {
                        h.appendFormat('<td class="ptStep2f1 {0}">{1}</td>', fareClass, renderFare(rowID, 'f1', i, i.Fare1, key, drm, isScheduleInBetweenTodaysDates));
                    }
                    h.appendFormat('<td class="ptStep2f2 {0}">{1}</td>', fareClass, renderFare(rowID, 'f2', i, i.Fare2, key, drm, isScheduleInBetweenTodaysDates));
                    h.appendFormat('<td class="ptStep2f3 {0}">{1}</td>', fareClass, renderFare(rowID, 'f3', i, i.Fare3, key, drm, isScheduleInBetweenTodaysDates));
                    h.appendFormat('<td class="ptStep2f4 {0}">{1}</td>', fareClass, renderFare(rowID, 'f4', i, i.Fare4, key, drm, isScheduleInBetweenTodaysDates));
                    /*End 8223*/
                    h.append('</tr>');

                    if (requestFromStep3 == -1) {

                        //Start: Aftab, INC2523682, Added width to class to avoid misallignment on the page.
                        h.append('<tr><td colspan="4" class="ptStep2faremessageRow">');
                        //End INC2523682
                        // mfreder 4-5-2011 added seats available checking and retained fare limit checking
                        // when seats avaiable = -1 means disregard seats available checking (maybe in drm or schedule not in seats available file/table)
                        // only check fare limits for fare2 and fare3
                        var fareMessage = "";
                        if (i.Fare2.Limit != null && (i.Fare2.Limit - FARE_LIMIT_ZERO_MARGIN) <= COUNTDOWN_THRESHOLD && (i.Fare2.Limit - FARE_LIMIT_ZERO_MARGIN) > 0) {
                            fareMessage = fareMessage + (i.Fare2.Limit - FARE_LIMIT_ZERO_MARGIN) + " " + FareFinder.Strings.Schedule.AdvancedPurchaseFaresLeft;
                        }
                        if (i.Fare3.Limit != null && (i.Fare3.Limit - FARE_LIMIT_ZERO_MARGIN) <= COUNTDOWN_THRESHOLD && (i.Fare3.Limit - FARE_LIMIT_ZERO_MARGIN) > 0) {
                            if (fareMessage.length > 0) {
                                fareMessage = fareMessage + " ";
                            }
                            fareMessage = fareMessage + (i.Fare3.Limit - FARE_LIMIT_ZERO_MARGIN) + " " + FareFinder.Strings.Schedule.StandardFaresLeft;
                        }
                        // display message if needed
                        if (i.SeatsAvailable != null && i.SeatsAvailable < 1) {
                            // if sold out then dont show message
                        } else if (i.SeatsAvailable != null && (i.SeatsAvailable - SEAT_LIMIT_ZERO_MARGIN) <= COUNTDOWN_THRESHOLD && i.SeatsAvailable > -1 && ((i.SeatsAvailable - SEAT_LIMIT_ZERO_MARGIN) <= (i.Fare2.Limit - FARE_LIMIT_ZERO_MARGIN) && (i.SeatsAvailable - SEAT_LIMIT_ZERO_MARGIN) <= (i.Fare3.Limit - FARE_LIMIT_ZERO_MARGIN))) {
                            // seat remaining is lower than fares available so show seat message
                            h.appendFormat('<div id="MaximumPassenger">' + FareFinder.Strings.Schedule.ShowMinimumSeatsLeft.replace('{0}', (i.SeatsAvailable - SEAT_LIMIT_ZERO_MARGIN)) + '</div>', (i.SeatsAvailable - SEAT_LIMIT_ZERO_MARGIN));
                        } else if (fareMessage.length > 0) {
                            // show fare limit message
                            h.appendFormat('<div id="MaximumPassenger">' + fareMessage + '</div>');
                        }

                        if (!drm) {
                            h.appendFormat('<a href="#" onclick="FareFinder.ShowDetailsForRoute(this, \'{0}\', \'{1}\');return false;" class="toggleDetailsLink" id="{0}Show" title="{2}">{3}</a>', detailID, i.Key, FareFinder.Strings.Schedule.Detail.ShowTitle, FareFinder.Strings.Schedule.Detail.Show);
                            h.appendFormat('<a href="#" onclick="FareFinder.HideDetailsForRoute(\'{0}\');return false;" class="toggleDetailsLink" id="{0}Hide" style="display:none" title="{1}">{2}</a>', detailID, FareFinder.Strings.Schedule.Detail.HideTitle, FareFinder.Strings.Schedule.Detail.Hide);

                            //show similar travel option link only when the express schedule are sold out.
                            //INC6909965 - Use the seatavailability returned from WHOSINT
                            //Website will show sold out when seats available is less than 1
                            if (COMPANY_CODE != null && COMPANY_CODE == "CA" && isExpressPair.Found && i.SeatsAvailable != null && i.SeatsAvailable < 1) {
                                h.appendFormat('<td colspan="4" class="colHdrOrange similarTravel"><a href="#" onclick="FareFinder.SearchControl.ShowExpressSimilarTravelODPair();" class="colHdrOrange" id="similarTravel" visible ="false">{0}</a></td>', FareFinder.Strings.Schedule.SimilarTravelOption);
                            } else {
                                h.append('<td colspan="4">&nbsp;</td>');
                            }
                            h.append('</tr><tr><td colspan="8">');
                            h.appendFormat('<div class="routeDetailsTable" id="{0}"/>', detailID);
                            h.append('</td>');
                        }
                    }
                    h.append('</td></tr></tbody></table></td></tr>');
                    rowIndex++;
                    //} //End of If Statement 
                } //End of For Loop

                $tbody.append(h.toString());
                $tbody.find('tr.outerRow').each(function(index) {
                    $(this).data('sort', data[index].Sort);
                });

                //Jan 2014- Deepika - INC7215225-"Similar Travel Options" code update in .CA
                if (isExpressPair.Found) {
                    //initially hide the similar travel link
                    $('.similarTravel').hide();
                    $("#similarTravel").hide();

                    if (_locationSimilarTravelOrigins != null)
                        CheckSimilarTravelExists();
                }
            } //End of If condition


        } //End of valTrue If condition

        if ((valTrue == 'false') || (rowIndex == 0)) {
            var rowID = id + '_r' + x;
            if (valTrue != 'false')
            { _noScheduleErrors(FareFinder.Strings.Schedule.TimeLimitSchedules, rowID, h, $tbody); }
            else {
                _noScheduleErrors(FareFinder.Strings.Schedule.NoSchedules, rowID, h, $tbody);
            }
            return false;
        }
        return true;
        //#INC612308 End 
    };
    //Aftab: Bug 8223, created new function for common code changes
    var _noScheduleErrors = function(strError, rowID, h, $tbody) {
        var odd = false;

        var hover = FareFinder.GetHoverStyle(odd);

        h.appendFormat('<tr id="{0}" class="outerRow"><td class="routeRow{1}" onmouseover="this.style.border=\'{2}\'" onmouseout="this.style.border=\'{3}\'">', rowID, odd ? '' : 'Shaded', hover.On, hover.Off);

        h.append('<table width="763" border="0" cellspacing="0" cellpadding="0" style="font-size:8pt; margin:0 0 0px 0;"><tbody>');
        h.append('<tr valign="top" align="left" class="innerRow">');
        h.appendFormat('<td class="ptStep2NoSched">{0}</td>', strError);
        h.append('</tr></tbody></table>');
        h.append('</td></tr>');

        $tbody.append(h.toString());
    };
    var _renderFareO = function(rowID, fareCategory, sched, fare, key, drm, isScheduleInBetweenTodaysDates) {

        if (sched.Available) {
            if (fare && fare.Available) {
                if (isScheduleInBetweenTodaysDates != true) {
                    _fCnt[fareCategory]++;
                    var id = rowID + fareCategory, checked = null;
                    if (!_found_outbound) {
                        if (fare.Key == key) {
                            checked = 'checked="true"';
                            _found_outbound = true;
                        }
                    }

                    // use _totalPax for counts

                    //sold out and/or fare limit reached ....
                    //fare.Limit is set 1 as per BRD "The exception is when the last seat on the bus has been sold the system will still report 1 fare available for each type"

                    //INC6909965 - Use the seatavailability returned from WHOSINT
                    //Website will show sold out when seats available is less than 1
                    if ((fare.Limit != null && fare.Limit <= FARE_LIMIT_ZERO_MARGIN) || sched.SeatsAvailable < 1) {
                        return String.format(
                            '<label>{0}</label>',
                            FareFinder.Strings.Schedule.SoldOut
                        );
                    }
                    else if (drm) {
                        return String.format(
                            '<label>{0}{1}</label>',
                            fare.Total,
                            String.format("<sup>{0}</sup>", fare.Discount ? fare.Discount : "")
                        );

                    } else {
                        return String.format(
                            '<label for="{0}"><input type="radio" name="fareO" id="{0}" value="{1}" class="fareRadioO" {2} onclick="FareFinder.Step2.FareSelected(this, \'{3}\');  FareFinder.Step2.checkAvailability(this,{6}, {7}, {8});" />{4}{5}</label>',
                            id,
                            fare.Key,
                            fare.Key == key ? 'checked="true"' : null,
                            fareCategory,
                            fare.Total,
                            String.format("<sup>{0}</sup>", fare.Discount ? fare.Discount : ""),
                            _totalPax,
                            fare.Limit ? fare.Limit : 255,
                            sched.SeatsAvailable
                        );
                    }
                } // End of IF isScheduleInBetweenTodaysDates
                else
                    return '<span class="notAvailable">' + FareFinder.Strings.Schedule.NA + '</span>';
            }
        }
        return '<span class="notAvailable">-</span>';
    };

    var _renderFareR = function(rowID, fareCategory, sched, fare, key, drm, isScheduleInBetweenTodaysDates) {

        if (sched.Available && (_fCnt[fareCategory] > 0)) {
            var id = rowID + fareCategory;
            var checked = null;
            if (!_found_return) {
                if (sched.Key == key) {
                    checked = 'checked="true"';
                    _found_return = true;
                }
            }
            //sold out
            // 4/1/2011 - there is no seat information for return schedules.  as per tim therrian, assume return seat count is the same as the outbound seat count.
            // that being the case we will not look at seat availability nor act on it here.   allow all that to happen in the outbound scheudle.

            //INC6909965 - Use the seatavailability returned from WHOSINT
            //Website will show sold out when seats available is less than 1
            //sold out and/or fare limit reached ....
            if (sched.SeatsAvailable < 1) {
                return String.format(
                            '<label>{0}</label>',
                            FareFinder.Strings.Schedule.SoldOut
                        );
            }
            else if (drm) {
                return String.format(
                        '<label>{0}</label>',
                        FareFinder.Strings.Schedule.Included
                    );
            } else {
                return String.format(
                        '<label for="{0}"><input type="radio" name="fareR" id="{0}" value="{1}" class="fareRadioR {2}" {3} style="display:none;"/>{4}</label>',
                        id,
                        sched.Key,
                        fareCategory,
                        checked,
                        FareFinder.Strings.Schedule.Included
                    );
            }
        }
        return '<span class="notAvailable">-</span>';
    };

    //#endregion

    //#region Public Methods

    return {

        checkAvailability: function(sender, totalPax, faresAvailable, seatsAvailable) {
            var msg = "";
            if (seatsAvailable > -1 && (seatsAvailable - SEAT_LIMIT_ZERO_MARGIN) <= (faresAvailable - FARE_LIMIT_ZERO_MARGIN)) {
                msg = FareFinder.Strings.Schedule.WillExceedSeatsAvailable;
                if ((seatsAvailable - SEAT_LIMIT_ZERO_MARGIN) < totalPax) {
                    alert(msg.replace("{0}", (seatsAvailable - SEAT_LIMIT_ZERO_MARGIN)));
                    $(sender).attr('checked', false);
                }
            } else {
                msg = FareFinder.Strings.Schedule.WillExceedFaresAvailable;
                if ((faresAvailable - FARE_LIMIT_ZERO_MARGIN) < totalPax) {
                    alert(msg.replace("{0}", (faresAvailable - FARE_LIMIT_ZERO_MARGIN)));
                    $(sender).attr('checked', false);
                }
            }
        },

        FareSelected: function(sender, category) {
            var arrives = $(sender).closest('tr.outerRow').data('sort')[1];

            // TODO: Find a way to speed this up.  It's kinda slow in IE
            // We may need to not attach the data like this.  Need to research
            $("#tableReturn input[name='fareR']").each(function() {

                var $this = $(this);
                var $cell = $this.closest('td');
                var $na = $('span.notAvailable', $cell);

                var departs = $cell.closest('tr.outerRow').data('sort')[0];
                var allow_select = (departs >= arrives);

                if (allow_select) {
                    $this.parent().show();
                    $na.remove();
                } else {
                    $this.parent().hide();
                    if ($na.length == 0)
                        $cell.append($('<span class="notAvailable">-</span>'));
                }

                if ($this.hasClass(category)) {
                    $this.show();
                    $cell.removeClass('fareU').addClass('fareS');
                } else {
                    $this.hide().attr('checked', false);
                    $cell.removeClass('fareS').addClass('fareU');
                }
            });
        },

        Sort: function(sender, column) {

            var array = new Array();
            var $sender = $(sender);

            var $table = $sender.closest('table').parent().closest('table');
            var $rows = $('> tbody > tr:gt(0)', $table);

            $rows.each(function() {
                var $this = $(this);
                array.push({ Key: $this.data('sort')[column], Value: $this });
            });

            var sort_func;
            var sort_desc

            if ($sender.data('dir') == 'd') {
                sort_func = function(a, b) { return (a.Key - b.Key); };
                sort_desc = 'a';

            } else {
                sort_func = function(a, b) { return (b.Key - a.Key); };
                sort_desc = 'd';
            }

            array.sort(sort_func);

            for (var i = 0; i < array.length; i++) {
                array[i].Value.appendTo($table);

                var odd = (i & 1);
                var $row = array[i].Value.children('td');

                $row.attr('class', odd ? 'routeRow' : 'routeRowShaded');
                $row[0].style.border = '2px solid ' + (odd ? '#ffffff' : '#dde6eb');
            }

            $table.find('tr:eq(0) a').each(function() { $(this).data('dir', 'a'); });
            $sender.data('dir', sort_desc);
        },

        Submit: function() {

            $('#validationErrorS').addClass('hidden');

            window.setTimeout(function() {

                var $radioO = $("input[name='fareO']:checked");
                var $radioR = $("input[name='fareR']:checked");

                var ivo = ($radioO.length == 0);
                var ivr = (_data.RT && ($radioR.length == 0));

                if (ivo || ivr) {
                    $('#validationErrorS')
                            .removeClass('hidden')
                            .html(
                                (ivo && ivr)
                                    ? FareFinder.Strings.Schedule.ChooseSchedB
                                    : ivo
                                        ? FareFinder.Strings.Schedule.ChooseSchedO
                                        : FareFinder.Strings.Schedule.ChooseSchedR
                            );
                    return;
                }

                var q = new Greyhound.Website.DataObjects.ClientValidateRequest();

                q.RT = _data.RT;
                q.KeyOutbound = $radioO.val();
                q.FareFinderDatakey = window.name;

                if (q.RT)
                    q.KeyReturn = $radioR.val();

                FareFinder.ShowWait(true);

                //GH.ca PCI Fixes - Diwakar
                window.setTimeout(Greyhound.Website.Services.FareFinderService.ConfirmFare(q, _confirm_complete, _confirm_error, null), 0);

            }, 0);
        },

        ModifySearch: function() {
            var $link = $(this);
            // $("#modifySearchLink").addClass('disabled');
            FareFinder.SearchControl.Discount_ChangedFromJS($('#discounts'));
            // $link.attr('class', $link.attr('class') == 'modifySearchLinkOpen' ? 'modifySearchLinkClose' : 'modifySearchLinkOpen');

            //added by prachi so that on every modify serch search panel will get hide/display
            // if ($link.attr('class') == 'modifySearchLinkOpen') {
            $('#modifySearchLink').removeAttr("Href");
            $('#modifySearchLink').removeClass('modifysearchplus');
            $('#modifySearchLink').addClass('modifysearchminus')
            $('#div_main_content').removeClass("roundedBoxMid");
            $('#div_main_content').addClass("newroundedBoxMid");

            $('#div_inner_content').removeClass("class_div_main_content");
            $('#div_inner_content').addClass("newclass_div_main_content");

            $('#div_last_line').css("display", "none");

            return false;
        },

        ModifySearch_new: function() {

            //  $('#div_main_content').css("display", "none");
            FareFinder.Step2.ModifySearch();
            $("#step2ModifySearchPanel").show();
            //$('#div_last_line').css("display", "none");

        },

        Initialize: function(data, modify) {

            /*$("#modifySearchLink").click(function() {
            FareFinder.Step2.ModifySearch();
            return false;
            });
    
                _fCnt = new Array();
    
                $('#tableReturn').html($('#tableDepart').html());
            _handleResults(data, true);
    
                FareFinder.SearchControl.Initialize();
            FareFinder.SearchControl.SetSearchResultHandler(_handleResults);
    
                FareFinder.AddRewardsLogoutHandler();*/

            //        CheckiPhonesBrowser(FareFinder.Strings.IPhoneVersionMessage);
            $('.continueBtn').setShow(false);


            //added by prachi to show plus sign search modify search button on page load  for INC5407272 modify search
            $('#modifySearchLink').removeClass('modifysearchminus')
            $('#modifySearchLink').addClass('modifysearchplus')
            $('#modifySearchLink_new').addClass('modifysearchbottom');
            //--------------------------------------------------------------------
            var $ml = $("#modifySearchLink");
            $ml.click(function() {
                FareFinder.Step2.ModifySearch();
                $("#step2ModifySearchPanel").show();
                // return false;
            });

            var $ml1 = $("#modifySearchLink_new");

            $ml1.click(function() {
                FareFinder.Step2.ModifySearch();
                $("#step2ModifySearchPanel").show();
                // return false;
            });

            //commented by prachi to hide search panel on page load of modify  for INC5407272 modify search
            if (modify) {
                //$("#step2ModifySearchPanel").show();
                //$ml.attr('class', 'modifySearchLinkOpen');
            }

            _fCnt = new Array();

            $('#tableReturn').html($('#tableDepart').html());
            //Aftab: Date issue found on step2 in modify search panel.
            FareFinder.SearchControl.CommonLinkCalenders();
            //End Date Issue.
            FareFinder.SearchControl.Initialize();
            FareFinder.SearchControl.SetSearchResultHandler(function(r, c) {
                if (!r.RedirectUrl) {
                    _handleResults(r, false, false);
                    return true;
                }
                return false;
            });

            FareFinder.AddRewardsLogoutHandler();
            _handleResults(data, true, true);
        }
    };

    //#endregion
} ();

    //#endregion

    //#region FareFinder.Step3

    FareFinder.Step3 = function () {
        //#region Private Members

        var _step = 1;
        var _allow_next = true;
        var _allow_back = true;
        var _country_states = new Object();

        var _pr;
        var _last_priced_deliverymethod;
        var _last_priced_cardholdertraveling;

        //#endregion

        //#region Private Methods

        //#region Events
        var _event_nextstep = function (event) {
            event.preventDefault();
            if (_allow_next) {
                if (_validateStep(_step)) {
                    _step++;
                    _gotostepsub();
                }
            }
        };

        var _event_prevstep = function (event) {
            event.preventDefault();
            if (_allow_back) {
                _step--;
                _gotostepsub();
            }
        };

        var _event_gotostep = function (event) {
            event.preventDefault();
            var stepNum = parseInt(this.id.charAt(4), 10);
            if (stepNum == _step) {
                $("#step" + _step + "content").slideToggle(400);
            } else {
                _step = stepNum;
                _gotostepsub();
            }
        };

        /*/
        Added by Ganesh | 5/24/2012
        CHG56691 - CC - Cardholder Not Traveling Content Change
        This event gets fired when there customer selected "WEB ONLY" fare and select credit card holder travelling as "NO".
        Its shows the new window for selecting new fares other than "WEB ONLY" fares.
        */
        //var _event_selectCreditCardHolder = function (event) {
        //    var fareType = $('.curIntinFareTypeCol').text();
        //    if (fareType.indexOf(FareFinder.Strings.Purchase.WebOnly, 0) > 0) {
        //        var $cardholder = $("input[name='cardHolder']:checked");
        //        qs_selectedCardHolderType = $cardholder.val();
        //        if ($cardholder.length != 0 && $cardholder.val() == 'N') {
        //            var radwnd = $("div[id$=CreditCardHolderNotTravelWindow]").attr("id");
        //            Common.ShowRad(850, 600, window.name, "", 'CardHolderNotTravel.aspx?SessionId=' + window.name, true, true);
        //        }
        //    }
        //}

        var _event_changedelivery = function (event) {
            var method = $(this).val();
            /*Start ST42*/
            /*Start Bugzilla 8085*/
            method == 'WC' ? $('#passwrdWC').show() : $('#passwrdWC').hide();
            /*End*/
            /*End*/
            if (_country_states[method] != null) {
                _changedeliverypopulate(method);
                return;
            }
            Greyhound.Website.Services.FareFinderService.GetCountriesStates(method, _callback_changedelivery_complete, _callback_changedelivery_error, method);
        };

        /* Start INC7511877 - Print at Home Verbiage Update for Greyhound CA */
        /* Added for previous button pop up */
        var _event_ShowWillCallifAvailable = function (event) {
            var selectedVal = "";
            var Culture = Common.Strings.Culture;
            var method = $(this).val();
            var $delivery = $("#delivery input[name='ticketDeliveryChoice']:checked");

            if ($delivery.val() == "EM") {

                var radwnd1 = "RadPrintathomeTicketPurchase";

                closeRadPopupMessage(radwnd1);
                var id = "deliveryWC";
                var deliveryWC = $('tr[id*=deliveryWC]');
                var deliveryWCCls = $('tr[class=deliveryWC]');
                //var dupDeliveryWC= $("#deliveryWC");
                if (deliveryWC.length > 0) {
                    $("input[name='ticketDeliveryChoice'][value='WC']").attr('checked', 'checked');
                    $('#passwrdWC').show();
                    $("#lblWillCallnotavailable").hide();
                    if (_country_states[method] != null) {
                        _changedeliverypopulate(method);
                        return;
                    }
                    //mfreder 2-17-2011 if method is the new cash then default to email for call
                    if (method == "CA" || method == "PU")
                        method = "EM";
                }
                else {
                    $("#lblWillCallnotavailable").show();
                }
            }
        };

        /* Added for onclick of popup next button */
        var _event_ShowPrintAtHomeOption = function (event) {
            if ($("input[name='ticketDeliveryChoice'][value='EM']").attr('checked') == 'checked') {
                $("#step4content").hide();
                $("#step3content").show();
                var radwnd = "RadPrintathomeTicketPurchase";
                showTicketPurchaseMessage(FareFinder.Strings.Purchase.PrintAtHomeTicketPurchaseTitle, FareFinder.Strings.Purchase.PrintAtHomeTicketPurchaseMessage, radwnd);
            }
            else {
                _event_nextstep(event);
            }
        }

        /* Added to close the popup */
        var _event_ClosePopUpOption = function (event) {
            var radwnd1 = "RadPrintathomeTicketPurchase";
            $("#lblWillCallnotavailable").hide();
            $("#step3content").hide();
            closeRadPopupMessage(radwnd1);
        };  
        /* End INC7511877 - Print at Home Verbiage Update for Greyhound CA */

        var _event_copyshipaddress = function (event) {
            event.preventDefault();
            var i_fields = '#mailA1 #mailA2 #mailCT #mailST #mailZP #mailCY'.split(' ');

            if (!_pr.CardHolderTraveling) {
                i_fields.push('#mailFN');
                i_fields.push('#mailLN');
            }

            for (var i = 0; i < i_fields.length; i++) {
                $(i_fields[i].replace('mail', 'bill')).val($(i_fields[i]).val())
            }
        };

        //Start: Aftab, INC2533590
        var _event_changeyear = function (event) {
            var $y_list = $(this);
            var $m_list = $('#ccEM');

            var today = new Date();

            var y_val = parseInt($y_list.val(), 10);
            var m_val = parseInt($m_list.val(), 10);

            //var min_month = (y_val == today.getFullYear() ? today.getMonth() + 1 : 1);

            $('option', $m_list).remove();

            for (var i = 1; i <= 12; i++) {
                var m = $('<option/>').val(i).text(i);
                if (i == m_val) m.attr('selected', 'true');
                $m_list.append(m);
            }
            if (y_val == today.getFullYear()) {
                $m_list.val(today.getMonth() + 1);
            }
        };
        //End INC2533590
        //#endregion

        //#region Callbacks

        var _callback_changedelivery_complete = function (r, method) {

            // Massage these back into empty strings
            if (r.Countries[0][1] == '- ') r.Countries[0][1] = '';
            if (r.States[0][1] == '- ') r.States[0][1] = '';

            _country_states[method] = r;
            _changedeliverypopulate(method);
        };

        var _callback_changedelivery_error = function (e, c) {
            alert('_callback_changedelivery_error: ' + e.get_message());
        };

        var _callback_price_complete = function (r, c) {
            _allow_back = true; _allow_next = true;
            FareFinder.RenderPricingTable(r, 0);

            if (r.Valid) {

                // Cache pricing detail
                _pricingDetail = r;

                _last_priced_deliverymethod = _pr.DeliveryMethod;
                _last_priced_cardholdertraveling = _pr.CardHolderTraveling;

                _step++;
                _gotostepsub();
            }

            FareFinder.ShowWait(false)
        };

        var _callback_price_error = function (e, c) {

            FareFinder.ShowWait(false);
            //alert('_callback_price_error: ' + e.get_message());
            showTimeOutAlert(FareFinder.Strings.Schedule.TimeOut, 0, 100, FareFinder.Strings.ValidationAlertTitle);
            //showValidationAlert(FareFinder.Strings.Purchase.PurchaseDeclinedMessage, 0, 100, FareFinder.Strings.ValidationAlertTitle);
        };

        var _callback_purchase_complete = function (r, c) {

            if (r.Status == 'Complete') {

                if ((window.name != null) || (window.name.length != 0)) {
                    //window.location = Encoder.encodeForJS(Encoder.encodeForURL('<%=Resources.GetString("STEP4_LOCATIONURL")%>'.concat(window.name)));
                    //window.location = encodeURI('<%=Resources.GetString("STEP4_LOCATIONURL")%>'.concat(window.name));

                    window.location = 'Step4.aspx?SessionId=' + window.name;
                }
                return;
            }
            /*            if (r.Status == 'TimeOut') {
                                $('#validationError7').removeClass('hidden').html(FareFinder.Strings.Purchase.SessionTimeoutMessage);
                                var radwnd = $("div[id$=RadWindow2]").attr("id");
                                showTimeoutMessage(FareFinder.Strings.Purchase.SessionTimeoutTitle, FareFinder.Strings.Purchase.SessionTimeoutMessage, radwnd);
                                return;
                            }
            
            */

            if (r.Status == 'TimeOut') {
                showTimeOutAlert(FareFinder.Strings.Schedule.TimeOut, 0, 100, FareFinder.Strings.ValidationAlertTitle);
            }
            FareFinder.ShowWait(false);
            _allow_next = true; _allow_back = true; c.Button.disabled = false;

            if (r.Status == 'Pending') {
                $('#validationError5').removeClass('hidden').html(FareFinder.Strings.Purchase.PendingMessage);
                return;
            }
            if (r.Status == 'Denied') {
                _show_purchase_error(r.ErrorMessage);
                $('#validationError6').removeClass('hidden').html(FareFinder.Strings.Purchase.DeclinedMessage);
                var radwnd = $("div[id$=RadWindow1]").attr("id");
                showErrorWindow(r.ErrorPopupTitle, r.ErrorMessage,r.ErrorCode, radwnd);

                /* Code Merged from Transcor branch
                ///*Start: Coded by Aftab CHG51533 - .CA Credit Card Error Message & Continue Shopping Button 12/01/2011*/
                //_show_purchase_error(r.ErrorMessage);
                //$('#validationError6').removeClass('hidden').html(FareFinder.Strings.Purchase.DeclinedMessage);

                //for (var i = 0; i < CCDeclineErrorCode.length; i++) {
                //    if (r.ErrorCode == CCDeclineErrorCode[i]) {
                //        var radwnd = $("div[id$=RadWindow1]").attr("id");
                //        // Accertify for CA
                //        if (r.ErrorCode == "000000") {
                //            showErrorWindow(FareFinder.Strings.Purchase.AccertifyDeclinedPopupTitle, FareFinder.Strings.Purchase.AccertifyDeclinedPopupMessage, radwnd);
                //        } else {
                //            showErrorWindow(FareFinder.Strings.Purchase.DeclinedPopupTitle, FareFinder.Strings.Purchase.DeclinedPopup, radwnd);
                //        }
                //        break;
                //    }
                //}
                /*End CHG51533*/
            }
        };

        var _callback_purchase_error = function (e, c) {
            FareFinder.ShowWait(false);
            _allow_next = true; _allow_back = true;
            if((c != undefined) && (c != null))
            {
                c.Button.disabled = false;
            }

            _show_purchase_error(e.get_message());
        };

        var _show_purchase_error = function (message) {
            // Added by Ganesh - 12/14/2012
            // INC4761642 - Credit Card Purchase Errors on Greyhound.ca - Error Message
            if (message.indexOf("COMPLETED_RESERVATION") != -1) {
                var str = message;
                var h = new Sys.StringBuilder();
                var radwnd = $("div[id$=DuplicateTransactionRadWindow]").attr("id");
                h.appendFormat(FareFinder.Strings.Purchase.DuplicateTransactionMessage, str.split(':')[1]);
                showDuplicateReservationMessage(FareFinder.Strings.Purchase.DuplicateTransactionTitle, h.toString(), radwnd);
            }
            else if (message.substr(0, 4) == "1142") {/*CHG40010*/
                $('#validationError5').removeClass('hidden').html(FareFinder.Strings.Purchase.Error1142Message);
                _step = 5;
            }
                //added by prachi on 23 oct 2013 for INC5400030

            else if (message.substr(0, 4) == "1371") {
                $('#validationError4').removeClass('hidden').html(FareFinder.Strings.Purchase.DeclinedErrorMessage_new);
                _step = 4;
            }
            else if (message.substr(0, 4) == "2216") {
                $('#validationError4').removeClass('hidden').html(FareFinder.Strings.Purchase.DeclinedErrorMessage_new);
                _step = 4;
            }
            else if (message.substr(0, 4) == "2219") {
                $('#validationError4').removeClass('hidden').html(FareFinder.Strings.Purchase.DeclinedErrorMessage_new);
                _step = 4;
            }
                //END 
            else {
                $('#validationError4').removeClass('hidden').html(message);
                _step = 4;
            }
            /*END*/
            _gotostepsub();

        }

        //Diwakar Token call

        var Tokenize = function (_button) {

            var timeStamp = $("[id$=hfTimestamp]").attr("value");
            var tokenizeServiceURL = $("[id$=hfTokenizeUrl]").attr("value");

            var creditCardNumber = $('#ccNM').val();
            var expMonth = $('#ccEM').val();
            if (expMonth < 10) {
                expMonth = "0" + expMonth;
            }
            var expYear = $('#ccEY').val().substr(2);
            if (expYear < 10) {
                expYear = "0" + expYear;
            }
            var cvv = $('#ccCV').val();

            var jsonData = {
                "paymentGatewayInformation": {
                    "apiOperation": "TOKENIZE"
                },
                "paymentInformation": {
                    "cardDetails": {
                        "cardExpireMonth": expMonth,
                        "cardExpireYear": expYear,
                        "cardNumber": creditCardNumber,
                        "cardSecurityCode": cvv
                    }
                },
                "timeStamp": timeStamp
            };
            var requestJson = JSON.stringify(jsonData);
            var ie8or9 = false;
            var nav = navigator.userAgent.toLowerCase();
            if (nav.indexOf('msie 8') != -1 || nav.indexOf('msie 9') != -1) {
                ie8or9 = true;
            }

            _pr.CardNumber = '';

            if (ie8or9) {
                var xdr = new XDomainRequest();
                if (xdr) {
                    xdr.open('POST', tokenizeServiceURL);
                    xdr.timeout = 80000;
                    xdr.onprogress = function () { };
                    xdr.ontimeout = function () {
                        window.setTimeout(function () {
                            Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: _button });
                        }, 0);
                    };
                    xdr.onerror = function () {
                        window.setTimeout(function () {
                            Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: _button });
                        }, 0);
                    };
                    xdr.onload = function () {

                        xdr.responseText = getValidJsonObject(xdr.responseText);
                        var resultJson = $.parseJSON(xdr.responseText);
                        
                        var cardToken = '';
                        if (resultJson.responseData != undefined && resultJson.responseData != null
                            && resultJson.responseData.transaction != undefined && resultJson.responseData.transaction != null
                            && resultJson.responseData.transaction.cardToken != undefined && resultJson.responseData.transaction.cardToken != null) {
                            cardToken = resultJson.responseData.transaction.cardToken.trim();
                        }

                        _pr.CardToken = cardToken;
                        window.setTimeout(function () {
                            Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: _button });
                        }, 0);
                    }
                    window.setTimeout(function () {
                        xdr.send(requestJson);
                    }, 0);


                } else {
                    alert('XDR undefined');
                }
            }


            else {

                //////////////////////////
                $.support.cors = true;
                //Java Webservice Call
                $.ajax({
                    type: "POST",
                    url: tokenizeServiceURL,
                    crossDomain: true,
                    contentType: "text/plain; charset=utf-8",
                    data: requestJson,
                    timeout: 80000,
                    dataType: "text",
                    success: function (result) {
                        var resultJson = $.parseJSON(result);
                        var cardToken = '';
                        if (resultJson.responseData != undefined && resultJson.responseData != null
                            && resultJson.responseData.transaction != undefined && resultJson.responseData.transaction != null
                            && resultJson.responseData.transaction.cardToken != undefined && resultJson.responseData.transaction.cardToken != null) {
                            cardToken = resultJson.responseData.transaction.cardToken.trim();
                        }
                        _pr.CardToken = cardToken;
                        window.setTimeout(function () {
                            Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: _button });
                        }, 0);
                    },
                    error: function (responseError) {
                        window.setTimeout(function () {
                            Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: _button });
                        }, 0);
                    }
                }
                );
            }
        };

        function getValidJsonObject(name) {
            var regexp = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/;
            var matches = name.match(regexp);
            if (matches == null) {
                return '';
            } else {
                return name;
            }
        }

        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        var ProcessDebit = function (_pr) {
            // Pull in settings from configuration
            var exactLogin = $("[id$=exactLogin]").attr("value");
            var exactTimeStamp = $("[id$=exactTimeStamp]").attr("value");
            if (window.name == "" || window.name == null || window.name == undefined || window.name.length > 36)
            {
                window.name = generateUUID();
            }
          
            var exactSequenceNumber = window.name;      // Session ID

            var req = new Greyhound.Website.DataObjects.ClientExactHashRequest();
            req.SiteId = exactLogin;
            req.Sequence = exactSequenceNumber;
            req.TimeStamp = exactTimeStamp;
            req.CurrencyCode = "";

            // TODAY: Need to explicitly pull the 'grand total' value - not just the last item
            var total = _pricingDetail.Items[_pricingDetail.Items.length - 1];

            //alert(total.Amount);
            //req.Amount = total.Amount;
            if (Common.Strings.Culture == "en") {
                req.Amount = total.Amount;
            }
            else
            {
                if (total.Amount.startsWith('$'))
                {
                    req.Amount = total.Amount;
                }
                else
                {
                    req.Amount = total.Amount.replace('$', '').replace('.', '').replace(/\s/g, '');
                    req.Amount = req.Amount.replace(',', '.');
                    //alert(req.Amount);
                }
            }
            


            // Make service call to hash transaction details before sending to E-xact
            Greyhound.Website.Services.FareFinderService.ComputeHashedExactValues(req, _callback_exact_hash_complete, _callback_exact_hash_error, null);
        };

        var _callback_exact_hash_complete = function (hash, context) {

            // Split hash and time stamp from response
            var responseValues = hash.split('^');
            _pr.CardToken = responseValues[0];
            $("[id$=exactTimeStamp]").val(responseValues[1]);

            // Create purchase request to capture schedule and passenger data
            Greyhound.Website.Services.FareFinderService.PurchaseDebit(_pr, _callback_exactredirect_reservation_complete, _callback_purchase_error, null);
        };

        var _callback_exactredirect_reservation_complete = function (d, context) {

            // reservation created prior to this point
            var amount = 0;
            var total = _pricingDetail.Items[_pricingDetail.Items.length - 1];
            //alert(total.Amount);

            if (Common.Strings.Culture == "en") {
                amount = total.Amount.replace('$', '').replace(',', '').replace(/\s/g, '');
            }
            else {

                if (total.Amount.startsWith('$'))
                {
                    amount = total.Amount.replace('$', '').replace(',', '').replace(/\s/g, '');
                }
                else
                {
                    amount = total.Amount.replace('$', '').replace('.', '').replace(/\s/g, '');
                    amount = amount.replace(',', '.')
                    //alert(amount);
                }
            }
            

            // Pull in settings from configuration
            var exactLogin = $("[id$=exactLogin]").attr("value");
            var exactTestMode = $("[id$=exactTestMode]").attr("value");
            var exactProcessingType = $("[id$=exactProcessingType]").attr("value");
            var exactShowForm = $("[id$=exactShowForm]").attr("value");
            var exactReceiptLinkMethod = $("[id$=exactReceiptLinkMethod]").attr("value");
            var exactUrl = $("[id$=exactDebitCheckoutURL]").attr("value");
            var exactTimeStamp = $("[id$=exactTimeStamp]").attr("value").replace("'", '').replace("\'", '').replace('%27', '');
            var exactSequenceNumber = window.name;      // Session ID
            var emailAdddress = _pr.Email;

            var firstName = "";
            var lastName = "";
            if ((_pr.Passengers[0] != undefined) && (_pr.Passengers[0] != null))
            {
                firstName = _pr.Passengers[0].First;
                lastName = _pr.Passengers[0].Last;
            }

            // Build up form to post debit payment to E-xact
            var $form = $('<form/>').attr('action', exactUrl).attr('method', 'post');
            $form.append($('<input type="hidden" id="exactForm_hf_0" name="exactForm_hf_0"/>'));
            $form.append($('<input type="hidden" id="x_login" name="x_login"/>').val(exactLogin));
            $form.append($('<input type="hidden" id="x_fp_sequence" name="x_fp_sequence"/>').val(exactSequenceNumber));
            $form.append($('<input type="hidden" id="x_fp_timestamp" name="x_fp_timestamp"/>').val(exactTimeStamp));
            $form.append($('<input type="hidden" id="x_amount" name="x_amount"/>').val(amount));
            $form.append($('<input type="hidden" id="x_fp_hash" name="x_fp_hash"/>').val(_pr.CardToken));
            $form.append($('<input type="hidden" id="x_show_form" name="x_show_form"/>').val('PAYMENT_FORM'));

            $form.append($('<input type="hidden" id="x_type" name="x_type"/>').val(exactProcessingType));
            $form.append($('<input type="hidden" id="x_email_customer" name="x_email_customer"/>').val('TRUE'));
            $form.append($('<input type="hidden" id="x_email" name="x_email"/>').val(emailAdddress));
            $form.append($('<input type="hidden" id="x_receipt_link_method" name="x_receipt_link_method"/>').val(exactReceiptLinkMethod));
            $form.append($('<input type="hidden" id="x_receipt_link_text" name="x_receipt_link_text"/>').val(''));

            $form.append($('<input type="hidden" id="x_first_name" name="x_first_name"/>').val(firstName));
            $form.append($('<input type="hidden" id="x_last_name" name="x_last_name"/>').val(lastName));

            $form.append($('<input type="hidden" id="x_address" name="x_address"/>').val(_pr.BillingAddress.Addr1));
            $form.append($('<input type="hidden" id="x_city" name="x_city"/>').val(_pr.BillingAddress.City));
            $form.append($('<input type="hidden" id="x_state" name="x_state"/>').val(_pr.BillingAddress.State));
            $form.append($('<input type="hidden" id="x_zip" name="x_zip"/>').val(_pr.BillingAddress.Zip));
            $form.append($('<input type="hidden" id="x_country" name="x_country"/>').val(_pr.BillingAddress.Country));
            $form.append($('<input type="hidden" id="x_phone" name="x_phone"/>').val(_pr.BillingAddress.Phone));

            $form.append($('<input type="hidden" id="x_invoice_num" name="x_invoice_num"/>').val(''));
            $form.append($('<input type="hidden" id="x_cust_id" name="x_cust_id"/>').val(''));
            $form.append($('<input type="hidden" id="x_reference_3" name="x_reference_3"/>').val(''));

            $form.append($('<input type="hidden" id="x_test_request" name="x_test_request"/>').val(exactTestMode));

            $('body').append($form);
            $form.submit();
        };

        var _callback_exact_hash_error = function (e, context) {
            var handled = false;

            alert("Encountered an error creating E-xact transaction hash");
        };


        //#endregion

        //#region Validation

        var _val = function () {

            var _errors = new Object();

            return {
                get_text: function (e) {
                    var $e = (e instanceof jQuery) ? e : $(e);
                    return $.trim($e.val());
                },
                validate_text: function (e, method) {

                    var $e = (e instanceof jQuery) ? e : $(e);
                    var val = $.trim($e.val());

                    if (val.length == 0) {
                        //CHG40010
                        this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage, method);
                        val = null;
                    }

                    return val;
                },
                //Start INC7170101 - Data type validation - Passenger and Card holder Names
                validate_numeric: function (e, method) {


                    var $e = (e instanceof jQuery) ? e : $(e);
                    var val = $.trim($e.val());
                    var id = $e.attr('id');

                    //var pattern = new RegExp(/^\d*[a -zA-Z][a-zA-Z\d]*$/);
                    //INC9852669: Dorian Turner - New regex expression that tests for hyphenated names. It also checks for spacing between names.
                    var pattern = new RegExp(/^\d*[a-zA-Z\s][-\a-zA-Z\d\s]*$/);
                    if (pattern.test(val) == false) {
                        //if (id == "txtpsngrFirst" || id == "txtpsngrLast") {
                            this.Add($e, ErrorType.InvalidField, FareFinder.Strings.Purchase.PassengerCharMessage, method);
                        //    val = null;
                        //}
                        //else {
                        //  this.Add($e, ErrorType.InvalidField, FareFinder.Strings.Purchase.CardholderCharMessage, method);
                            val = null;
                        //}

                    }

                    return val;
                },
                //End INC7170101 - Data type validation - Passenger and Card holder Names

                //Start INC7170101 - Data type validation - Passenger and Card holder Names
                validate_numericforpessanger: function (e, f, method) {


                    var $e = (e instanceof jQuery) ? e : $(e);
                    var $f = (f instanceof jQuery) ? f : $(f);
                    var val = $.trim($e.val());
                    var valcardhldr = $f.is(':checked');
                    //alert(valcardhldr);
                    var id = $e.attr('id');

                    //var pattern = new RegExp(/^\d*[a-zA-Z][a-zA-Z\d]*$/);
                    //INC9852669: Dorian Turner - New regex expression that tests for hyphenated names. It also checks for spacing between names.
                    var pattern = new RegExp(/^\d*[a-zA-Z\s][-\a-zA-Z\d\s]*$/);
                    if (pattern.test(val) == false) {
                        if (!valcardhldr) {
                            this.Add($e, ErrorType.InvalidField, FareFinder.Strings.Purchase.PassengerCharMessage, method);
                            val = null;
                        }
                        else {
                            this.Add($e, ErrorType.InvalidField, FareFinder.Strings.Purchase.CardholderCharMessage, method);
                            val = null;
                        }

                    }

                    return val;
                },
                //End INC7170101 - Data type validation - Passenger and Card holder Names

                validate_card: function (e, type, method) {

                    var $e = (e instanceof jQuery) ? e : $(e);
                    var val = $.numbers($.trim($e.val()));

                    // At some point, maybe in the future we'll use one of the numerous javascript's that calculate
                    // the check digit and look at the card prefixes
                    if (val.length == 0) {
                        //CHG40010
                        this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage, method);
                        val = null;
                    }

                    return val;
                },
                validate_number: function (e, method) {

                    var $e = (e instanceof jQuery) ? e : $(e);
                    var val = $.trim($e.val());

                    if (val.length > 0) {
                        if (val.search(/[^\d]/g) == -1)
                            return val;
                    }
                    //CHG40010
                    this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage, method);
                    return null;
                },
                validate_address: function (prefix, ignore) {

                    var v = new Object();
                    var valid = true;

                    var parts = 'FN:1 LN:1 A1:1 A2:1 CT:1 ST:1 ZP:1 CY:1 P1:3 P2:3 P3:4'.split(' ');
                    var ignores = ignore.split(' ');

                    for (var i = 0; i < parts.length; i++) {

                        var data = parts[i].split(':');
                        var suffix = data[0], minlength = parseInt(data[1], 10);
                        var $e = $('#' + prefix + suffix);

                        if ($.inArray(suffix, ignores) > -1)
                            minlength = 0;

                        v[suffix] = $.trim($e.val());

                        if (v[suffix].length < minlength) {
                            //CHG40010
                            this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage);
                            valid = false;
                        }
                        // INC5516447 -Primary Billing Address Update - CA
                        if (suffix == 'ST' && v[suffix] == 'YY' && minlength != 0) {
                            this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage);
                            valid = false;
                        }
                    }

                    if (valid) {

                        var a = new Greyhound.Website.DataObjects.ClientPurchaseAddress();

                        a.First = v['FN'];
                        a.Last = v['LN'];

                        a.Addr1 = v['A1'];
                        a.Addr2 = v['A2'];

                        a.City = v['CT'];
                        a.State = v['ST'];
                        a.Zip = v['ZP'];
                        a.Country = v['CY'];

                        a.Phone = v['P1'] + v['P2'] + v['P3'];

                        a.Zip = a.Zip.replace(/\s/g, '');     //P1 for Ticket Reprint

                        return a;
                    }

                    return null;
                },
                /*CHG40010*/
                validate_email: function (e, checkForValidField) {
                    var $e = (e instanceof jQuery) ? e : $(e);
                    var val = $.trim($e.val());

                    if (val.length == 0) {
                        this.Add($e, ErrorType.RequiredField, FareFinder.Strings.Purchase.RequiredMessage);
                        return null;
                    } else if (checkForValidField && (!$.isemail(val))) {
                        this.Add($e, ErrorType.InvalidField, FareFinder.Strings.Purchase.InvalidEmailMessage)
                        return null;
                    }

                    return val;
                },
                showErrors: function (errors, errorType) {
                    var flag = false;

                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].ErrorType == errorType) {
                            errors[i].Method(errors[i].Target, true);
                            flag = true;
                        }
                    }

                    return flag;
                },
                /*END*/
                Reset: function (step) {
                    for (s in _errors) {
                        var e = _errors[s];
                        if (e) {
                            for (var i = 0; i < e.length; i++)
                                e[i].Method(e[i].Target, false);
                            $('#validationError' + s).addClass('hidden');
                        }
                    }
                    _errors = new Object();
                    _errors[step] = new Array();
                },
                //CHG40010
                Add: function (e, errorType, errorMessage, method) {
                    var $e = (e instanceof jQuery) ? e : $(e);
                    method = method ? method : function ($obj, on) {
                        if (on) $obj.addClass('errorBox');
                        else $obj.removeClass('errorBox');
                    };
                    //CHG40010
                    _errors[_step].push({ Target: $e, ErrorType: errorType, ErrorMessage: errorMessage, Method: method });
                    return this;
                },
                Valid: function () {
                    return (_errors[_step] == 0);
                },
                Display: function () {
                    /*CHG40010*/
                    var e = _errors[_step];
                    if (e.length) {
                        if (this.showErrors(e, ErrorType.RequiredField)) {
                            $('#validationError' + _step).removeClass('hidden').html(FareFinder.Strings.Purchase.RequiredMessage);
                            return false;
                        } //Start INC7170101 - Data type validation - Passenger and Card holder Names
                        else if(e[0].ErrorMessage == FareFinder.Strings.Purchase.PassengerCharMessage) {
                            $('#validationError' + _step).removeClass('hidden').html(FareFinder.Strings.Purchase.PassengerCharMessage);
                            return false;
                        }
                        else if (e[0].ErrorMessage == FareFinder.Strings.Purchase.CardholderCharMessage) {
                            $('#validationError' + _step).removeClass('hidden').html(FareFinder.Strings.Purchase.CardholderCharMessage);
                            return false;
                        }
                        //End INC7170101 - Data type validation - Passenger and Card holder Names
                        else {
                            var errorStr = '<ul style="list-style-type: none; margin:0px; padding: 0px;">';
                            for (var i = 0; i < e.length; i++) {
                                e[i].Method(e[i].Target, true);
                                errorStr = errorStr + '<li>' + e[i].ErrorMessage + '</li>';
                            }
                            errorStr = errorStr + '</ul>';
                            $('#validationError' + _step).removeClass('hidden').html(errorStr);
                            return false;
                        }
                    }
                    return true;
                    /*END*/
                }
            };
        }();

        var _validateStep = function (step) {
            _val.Reset(step);
            switch (step) {
                case 1:
                    _pr = new Greyhound.Website.DataObjects.ClientPurchaseRequest();
                    return _validateStep1();
                case 2: return _validateStep2();
                case 3: return _validateStep3();
                case 4: return _validateStep4();
            }
            return false;
        };

        var _validateStep1 = function () {

            // Card Holder
            var $cardholder = $("input[name='cardHolder']:checked");
            if ($cardholder.length == 0) {
                _val.Add(
                    '#lbl_cardHolder',
                //CHG40010
                    ErrorType.RequiredField,
                //CHG40010
                    FareFinder.Strings.Purchase.RequiredMessage,
                    function ($e, on) {
                        if (on) $e.addClass('errorHilited').append('<span class="astrk"> *</span>');
                        else $e.removeClass('errorHilited').find('.astrk').remove();
                    }
                );
            }


            if (_val.Valid()) {
                _pr.CardHolderTraveling = $cardholder.val() == 'Y';
                $('#tblpassengers td:nth-child(3)').setShow(_pr.CardHolderTraveling);
                /*As per business requirment and confirmed by Merriel we are not going to hide "Print At Home" option  if card holder is not travelling. Refer Bugzilla Issue #8013*/
                /* ST222 Start */
                //var $et = $("#delivery input[name='ticketDeliveryChoice'][value='EM']");
                //if ($et.length)
                //$et.closest('tr').setShow(_pr.CardHolderTraveling);
                /* ST222 End */
                /*END #8013*/
            }

            return _val.Display();
        };

        var _validateStep2 = function () {

            $('#billFN_L, #billLN_L').remove();
            $('#billFN, #billLN').show();

            
            //if (_pr.CardHolderTraveling && ($("#tblpassengers input[name='psngrCard']:checked").length == 0)) {
            //    _val.Add(
            //        "#tblpassengers input[name='psngrCard']",
            //    //CHG40010
            //        ErrorType.RequiredField,
            //    //CHG40010
            //        FareFinder.Strings.Purchase.RequiredMessage,
            //        function ($e, on) {
            //            if (on) $e.wrap('<span class="errorWrap"/>').data('wrapped', true);
            //            else if ($e.data('wrapped')) $e.unwrap().data('wrapped', false);
            //        }
            //    );
           // }

            _pr.Passengers = new Array();

            $("#tblpassengers tr:gt(0)").each(function (index) {
                var $this = $(this);
                var pass = new Greyhound.Website.DataObjects.ClientPassenger();

                var f_ch = $this.find('[name=psngrCard]');
                var f_first = $this.find('[name=psngrFirst]');
                var f_last = $this.find('[name=psngrLast]');

                pass.Type = parseInt($this.find('[name=psngrType]').val(), 10);
                pass.CardHolder = _pr.CardHolderTraveling && f_ch.is(':checked');


                //alert(f_ch.is(':checked'));

                pass.First = _val.validate_text($this.find('[name=psngrFirst]'));
                pass.Last = _val.validate_text($this.find('[name=psngrLast]'));


                //Start INC7170101 - Data type validation - Passenger and Card holder Names
                pass.First = _val.validate_numericforpessanger($this.find('[name=psngrFirst]'), $this.find('[name=psngrCard]'));
                pass.Last = _val.validate_numericforpessanger($this.find('[name=psngrLast]'), $this.find('[name=psngrCard]'));
                //End INC7170101 - Data type validation - Passenger and Card holder Names

                pass.Index = ++index;
                pass.FareAmount = $this.find('[name=psngrFare]').text().replace('$','');
                _pr.Passengers.push(pass);

                if (pass.CardHolder) {
                    if ($('#mailFN').isblank() || $('#mailLN').isblank()) {
                        $('#mailFN').val(pass.First); $('#mailLN').val(pass.Last);
                    }

                    // Set the input field, then hide it and display a label/div in it's place.				
                    $('#billFN').hide().val(pass.First).closest('TD').append($('<div id="billFN_L"/>').text(pass.First));
                    $('#billLN').hide().val(pass.Last).closest('TD').append($('<div id="billLN_L"/>').text(pass.Last));
                }
            });

            return _val.Display();
        };

        var _validateStep3 = function () {

            var $delivery = $("#delivery input[name='ticketDeliveryChoice']:checked");

            //Start INC7511877 - Print at Home Verbiage Update for Greyhound CA
            if ($("input[name='ticketDeliveryChoice'][value='EM']").attr('checked') == 'checked') {
                _event_ClosePopUpOption();
            }
            //End INC7511877 - Print at Home Verbiage Update for Greyhound CA

            if ($delivery.length == 0) {
                _val.Add(
                    "#delivery input[name='ticketDeliveryChoice']",
                //CHG40010
                    ErrorType.RequiredField,
                //CHG40010
                    FareFinder.Strings.Purchase.RequiredMessage,
                    function (e, on) {
                        //Commented on 09/Feb/2011
                        //_highlight_input($(e).closest('div'), on);
                        //Ends Here
                        //Added new code on 09/Feb/2011
                        if (on) $(e).closest('div').addClass('errorWrap');
                        else $(e).closest('div').removeClass('errorWrap');
                        //Ends Here
                    }
                );
            } else {
                _pr.DeliveryMethod = $delivery.val();
                _pr.ShippingAddress = null;

                if (_pr.DeliveryMethod == 'TM')
                    _pr.ShippingAddress = _val.validate_address('mail', 'A2 P1 P2 P3');
            }

            /*Start ST42*/
            _pr.PickupPassword = (_pr.DeliveryMethod == 'WC') ? $('#pickupPsswrd').val() : null;
            /*END*/
            $('#copyShip').setShow(_pr.DeliveryMethod == 'TM');
            /*BugZilla 8004, Removed the label #lbl_req_email_icn*/
            $('#lbl_req_email_icn,#lbl_req_email_msg, #row_req_email_re').setShow(_pr.DeliveryMethod == 'EM');
            /*Bugzilla 8248, displayed * (validation) for PAH and TM */
            $('#lbl_req_email_icn').setShow(_pr.DeliveryMethod == 'TM' || _pr.DeliveryMethod == 'EM');
            /*END Bugzilla 8248*/

            //This line is added to display the dynamically changed passengerNames
            FareFinder.func_printPassengerNames();
            return _val.Display();
        };

        var _validateStep4 = function () {

            // INC5516447 -Primary Billing Address Update - CA
            var selectedCountry = $('#billCY').find(":selected").text();
            if (selectedCountry == "United States" || selectedCountry == "Canada") {
                _pr.BillingAddress = _val.validate_address('bill', 'A2');
            }
            else {
                _pr.BillingAddress = _val.validate_address('bill', 'A2 ST');
            }

            //Start INC7170101 - Data type validation - Passenger and Card holder Names
            if(_pr.BillingAddress != null)
            {
                _pr.BillingAddress.First = _val.validate_numeric('#billFN');
                if (_pr.BillingAddress.First != null) {
                    _pr.BillingAddress.Last = _val.validate_numeric('#billLN');
                }
            }
            //End INC7170101 - Data type validation - Passenger and Card holder Names

            var strSelectedCardType = $('#ccTP').find(":selected").text();
            if (strSelectedCardType != 'Interac Debit') {

                _pr.CVV = _val.validate_number('#ccCV');
                _pr.Card = _val.validate_number('#ccTP');
                _pr.CardNumber = _val.validate_card('#ccNM', _pr.Card);

                _pr.Expiration = _val.validate_text('#ccEY') + '/' + _val.validate_text('#ccEM');
            }

            /*CHG40010*/
            var e1 = e2 = null;

            if (_pr.DeliveryMethod == 'EM') {
                e1 = _val.validate_email('#email1', true);
                e2 = _val.validate_email('#email2', false);
                if ((e1 != null) && (e1 != e2)) {
                    _val.Add('#email1, #email2', ErrorType.InvalidField, FareFinder.Strings.Purchase.EmailMismatchMessage);
                    e1 = e2 = null;
                }
            } else {
                /*start: Bugzilla 8248, added condition for WC and TM */
                if (_pr.DeliveryMethod == 'TM') {
                    e1 = _val.validate_email('#email1', true);
                }
                else {
                    var $eWC = ('#email1' instanceof jQuery) ? '#email1' : $('#email1');
                    var valWC = $.trim($eWC.val());
                    if (_pr.DeliveryMethod == 'WC' && valWC.length != 0) {
                        e1 = _val.validate_email('#email1', true);
                    }

                }
            }
            /*END Bugzilla 8248*/
            /*END CHG40010*/

            _pr.Email = e1;
            /*start: Bugzilla 8248, added condition for WC and EM */

            //INC7364717-FareFinder Mailing list option
            //Modified by Deepika- so that mailing list preference gets stored in Database for PAH tickets.
            if (_pr.DeliveryMethod == 'EM') {
                _pr.EmailList = (_pr.Email) && $('#emailList').is(':checked');
            } else if (_pr.DeliveryMethod == 'WC') {
                if (e1 == null || e1 == "")
                    _pr.EmailList = false;
                else
                    _pr.EmailList = (_pr.Email) && $('#emailList').is(':checked');
            }
            /*END Bugzilla 8248*/


            // Ganesh - check for CVV validation should be 3-4 digits only.
            var _cvv = _val.get_text('#ccCV');
            if ((strSelectedCardType != 'Interac Debit') && (!$.isCVVNumber(_cvv))) {
                _val.Add('#ccCV', ErrorType.InvalidField, FareFinder.Strings.Purchase.InvalidCVVNumberMessage)
            } else

                if (_val.Valid()) {
                    // We have to recalculate the price if the deliverymethod or cardholder changes.  (In the future, there will
                    // be other requirements, priority boarding, etc).  Once we calculate it, we don't need to recalc it unless
                    // it changes.
                    if ((_pr.DeliveryMethod != _last_priced_deliverymethod) || _pr.CardHolderTraveling != _last_priced_cardholdertraveling) {

                        _allow_back = false; _allow_next = false;

                        var q = new Greyhound.Website.DataObjects.ClientPriceRequest();
                        
                        q.CardHolderTraveling = _pr.CardHolderTraveling;
                        q.DeliveryMethod = _pr.DeliveryMethod;
                        q.FareFinderDatakey = window.name;

                        FareFinder.ShowWait(true);
                        Greyhound.Website.Services.FareFinderService.GetPrice(q, _callback_price_complete, _callback_price_error, null);
                        return false;
                    }
                }

            return _val.Display();
        }

        //#endregion

        //#region Misc

        var _changedeliverypopulate = function (method) {

            var add_to_lists = function (data, $lists) {
                for (var i = 0; i < $lists.length; i++) {
                    $lists[i].options.length = 0;
                    for (var x = 0; x < data.length; x++)
                        $lists[i].options.add(new Option(data[x][0], data[x][1]));
                }
            }
            var data = _country_states[method];
            var $shipContainer = $("#shippingContainer");

            add_to_lists(data.Countries, $('#mailCY, #billCY'));
            add_to_lists(data.States, $('#mailST, #billST'));

            if (method == 'TM') $shipContainer.slideDown(400);
            else if ($shipContainer.is(":visible")) $shipContainer.slideUp(400);
        };

        var _gotostepsub = function () {
            /* $(".stepTitle").removeClass('stepTitleOn').removeClass('stepTitleClickable').unbind("click");
            for (var i = 0; i < _step; i++)
            $("#step" + (i + 1) + "title").addClass('stepTitleOn').addClass('stepTitleClickable').click(_event_gotostep);
            $(".stepContent").slideUp("400", function() {
            setTimeout(function() {
            $("#step" + _step + "content").slideDown(400);
            }, 400);
            //set timeout on this function to ensure a smooth transition between the blocks.
            });*/

            $(".stepTitle").removeClass('stepTitleOn').removeClass('stepTitleClickable').unbind("click");
            for (var i = 0; i < _step; i++)
                $("#step" + (i + 1) + "title").addClass('stepTitleOn').addClass('stepTitleClickable').click(_event_gotostep);

            $(".helpSub").hide();

            $(".stepContent").slideUp("400", function () {
                setTimeout(function () {
                    $("#step" + _step + "content").slideDown(400, function () {
                        $("#helpSub" + _step).fadeIn();
                    });
                }, 400);
            });
        };

        //#endregion

        //#endregion

        //#region Public Methods

        return {
            Submit: function (button) {
                var value1 = $('#ChkCreditCard_Terms_Conditions').attr('checked');
                if (value1 != 'checked') {
                    alert(FareFinder.Strings.Purchase.TermsAndConditions);
                    return false;
                }
                else {
                    _allow_back = false; _allow_next = false;
                    button.disabled = true;
                    _pr.FareFinderDatakey = window.name;
                    _pr.iovationBlackBox = $("#ioBlackBox").val();
                    FareFinder.ShowWait(true);

                    // Determine if debit
                    var strSelectedCardType = $('#ccTP').find(":selected").text();
                    if (strSelectedCardType == 'Interac Debit') {
                        ProcessDebit(_pr);
                    }
                    else{
                        // credit card
                        Tokenize(button);
                        //window.setTimeout(function () {
                        //   Greyhound.Website.Services.FareFinderService.Purchase(_pr, _callback_purchase_complete, _callback_purchase_error, { Button: button });
                        //}, 0);
                }
                }
            },

            Initialize: function () {
                var today = new Date();
                var m = $('#ccEM'), y = $('#ccEY');

                //Start: Aftab, INC2533590 
                // Changed loading of expiration month, previously it was loading the rst of the month from current month 
                // of a year, now it will load all the 12 month and will select the current month.
                for (var i = 1; i <= 12; i++) {
                    m.append($('<option/>').val(i).text(i));
                }

                m.val(today.getMonth() + 1);

                for (var i = 0; i <= 10; i++)
                    y.append($('<option/>').val(today.getFullYear() + i).text(today.getFullYear() + i));
                //END INC2533590
                var hover = FareFinder.GetHoverStyle(true);

                $('#infoD, #infoR').hover(
                    function () { this.style.border = hover.On; },
                    function () { this.style.border = hover.Off; }
                )

                // Accertify for CA.
                var snareScriptPath = ReadConfigSettings();
                $.getScript(snareScriptPath);

                $('#head_return').html($('#head_out').html());

                $.phoneFields('#billP1, #billP2, #billP3');
                $.numbersOnly('#ccCV, #ccNM');
                $.numbersOnly('#billP1,#billP2,#billP3');


                $(".nextBtn").click(_event_nextstep);
                $(".prevBtn").click(_event_prevstep);
                $("#step1title").click(_event_gotostep);

                $('#cship').click(_event_copyshipaddress);
                $('#ccEY').change(_event_changeyear);

                //Start INC7511877 - Print at Home Verbiage Update for Greyhound CA
                $("#btnprevious1").click(_event_ShowWillCallifAvailable);
                $("#btnNext1").click(_event_nextstep);
                $(".nextBtn1").click(_event_ShowPrintAtHomeOption);
                //End INC7511877 - Print at Home Verbiage Update for Greyhound CA

                var $delivery = $('#delivery');
                /*/
                Added by Ganesh | 5/24/2012
                CHG56691 - CC - Cardholder Not Traveling Content Change
                This event gets fired when there customer selected "WEB ONLY" fare and select credit card holder travelling as "NO".
                Its shows the new window for selecting new fares other than "WEB ONLY" fares.
                */
                //$("input[name='cardHolder']").click(_event_selectCreditCardHolder);
                $("input[name='ticketDeliveryChoice']", $delivery).click(_event_changedelivery);
                $("tr:not(:last-child) td:last-child", $delivery).append('<br/>');
                FareFinder.AddRewardsLogoutHandler();
                if (window.location.href.split("&").length > 1)
                {
                    var selectedValue = window.location.href.split("&")[0].split("=")[1];
                    if (selectedValue = 'N')
                        $("input[id='idNo']").attr('checked', 'true');
                    else
                        $("input[id='idYes']").attr('checked', 'true');
                }
            },

            InitializeRouteSchedules: function (outboundSchedule, returnboundSchedule) {
                _outboundSchedule = outboundSchedule;
                _returnboundSchedule = returnboundSchedule;
            }


        };

        //#endregion
    }();

    //#endregion

    //#region FareFinder.Step4

    FareFinder.Step4 = function () {
        //#region Private Members
        var _data;
        //#endregion

        //#region Private Methods

        //#region Handlers
        var _handler_continue_shopping = function (event) {
            event.preventDefault();
            FareFinder.Strings.Purchase.FuncContinueShopping('');
        };
        var _handler_print_confirmation = function (event) {
            event.preventDefault();
            FareFinder.Strings.Purchase.FuncPrintConfirmation(window.name);
        };
        var _handler_email_itin = function (event) {
            event.preventDefault();
            FareFinder.Strings.Purchase.FuncEmailItinerary(window.name);
        };
        var _handler_print_ticket = function (event) {
            event.preventDefault();
            var _timeoffset = new Date().getTimezoneOffset();
            var qs = String.format("?rn={0}&pn={1}&pc={2}", _data.ReservationNumber, _data.PrimaryPassengerLast, _data.PostalCode, _timeoffset);
            FareFinder.Strings.Purchase.FuncPrintTicket(qs);
        };
        //#endregion

        //#region Misc
        //#endregion

        //#endregion

        //#region Public Methods

        return {
            Initialize: function (data) {

                _data = data;

                var hover = FareFinder.GetHoverStyle(true);

                $('#infoD, #infoR').hover(
                    function () { this.style.border = hover.On; },
                    function () { this.style.border = hover.Off; }
                )

                $('#head_return').html($('#head_out').html());
                $('#buttons2').html($('#buttons1').html());

                $('.continueShoppingBtn').click(_handler_continue_shopping);
                $('.printItinBtn').click(_handler_print_confirmation);
                $('.emailItinBtn').click(_handler_email_itin);

                // Hide the print ticket button if this is not an eticket
                if (data.DeliveryMethod == 'EM') {
                    var $pb = $('.printTicketBtn');

                    // Attach event handle and show the parent element
                    $pb.click(_handler_print_ticket).show();

                    window.setTimeout(function () {
                        $pb.trigger('click');
                    }, 100);
                }

                FareFinder.RenderPricingTable(data, 1);
                FareFinder.AddRewardsLogoutHandler();
            }
        };

        //#endregion
    }();

    //#endregion

    function paywithcreditcard(value) {
        //card holder not travelling
        if (value == 1) {
            $('#cardholderNotTravelling').hide();
            //$('#passgnerCreditCardDiv').show();
            $('#tblpassengers > tbody > tr > td:nth-child(2)').hide();
            $('#tblpassengers > tbody > tr > td:nth-child(3)').hide();

        }
            //card holder
        else if (value == 0) {
            $('#cardholderNotTravelling').hide();
            //$('#passgnerCreditCardDiv').hide();
            $('#tblpassengers > tbody > tr > td:nth-child(2)').hide();
            $('#tblpassengers > tbody > tr > td:nth-child(3)').show();
        }
    }
    /*added by prachi for INC6782667 Cross-Border Enhancement */
function showmodifySearch() {

    $('#modifySearchLink').removeClass('modifysearchminus');
    $('#div_main_content').removeClass("newroundedBoxMid");
    $('#div_inner_content').removeClass("newclass_div_main_content");
    $("#step2ModifySearchPanel").hide();

    $('#modifySearchLink').addClass('modifysearchplus');
    $('#div_main_content').addClass("roundedBoxMid");
    $('#div_inner_content').addClass("class_div_main_content");
    $('#div_last_line').css("display", "block");

}

//end
    /* Generating a unique session key. Added to Avoid Session Data Corruption when the user browses the Website from multiple tabs in the same browser*/
    function GenerateFareFinderDatakey(autosubmit) {
        window.setTimeout(function () {
            Greyhound.Website.Services.FareFinderService.generateFareFinderDatakey(function (r, c) {
                window.name = r;
                if (autosubmit == true) {
                    FareFinder.SearchControl.Submit(false);
                }
            });
        }, 0);
    }

    //Jan 2014- Deepika - INC7215225-"Similar Travel Options" code update in .CA
    function CheckSimilarTravelExists() {
        var listOrig = $find(SearchReferences.ListOrigin);
        var listDest = $find(SearchReferences.ListDestination);
        var listOrigItem = listOrig.get_selectedItem();
        var listDestItem = listDest.get_selectedItem();
        var _similarTravelexists = false;

        if (listOrigItem != null && listDestItem != null) {
            //we have both an origin and a destination.
            //now let's see if it's a pair we care about
            orig_val = listOrigItem.get_value();
            origin_loc = orig_val.substring(0, orig_val.indexOf("|", 1));
            dest_val = listDestItem.get_value();
            destination_loc = dest_val.substring(0, dest_val.indexOf("|", 1));

            $.each(_locationSimilarTravelOrigins, function (i, origin) {
                if (origin.LocationCode == origin_loc) {
                    //let's see if the destination matches as well                           
                    $.each(origin.Destinations, function (i, destination) {
                        //the destination matches or it is zero for any destination. ("zero" wildcard only valid for destinations)
                        if (destination_loc == destination.LocationCode || destination.LocationCode == 0) {
                            _similarTravelexists = true;
                        }
                    });
                }
            });
        }
        if (_similarTravelexists) {
            $('.similarTravel').show();
            $("#similarTravel").show();
        }
    };

/* INC7427614 - Modify Search button is displayed along with a '+' sign on click of Similar travel option on step2 for .ca */
    /* On click of "Similar travel option" this function would hide the select schedule panel and show only the seacrh 
    panel with similar travel option and a modify search button without a plus sign */
    function ModifySearchOnSimilarTravel() {
        $('#modifySearchLink').removeAttr("Href");
        $('#modifySearchLink').removeClass('modifysearchplus');
        $('#modifySearchLink').addClass('modifysearchminus');

        $('#div_main_content').removeClass("roundedBoxMid");
        $('#div_main_content').addClass("newroundedBoxMid");

        $('#div_inner_content').removeClass("class_div_main_content");
        $('#div_inner_content').addClass("newclass_div_main_content");

        $('#div_last_line').css("display", "none");
    }

    function changeSelectedCardType(selCardType) {
        var strCardType = selCardType.options[selCardType.options.selectedIndex].text;
        if (strCardType == 'Interac Debit') {
            // Hide credit card details and show debit disclosure if debit card type selected
            $("#creditSelected").slideUp(400);
            $("#debitCardDisclosure").show();
            $("#debitCardPurchaseDisclosure").show();
            return;
        }

        $("#debitCardDisclosure").hide();
        $("#debitCardPurchaseDisclosure").hide();
        $("#creditSelected").slideDown(400);
    }