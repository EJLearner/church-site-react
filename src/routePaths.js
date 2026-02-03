const handler = {
  get: (target, name) => {
    if (name in target) {
      return target[name];
    } else {
      throw new Error(`${name} is not a valid path constant`);
    }
  },
};

const ADMIN_PATH = '/admin/';

const ADMIN_PATHS = {
  ADMIN: ADMIN_PATH,

  ADMIN_CC: `cc`,
  ADMIN_EMAIL_SUBSCRIBERS: `email-subscribers`,
  ADMIN_EVENTS: `events`,
  ADMIN_VBS: `vbs`,
};

const PASTOR_APPLICATION_PATHS = {
  PASTOR_APPLICATION: '/pastor-application/',
};

const MAIN_ROOT_PATHS = {
  MAIN_HOME: '/',

  BIBLE_STUDY: `bible-study`,

  // old page, redirects to profile now
  MAIN_ABOUT_US: `about-us`,
  MAIN_PROFILE: 'profile',
  MAIN_CALENDAR: `calendar`,
  MAIN_CONTACT: `contact`,
  MAIN_GIVING: `giving`,
  MAIN_MEDITATIONS: `meditations`,
  MAIN_WATCH: `watch`,
};

const MAIN_CALENDAR_SUB_PATHS = {
  MAIN_CALENDAR_DAY: `day`,
  MAIN_CALENDAR_MONTH: `month`,
  MAIN_CALENDAR_UPCOMING: `upcoming`,
  MAIN_CALENDAR_WEEK: `week`,
  MAIN_CALENDAR_YEAR: `year`,
};

const CE_ROOT_PATHS = {
  CE_HOME: '/ce/',

  CE_CALENDAR: '/ce/calendar/',
  CE_CC_REG_CHILD: '/ce/cc-registration-child/',
  CE_CC_REG_VOLUNTEER: '/ce/cc-registration-volunteer/',
  CE_IDEA_FORM: '/ce/idea-form/',
  CE_THANK_YOU: '/ce/thank-you/',
  CE_VBS_CHECKIN: '/ce/vbs-checkin/',
  CE_VBS_REG_ADULT: '/ce/vbs-registration-adult/',
  CE_VBS_REG_CHILD: '/ce/vbs-registration-child/',
  CE_VBS_REG_LANDING: '/ce/vbs-registration-landing/',
  CE_VBS_REG_VOLUNTEER: '/ce/vbs-registration-volunteer/',
};

const ALL_PATHS = {
  ...ADMIN_PATHS,
  ...MAIN_ROOT_PATHS,
  ...MAIN_CALENDAR_SUB_PATHS,
  ...CE_ROOT_PATHS,
  ...PASTOR_APPLICATION_PATHS,
};

const routePaths =
  typeof Proxy !== 'undefined' ? new Proxy(ALL_PATHS, handler) : ALL_PATHS;

export default routePaths;
