Type.registerNamespace('Greyhound.Website.Services');
Greyhound.Website.Services.FareFinderService=function() {
Greyhound.Website.Services.FareFinderService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
Greyhound.Website.Services.FareFinderService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return Greyhound.Website.Services.FareFinderService._staticInstance.get_path();},
GetScheduleDetailsByDate:function(request,travellingStartDate,isReturn,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetScheduleDetailsByDate',false,{request:request,travellingStartDate:travellingStartDate,isReturn:isReturn},succeededCallback,failedCallback,userContext); },
GetScheduleDetails:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetScheduleDetails',false,{request:request},succeededCallback,failedCallback,userContext); },
IsCrossCountryLocation:function(originId,destId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'IsCrossCountryLocation',false,{originId:originId,destId:destId},succeededCallback,failedCallback,userContext); },
Search:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Search',false,{request:request},succeededCallback,failedCallback,userContext); },
ConfirmFare:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ConfirmFare',false,{request:request},succeededCallback,failedCallback,userContext); },
GetPrice:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetPrice',false,{request:request},succeededCallback,failedCallback,userContext); },
ComputeHashedExactValues:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ComputeHashedExactValues',false,{request:request},succeededCallback,failedCallback,userContext); },
PutOnCourtesyHold:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'PutOnCourtesyHold',false,{request:request},succeededCallback,failedCallback,userContext); },
Purchase:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Purchase',false,{request:request},succeededCallback,failedCallback,userContext); },
PurchaseDebit:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'PurchaseDebit',false,{request:request},succeededCallback,failedCallback,userContext); },
CheckPurchase:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'CheckPurchase',false,{},succeededCallback,failedCallback,userContext); },
GetCountriesStates:function(deliveryMethod,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetCountriesStates',false,{deliveryMethod:deliveryMethod},succeededCallback,failedCallback,userContext); },
GetPNMNearestStoreLocations:function(zipCode,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetPNMNearestStoreLocations',false,{zipCode:zipCode},succeededCallback,failedCallback,userContext); },
generateFareFinderDatakey:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'generateFareFinderDatakey',false,{},succeededCallback,failedCallback,userContext); },
GetHomeBanners:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetHomeBanners',false,{},succeededCallback,failedCallback,userContext); },
GetHomeBadges:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetHomeBadges',false,{},succeededCallback,failedCallback,userContext); },
GetExpressData:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetExpressData',false,{},succeededCallback,failedCallback,userContext); },
GetMexicoData:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetMexicoData',false,{},succeededCallback,failedCallback,userContext); },
GetFareIconData:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetFareIconData',false,{},succeededCallback,failedCallback,userContext); },
GetDynamicContent:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetDynamicContent',false,{},succeededCallback,failedCallback,userContext); }}
Greyhound.Website.Services.FareFinderService.registerClass('Greyhound.Website.Services.FareFinderService',Sys.Net.WebServiceProxy);
Greyhound.Website.Services.FareFinderService._staticInstance = new Greyhound.Website.Services.FareFinderService();
Greyhound.Website.Services.FareFinderService.set_path = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_path(value); }
Greyhound.Website.Services.FareFinderService.get_path = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_path(); }
Greyhound.Website.Services.FareFinderService.set_timeout = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_timeout(value); }
Greyhound.Website.Services.FareFinderService.get_timeout = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_timeout(); }
Greyhound.Website.Services.FareFinderService.set_defaultUserContext = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_defaultUserContext(value); }
Greyhound.Website.Services.FareFinderService.get_defaultUserContext = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_defaultUserContext(); }
Greyhound.Website.Services.FareFinderService.set_defaultSucceededCallback = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_defaultSucceededCallback(value); }
Greyhound.Website.Services.FareFinderService.get_defaultSucceededCallback = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_defaultSucceededCallback(); }
Greyhound.Website.Services.FareFinderService.set_defaultFailedCallback = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_defaultFailedCallback(value); }
Greyhound.Website.Services.FareFinderService.get_defaultFailedCallback = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_defaultFailedCallback(); }
Greyhound.Website.Services.FareFinderService.set_enableJsonp = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_enableJsonp(value); }
Greyhound.Website.Services.FareFinderService.get_enableJsonp = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_enableJsonp(); }
Greyhound.Website.Services.FareFinderService.set_jsonpCallbackParameter = function(value) { Greyhound.Website.Services.FareFinderService._staticInstance.set_jsonpCallbackParameter(value); }
Greyhound.Website.Services.FareFinderService.get_jsonpCallbackParameter = function() { return Greyhound.Website.Services.FareFinderService._staticInstance.get_jsonpCallbackParameter(); }
Greyhound.Website.Services.FareFinderService.set_path("/services/farefinder.asmx");
Greyhound.Website.Services.FareFinderService.GetScheduleDetailsByDate= function(request,travellingStartDate,isReturn,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetScheduleDetailsByDate(request,travellingStartDate,isReturn,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetScheduleDetails= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetScheduleDetails(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.IsCrossCountryLocation= function(originId,destId,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.IsCrossCountryLocation(originId,destId,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.Search= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.Search(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.ConfirmFare= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.ConfirmFare(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetPrice= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetPrice(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.ComputeHashedExactValues= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.ComputeHashedExactValues(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.PutOnCourtesyHold= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.PutOnCourtesyHold(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.Purchase= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.Purchase(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.PurchaseDebit= function(request,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.PurchaseDebit(request,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.CheckPurchase= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.CheckPurchase(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetCountriesStates= function(deliveryMethod,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetCountriesStates(deliveryMethod,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetPNMNearestStoreLocations= function(zipCode,onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetPNMNearestStoreLocations(zipCode,onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.generateFareFinderDatakey= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.generateFareFinderDatakey(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetHomeBanners= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetHomeBanners(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetHomeBadges= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetHomeBadges(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetExpressData= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetExpressData(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetMexicoData= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetMexicoData(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetFareIconData= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetFareIconData(onSuccess,onFailed,userContext); }
Greyhound.Website.Services.FareFinderService.GetDynamicContent= function(onSuccess,onFailed,userContext) {Greyhound.Website.Services.FareFinderService._staticInstance.GetDynamicContent(onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('Greyhound.Website.DataObjects');
if (typeof(Greyhound.Website.DataObjects.ClientScheduleDetailRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientScheduleDetailRequest=gtc("Greyhound.Website.DataObjects.ClientScheduleDetailRequest");
Greyhound.Website.DataObjects.ClientScheduleDetailRequest.registerClass('Greyhound.Website.DataObjects.ClientScheduleDetailRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientScheduleDetailResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientScheduleDetailResponse=gtc("Greyhound.Website.DataObjects.ClientScheduleDetailResponse");
Greyhound.Website.DataObjects.ClientScheduleDetailResponse.registerClass('Greyhound.Website.DataObjects.ClientScheduleDetailResponse');
}
if (typeof(Greyhound.Website.DataObjects.ClientSearchRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientSearchRequest=gtc("Greyhound.Website.DataObjects.ClientSearchRequest");
Greyhound.Website.DataObjects.ClientSearchRequest.registerClass('Greyhound.Website.DataObjects.ClientSearchRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientSearchResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientSearchResponse=gtc("Greyhound.Website.DataObjects.ClientSearchResponse");
Greyhound.Website.DataObjects.ClientSearchResponse.registerClass('Greyhound.Website.DataObjects.ClientSearchResponse');
}
if (typeof(Greyhound.Website.DataObjects.ClientValidateRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientValidateRequest=gtc("Greyhound.Website.DataObjects.ClientValidateRequest");
Greyhound.Website.DataObjects.ClientValidateRequest.registerClass('Greyhound.Website.DataObjects.ClientValidateRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientValidateResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientValidateResponse=gtc("Greyhound.Website.DataObjects.ClientValidateResponse");
Greyhound.Website.DataObjects.ClientValidateResponse.registerClass('Greyhound.Website.DataObjects.ClientValidateResponse');
}
if (typeof(Greyhound.Website.DataObjects.ClientPriceRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientPriceRequest=gtc("Greyhound.Website.DataObjects.ClientPriceRequest");
Greyhound.Website.DataObjects.ClientPriceRequest.registerClass('Greyhound.Website.DataObjects.ClientPriceRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientPriceResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientPriceResponse=gtc("Greyhound.Website.DataObjects.ClientPriceResponse");
Greyhound.Website.DataObjects.ClientPriceResponse.registerClass('Greyhound.Website.DataObjects.ClientPriceResponse');
}
if (typeof(Greyhound.Website.DataObjects.ClientExactHashRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientExactHashRequest=gtc("Greyhound.Website.DataObjects.ClientExactHashRequest");
Greyhound.Website.DataObjects.ClientExactHashRequest.registerClass('Greyhound.Website.DataObjects.ClientExactHashRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientPurchaseRequest) === 'undefined') {
Greyhound.Website.DataObjects.ClientPurchaseRequest=gtc("Greyhound.Website.DataObjects.ClientPurchaseRequest");
Greyhound.Website.DataObjects.ClientPurchaseRequest.registerClass('Greyhound.Website.DataObjects.ClientPurchaseRequest');
}
if (typeof(Greyhound.Website.DataObjects.ClientPurchaseResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientPurchaseResponse=gtc("Greyhound.Website.DataObjects.ClientPurchaseResponse");
Greyhound.Website.DataObjects.ClientPurchaseResponse.registerClass('Greyhound.Website.DataObjects.ClientPurchaseResponse');
}
if (typeof(Greyhound.Website.DataObjects.ClientPurchaseAddress) === 'undefined') {
Greyhound.Website.DataObjects.ClientPurchaseAddress=gtc("Greyhound.Website.DataObjects.ClientPurchaseAddress");
Greyhound.Website.DataObjects.ClientPurchaseAddress.registerClass('Greyhound.Website.DataObjects.ClientPurchaseAddress');
}
if (typeof(Greyhound.Website.DataObjects.ClientPassenger) === 'undefined') {
Greyhound.Website.DataObjects.ClientPassenger=gtc("Greyhound.Website.DataObjects.ClientPassenger");
Greyhound.Website.DataObjects.ClientPassenger.registerClass('Greyhound.Website.DataObjects.ClientPassenger');
}
if (typeof(Greyhound.Website.DataObjects.ClientCountryStateResponse) === 'undefined') {
Greyhound.Website.DataObjects.ClientCountryStateResponse=gtc("Greyhound.Website.DataObjects.ClientCountryStateResponse");
Greyhound.Website.DataObjects.ClientCountryStateResponse.registerClass('Greyhound.Website.DataObjects.ClientCountryStateResponse');
}
if (typeof(Greyhound.Website.DataObjects.WebPNMNearestStoreLookupResponse) === 'undefined') {
Greyhound.Website.DataObjects.WebPNMNearestStoreLookupResponse=gtc("Greyhound.Website.DataObjects.WebPNMNearestStoreLookupResponse");
Greyhound.Website.DataObjects.WebPNMNearestStoreLookupResponse.registerClass('Greyhound.Website.DataObjects.WebPNMNearestStoreLookupResponse');
}
if (typeof(Greyhound.Website.DataObjects.HomeBannerResponse) === 'undefined') {
Greyhound.Website.DataObjects.HomeBannerResponse=gtc("Greyhound.Website.DataObjects.HomeBannerResponse");
Greyhound.Website.DataObjects.HomeBannerResponse.registerClass('Greyhound.Website.DataObjects.HomeBannerResponse');
}
if (typeof(Greyhound.Website.DataObjects.HomeBadgeResponse) === 'undefined') {
Greyhound.Website.DataObjects.HomeBadgeResponse=gtc("Greyhound.Website.DataObjects.HomeBadgeResponse");
Greyhound.Website.DataObjects.HomeBadgeResponse.registerClass('Greyhound.Website.DataObjects.HomeBadgeResponse');
}
if (typeof(Greyhound.Website.DataObjects.ExpressDataResponse) === 'undefined') {
Greyhound.Website.DataObjects.ExpressDataResponse=gtc("Greyhound.Website.DataObjects.ExpressDataResponse");
Greyhound.Website.DataObjects.ExpressDataResponse.registerClass('Greyhound.Website.DataObjects.ExpressDataResponse');
}
if (typeof(Greyhound.Website.DataObjects.MexicoDataResponse) === 'undefined') {
Greyhound.Website.DataObjects.MexicoDataResponse=gtc("Greyhound.Website.DataObjects.MexicoDataResponse");
Greyhound.Website.DataObjects.MexicoDataResponse.registerClass('Greyhound.Website.DataObjects.MexicoDataResponse');
}
if (typeof(Greyhound.Website.DataObjects.FareIconResponse) === 'undefined') {
Greyhound.Website.DataObjects.FareIconResponse=gtc("Greyhound.Website.DataObjects.FareIconResponse");
Greyhound.Website.DataObjects.FareIconResponse.registerClass('Greyhound.Website.DataObjects.FareIconResponse');
}
if (typeof(Greyhound.Website.DataObjects.DynamicContentResponse) === 'undefined') {
Greyhound.Website.DataObjects.DynamicContentResponse=gtc("Greyhound.Website.DataObjects.DynamicContentResponse");
Greyhound.Website.DataObjects.DynamicContentResponse.registerClass('Greyhound.Website.DataObjects.DynamicContentResponse');
}
