const fortune = require('../../utils/fortune.js');
const dateUtil = require('../../utils/date.js');

Page({
  data: {
    zodiacList: [],
    currentDate: '',
    redList: [],
    blackList: [],
    summaryPreview: '点击查看今日运势总览',
    fullSummary: '',
    showSummaryModal: false,
    loading: true
  },

  onLoad() {
    this.initData();
  },

  async initData() {
    this.setData({ loading: true });
    
    try {
      // 获取生肖列表
      const zodiacList = fortune.getZodiacList();
      
      // 获取运势数据
      const data = await fortune.fetchFortuneData();
      const redList = data.red_list || [];
      const blackList = data.black_list || [];
      
      // 生成今日运势总结
      const fullSummary = await fortune.generateDailySummary();
      const summaryPreview = fullSummary.split('\n').slice(0, 3).join('\n');
      
      // 获取当前日期
      const now = new Date();
      const currentDate = dateUtil.formatDate(now).solar;
      
      this.setData({
        zodiacList: zodiacList,
        currentDate: currentDate,
        redList: redList,
        blackList: blackList,
        summaryPreview: summaryPreview,
        fullSummary: fullSummary,
        loading: false
      });
    } catch (error) {
      console.error('初始化数据失败:', error);
      // 使用默认数据
      const zodiacList = fortune.getZodiacList();
      const now = new Date();
      const currentDate = dateUtil.formatDate(now).solar;
      
      this.setData({
        zodiacList: zodiacList,
        currentDate: currentDate,
        redList: ['龙', '猴', '牛'],
        blackList: ['马', '羊', '兔'],
        summaryPreview: '今日运势数据获取中...',
        fullSummary: '今日运势数据获取失败，敬请期待明天的运势！',
        loading: false
      });
    }
  },

  goToDetail(e) {
    const zodiacId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?zodiac=${zodiacId}`
    });
  },

  goToMyZodiac() {
    wx.navigateTo({
      url: '/pages/myzodiac/myzodiac'
    });
  },

  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  showSummary() {
    this.setData({ showSummaryModal: true });
  },

  closeSummary() {
    this.setData({ showSummaryModal: false });
  },

  shareSummary() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    return {
      title: `12生肖今日运势出炉！快来看看你的今日运气～`,
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: `12生肖今日运势出炉！快来看看你的今日运气～`,
      query: ''
    };
  }
});