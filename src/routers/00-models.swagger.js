


/**
 * @typedef HealthcheckResponse    
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {ApiData.model} data - The API information - eg: {name: Vitta API}
 */

/**
 * @typedef ApiData    
 * @property {string} name The API name - eg: Vitta aPI
 * @property {string} version The current API version - eg: 1.0.0
 * @property {string} owner The API owner/ mantainer - eg: Ventoqipa
 */

/**
 * @typedef ApiResponse    
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {object} data - The spected data response - eg: {some data}
 */

/**
 * @typedef ApiError   
 * @property {[boolean]} done - Task not completed - eg: false
 * @property {[string]} error - Error description - eg: internal server error
 */

/**
 * @typedef NotFoundError   
 * @property {[boolean]} done - task not completed - eg: false
 * @property {[string]} error - Resource was not found - eg: NOT_FOUND
 */

/**
 * @typedef NotAuthorization   
 * @property {[boolean]} done - task not completed - eg: false
 * @property {[string]} error - Authorization not received - eg: NEEDS_API_KEY
 */

/**
 * @typedef Unauthorized   
 * @property {[boolean]} done - task not completed - eg: false
 * @property {[string]} error - Authorization not accepted - eg: UNMATCHING_CREDENTIALS
 */


/**
 * @typedef LoginInput
 * @property {[string]} email.required - The user email - eg: sahj@live.com.mx
 * @property {[string]} password.required - The user password - eg: 123456
 */

/**
 * @typedef TokenResponse
 * @property {[boolean]} done - Task completed successfully - eg: true
 * @property {[string]} data - The token data - eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHZpdHRhLmNvb
 */

/**
 * @typedef ResourceInput The resource name
 * @property {enum} name - The name of the resource - eg: medicines,illnesses,doses,icons
 */

/**
 * @typedef Catalog Any catalog list
 * @property {[integer]} value - The data value - eg: 1
 * @property {[string]} label - The humanized representation of value - eg: pill
 */


/**
 * @typedef CatalogResponpse Any catalog list
 * @property {[boolean]} done - Task completed successfully - eg: true
 * @property {Array.<Catalog>} data - Catalog items - eg: list of genders
 */