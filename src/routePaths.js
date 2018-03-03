const handler = {
  get: (target, name) => {
    if (name in target) {
      return target[name];
    } else {
      throw new Error(`${name} is not a valid path constant`);
    }
  }
};

const MAIN_PATH_CONSTANTS = {
  ADMIN: '/admin',

  CE_HOME: '/ce-home',
  CE_CC_REG_CHILD: '/cc-registration-child',
  CE_CC_REG_LANDING: '/cc-registration-landing',
  CE_CC_REG_VOLUNTEER: '/cc-registration-volunteer',
  CE_CALENDAR: '/calendar',
  CE_IDEA_FORM: '/ideaform',
  CE_VBS_REG_CHILD: '/vbs-registration-child',
  CE_VBS_REG_LANDING: '/vbs-registration-landing',
  CE_VBS_REG_VOLUNTEER: '/vbs-registration-volunteer',
  CE_WHAT: '/what',
  CE_WHERE: '/where',
  CE_WHO: '/who',
  CE_WHY: '/why',
  CE_VISION: '/vision',
  CE_YOUTH: '/youth'
};

const {CE_CALENDAR} = MAIN_PATH_CONSTANTS;
const CALENDAR_PATHS = {
  CE_CALENDAR_DAY: `${CE_CALENDAR}/day`,
  CE_CALENDAR_WEEK: `${CE_CALENDAR}/week`,
  CE_CALENDAR_MONTH: `${CE_CALENDAR}/month`,
  CE_CALENDAR_YEAR: `${CE_CALENDAR}/year`,
  CE_CALENDAR_UPCOMING: `${CE_CALENDAR}/upcoming`
};

const {CE_VISION} = MAIN_PATH_CONSTANTS;
const VISION_PATHS = {
  CE_VISION_THE_VISION: `${CE_VISION}/thevision`,
  CE_VISION_POWERPOINT: `${CE_VISION}/powerpoint`,
  CE_VISION_PARTICIPANTS_2016: `${CE_VISION}/participants2016`,
  CE_VISION_WORKGROUPS: `${CE_VISION}/workgroups`
};

const {YOUTH} = MAIN_PATH_CONSTANTS;

const YOUTH_PATHS = {
  CE_YOUTH_USHERS: `${YOUTH}/ushers`,
  CE_YOUTH_GODS_GIFTS: `${YOUTH}/godsgifts`,
  CE_YOUTH_SUNDAY_SCHOOL: `${YOUTH}/sundayschool`,
  CE_YOUTH_CHILDRENS_CHURCH: `${YOUTH}/childrenschurch`,
  CE_YOUTH_VACATION_BIBLE_SCHOOL: `${YOUTH}/vacationbibleschool`
};

// todo who

const ALL_PATHS = Object.assign(
  {},
  MAIN_PATH_CONSTANTS,
  CALENDAR_PATHS,
  VISION_PATHS,
  YOUTH_PATHS
);

const STRICT_PATH_CONSTANTS = new Proxy(ALL_PATHS, handler);

export default STRICT_PATH_CONSTANTS;
