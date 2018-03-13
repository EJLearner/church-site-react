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

  CE_HOME: '/ce/',
  CE_CC_REG_CHILD: '/ce/cc-registration-child',
  CE_CC_REG_LANDING: '/ce/cc-registration-landing',
  CE_CC_REG_VOLUNTEER: '/ce/cc-registration-volunteer',
  CE_CC_SIGN_IN: '/ce/cc-log-in',
  CE_CALENDAR: '/ce/calendar',
  CE_IDEA_FORM: '/ce/ideaform',
  CE_VBS_REG_CHILD: '/ce/vbs-registration-child',
  CE_VBS_REG_LANDING: '/ce/vbs-registration-landing',
  CE_VBS_REG_VOLUNTEER: '/ce/vbs-registration-volunteer',
  CE_WHAT: '/ce/what',
  CE_WHERE: '/ce/where',
  CE_WHO: '/ce/who',
  CE_WHY: '/ce/why',
  CE_VISION: '/ce/vision',
  CE_YOUTH: '/ce/youth'
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

const {CE_YOUTH} = MAIN_PATH_CONSTANTS;
const YOUTH_PATHS = {
  CE_YOUTH_USHERS: `${CE_YOUTH}/ushers`,
  CE_YOUTH_GODS_GIFTS: `${CE_YOUTH}/godsgifts`,
  CE_YOUTH_SUNDAY_SCHOOL: `${CE_YOUTH}/sundayschool`,
  CE_YOUTH_CHILDRENS_CHURCH: `${CE_YOUTH}/childrenschurch`,
  CE_YOUTH_VACATION_BIBLE_SCHOOL: `${CE_YOUTH}/vacationbibleschool`
};

const {CE_WHO} = MAIN_PATH_CONSTANTS;
const WHO_PATHS = {
  CE_WHO_PASTOR: `${CE_WHO}/pastor`,
  CE_WHO_CTBC: `${CE_WHO}/ctbc`,
  CE_WHO_CHRISTIAN_ED_STAFF: `${CE_WHO}/christian-ed-staff`,
  CE_WHO_DIACONATE: `${CE_WHO}/diaconate`,
  CE_WHO_TRUSTEES: `${CE_WHO}/trustees`
};

const ALL_PATHS = Object.assign(
  {},
  MAIN_PATH_CONSTANTS,
  CALENDAR_PATHS,
  VISION_PATHS,
  WHO_PATHS,
  YOUTH_PATHS
);

const STRICT_PATH_CONSTANTS =
  typeof Proxy !== 'undefined' ? new Proxy(ALL_PATHS, handler) : ALL_PATHS;

export default STRICT_PATH_CONSTANTS;
