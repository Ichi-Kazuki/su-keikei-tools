const APP_TITLE = '私の「好き」から見つける経済経営学部';

const SEED_AREAS = [
  {
    areaCode: 'G',
    name: 'グローバル',
    subtitle: '世界とビジネスをつなげて考える',
    description: '国境を越えてビジネスが行われる現状を知り、海外の経済構造やビジネス慣習を理解しながら、グローバル市場で価値を生み出す力を学びます。',
    question: '世界の企業は、国や文化の違いを越えてどう動いているのか。',
    advice: '留学、英語で学ぶ授業、海外企業や国際機関への進路について聞いてみよう。',
    course: 'グローバルリーダー学修コース',
    color: '#2563eb',
  },
  {
    areaCode: 'MD',
    name: '組織マネジメント・ダイバーシティ',
    subtitle: '人と組織の力を引き出す',
    description: 'どうしたら組織をうまく運営できるか、人をどう活かすか、多様性を尊重しながら組織や社会を成長させる方法を考えます。',
    question: '一人ひとりの強みを活かす組織は、どうつくれるのか。',
    advice: 'HLP、リーダーシップ、チームでの課題解決について聞いてみよう。',
    course: 'ビジネスデザイン学修コース',
    color: '#0f766e',
  },
  {
    areaCode: 'M',
    name: 'マーケティング・商品企画',
    subtitle: '選ばれ続ける仕組みを考える',
    description: 'どうしたら売れる商品を開発できるのか、効率的に商品を届けるにはどうしたらよいのかを、市場調査や顧客ニーズの分析から考えます。',
    question: 'なぜ人はその商品やサービスを選ぶのか。',
    advice: '商品企画、広告、消費者心理、ゼミで扱えるテーマについて聞いてみよう。',
    course: 'ビジネスデザイン学修コース',
    color: '#db2777',
  },
  {
    areaCode: 'FA',
    name: '金融・財務',
    subtitle: 'お金の流れから社会と企業を見る',
    description: '金融市場、企業の資金調達、会計や財務の仕組みを学び、企業や公的機関の活動を数字から理解する力を身につけます。',
    question: '企業や社会のお金の流れは、どのように判断材料になるのか。',
    advice: '会計士、税理士、金融機関、資格取得の学び方について聞いてみよう。',
    course: '金融・財務プロフェッショナル学修コース',
    color: '#b45309',
  },
  {
    areaCode: 'PD',
    name: '貧困・開発（社会貢献）',
    subtitle: '世界の課題に経済と経営から向き合う',
    description: 'アフリカ・アジア地域などの発展途上経済における持続的な開発や国際協力について、ビジネスや政策の観点から問題解決の糸口を探ります。',
    question: '貧困や格差に、ビジネスや政策はどう向き合えるのか。',
    advice: '国際協力、NGO、途上国経済、社会貢献とビジネスの関係について聞いてみよう。',
    course: 'グローバルリーダー学修コース',
    color: '#7c3aed',
  },
  {
    areaCode: 'P',
    name: 'ポリシー・デザイン',
    subtitle: '社会課題を政策と戦略で動かす',
    description: 'AIと雇用、食料の安定供給、少子高齢化など、日本や世界経済が直面する課題を理解し、効果的な経済政策や企業戦略をデザインします。',
    question: '複雑な社会課題に、どんな政策や戦略が効くのか。',
    advice: '公共政策、経済学、企業戦略、公務員や地域課題への進路について聞いてみよう。',
    course: 'ビジネスデザイン学修コース',
    color: '#dc2626',
  },
  {
    areaCode: 'SA',
    name: 'サステナビリティ＆地域共創',
    subtitle: '環境と地域の課題をビジネスで解く',
    description: '気候変動をはじめとする地球環境問題や地域課題に、経済学的視点からどうアプローチし、ビジネスを通じてどう解決するかを探求します。',
    question: '環境や地域の課題を、ビジネスで解決できるのか。',
    advice: 'SDGs、環境経営、地方創生、地域と企業の連携について聞いてみよう。',
    course: 'ビジネスデザイン学修コース',
    color: '#16a34a',
  },
  {
    areaCode: 'DS',
    name: 'ソーシャル・データサイエンス',
    subtitle: 'データでビジネスと社会を読み解く',
    description: '統計やプログラミングの学習を通じてデータ解析能力を鍛え、新商品の開発、新たなビジネスのデザイン、社会課題解決の政策立案に活かします。',
    question: 'データやAIは、ビジネスや働き方をどう変えるのか。',
    advice: 'AI、統計、プログラミング、データ分析を使う授業について聞いてみよう。',
    course: '全コースから接続しやすい横断領域',
    color: '#0891b2',
  },
];

const SEED_KEYWORDS = [
  { keyword: '人間主義経済', description: '人と社会の幸せを軸に経済を考える', weightSpec: 'P:2,PD:2,SA:1', category: '学部の理念' },
  { keyword: '人間主義経営', description: '人を大切にする経営や組織を考える', weightSpec: 'MD:2,M:1,SA:1', category: '学部の理念' },
  { keyword: 'マーケティング', description: '選ばれる商品やサービスの仕組みを考える', weightSpec: 'M:3,DS:1', category: 'ビジネス' },
  { keyword: '実践的英語力', description: 'ビジネスや留学で使える英語を身につける', weightSpec: 'G:3,PD:1', category: 'グローバル' },
  { keyword: 'SDGs', description: '社会課題を経済や経営から考える', weightSpec: 'SA:2,PD:2,P:1', category: '社会課題' },
  { keyword: '気候変動', description: '環境問題に経済やビジネスから向き合う', weightSpec: 'SA:3,P:1', category: '社会課題' },
  { keyword: '平和とビジネス', description: '平和や社会貢献とビジネスの関係を考える', weightSpec: 'PD:2,G:1,SA:1', category: '社会課題' },
  { keyword: '貧困・格差', description: '開発や国際協力の視点から課題を見る', weightSpec: 'PD:3,P:1', category: '社会課題' },
  { keyword: '地方創生', description: '地域の課題を経済やビジネスで考える', weightSpec: 'SA:2,P:2,M:1', category: '地域' },
  { keyword: 'CSR', description: '企業の社会的責任を考える', weightSpec: 'SA:2,MD:1,FA:1', category: 'ビジネス' },
  { keyword: '環境経営', description: '環境と企業経営の両立を考える', weightSpec: 'SA:3,FA:1', category: 'ビジネス' },
  { keyword: 'リーダーシップ', description: '互いの個性を引き出し合う力を育てる', weightSpec: 'MD:3,G:1,P:1', category: '人と組織' },
  { keyword: '政策・戦略デザイン', description: '社会課題に効く政策や企業戦略を考える', weightSpec: 'P:3,M:1,SA:1', category: '政策' },
  { keyword: '生成AIと雇用', description: 'AIが働き方や社会をどう変えるか考える', weightSpec: 'DS:3,P:2,MD:1', category: 'データ' },
  { keyword: 'ファイナンス', description: '金融や財務の仕組みを学ぶ', weightSpec: 'FA:3,DS:1', category: 'お金' },
  { keyword: 'データサイエンス', description: '統計やプログラミングで課題を分析する', weightSpec: 'DS:3,M:1,P:1', category: 'データ' },
  { keyword: '海外で働きたい', description: '世界をフィールドにして働く将来像', weightSpec: 'G:3,PD:1', category: '将来' },
  { keyword: '商品企画に興味がある', description: '新しい商品やサービスを考えたい', weightSpec: 'M:3,DS:1', category: '将来' },
  { keyword: '会計・資格に興味がある', description: '会計士、税理士、金融の専門性を磨きたい', weightSpec: 'FA:3', category: '将来' },
  { keyword: 'チームで課題解決したい', description: '仲間と協力して価値をつくりたい', weightSpec: 'MD:2,SA:1,P:1', category: '将来' },
];

const SEED_LESSONS = [
  ['G', 'グローバル経済 I・II', '2年次', '春・秋', '世界経済や国際取引の流れをつかむ'],
  ['G', '国際経済論', '3年次', '春', '国際的な経済の動きや国同士の関係を学ぶ'],
  ['G', '多国籍企業論', '3年次', '秋', '世界で活動する企業の戦略や課題を考える'],
  ['G', 'Sustainable Business & Management', '3年次', '春', '持続可能性とビジネスを英語科目にも接続して考える'],
  ['MD', 'リーダーシップ論', '2年次', '春', '人と組織を動かすリーダーシップを学ぶ'],
  ['MD', '人的資源管理論', '2年次', '秋', '人材をどう活かすかを経営の視点から考える'],
  ['MD', '経営戦略論', '2年次', '秋', '企業が競争の中でどう方針を立てるかを学ぶ'],
  ['MD', '経営組織論', '3年次', '秋', '組織の仕組みやマネジメントを考える'],
  ['M', 'マーケティング', '2年次', '春', '商品やサービスが選ばれ続ける仕組みを考える'],
  ['M', '消費者行動論', '2年次', '春', '人がなぜ買うのかを心理や行動から考える'],
  ['M', 'ビジネスデザイン論', '2年次', '秋', '課題を発見しビジネスとして形にする方法を学ぶ'],
  ['M', 'サービスマーケティング', '2年次', '春', 'サービスの価値づくりと届け方を考える'],
  ['FA', '会計学', '2年次', '秋', '企業活動を数字で記録し理解する基礎を学ぶ'],
  ['FA', '金融論', '2年次', '秋', '金融市場や資金の流れを学ぶ'],
  ['FA', '証券市場論', '3年次', '春', '証券市場の仕組みと企業金融を考える'],
  ['FA', '企業価値管理会計', '2年次', '秋', '企業価値や会計情報を経営判断に活かす'],
  ['PD', '開発と貧困の経済学', '2年次', '秋', '貧困や開発課題を経済学から考える'],
  ['PD', '国際開発協力論', '3年次', '春', '国際協力や開発支援の仕組みを学ぶ'],
  ['PD', 'アフリカ経済論', '3年次', '春', 'アフリカ地域の経済や社会課題を考える'],
  ['PD', 'アジア経済・経営論', '3年次', '秋', 'アジア地域の経済や企業活動を学ぶ'],
  ['P', '財政学', '2年次', '春', '政府のお金の使い方や政策を考える'],
  ['P', '企業論', '2年次', '秋', '企業の役割や社会との関係を学ぶ'],
  ['P', '農業経済論', '3年次', '秋', '食料や地域産業を経済の視点から考える'],
  ['P', 'マクロ経済学中級 I・II', '2年次', '春・秋', '社会全体の経済の動きを分析する'],
  ['SA', '気候変動の経済学', '2年次', '春', '気候変動を経済学の視点から考える'],
  ['SA', '環境経済論', '2年次', '秋', '環境問題と経済活動の関係を学ぶ'],
  ['SA', '環境マネジメント', '3年次', '春', '企業や組織の環境対応を考える'],
  ['SA', 'ローカルビジネス論', '2年次', '秋', '地域課題とビジネスの接点を考える'],
  ['DS', 'データサイエンス', '2年次', '秋', 'データ分析の基礎を学ぶ'],
  ['DS', 'データサイエンス演習', '2年次', '秋', '実際にデータを扱いながら分析する'],
  ['DS', 'ビジネスAI演習', '3年次', '秋', 'AIをビジネス課題にどう使うかを学ぶ'],
  ['DS', 'プログラミング論', '3年次', '秋', '分析や開発の基礎になるプログラミングを学ぶ'],
];

function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.initialData = JSON.stringify(getAppData()).replace(/</g, '\\u003c');
  return template
    .evaluate()
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAppData() {
  const ss = getSpreadsheet_();
  const areas = ss ? readAreas_(ss) : [];
  const keywords = ss ? readKeywords_(ss) : [];
  const lessons = ss ? readLessons_(ss) : [];

  return {
    title: APP_TITLE,
    areas: areas.length ? areas : SEED_AREAS,
    keywords: keywords.length ? keywords : SEED_KEYWORDS.map(addWeights_),
    lessons: lessons.length ? lessons : seedLessonObjects_(),
    selectionLimit: 3,
    commonMessage: '経済・経営の理論をベースに、実際の課題解決、リーダーシップ、英語力にもつながる実践的な学びです。',
  };
}

function setupDiagnosisSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('スプレッドシートに紐づいたApps Scriptから実行してください。');
  }

  writeSheet_(
    ss,
    '学び領域',
    ['領域コード', '表示名', 'サブタイトル', '説明', '問い', '相談で聞くこと', '関連しやすいコース', '色'],
    SEED_AREAS.map(area => [
      area.areaCode,
      area.name,
      area.subtitle,
      area.description,
      area.question,
      area.advice,
      area.course,
      area.color,
    ])
  );

  writeSheet_(
    ss,
    'キーワード',
    ['キーワード', '説明', '対応領域', 'カテゴリ'],
    SEED_KEYWORDS.map(item => [
      item.keyword,
      item.description,
      item.weightSpec,
      item.category,
    ])
  );

  writeSheet_(
    ss,
    '授業',
    ['領域コード', '授業名', '年次', '春秋', 'ひとこと説明'],
    SEED_LESSONS
  );

  return '診断用シートを作成しました。';
}

function readAreas_(ss) {
  const sheet = ss.getSheetByName('学び領域');
  if (!sheet) return [];
  return sheet.getDataRange().getValues().slice(1)
    .filter(row => row[0])
    .map(row => ({
      areaCode: String(row[0]).trim(),
      name: String(row[1] || '').trim(),
      subtitle: String(row[2] || '').trim(),
      description: String(row[3] || '').trim(),
      question: String(row[4] || '').trim(),
      advice: String(row[5] || '').trim(),
      course: String(row[6] || '').trim(),
      color: String(row[7] || '#334155').trim(),
    }));
}

function readKeywords_(ss) {
  const sheet = ss.getSheetByName('キーワード');
  if (!sheet) return [];
  return sheet.getDataRange().getValues().slice(1)
    .filter(row => row[0])
    .map(row => addWeights_({
      keyword: String(row[0]).trim(),
      description: String(row[1] || '').trim(),
      weightSpec: String(row[2] || '').trim(),
      category: String(row[3] || 'その他').trim(),
    }));
}

function readLessons_(ss) {
  const sheet = ss.getSheetByName('授業');
  if (!sheet) return [];
  return sheet.getDataRange().getValues().slice(1)
    .filter(row => row[0] && row[1])
    .map(row => ({
      areaCode: String(row[0]).trim(),
      name: String(row[1]).trim(),
      year: String(row[2] || '').trim(),
      term: String(row[3] || '').trim(),
      description: String(row[4] || '').trim(),
    }));
}

function seedLessonObjects_() {
  return SEED_LESSONS.map(row => ({
    areaCode: row[0],
    name: row[1],
    year: row[2],
    term: row[3],
    description: row[4],
  }));
}

function addWeights_(item) {
  return {
    keyword: item.keyword,
    description: item.description,
    category: item.category || 'その他',
    weights: parseWeights_(item.weightSpec),
  };
}

function parseWeights_(weightSpec) {
  return String(weightSpec || '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .reduce((weights, part) => {
      const pieces = part.split(':');
      const code = String(pieces[0] || '').trim();
      const score = Number(pieces[1] || 1);
      if (code) weights[code] = Number.isFinite(score) ? score : 1;
      return weights;
    }, {});
}

function writeSheet_(ss, name, headers, rows) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#334155');
  sheet.getDataRange().setVerticalAlignment('middle').setWrap(true);
  sheet.autoResizeColumns(1, headers.length);
}

function getSpreadsheet_() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (error) {
    return null;
  }
}
