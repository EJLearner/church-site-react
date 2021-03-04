const COOKIE_KEYS = {
  CART_DATA: 'cart-data'
};

const dateConstants = {
  DATE_FNS_DISPLAY_DATE_FORMAT: 'M/d/yyyy',
  DATE_FNS_INTERNAL_DATE_FORMAT: 'yyyy-MM-dd',
  DATE_FNS_DATE_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  DISPLAY_DATE_FORMAT: 'M/D/YYYY',
  DISPLAY_TIME_FORMAT: 'M/D/YY h:mm a',
  INTERNAL_DATE_FORMAT: 'YYYY-MM-DD',
  INTERNAL_TIMESTAMP_FORMAT: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  VALID_INPUT_DATE_FORMATS: ['M/D/YY', 'M/D/YYYY', 'M-D-YYYY', 'M-D-YY']
};

const daysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
};

const FEATURE_FLAGS = {
  ANNIVERSARY_STORE: 'ANNIVERSARY_STORE'
};

const constants = {
  ...dateConstants,
  daysOfWeek,

  CC_LOGBOOK_REF_NAME: 'ccLogbook',
  CC_REGISTERED_CHILDREN_REF_NAME: 'ccRegisteredChildren',
  CC_REGISTERED_CHILD_ID_PROP: 'ccRegisteredId',
  CC_REGISTERED_VOLUNTEER_ID_PROP: 'ccRegisteredVolunteersId',
  CC_REGISTERED_VOLUNTEER_REF_NAME: 'ccRegisteredVolunteers',
  CC_REGISTRY_ACCESS_REF_NAME: 'user_groups/ccRegAccess',

  COOKIE_KEYS,

  FEATURE_FLAGS,

  FB_REF_EVENTS: 'dates',

  PREACHERS: {
    L_FORD: 'Minister Lori Ford',
    M_HAMIEL: 'Rev Michelle Hamiel',
    D_HICKMAN: 'Rev. Debra Hickman',
    G_YEARGIN: 'Rev. Dr. Grady A Yeargin, Jr.',
    T_CURLEY: 'Rev. Tyra Curley'
  },

  SLENDER_ARROW_LEFT: '‹',
  SLENDER_ARROW_RIGHT: '›',

  SORT_DIRECTION_ASCENDING: 'asc',
  SORT_DIRECTION_DESCENDING: 'des',

  SUBSCRIBED_EMAILS_REF_NAME: 'subscribedEmails',

  VIEWS: {
    CART: 'cart',
    QUANTITY_SELECT: 'quantitySelect',
    STORE_FRONT: 'storeFront'
  },

  VBS_LOGBOOK_REF_NAME: 'vbsLogbook',
  VBS_REGISTERED_CHILDREN_REF_NAME: 'vbsRegisteredChildren',
  VBS_REGISTERED_CHILD_ID_PROP: 'vbsRegisteredChildrenId',
  VBS_REGISTERED_STUDENT_ID_PROP: 'vbsRegisteredStudentId',
  VBS_REGISTERED_STUDENT_REF_NAME: 'vbsRegisteredStudents',
  VBS_REGISTERED_VOLUNTEER_ID_PROP: 'vbsRegisteredVolunteersId',
  VBS_REGISTERED_VOLUNTEER_REF_NAME: 'vbsRegisteredVolunteers',
  VBS_REGISTRY_ACCESS_REF_NAME: 'user_groups/vbsRegAccess'
};

export default constants;
