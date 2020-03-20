const constants = {
  VALID_INPUT_DATE_FORMATS: ['M/D/YY', 'M/D/YYYY', 'M-D-YYYY', 'M-D-YY'],
  INTERNAL_DATE_FORMAT: 'YYYY-MM-DD',
  INTERNAL_TIMESTAMP_FORMAT: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DISPLAY_TIME_FORMAT: 'M/D/YY h:mm a',
  DISPLAY_DATE_FORMAT: 'M/D/YYYY',
  DATE_FNS_DISPLAY_DATE_FORMAT: 'M/d/yyyy',

  FB_REF_EVENTS: 'dates',

  SLENDER_ARROW_LEFT: '‹',
  SLENDER_ARROW_RIGHT: '›',

  SORT_DIRECTION_ASCENDING: 'asc',
  SORT_DIRECTION_DESCENDING: 'des',

  VBS_LOGBOOK_REF_NAME: 'vbsLogbook',
  VBS_REGISTRY_ACCESS_REF_NAME: 'user_groups/vbsRegAccess',
  VBS_REGISTERED_CHILD_ID_PROP: 'vbsRegisteredChildrenId',
  VBS_REGISTERED_CHILDREN_REF_NAME: 'vbsRegisteredChildren',
  VBS_REGISTERED_STUDENT_ID_PROP: 'vbsRegisteredStudentId',
  VBS_REGISTERED_STUDENT_REF_NAME: 'vbsRegisteredStudents',
  VBS_REGISTERED_VOLUNTEER_ID_PROP: 'vbsRegisteredVolunteersId',
  VBS_REGISTERED_VOLUNTEER_REF_NAME: 'vbsRegisteredVolunteers',

  CC_LOGBOOK_REF_NAME: 'ccLogbook',
  CC_REGISTRY_ACCESS_REF_NAME: 'user_groups/ccRegAccess',
  CC_REGISTERED_CHILD_ID_PROP: 'ccRegisteredId',
  CC_REGISTERED_CHILDREN_REF_NAME: 'ccRegisteredChildren',
  CC_REGISTERED_VOLUNTEER_ID_PROP: 'ccRegisteredVolunteersId',
  CC_REGISTERED_VOLUNTEER_REF_NAME: 'ccRegisteredVolunteers',

  SUBSCRIBED_EMAILS_REF_NAME: 'subscribedEmails'
};

export default constants;
