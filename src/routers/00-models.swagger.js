


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
 * @property {boolean} done - Task not completed - eg: false
 * @property {string} error - Error description - eg: internal server error
 */

/**
 * @typedef NotFoundError   
 * @property {boolean} done - task not completed - eg: false
 * @property {string} error - Resource was not found - eg: NOT_FOUND
 */

/**
 * @typedef NotAuthorization   
 * @property {boolean} done - task not completed - eg: false
 * @property {string} error - Authorization not received - eg: NEEDS_API_KEY
 */

/**
 * @typedef Unauthorized   
 * @property {boolean} done - task not completed - eg: false
 * @property {string} error - Authorization not accepted - eg: UNMATCHING_CREDENTIALS
 */


/**
 * @typedef LoginInput
 * @property {string} email.required - The user email - eg: sahj@live.com.mx
 * @property {string} password.required - The user password - eg: 123456
 */

/**
 * @typedef TokenResponse
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {string} data - The token data - eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHZpdHRhLmNvb
 */

/**
 * @typedef ResourceInput The resource name
 * @property {enum} name - The name of the resource - eg: medicines,illnesses,doses,icons
 */

/**
 * @typedef Catalog Any catalog list
 * @property {integer} value - The data value - eg: 1
 * @property {string} label - The humanized representation of value - eg: pill
 */


/**
 * @typedef CatalogResponpse Any catalog list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {Array.<Catalog>} data - Catalog items - eg: list of genders
 */

/**
 * @typedef User Users list
 * @property {integer} id User id - eg: 1
 * @property {string} email User email - eg: dev@vitta.com
 * @property {datetime} birthday User's birthday - eg: 2022-07-01T05:00:00.000Z
 * @property {integer} gender User's gender from genders catalog - eg: 2
 * @property {datetime} created_at Date when user was created- eg: 2022-07-01T05:00:00.000Z
 * @property {datetime} updated_at Last time user was updated - eg: 2022-07-01T05:00:00.000Z
 */


/**
 * @typedef UserListResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {Array.<User>} data - Users found - eg: list of users
 */
 
/**
 * @typedef UserResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {User.model} data - Users found - eg: list of users
 */

/**
 * @typedef UserInputRequest
 * @property {string} name.required - The user name - eg: Galileo Galilei
 * @property {string} email.required - The user email - eg: dev@vitta.com
 * @property {string} password.required - The user password - eg: 123456
 * @property {datetime} birthday.required - The user birthday - eg: 07-01-2022
 * @property {datetime} gender.required - The user gender from genders catalog - eg: 1
 */


/**
 * @typedef UserResponse Users list
 * @property {integer} id - Task completed successfully - eg: 2
 */

/**
 * @typedef UserInputResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {UserResponse.model} data - Users created - eg: 1
 */
 

/**
 * @typedef Alarm Users list
 * @property {integer} id Alarm id - eg: 1
 * @property {integer} account_id The account id - eg: 2
 * @property {string} illness_code The illness code from illnesses resource - eg: diabetes_mellitus
 * @property {string} medicine_code The medicine code from medicines resource - eg: paracetamol_500_mg
 * @property {boolean} active Alarm is currently active - eg: true
 * @property {datetime} created_at Date when alarm was created- eg: 2022-07-01T05:00:00.000Z
 * @property {datetime} updated_at Last time alarm was updated - eg: 2022-07-01T05:00:00.000Z
 */


/**
 * @typedef AlarmListResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {Array.<Alarm>} data - Users found - eg: list of users
 */

/**
 * @typedef AlarmResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {AlarmRequest.model} data - Users found - eg: list of users
 */

/**
 * @typedef Medicine Users list
 * @property {string} value Medicine code - eg: vanair_aerosol_500mg_i
 * @property {string} name Medicine name - eg: Vanair Aerosol 500 mg i
 */

/**
 * @typedef AlarmData Users list
 * @property {integer} id Medicine code - eg: 1
 * @property {boolean} active Medicine name - eg: true
 * @property {datetime} first_take Last time alarm was updated - eg: 2022-07-01T05:00:00.000Z
 */

/**
 * @typedef Dose Users list
 * @property {integer} dose_type Dose type id - eg: 1
 * @property {string} dose_type_name Dose type name - eg: vanair aerosol 500mg i
 * @property {integer} icon_type Dose icon id - eg: 10
 * @property {string} icon_type_name Dose icon data - eg: vanair aerosol 500mg i
 * @property {integer} measurement_type Measurement type id - eg: 20
 * @property {string} measurement_type_name Measurement type name - eg: vanair aerosol 500mg i
 * @property {integer} grammage Grammage in grammes - eg: 500
 * @property {integer} quantity Quantity of dose - eg: 1
 * @property {string} period Dose taking period in n[h,d] format- eg: 12h
 * @property {string} duration Dose duration in n[d,w,m] format - eg: 7d
 */

/**
 * @typedef Illness Users list
 * @property {string} type Medicine code - eg: diabetes_mellitus
 * @property {string} name Medicine name - eg: Diabetes Mellitus
 */

/**
 * @typedef AlarmRequest Users list
 * @property {Medicine.model} medicine - Medicine data
 * @property {AlarmData.model} alarm - Alarm metadata
 * @property {Dose.model} dose - Dose data
 * @property {Illness.model} illness - Illness data
 */

/**
 * @typedef MedicineInput Users list
 * @property {string} name Medicine name - eg: Paracetamol 250 mg tableta
 */

/**
 * @typedef MoodInput Users list
 * @property {integer} type Mood type id from moods resource - eg: 3
 */

/**
 * @typedef AlarmInput Users list
 * @property {boolean} active Is active - eg: true
 * @property {datetime} first_take Is active - eg: 2022-07-01T05:00:00.000Z
 */

/**
 * @typedef DoseInput Users list
 * @property {integer} dose_type Dose type id from doses resource - eg: 2
 * @property {integer} icon_type Dose icon id from icons resource - eg: 1
 * @property {integer} measurement_type Measurement type id from measurements resource - eg: 7
 * @property {integer} grammage Grammage in grammes -  eg: 250
 * @property {integer} quantity Quantity of dose - eg: 1
 * @property {string} period Dose taking period in n[h,d] format- eg: 12h
 * @property {string} duration Dose duration in n[d,w,m] format - eg: 7d
 */

/**
 * @typedef IllnessInput Users list
 * @property {string} name Illness name - eg: Covid 19
 */

/**
 * @typedef AlarmInputRequest Users list
 * @property {MedicineInput.model} medicine - Medicine data
 * @property {MoodInput.model} mood - Alarm metadata
 * @property {AlarmInput.model} alarm - Dose data
 * @property {DoseInput.model} dose - Illness data
 * @property {IllnessInput.model} illness - Illness data
 */

/**
 * @typedef AlarmCreated Users list
 * @property {integer} id - Id of new alarm - eg: 20
 */

/**
 * @typedef AlarmCreatedResponse Users list
 * @property {boolean} done - Task completed successfully - eg: true
 * @property {AlarmCreated.model} data - Users found - eg: list of users
 */