class HttpCodes {
    static CODES = {
        "200":  "Success",
        "400":  "BadRequest",
        "401":	"Unauthorized",
        "402":	"PaymentRequired",
        "403":	"Forbidden",
        "404":	"NotFound",
        "405":	"MethodNotAllowed",
        "406":	"NotAcceptable",
        "407":	"ProxyAuthenticationRequired",
        "408":	'RequestTimeout',
        "409":	"Conflict",
        "410":	"Gone",
        "411":	"LengthRequired",
        "412":	"PreconditionFailed",
        "413":	"PayloadTooLarge",
        "414":	"URITooLong",
        '415':	"UnsupportedMediaType",
        "416":	'RangeNotSatisfiable',
        "417":	"ExpectationFailed",
        "418":	"ImATeapot",
        "421":	"MisdirectedRequest",
        "422":	"UnprocessableEntity",
        "423":	"Locked",
        "424":	"FailedDependency",
        "425":	"TooEarly",
        "426":	"UpgradeRequired",
        "428":	"PreconditionRequired",
        "429":	"TooManyRequests",
        "431":	"RequestHeaderFieldsTooLarge",
        "451":	"UnavailableForLegalReasons",
        "500":	"InternalServerError",
        "501":	"NotImplemented",
        "502":  "BadGateway",
        "503":	"ServiceUnavailable",
        "504":	"GatewayTimeout",
        "505":	"HTTPVersionNotSupported",
        "506":	"VariantAlsoNegotiates",
        "507":	"InsufficientStorage",
        "508":	"LoopDetected",
        "509":	"BandwidthLimitExceeded",
        "510":	"NotExtended",
        "511":	"NetworkAuthenticationRequired"
    };

    static ListCodes (str) {
        return Object.keys(this.CODES);
    }

    static getValue(code) {
        return this.CODES[ code.toString() ];
    }

    static getCode(value) {
        for (const key in this.CODES) {
            if (Object.hasOwnProperty.call(this.CODES, key)) {
                const element = this.CODES[key];
                if (element === value) return key;
            }
        }
    }
    
}

module.exports = HttpCodes;