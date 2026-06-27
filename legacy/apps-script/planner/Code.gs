const MODULES = [
  { code: "G", name: "グローバル" },
  { code: "MD", name: "組織マネジメント・ダイバーシティ" },
  { code: "M", name: "マーケティング" },
  { code: "FA", name: "金融・財務" },
  { code: "PD", name: "貧困・開発（社会貢献）" },
  { code: "P", name: "ポリシー・デザイン" },
  { code: "SA", name: "サステナビリティ＆地域共創" },
  { code: "DS", name: "ソーシャル・データサイエンス" },
];

const DAYS = ["月", "火", "水", "木", "金"];
const PERIODS = [1, 2, 3, 4, 5];

const FACULTY_INFO = {
  title: "経済経営学部 ビジネス学科",
  basics: [
    ["開設", "2026年4月"],
    ["標準修業年限", "4年"],
    ["入学定員", "280名"],
    ["学位", "学士（経済経営学）"],
  ],
  philosophy:
    "人間主義経済・経営。自他ともの幸福を根幹に据え、経済学と経営学の双方から世界の平和に貢献する。",
  goals: [
    "問題発見・解決能力",
    "論理的思考力",
    "グローバル社会で役立つコミュニケーション力",
    "リーダーシップ力",
  ],
  features: [
    "1年次に簿記・統計などの基礎を学ぶ。",
    "2年次春に学修コース、2年次秋に科目群（モジュール）を選ぶ。",
    "HLPで「互いの個性を引き出し合う」リーダーシップを育成する。",
    "GLOBEで英語教育、英語による専門科目、海外研修を展開する。",
    "HOPEは高いレベルで経済理論を学ぶ選抜型プログラム。",
  ],
  courses: [
    "グローバルリーダー学修コース",
    "政策・戦略デザイン学修コース",
    "金融・財務プロフェッショナル学修コース",
  ],
  graduation: [
    "合計124単位以上、通算GPA 2以上。",
    "ビジネス学科専門科目は必修18単位、選択必修6単位、選択46単位。",
    "選択した学修コースから18単位以上、A群モジュールから10単位以上、B群モジュールから6単位以上。",
  ],
  sources: [
    "経済経営履修要項.pdf",
    "経済経営学部 _ 創価大学.pdf",
    "学部の概要 _ 経済経営学部 _ 創価大学.pdf",
    "学部の特長 _ 経済経営学部 _ 創価大学.pdf",
    "CAMPUS_GUIDE_2026.pdf",
  ],
};

const FALLBACK_COURSE_ROWS = [
  ["International Context in Business", "G", "火", 5, "春", 2, 4, "", false],
  ["International Context in Business", "G", "金", 4, "春", 2, 0, "", false],
  ["国際経済論", "G", "火", 2, "春", 3, 4, "", false],
  ["国際経済論", "G", "金", 3, "春", 3, 0, "", false],
  ["多国籍企業論", "G", "月", 3, "秋", 3, 4, "", false],
  ["多国籍企業論", "G", "水", 4, "秋", 3, 0, "", false],
  ["国際比較経営史", "G", "木", 2, "秋", 3, 2, "", false],
  ["グローバル経済 I", "G", "月", 4, "春", 2, 2, "", false],
  ["グローバル経済 II", "G", "月", 4, "秋", 2, 2, "", false],
  ["Sustainable Business & Management", "G", "水", 4, "春", 3, 2, "", false],
  ["グローバル経済史", "G", "木", 5, "秋", 2, 2, "", false],
  ["グローバル・リーダー・ワークショップ I・II", "G", "木", 1, "春", 2, 2, "", false],
  ["グローバル・リーダー・ワークショップ III・IV", "G", "火", 1, "秋", 2, 2, "", false],
  ["人的資源管理論", "MD", "月", 2, "秋", 2, 4, "", false],
  ["人的資源管理論", "MD", "水", 2, "秋", 2, 0, "", false],
  ["経営戦略論", "MD", "火", 2, "秋", 2, 4, "", false],
  ["経営戦略論", "MD", "金", 2, "秋", 2, 0, "", false],
  ["経営組織論", "MD", "火", 2, "秋", 3, 4, "", false],
  ["経営組織論", "MD", "木", 2, "秋", 3, 0, "", false],
  ["人事の経済学 I", "MD", "火", 5, "秋", 2, 2, "", false],
  ["人事の経済学 II", "MD", "木", 4, "秋", 2, 2, "", false],
  ["プロジェクトマネジメント論", "MD", "月", 4, "秋", 2, 2, "", false],
  ["リーダーシップ論", "MD", "火", 4, "春", 2, 2, "", false],
  ["Multicultural Management", "MD", "金", 4, "秋", 3, 2, "", false],
  ["マーケティング", "M", "月", 4, "春", 2, 2, "", false],
  ["マーケティング", "M", "水", 1, "春", 2, 0, "", false],
  ["行動経済学入門", "M", "火", 4, "秋", 2, 2, "", false],
  ["流通論", "M", "月", 4, "秋", 3, 2, "", false],
  ["流通論", "M", "水", 2, "秋", 3, 0, "", false],
  ["ビジネスデザイン論", "M", "月", 3, "秋", 2, 2, "", false],
  ["サービスマーケティング", "M", "月", 4, "春", 2, 2, "", false],
  ["サービスマーケティング", "M", "水", 1, "春", 2, 0, "", false],
  ["消費者行動論", "M", "月", 5, "春", 2, 2, "", false],
  ["消費者行動論", "M", "木", 1, "春", 2, 0, "", false],
  ["ビジネス戦略論演習", "M", "木", 3, "秋", 2, 2, "", false],
  ["財務管理論 I", "FA", "月", 3, "秋", 3, 2, "", false],
  ["財務管理論 II", "FA", "火", 5, "秋", 3, 2, "", false],
  ["会計学", "FA", "水", 4, "秋", 2, 4, "", false],
  ["会計学", "FA", "金", 4, "秋", 2, 0, "", false],
  ["証券市場論", "FA", "水", 3, "春", 3, 4, "", false],
  ["証券市場論", "FA", "金", 4, "春", 3, 0, "", false],
  ["金融論", "FA", "火", 1, "秋", 2, 4, "", false],
  ["金融論", "FA", "木", 2, "秋", 2, 0, "", false],
  ["企業価値管理会計", "FA", "火", 2, "秋", 2, 4, "", false],
  ["企業価値管理会計", "FA", "木", 2, "秋", 2, 0, "", false],
  ["サステナビリティ経営会計", "FA", "水", 2, "春", 3, 2, "", false],
  ["監査論", "FA", "月", 5, "秋", 3, 2, "", false],
  ["開発と貧困の経済学", "PD", "火", 2, "秋", 2, 4, "", false],
  ["開発と貧困の経済学", "PD", "金", 2, "秋", 2, 0, "", false],
  ["国際開発協力論", "PD", "木", 5, "春", 3, 2, "", false],
  ["アフリカ経済論", "PD", "水", 4, "春", 3, 2, "", false],
  ["アジア経済・経営論", "PD", "水", 4, "秋", 3, 2, "", false],
  ["経済学史", "PD", "月", 2, "春", 3, 4, "", false],
  ["経済学史", "PD", "金", 4, "春", 3, 0, "", false],
  ["日本経済・経営史", "PD", "月", 4, "春", 2, 4, "", false],
  ["日本経済・経営史", "PD", "木", 3, "春", 2, 0, "", false],
  ["企業経営とWLB", "P", "火", 1, "秋", 3, 2, "", false],
  ["ミクロ経済学中級 I", "P", "火", 3, "春", 2, 2, "", false],
  ["マクロ経済学中級 II", "P", "金", 1, "春", 2, 2, "", false],
  ["マクロ経済学中級 I", "P", "火", 2, "秋", 2, 2, "", false],
  ["マクロ経済学中級 II", "P", "金", 1, "秋", 2, 2, "", false],
  ["財政学", "P", "月", 3, "春", 2, 4, "", false],
  ["財政学", "P", "金", 2, "春", 2, 0, "", false],
  ["企業論", "P", "火", 4, "秋", 2, 4, "", false],
  ["企業論", "P", "火", 5, "秋", 2, 0, "", false],
  ["農業経済論", "P", "火", 2, "秋", 3, 4, "", false],
  ["農業経済論", "P", "木", 3, "秋", 3, 0, "", false],
  ["ヨーロッパ経済論", "P", "金", 2, "春", 3, 2, "", false],
  ["気候変動の経済学", "SA", "木", 3, "春", 2, 2, "", false],
  ["環境経済論", "SA", "金", 2, "秋", 2, 4, "", false],
  ["環境マネジメント", "SA", "火", 3, "春", 3, 2, "", false],
  ["ローカルビジネス論", "SA", "月", 2, "秋", 2, 2, "", false],
  ["社会貢献と経済学", "SA", "水", 4, "春", 3, 2, "", false],
  ["プログラミング論", "DS", "火", 4, "秋", 3, 4, "", false],
  ["プログラミング論", "DS", "木", 5, "秋", 3, 0, "", false],
  ["データサイエンス", "DS", "月", 4, "秋", 2, 2, "", false],
  ["データサイエンス演習", "DS", "木", 4, "秋", 2, 2, "", false],
  ["ビジネスAI演習", "DS", "火", 2, "秋", 3, 2, "", false],
  ["ビジネスプロジェクト演習", "DS", "金", 3, "秋", 3, 2, "", false],
  ["ビジネス・シミュレーション", "DS", "火", 3, "秋", 2, 2, "", false],
  ["統計学", "DS", "火", 3, "秋", 2, 4, "", false],
  ["統計学", "DS", "金", 3, "秋", 2, 0, "", false],
  ["経済数学入門", "DS", "火", 2, "春", 2, 4, "", false],
  ["経済数学入門", "DS", "金", 2, "春", 2, 0, "", false],
  ["経済数学", "DS", "火", 2, "春", 2, 4, "", false],
  ["経済数学", "DS", "木", 4, "春", 2, 0, "", false],
];

function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("履修モジュールプランナー")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getBootstrapJson() {
  return JSON.stringify(getInitialData()).replace(/</g, "\\u003c");
}

function getInitialData() {
  const loaded = loadCourseData_();
  return {
    modules: MODULES,
    days: DAYS,
    periods: PERIODS,
    courses: loaded.courses,
    dataSource: loaded.source,
    facultyInfo: FACULTY_INFO,
    defaults: {
      modules: MODULES.map((module) => module.code),
      semester: "秋",
      year: 2,
    },
  };
}

function getPlan(filters) {
  return buildPlan_(loadCourseData_().courses, filters || {});
}

function loadCourseData_() {
  const sheetCourses = readSheetCourses_();
  if (sheetCourses.length > 0) {
    return { courses: sheetCourses, source: "Google Sheets: データ" };
  }

  return {
    courses: rowsToCourses_(FALLBACK_COURSE_ROWS, "F"),
    source: "Code.gs 埋め込みデータ",
  };
}

function readSheetCourses_() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) return [];

    const sheet = spreadsheet.getSheetByName("データ");
    if (!sheet || sheet.getLastRow() < 2) return [];

    const rowCount = sheet.getLastRow() - 1;
    const values = sheet.getRange(2, 1, rowCount, 10).getValues();
    const rows = values
      .filter((row) => String(row[0] || "").trim())
      .map((row) => [
        row[0],
        row[1],
        row[2],
        row[3],
        row[4],
        row[5],
        row[7],
        row[8],
        row[9],
      ]);

    return rowsToCourses_(rows, "S");
  } catch (error) {
    return [];
  }
}

function rowsToCourses_(rows, prefix) {
  return rows.map((row, index) => ({
    id: prefix + String(index + 1).padStart(3, "0"),
    name: String(row[0] || "").trim(),
    module: String(row[1] || "").trim(),
    day: String(row[2] || "").trim(),
    period: Number(row[3] || 0),
    semester: String(row[4] || "").trim(),
    year: parseYear_(row[5]),
    credits: Number(row[6] || 0),
    note: String(row[7] || "").trim(),
    completed: parseBoolean_(row[8]),
  }));
}

function parseYear_(value) {
  const parsed = parseInt(String(value || "").replace(/[^\d]/g, ""), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function parseBoolean_(value) {
  if (value === true) return true;
  const text = String(value || "").trim().toLowerCase();
  return text === "true" || text === "yes" || text === "1" || text === "済";
}

function buildPlan_(courses, filters) {
  const moduleOrder = MODULES.map((module) => module.code);
  const selectedModules = Array.isArray(filters.modules)
    ? filters.modules
    : moduleOrder;
  const selectedModuleSet = new Set(selectedModules);
  const completedNameSet = new Set(filters.completedNames || []);
  const semester = String(filters.semester || "秋");
  const year = Number(filters.year || 2);

  const eligibleRows = courses.filter((course) => {
    const yearMatches = course.year === year || (year === 3 && course.year === 2);
    return (
      selectedModuleSet.has(course.module) &&
      course.semester === semester &&
      yearMatches &&
      !course.completed &&
      !completedNameSet.has(course.name)
    );
  });

  const summaryMap = {};
  MODULES.forEach((module) => {
    summaryMap[module.code] = {
      code: module.code,
      name: module.name,
      credits: 0,
      courses: [],
    };
  });

  const uniqueMap = {};
  const countedKeys = {};
  const schedule = createEmptySchedule_();

  eligibleRows.forEach((course) => {
    const uniqueKey = makeCourseKey_(course);
    if (!uniqueMap[uniqueKey]) {
      uniqueMap[uniqueKey] = {
        key: uniqueKey,
        name: course.name,
        module: course.module,
        moduleName: moduleName_(course.module),
        semester: course.semester,
        year: course.year,
        credits: Number(course.credits || 0),
        slots: [],
        note: course.note || "",
      };
    }

    uniqueMap[uniqueKey].slots.push(course.day + course.period + "限");
    if (Number(course.credits || 0) > 0 && !countedKeys[uniqueKey]) {
      countedKeys[uniqueKey] = true;
      summaryMap[course.module].credits += Number(course.credits || 0);
      summaryMap[course.module].courses.push(course.name);
    }

    if (schedule[course.day] && schedule[course.day][course.period]) {
      schedule[course.day][course.period].push({
        id: course.id,
        name: course.name,
        module: course.module,
        moduleName: moduleName_(course.module),
        credits: Number(course.credits || 0),
      });
    }
  });

  const conflicts = [];
  DAYS.forEach((day) => {
    PERIODS.forEach((period) => {
      const cellCourses = schedule[day][period];
      if (cellCourses.length > 1) {
        conflicts.push({ day, period, courses: cellCourses });
      }
    });
  });

  const resultRows = Object.keys(uniqueMap)
    .map((key) => uniqueMap[key])
    .sort((a, b) => {
      const moduleDiff = moduleOrder.indexOf(a.module) - moduleOrder.indexOf(b.module);
      if (moduleDiff !== 0) return moduleDiff;
      return a.name.localeCompare(b.name, "ja");
    });

  const summaries = MODULES.map((module) => summaryMap[module.code]);
  const totalCredits = summaries.reduce((sum, item) => sum + item.credits, 0);

  return {
    resultRows,
    schedule,
    summaries,
    totalCredits,
    conflicts,
    eligibleRowCount: eligibleRows.length,
  };
}

function createEmptySchedule_() {
  const schedule = {};
  DAYS.forEach((day) => {
    schedule[day] = {};
    PERIODS.forEach((period) => {
      schedule[day][period] = [];
    });
  });
  return schedule;
}

function makeCourseKey_(course) {
  return [course.module, course.name, course.semester, course.year].join("|");
}

function moduleName_(code) {
  const found = MODULES.find((module) => module.code === code);
  return found ? found.name : code;
}
