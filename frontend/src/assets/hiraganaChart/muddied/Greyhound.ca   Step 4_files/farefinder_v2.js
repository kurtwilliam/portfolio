FareFinder.Strings = function() {
    return {
    LogoutMessage: 'If you log out now, you will be redirected to Step 1.\nContinue?',
    ValidationAlertTitle: 'Information',
        Search: {
            ResultsMessage: 'Locations <b>{0}</b> of <b>{1}</b>',
            MoreMessage: '- <u>more</u>...',
            EmptyMessage: '',
            RewardPrefix: '(R) ',

            MaxPassengersMessage: 'You may purchase only {0} tickets per transaction. If needed, please split your purchase into multiple orders.',
            NoChildrenMessage: 'To purchase tickets for unaccompanied children, please visit your local Greyhound station or call 1-800-661-TRIP (8747).',
            NoPassengersMessage: 'Please choose the number of passengers who will be traveling.'
        },
        Schedule: {
            TimeOut: 'Your session has expired. Please visit our homepage to restart the ticketing process.',
            NA: 'N/A',
            Included: 'INCLUDED',
            SoldOut: 'SOLD OUT',
            SimilarTravelOption: 'SIMILAR TRAVEL OPTION',
            WillExceedSeatsAvailable: 'Maximum {0} seat(s) can be booked.',
            WillExceedFaresAvailable: 'Maximum {0} fare(s) can be booked.',
            ShowMinimumSeatsLeft: '{0} seat(s) left at this time.',
            AdvancedPurchaseFaresLeft: ' Advanced Purchase fare(s) left at this time.',
            StandardFaresLeft: ' Standard fare(s) left at this time.',
            ChooseSchedB: 'Please choose an outbound and a return schedule.',
            ChooseSchedO: 'Please choose an outbound schedule.',
            ChooseSchedR: 'Please choose a return schedule.',
            /*NoSchedules: 'No schedules are available for the time period you selected. Please choose a different time of day, or a different date for travel, to continue.<br/><a href="#" onclick="FareFinder.Step2.ModifySearch();return false">Modify Search</a>',*/
            /*CHG40010*/
            TimeLimitSchedules: 'Online ticket purchase must be made at least 2 hours in advance of travel. Please click <a href="#" onclick="FareFinder.Step2.ModifySearch_new();return false">modify search</a> to choose another schedule or call 1-800-661-TRIP (8747)',
            NoSchedules: 'There is no service available to this location on the date requested or at all. Please choose a different time of day, or a different date for travel, to continue.<br/><a href="#" onclick="FareFinder.Step2.ModifySearch_new();return false">Modify Search</a>',
            PriceConflictMessage: 'We’ve encountered a pricing conflict on the round trip you selected. <br/>To complete your purchase, please contact fares and scheduling at 1-800-661-TRIP (8747).',
            /* Added by kittu for Round Trip Fare Quotes*/
            PriceConflictMessages: 'We are sorry, but due to fare and/or schedule availability or arrangements with other carrier(s) which may be operating a portion of the chosen trip, the price of this trip has changed from {0} to {1}.  Click Continue to accept the new fare, or Modify Search to choose a different date/ time for your journey.',
            PriceConflictTitle: 'Greyhound.ca - Price Conflict',
            FaresErrorMessage : 'Oops, sorry that fare is not available.  Please select another fare.',
            /*End*/
            Detail: {
                ShowTitle: 'Schedule Details',
                HideTitle: 'Hide Details',
                Show: '+ SCHEDULE DETAILS',
                Hide: '- HIDE DETAILS',
                Location: 'Location',
                Arrives: 'Arrives',
                Departs: 'Departs',
                Layover: 'Layover',
                Carrier: 'Carrier',
                Meals: 'Meals/Rest Stop',
                ScheduleNbr: 'Schedule'
            },
            TripTo: '*************** Trip to {0} ***************',
            Depart: 'Depart',
            Arrive: 'Arrive',
            SelectedFareType: 'Fare Type',
            FareType:'You have selected a {0} ticket.',
            TravelInfo:'Below is your arrival and departure information, including any connecting bus transfers:',
            SummaryCharges:'A summary of the charges for your purchase appears below:',
            NoSeatsAlertMessage: 'No seats available'
        },
        Purchase: {
            PendingMessage: 'TODO: Purchase pending message',
            PassengerName: 'Passenger Name',
            WebOnly:'WEB ONLY',
            HeaderRT: 'Tickets (Round Trip)',
            HeaderOW: 'Tickets (One Way)',
            Adjustments: 'Adjustments',
            /*CHG40010*/
            Taxes: 'Taxes',
            PurchaseGrandTotal: 'Grand Total',
            /*End*/
            RequiredMessage: 'Please fill out all the required fields.',
            /* Start INC7170101 - Data type validation - Passenger and Card holder Names */
            PassengerCharMessage: 'Please enter the passenger name.',
            CardholderCharMessage: 'Please enter the cardholder name.',
            /* End INC7170101 - Data type validation - Passenger and Card holder Names */
            
            //Added new by Swapnil B for INC6839578 
            InvalidDepartDateMessage: 'Please choose a travel date that is less than one year from today.',
            InvalidReturnDateMessage: 'Please choose a travel date that is less than one year from today.',
            InvalidReturnDateDepartDateMessage: 'Return date must be greater than departure date.',
            InvalidDepartDateLessThanSystemDateMessage: 'The travel date cannot be prior to today’s date.',
            /*End*/

            InvalidCVVNumberMessage: 'Security Code should be more than 2 digits.',
            /*CHG40010*/
            InvalidEmailMessage: 'Please ensure your email address is correctly formatted.',
            EmailMismatchMessage: 'Please ensure you correctly entered the same email address in both fields.',
            InvalidDestinationMessage: 'Origin and destination cannot be the same.',
            InvalidDateMessage: 'Please enter a valid date.',
            //Added new by Swapnil B for INC6839578 -- Commented the Code as the messages are overridden.
            /*Aftab: Bug 8027, Wrong error message when departing date is in past */
            //InvalidDepartDateMessage: 'Please choose a travel date that is based on the current date or within a year of today.',
            //InvalidReturnDateMessage: 'Return date must be greater than departure date',
            /*END Bug 8027*/
            /*End*/
            /*End*/
            FuncContinueShopping: function(qs) { window.location = 'Step1.aspx'; },

            FuncPrintTicket: function(qs) { Common.ShowRad(900, 550, 'PUR_PT', 'Print Ticket', '~/farefinder/viewticket.aspx' + qs, true, false, 'PLEASE PRINT PRIOR TO ARRIVAL AT TERMINAL. CUSTOMERS PRINT ONE TICKET PER PAGE. DO NOT PRINT ON THE BACK OF THE PAPER.'); },
            FuncEmailItinerary: function (qs) { Common.ShowRad(600, 600, 'PUR_EI', 'Email Itinerary', '~/farefinder/emailitinerary.aspx?SessionId=' + qs, true, false); },
            FuncPrintConfirmation: function (qs) { Common.ShowRad(800, 550, 'PUR_PC', 'Print Confirmation', '~/farefinder/printconfirmation.ashx?SessionId=' + qs, true, false); },
            /*CHG41842 Start*/  
            DeclinedMessage: 'We are sorry, but we could not complete your online purchase.<br />Please contact your credit card issuer to verify your credit card information or <a href="/home/en/ContactUs.aspx">contact us</a> for assistance. Multiple purchase attempts may affect the amount of available credit on your account.',
            //DeclinedPopup: '* * * ATTENTION - PLEASE DO NOT RESUBMIT THIS PAGE * * *\n\nWe are sorry, but we could not complete your online purchase.\nPlease contact your credit card issuer to verify your credit card information or contact us for assistance. Multiple purchase attempts may affect the amount of available credit on your account.',
            /*End*/
            /*CHG40010*/
            PurchaseDeclinedMessage: 'We are sorry, but we could not complete your online purchase. Please call fare and schedule information<br />at 1-800-661-TRIP (8747) to purchase a ticket by phone or visit any of our <a href="/en/locations/states.aspx">ticket locations</a> within the United States.<br />Thank you for choosing Greyhound.',
            //Error1142Message: 'We are sorry, but we could not complete your online purchase. Please call fare and schedule information <br/>at 1-800-661-TRIP (8747) to purchase a ticket by phone or visit any of our <a href="/en/locations/states.aspx">ticket locations</a> within the United States. Thank you for choosing Greyhound.',
            /*End*/
            DeclinedPopup: 'We are sorry, but we could not complete your online purchase. Please call fare and schedule information at 1-800-661-8747 to purchase a ticket by phone or visit any of our <a href="/en/locations/states.aspx">ticket locations</a> within the Canada. Thank you for choosing Greyhound.',
            Error1142Message: 'We are sorry, but we could not complete your online purchase. Please call fare and schedule information at 1-800-661-8747 to purchase a ticket by phone or visit any of our <a href="/en/locations/states.aspx">ticket locations</a> within the Canada. Thank you for choosing Greyhound.',
            /*End CHG51533*/
            DeclinedPopupTitle: 'Credit Card Decline',
            CreditCardNotTravelTitle: 'Cardholder Not Traveling?',
            TermsAndConditions: 'Please agree to the Terms and Conditions.',
            CreditCardNotTravelDescription: '<h2 class="pageHead">Cardholder Not Traveling? </h2><br/><br/>You have indicated that the primary cardholder is not traveling. Web Only Fares are only available when the primary cardholder is traveling. <br/><br/>Please select a fare below and proceed to purchase the ticket. If you would like to secure the Web Only Fare the cardholder must travel on the selected schedule.',
            // INC4761642 - Credit Card Purchase Errors on Greyhound.ca - Error Message
            DuplicateTransactionTitle: 'Greyhound.ca | Completed Transactions',
            DuplicateTransactionMessage: 'Thank you for your purchase.  Your credit card has been charged but we were unable to generate your travel ticket. <br/><br/> Please submit the following confirmation number ({0}) to your local terminal or contact Web Support at 1-800-365-7147 for ticket processing.',
            //Start INC7511877 - Print at Home Verbiage Update for Greyhound CA
            PrintAtHomeTicketPurchaseTitle: 'PRINTER REQUIRED FOR PRINT AT HOME TICKET PURCHASES',
            PrintAtHomeTicketPurchaseMessage: '<b>Do you have a printer?</b><br/><br/> Print at Home tickets MUST be printed by the passenger prior to travel. <u> Tickets displayed on smartphones cannot be accepted. </u> Customers without the ticket printout will be required to purchase another ticket prior to boarding the bus. Tickets will not be refunded due to printing issues. <br/><br/>Click “Next” to continue with Print at Home, or “Previous” to change your selection.',
            //End INC7511877 - Print at Home Verbiage Update for Greyhound CA
            // Accertify for CA
            AccertifyDeclinedPopupTitle: 'Cannot complete purchase',
            AccertifyDeclinedPopupMessage: 'This credit card purchase cannot be completed. For further assistance, please contact 888.899.4221.',
            SessionTimeoutMessage: 'Your session has expired. Please visit our homepage to restart the ticketing process.',
            SessionTimeoutTitle: 'Greyhound.ca',
            //added by prachi on 23 oct 2013 for INC5400030
            DeclinedErrorMessage_new: 'The schedule you selected is sold-out. Please choose another departure date or time.',               
 	    /*added by prachi for INC6782667 Cross-Border Enhancement */
            InterstitialAlertTitle: 'Cross-Border Alert',
            InterstitialAlertMessage: 'Schedules departing from US destinations must be purchased on Greyhound.com. International service fees may apply. To select an alternate schedule, click <a oncontextmenu="return false" href="javascript:closeRadPopupMessage(\'RedirecttoGreyhoundRadWindow\');">Modify Search</a>',
            NoSeatsAlertMessage: 'No seats available'
            /*END*/
        },
        //Added by Deepika Jan 2014
        //INC6935019-Zip Code Search for Station Locator
        Location: {
            RequiredMessage: 'Please fill out all the required fields.',
            SearchCriteria: 'Please enter a Postal Code or a Province/City but not both.',
            InvalidZipCode: 'Invalid Postal Code.',
            CityRequired: 'Please select a City.',
            GreyhoundLocation: 'Greyhound Location',
            City: 'City',
            State: 'Province',
            LocationDetailsText: 'Click the Greyhound Location name for more detail.',
            NoLocation: 'No locations found within 80 kilometers of the postal code entered.  Please try another postal code.',
            BusStop: 'Bus Stop'
        }
    };
} ();