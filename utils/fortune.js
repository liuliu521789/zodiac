const zodiacList = [
  { id: 'rat', name: '鼠', emoji: '🐀', wuxing: '水', trait: '机智灵活，善于交际' },
  { id: 'ox', name: '牛', emoji: '🐂', wuxing: '土', trait: '踏实勤劳，意志坚定' },
  { id: 'tiger', name: '虎', emoji: '🐅', wuxing: '木', trait: '勇敢自信，正义感强' },
  { id: 'rabbit', name: '兔', emoji: '🐇', wuxing: '木', trait: '温柔善良，细腻敏感' },
  { id: 'dragon', name: '龙', emoji: '🐉', wuxing: '土', trait: '充满活力，意志坚强' },
  { id: 'snake', name: '蛇', emoji: '🐍', wuxing: '火', trait: '智慧深沉，直觉敏锐' },
  { id: 'horse', name: '马', emoji: '🐎', wuxing: '火', trait: '热情奔放，自由奔放' },
  { id: 'goat', name: '羊', emoji: '🐏', wuxing: '土', trait: '温和善良，适应力强' },
  { id: 'monkey', name: '猴', emoji: '🐒', wuxing: '金', trait: '聪明伶俐，反应敏捷' },
  { id: 'rooster', name: '鸡', emoji: '🐓', wuxing: '金', trait: '勤劳诚实，警觉性高' },
  { id: 'dog', name: '狗', emoji: '🐕', wuxing: '土', trait: '忠诚可靠，正义诚实' },
  { id: 'pig', name: '猪', emoji: '🐖', wuxing: '水', trait: '诚实温和，宽容大度' }
];

const zodiacByYear = {
  1950: '虎', 1951: '兔', 1952: '龙', 1953: '蛇',
  1954: '马', 1955: '羊', 1956: '猴', 1957: '鸡',
  1958: '狗', 1959: '猪', 1960: '鼠', 1961: '牛',
  1962: '虎', 1963: '兔', 1964: '龙', 1965: '蛇',
  1966: '马', 1967: '羊', 1968: '猴', 1969: '鸡',
  1970: '狗', 1971: '猪', 1972: '鼠', 1973: '牛',
  1974: '虎', 1975: '兔', 1976: '龙', 1977: '蛇',
  1978: '马', 1979: '羊', 1980: '猴', 1981: '鸡',
  1982: '狗', 1983: '猪', 1984: '鼠', 1985: '牛',
  1986: '虎', 1987: '兔', 1988: '龙', 1989: '蛇',
  1990: '马', 1991: '羊', 1992: '猴', 1993: '鸡',
  1994: '狗', 1995: '猪', 1996: '鼠', 1997: '牛',
  1998: '虎', 1999: '兔', 2000: '龙', 2001: '蛇',
  2002: '马', 2003: '羊', 2004: '猴', 2005: '鸡',
  2006: '狗', 2007: '猪', 2008: '鼠', 2009: '牛',
  2010: '虎', 2011: '兔', 2012: '龙', 2013: '蛇',
  2014: '马', 2015: '羊', 2016: '猴', 2017: '鸡',
  2018: '狗', 2019: '猪', 2020: '鼠', 2021: '牛',
  2022: '虎', 2023: '兔', 2024: '龙', 2025: '蛇'
};

// 多套运势文案（按风格分类）
const fortuneStyles = {
  // 风格1：简洁明了（适合中性运势）
  style1: {
    rat: {
      overall: '鼠宜理性思考，规划未来',
      love: '感情平稳，适合深度交流',
      career: '工作效率高，宜制定计划',
      wealth: '财运一般，宜理性消费',
      health: '健康良好，注意眼部保健',
      tip: '今日宜理性思考，为未来做规划',
      luckyColor: '天蓝色',
      luckyNumber: '4',
      luckyTime: '10:00-12:00',
      luckyDirection: '东北方'
    },
    ox: {
      overall: '牛宜主动行动，把握机遇',
      love: '感情升温，适合表达心意',
      career: '机会增多，宜积极争取',
      wealth: '财运不错，可能有额外收入',
      health: '健康良好，适当运动',
      tip: '今日宜主动行动，把握难得机遇',
      luckyColor: '深红色',
      luckyNumber: '9',
      luckyTime: '14:00-16:00',
      luckyDirection: '正南方'
    },
    tiger: {
      overall: '虎宜稳健前行，循序渐进',
      love: '感情需耐心经营',
      career: '进展顺利，不宜急躁',
      wealth: '财运平稳，宜长期投资',
      health: '注意休息，避免劳累',
      tip: '今日宜稳健前行，循序渐进',
      luckyColor: '深绿色',
      luckyNumber: '7',
      luckyTime: '08:00-10:00',
      luckyDirection: '东南方'
    },
    rabbit: {
      overall: '兔宜保持乐观，积极面对',
      love: '感情良好，适合增进感情',
      career: '遇到挑战，宜积极应对',
      wealth: '财运一般，宜量入为出',
      health: '健康良好，保持好心情',
      tip: '今日宜保持乐观，积极面对挑战',
      luckyColor: '薰衣草色',
      luckyNumber: '3',
      luckyTime: '16:00-18:00',
      luckyDirection: '正东方'
    },
    dragon: {
      overall: '龙宜广结善缘，拓展人脉',
      love: '感情极佳，可能有新机会',
      career: '人际关系和谐，有利发展',
      wealth: '财运旺盛，可能有意外之财',
      health: '健康良好，精力充沛',
      tip: '今日宜广结善缘，拓展人脉',
      luckyColor: '金黄色',
      luckyNumber: '8',
      luckyTime: '12:00-14:00',
      luckyDirection: '西南方'
    },
    snake: {
      overall: '蛇宜深思熟虑，谨慎决策',
      love: '感情需理性思考',
      career: '需谨慎决策，避免冲动',
      wealth: '财运平稳，宜保守理财',
      health: '注意饮食规律',
      tip: '今日宜深思熟虑，谨慎决策',
      luckyColor: '紫色',
      luckyNumber: '6',
      luckyTime: '20:00-22:00',
      luckyDirection: '西北方'
    },
    horse: {
      overall: '马宜灵活应变，适应变化',
      love: '感情可能有变化，宜灵活应对',
      career: '遇到变化，宜灵活适应',
      wealth: '财运有波动，宜谨慎应对',
      health: '健康良好，保持运动',
      tip: '今日宜灵活应变，适应变化',
      luckyColor: '橙色',
      luckyNumber: '5',
      luckyTime: '06:00-08:00',
      luckyDirection: '正北方'
    },
    goat: {
      overall: '羊宜脚踏实地，专注当下',
      love: '感情平稳，宜专注经营',
      career: '宜专注当前任务',
      wealth: '财运一般，宜踏实积累',
      health: '注意休息，避免压力',
      tip: '今日宜脚踏实地，专注当下',
      luckyColor: '米白色',
      luckyNumber: '2',
      luckyTime: '18:00-20:00',
      luckyDirection: '正西方'
    },
    monkey: {
      overall: '猴宜创新思维，突破常规',
      love: '感情良好，宜创新约会方式',
      career: '宜创新思维，寻找新方法',
      wealth: '财运不错，宜尝试新理财方式',
      health: '健康良好，充满活力',
      tip: '今日宜创新思维，突破常规',
      luckyColor: '亮黄色',
      luckyNumber: '1',
      luckyTime: '09:00-11:00',
      luckyDirection: '东南方'
    },
    rooster: {
      overall: '鸡宜精益求精，追求完美',
      love: '感情宜注重细节',
      career: '宜精益求精，追求完美',
      wealth: '财运平稳，宜精细规划',
      health: '注意作息规律',
      tip: '今日宜精益求精，注重细节',
      luckyColor: '银白色',
      luckyNumber: '6',
      luckyTime: '11:00-13:00',
      luckyDirection: '正西方'
    },
    dog: {
      overall: '狗宜真诚待人，广结善缘',
      love: '感情良好，宜真诚相待',
      career: '宜真诚合作，团队协作',
      wealth: '财运一般，宜与人合作',
      health: '健康良好，心态平和',
      tip: '今日宜真诚待人，广结善缘',
      luckyColor: '深棕色',
      luckyNumber: '8',
      luckyTime: '15:00-17:00',
      luckyDirection: '东北方'
    },
    pig: {
      overall: '猪宜享受生活，放松心情',
      love: '感情良好，适合二人世界',
      career: '压力减轻，宜适当放松',
      wealth: '财运不错，宜犒劳自己',
      health: '健康良好，心情愉悦',
      tip: '今日宜享受生活，放松心情',
      luckyColor: '粉红色',
      luckyNumber: '9',
      luckyTime: '19:00-21:00',
      luckyDirection: '正南方'
    }
  },
  
  // 风格2：温馨鼓励（适合较好的运势）
  style2: {
    rat: {
      overall: '鼠宜保持初心，乐观向前',
      love: '感情温馨，适合陪伴彼此',
      career: '工作顺利，宜保持热情',
      wealth: '财运稳定，宜合理规划',
      health: '健康状况佳，保持活力',
      tip: '今日宜保持初心，乐观面对一切',
      luckyColor: '薄荷绿',
      luckyNumber: '3',
      luckyTime: '09:00-11:00',
      luckyDirection: '东南方'
    },
    ox: {
      overall: '牛宜坚持努力，收获回报',
      love: '感情甜蜜，适合表达爱意',
      career: '努力有回报，宜继续坚持',
      wealth: '财运上升，宜稳健投资',
      health: '健康状况佳，适当放松',
      tip: '今日宜坚持努力，收获属于你的回报',
      luckyColor: '暖橙色',
      luckyNumber: '7',
      luckyTime: '13:00-15:00',
      luckyDirection: '正南方'
    },
    tiger: {
      overall: '虎宜相信自己，勇敢前行',
      love: '感情需要勇气，宜主动表达',
      career: '相信自己，勇敢迎接挑战',
      wealth: '财运有机会，宜勇敢把握',
      health: '注意休息，保持体力',
      tip: '今日宜相信自己，勇敢前行',
      luckyColor: '宝石蓝',
      luckyNumber: '5',
      luckyTime: '10:00-12:00',
      luckyDirection: '东北方'
    },
    rabbit: {
      overall: '兔宜温柔以待，收获美好',
      love: '感情细腻，适合温柔相处',
      career: '宜温柔待人，收获好人缘',
      wealth: '财运平稳，宜用心经营',
      health: '健康状况佳，保持好心情',
      tip: '今日宜温柔以待，收获生活的美好',
      luckyColor: '樱花粉',
      luckyNumber: '4',
      luckyTime: '14:00-16:00',
      luckyDirection: '正东方'
    },
    dragon: {
      overall: '龙宜展现魅力，把握机会',
      love: '魅力四射，适合展现自我',
      career: '展现能力，把握发展机会',
      wealth: '财运亨通，宜把握良机',
      health: '精力充沛，充满活力',
      tip: '今日宜展现魅力，把握属于你的机会',
      luckyColor: '珊瑚红',
      luckyNumber: '9',
      luckyTime: '11:00-13:00',
      luckyDirection: '西南方'
    },
    snake: {
      overall: '蛇宜保持智慧，理性决策',
      love: '感情需要智慧，宜理性对待',
      career: '保持智慧，理性分析问题',
      wealth: '财运稳定，宜理性投资',
      health: '注意饮食，保持健康',
      tip: '今日宜保持智慧，理性做出决策',
      luckyColor: '孔雀蓝',
      luckyNumber: '6',
      luckyTime: '19:00-21:00',
      luckyDirection: '西北方'
    },
    horse: {
      overall: '马宜保持热情，积极进取',
      love: '感情热情，适合积极表达',
      career: '保持热情，积极追求目标',
      wealth: '财运有活力，宜积极理财',
      health: '充满活力，适当运动',
      tip: '今日宜保持热情，积极进取',
      luckyColor: '阳光黄',
      luckyNumber: '8',
      luckyTime: '07:00-09:00',
      luckyDirection: '正北方'
    },
    goat: {
      overall: '羊宜保持善良，收获温暖',
      love: '感情善良，适合温暖相处',
      career: '保持善良，收获他人支持',
      wealth: '财运平稳，宜善良待人',
      health: '心态平和，保持健康',
      tip: '今日宜保持善良，收获生活的温暖',
      luckyColor: '奶油色',
      luckyNumber: '2',
      luckyTime: '17:00-19:00',
      luckyDirection: '正西方'
    },
    monkey: {
      overall: '猴宜保持灵活，创新思维',
      love: '感情灵活，适合创新互动',
      career: '保持灵活，创新解决问题',
      wealth: '财运有创意，宜创新理财',
      health: '灵活敏捷，充满活力',
      tip: '今日宜保持灵活，创新思维',
      luckyColor: '柠檬绿',
      luckyNumber: '1',
      luckyTime: '08:00-10:00',
      luckyDirection: '东南方'
    },
    rooster: {
      overall: '鸡宜保持勤劳，收获成果',
      love: '感情勤劳，适合用心经营',
      career: '保持勤劳，收获工作成果',
      wealth: '财运勤劳，宜踏实积累',
      health: '勤劳健康，保持规律',
      tip: '今日宜保持勤劳，收获属于你的成果',
      luckyColor: '珍珠白',
      luckyNumber: '7',
      luckyTime: '12:00-14:00',
      luckyDirection: '正西方'
    },
    dog: {
      overall: '狗宜保持忠诚，收获信任',
      love: '感情忠诚，适合真诚相待',
      career: '保持忠诚，收获他人信任',
      wealth: '财运稳定，宜忠诚合作',
      health: '心态忠诚，保持平和',
      tip: '今日宜保持忠诚，收获他人的信任',
      luckyColor: '巧克力棕',
      luckyNumber: '8',
      luckyTime: '16:00-18:00',
      luckyDirection: '东北方'
    },
    pig: {
      overall: '猪宜保持乐观，享受生活',
      love: '感情乐观，适合快乐相处',
      career: '保持乐观，享受工作过程',
      wealth: '财运乐观，宜享受收获',
      health: '心态乐观，保持健康',
      tip: '今日宜保持乐观，享受生活的美好',
      luckyColor: '蜜桃粉',
      luckyNumber: '9',
      luckyTime: '20:00-22:00',
      luckyDirection: '正南方'
    }
  },
  
  // 风格3：积极向上（适合很好的运势）
  style3: {
    rat: {
      overall: '鼠宜设定目标，勇往直前',
      love: '感情有目标，适合规划未来',
      career: '设定目标，勇往直前',
      wealth: '财运有目标，宜规划投资',
      health: '健康有目标，宜设定锻炼计划',
      tip: '今日宜设定目标，勇往直前',
      luckyColor: '海蓝色',
      luckyNumber: '5',
      luckyTime: '11:00-13:00',
      luckyDirection: '东北方'
    },
    ox: {
      overall: '牛宜踏实前行，稳步上升',
      love: '感情踏实，适合稳步发展',
      career: '踏实前行，稳步上升',
      wealth: '财运踏实，宜稳步积累',
      health: '健康踏实，宜稳步锻炼',
      tip: '今日宜踏实前行，稳步上升',
      luckyColor: '深棕色',
      luckyNumber: '6',
      luckyTime: '15:00-17:00',
      luckyDirection: '正南方'
    },
    tiger: {
      overall: '虎宜充满自信，迎接挑战',
      love: '感情自信，适合主动出击',
      career: '充满自信，迎接挑战',
      wealth: '财运自信，宜勇敢投资',
      health: '健康自信，宜充满活力',
      tip: '今日宜充满自信，迎接挑战',
      luckyColor: '火焰红',
      luckyNumber: '8',
      luckyTime: '09:00-11:00',
      luckyDirection: '东南方'
    },
    rabbit: {
      overall: '兔宜温柔坚强，克服困难',
      love: '感情温柔坚强，适合相互支持',
      career: '温柔坚强，克服困难',
      wealth: '财运温柔坚强，宜耐心积累',
      health: '健康温柔坚强，宜保持积极',
      tip: '今日宜温柔坚强，克服困难',
      luckyColor: '薰衣草紫',
      luckyNumber: '4',
      luckyTime: '13:00-15:00',
      luckyDirection: '正东方'
    },
    dragon: {
      overall: '龙宜展现霸气，引领潮流',
      love: '感情霸气，适合引领关系',
      career: '展现霸气，引领工作潮流',
      wealth: '财运霸气，宜引领投资方向',
      health: '健康霸气，宜充满活力',
      tip: '今日宜展现霸气，引领潮流',
      luckyColor: '金色',
      luckyNumber: '9',
      luckyTime: '10:00-12:00',
      luckyDirection: '西南方'
    },
    snake: {
      overall: '蛇宜保持智慧，洞察先机',
      love: '感情智慧，适合洞察对方需求',
      career: '保持智慧，洞察工作先机',
      wealth: '财运智慧，宜洞察投资机会',
      health: '健康智慧，宜洞察身体状况',
      tip: '今日宜保持智慧，洞察先机',
      luckyColor: '深紫色',
      luckyNumber: '7',
      luckyTime: '18:00-20:00',
      luckyDirection: '西北方'
    },
    horse: {
      overall: '马宜自由奔放，追求梦想',
      love: '感情自由，适合追求浪漫',
      career: '自由奔放，追求职业梦想',
      wealth: '财运自由，宜追求投资机会',
      health: '健康自由，宜追求运动乐趣',
      tip: '今日宜自由奔放，追求梦想',
      luckyColor: '橙色',
      luckyNumber: '3',
      luckyTime: '06:00-08:00',
      luckyDirection: '正北方'
    },
    goat: {
      overall: '羊宜温和坚韧，默默耕耘',
      love: '感情温和，适合默默付出',
      career: '温和坚韧，默默耕耘',
      wealth: '财运温和，宜默默积累',
      health: '健康温和，宜默默调养',
      tip: '今日宜温和坚韧，默默耕耘',
      luckyColor: '米黄色',
      luckyNumber: '2',
      luckyTime: '16:00-18:00',
      luckyDirection: '正西方'
    },
    monkey: {
      overall: '猴宜聪明伶俐，灵活应变',
      love: '感情聪明，适合灵活相处',
      career: '聪明伶俐，灵活应变',
      wealth: '财运聪明，宜灵活投资',
      health: '健康聪明，宜灵活运动',
      tip: '今日宜聪明伶俐，灵活应变',
      luckyColor: '亮绿色',
      luckyNumber: '1',
      luckyTime: '08:00-10:00',
      luckyDirection: '东南方'
    },
    rooster: {
      overall: '鸡宜勤劳自律，追求完美',
      love: '感情勤劳，适合自律经营',
      career: '勤劳自律，追求完美',
      wealth: '财运勤劳，宜自律理财',
      health: '健康勤劳，宜自律生活',
      tip: '今日宜勤劳自律，追求完美',
      luckyColor: '银白色',
      luckyNumber: '6',
      luckyTime: '12:00-14:00',
      luckyDirection: '正西方'
    },
    dog: {
      overall: '狗宜忠诚正直，守护幸福',
      love: '感情忠诚，适合守护关系',
      career: '忠诚正直，守护工作成果',
      wealth: '财运忠诚，宜守护财富',
      health: '健康忠诚，宜守护身体',
      tip: '今日宜忠诚正直，守护幸福',
      luckyColor: '深棕色',
      luckyNumber: '8',
      luckyTime: '14:00-16:00',
      luckyDirection: '东北方'
    },
    pig: {
      overall: '猪宜真诚豁达，享受人生',
      love: '感情真诚，适合豁达相处',
      career: '真诚豁达，享受工作',
      wealth: '财运真诚，宜豁达理财',
      health: '健康真诚，宜豁达生活',
      tip: '今日宜真诚豁达，享受人生',
      luckyColor: '粉红色',
      luckyNumber: '9',
      luckyTime: '19:00-21:00',
      luckyDirection: '正南方'
    }
  }
};

// 根据运势等级选择风格
function getStyleByFortuneLevel(level) {
  switch (level) {
    case 'excellent': // 极好
      return 'style3';
    case 'good': // 良好
      return 'style2';
    case 'neutral': // 一般
    default:
      return 'style1';
  }
}

// GitHub仓库地址
const GITHUB_REPO = 'liuliu521789/zodiac';
const FORTUNE_JSON_URL = 'https://raw.githubusercontent.com/liuliu521789/zodiac/refs/heads/main/fortune_data.json';

let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 缓存24小时

function getZodiacByYear(year) {
  const zodiacName = zodiacByYear[year];
  if (!zodiacName) return null;
  return zodiacList.find(z => z.name === zodiacName);
}

async function fetchFortuneData() {
  const now = Date.now();
  
  // 检查缓存
  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedData;
  }
  
  try {
    // 尝试从本地缓存获取
    const localData = wx.getStorageSync('fortune_data');
    const localTime = wx.getStorageSync('last_fetch_time');
    
    if (localData && (now - localTime) < CACHE_DURATION) {
      cachedData = localData;
      lastFetchTime = localTime;
      return cachedData;
    }
    
    // 使用网络请求获取最新数据
    const response = await wx.request({
      url: FORTUNE_JSON_URL,
      method: 'GET',
      timeout: 10000
    });
    
    if (response.statusCode === 200) {
      cachedData = response.data;
      lastFetchTime = now;
      // 缓存到本地
      wx.setStorageSync('fortune_data', cachedData);
      wx.setStorageSync('last_fetch_time', lastFetchTime);
      return cachedData;
    } else {
      throw new Error('网络请求失败');
    }
    
    // 本地默认数据（网络请求失败时使用）
    /*
    const defaultData = {
      date: '2026年4月9日',
      red_list: ['龙', '牛', '猴'],
      black_list: ['蛇', '马', '羊'],
      zodiacs: {
        rat: {
          overall: '鼠宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属鼠的朋友今日宜保持平常心，稳扎稳打'
        },
        ox: {
          overall: '牛宜积极进取，把握机遇',
          love: '感情升温，适合表达心意',
          career: '机会增多，宜积极争取',
          wealth: '财运不错，可能有额外收入',
          health: '健康状况良好，适当运动',
          tip: '属牛的朋友今日运势良好，宜主动出击'
        },
        tiger: {
          overall: '虎宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属虎的朋友今日宜保持平常心，稳扎稳打'
        },
        rabbit: {
          overall: '兔宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属兔的朋友今日宜保持平常心，稳扎稳打'
        },
        dragon: {
          overall: '龙宜积极进取，把握机遇',
          love: '感情升温，适合表达心意',
          career: '机会增多，宜积极争取',
          wealth: '财运不错，可能有额外收入',
          health: '健康状况良好，适当运动',
          tip: '属龙的朋友今日运势良好，宜主动出击'
        },
        snake: {
          overall: '蛇宜谨慎行事，稳扎稳打',
          love: '感情需理性思考',
          career: '需谨慎决策，避免冲动',
          wealth: '财运平稳，宜保守理财',
          health: '注意饮食规律，保持健康',
          tip: '属蛇的朋友今日宜保持低调，避免冲动'
        },
        horse: {
          overall: '马宜谨慎行事，稳扎稳打',
          love: '感情需理性思考',
          career: '需谨慎决策，避免冲动',
          wealth: '财运平稳，宜保守理财',
          health: '注意饮食规律，保持健康',
          tip: '属马的朋友今日宜保持低调，避免冲动'
        },
        goat: {
          overall: '羊宜谨慎行事，稳扎稳打',
          love: '感情需理性思考',
          career: '需谨慎决策，避免冲动',
          wealth: '财运平稳，宜保守理财',
          health: '注意饮食规律，保持健康',
          tip: '属羊的朋友今日宜保持低调，避免冲动'
        },
        monkey: {
          overall: '猴宜积极进取，把握机遇',
          love: '感情升温，适合表达心意',
          career: '机会增多，宜积极争取',
          wealth: '财运不错，可能有额外收入',
          health: '健康状况良好，适当运动',
          tip: '属猴的朋友今日运势良好，宜主动出击'
        },
        rooster: {
          overall: '鸡宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属鸡的朋友今日宜保持平常心，稳扎稳打'
        },
        dog: {
          overall: '狗宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属狗的朋友今日宜保持平常心，稳扎稳打'
        },
        pig: {
          overall: '猪宜保持乐观，稳步前行',
          love: '感情稳定，适合与伴侣增进感情',
          career: '事业运一般，宜稳扎稳打',
          wealth: '财运平稳，宜理性消费',
          health: '健康状况良好，注意休息',
          tip: '属猪的朋友今日宜保持平常心，稳扎稳打'
        }
      },
      last_updated: now
    };
    
    cachedData = defaultData;
    lastFetchTime = now;
    wx.setStorageSync('fortune_data', defaultData);
    wx.setStorageSync('last_fetch_time', now);
    return defaultData;
    */
  } catch (error) {
    console.error('获取运势数据失败:', error);
    // 尝试从本地缓存获取
    const localData = wx.getStorageSync('fortune_data');
    const localTime = wx.getStorageSync('last_fetch_time');
    
    if (localData && (now - localTime) < CACHE_DURATION) {
      cachedData = localData;
      lastFetchTime = localTime;
      return cachedData;
    }
    
    // 返回默认数据
    return getDefaultFortuneData();
  }
}

function getDefaultFortuneData() {
  const defaultData = {
    date: new Date().toLocaleDateString('zh-CN'),
    red_list: ['龙', '牛', '猴'],
    black_list: ['蛇', '马', '羊'],
    zodiacs: {}
  };
  
  // 为每个生肖根据红黑榜设置不同风格
  zodiacList.forEach(zodiac => {
    let style;
    if (['龙', '牛', '猴'].includes(zodiac.name)) {
      style = 'style3'; // 红榜用积极向上风格
    } else if (['蛇', '马', '羊'].includes(zodiac.name)) {
      style = 'style1'; // 黑榜用简洁明了风格
    } else {
      style = 'style2'; // 其他用温馨鼓励风格
    }
    defaultData.zodiacs[zodiac.id] = fortuneStyles[style][zodiac.id];
  });
  
  return defaultData;
}

async function getFortune(zodiacId) {
  try {
    const data = await fetchFortuneData();
    const zodiacData = data.zodiacs[zodiacId];
    let zodiacInfo = zodiacList.find(z => z.id === zodiacId);
    
    if (zodiacData) {
      // 根据红黑榜确定风格
      let style;
      if (data.red_list && data.red_list.includes(zodiacInfo.name)) {
        style = 'style3'; // 红榜用积极向上风格
      } else if (data.black_list && data.black_list.includes(zodiacInfo.name)) {
        style = 'style1'; // 黑榜用简洁明了风格
      } else {
        style = 'style2'; // 其他用温馨鼓励风格
      }
      
      // 合并数据，优先使用爬取的数据，补充风格化的文案
      const styledFortune = {
        ...fortuneStyles[style][zodiacId],
        ...zodiacData,
        summary: generateZodiacSummary(zodiacId, {
          ...fortuneStyles[style][zodiacId],
          ...zodiacData
        })
      };
      
      return styledFortune;
    }
    
    // 返回默认数据
    if (!zodiacInfo) {
      zodiacInfo = zodiacList.find(z => z.id === zodiacId);
    }
    let style;
    if (['龙', '牛', '猴'].includes(zodiacInfo.name)) {
      style = 'style3';
    } else if (['蛇', '马', '羊'].includes(zodiacInfo.name)) {
      style = 'style1';
    } else {
      style = 'style2';
    }
    
    const defaultFortune = fortuneStyles[style][zodiacId];
    defaultFortune.summary = generateZodiacSummary(zodiacId, defaultFortune);
    return defaultFortune;
  } catch (error) {
    console.error('获取运势失败:', error);
    // 使用默认风格
    if (!zodiacInfo) {
      zodiacInfo = zodiacList.find(z => z.id === zodiacId);
    }
    let style;
    if (['龙', '牛', '猴'].includes(zodiacInfo.name)) {
      style = 'style3';
    } else if (['蛇', '马', '羊'].includes(zodiacInfo.name)) {
      style = 'style1';
    } else {
      style = 'style2';
    }
    
    const defaultFortune = fortuneStyles[style][zodiacId];
    defaultFortune.summary = generateZodiacSummary(zodiacId, defaultFortune);
    return defaultFortune;
  }
}

function generateZodiacSummary(zodiacId, fortuneData) {
  const zodiac = zodiacList.find(z => z.id === zodiacId);
  if (!zodiac) return '';
  
  const { name, emoji } = zodiac;
  const { overall, love, career, wealth, health, tip, luckyColor, luckyNumber, luckyTime, luckyDirection } = fortuneData;
  
  return `${emoji} 属${name}的朋友今日${overall.split('，')[0]}。事业${career.split('，')[0]}，财运${wealth.split('，')[0]}，感情${love.split('，')[0]}，健康${health.split('，')[0]}。幸运色${luckyColor}，幸运数字${luckyNumber}，幸运时间${luckyTime}，幸运方位${luckyDirection}。${tip}`;
}

async function generateDailySummary() {
  try {
    const data = await fetchFortuneData();
    const { date, red_list, black_list, zodiacs } = data;
    
    let summary = `${date} 十二生肖今日运势：\n`;
    summary += `✨ 红榜：${red_list.join('、')}\n`;
    summary += `⚠️ 黑榜：${black_list.join('、')}\n\n`;
    
    zodiacList.forEach(zodiac => {
      const fortune = zodiacs[zodiac.id];
      if (fortune) {
        const luckLevel = red_list.includes(zodiac.name) ? '🌟' : black_list.includes(zodiac.name) ? '⚠️' : '✨';
        summary += `${luckLevel} ${zodiac.emoji} 属${zodiac.name}：${fortune.overall.split('。')[0]}。\n`;
      }
    });
    
    summary += '\n📅 每日更新，仅供参考！';
    
    return summary;
  } catch (error) {
    console.error('生成每日总结失败:', error);
    // 使用默认数据
    let summary = `${new Date().toLocaleDateString('zh-CN')} 十二生肖今日运势：\n`;
    summary += `✨ 红榜：龙、牛、猴\n`;
    summary += `⚠️ 黑榜：蛇、马、羊\n\n`;
    
    zodiacList.forEach(zodiac => {
      let style;
      if (['龙', '牛', '猴'].includes(zodiac.name)) {
        style = 'style3';
      } else if (['蛇', '马', '羊'].includes(zodiac.name)) {
        style = 'style1';
      } else {
        style = 'style2';
      }
      const fortune = fortuneStyles[style][zodiac.id];
      if (fortune) {
        const luckLevel = ['龙', '牛', '猴'].includes(zodiac.name) ? '🌟' : ['蛇', '马', '羊'].includes(zodiac.name) ? '⚠️' : '✨';
        summary += `${luckLevel} ${zodiac.emoji} 属${zodiac.name}：${fortune.overall.split('。')[0]}。\n`;
      }
    });
    
    summary += '\n📅 每日更新，仅供参考！';
    return summary;
  }
}

function getZodiacList() {
  return zodiacList;
}

function getZodiacName(id) {
  const zodiac = zodiacList.find(z => z.id === id);
  return zodiac ? zodiac.name : '';
}

function getZodiacInfo(id) {
  return zodiacList.find(z => z.id === id) || null;
}

module.exports = {
  zodiacList,
  zodiacMap: { rat: '鼠', ox: '牛', tiger: '虎', rabbit: '兔', dragon: '龙', snake: '蛇', horse: '马', goat: '羊', monkey: '猴', rooster: '鸡', dog: '狗', pig: '猪' },
  zodiacByYear,
  getZodiacByYear,
  getFortune,
  getZodiacList,
  getZodiacName,
  getZodiacInfo,
  fetchFortuneData,
  generateDailySummary,
  generateZodiacSummary
};