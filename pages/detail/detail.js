const fortune = require('../../utils/fortune.js');
const dateUtil = require('../../utils/date.js');

Page({
  data: {
    zodiacId: '',
    zodiacName: '',
    zodiacEmoji: '',
    fortune: {},
    shortComment: '',
    luckyColor: '红色',
    luckyNumber: '6',
    luckyTime: '06:00-08:00',
    luckyDirection: '西南方',
    currentTab: 'daily',
    loading: true
  },

  onLoad(options) {
    const zodiacId = options.zodiac;
    if (zodiacId) {
      this.loadFortune(zodiacId);
    }
  },

  async loadFortune(zodiacId) {
    this.setData({ loading: true });
    
    try {
      const zodiacInfo = fortune.getZodiacInfo(zodiacId);
      const fortuneData = await fortune.getFortune(zodiacId);

      if (zodiacInfo && fortuneData) {
        this.setData({
          zodiacId: zodiacId,
          zodiacName: zodiacInfo.name,
          zodiacEmoji: zodiacInfo.emoji,
          fortune: fortuneData,
          shortComment: fortuneData.tip,
          luckyColor: fortuneData.luckyColor || '红色',
          luckyNumber: fortuneData.luckyNumber || '6',
          luckyTime: fortuneData.luckyTime || '06:00-08:00',
          luckyDirection: fortuneData.luckyDirection || '西南方',
          loading: false
        });
      } else {
        this.setData({ loading: false });
        wx.showToast({
          title: '获取运势失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('加载运势失败:', error);
      this.setData({ loading: false });
      wx.showToast({
        title: '获取运势失败',
        icon: 'none'
      });
    }
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    if (tab !== 'daily') {
      wx.showToast({
        title: `${tab === 'weekly' ? '周运' : tab === 'monthly' ? '月运' : '年运'}功能敬请期待`,
        icon: 'none'
      });
    }
  },

  goBack() {
    wx.navigateBack();
  },

  async goToPoster() {
    try {
      const { zodiacId, zodiacName, fortune } = this.data;
      const now = new Date();
      const solar = dateUtil.formatDate(now);
      const lunar = dateUtil.formatLunarDate(now);

      const fortuneData = {
        ...fortune
      };

      wx.navigateTo({
        url: `/pages/poster/poster?zodiac=${zodiacId}&name=${zodiacName}&solarDate=${solar.solar}&lunarDate=${encodeURIComponent(lunar)}&fortune=${encodeURIComponent(JSON.stringify(fortuneData))}`
      });
    } catch (error) {
      console.error('生成海报失败:', error);
      wx.showToast({
        title: '生成海报失败',
        icon: 'none'
      });
    }
  },

  copySummary() {
    const summary = this.data.fortune.summary;
    if (summary) {
      wx.setClipboardData({
        data: summary,
        success: () => {
          wx.showToast({
            title: '复制成功',
            icon: 'success'
          });
        },
        fail: () => {
          wx.showToast({
            title: '复制失败',
            icon: 'none'
          });
        }
      });
    }
  },

  onShareAppMessage() {
    const { zodiacId, zodiacName, fortune } = this.data;
    return {
      title: `属${zodiacName}今日运势出炉！${fortune.summary ? fortune.summary.substring(0, 20) + '...' : '快来看看你的今日运气～'}`,
      path: `/pages/detail/detail?zodiac=${zodiacId}`
    };
  }
});