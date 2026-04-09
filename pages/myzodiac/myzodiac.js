const fortune = require('../../utils/fortune.js');

Page({
  data: {
    yearList: [],
    yearIndex: 0,
    selectedYear: null,
    matchedZodiac: null
  },

  onLoad() {
    this.initYearPicker();
    this.loadSavedZodiac();
  },

  initYearPicker() {
    const years = [];
    for (let i = 1950; i <= 2025; i++) {
      years.push(i);
    }
    this.setData({
      yearList: years
    });
  },

  loadSavedZodiac() {
    const userData = wx.getStorageSync('userZodiac');
    if (userData && userData.year) {
      const yearIndex = userData.year - 1950;
      const matchedZodiac = fortune.getZodiacByYear(userData.year);
      this.setData({
        yearIndex: yearIndex,
        selectedYear: userData.year,
        matchedZodiac: matchedZodiac
      });
    }
  },

  onYearChange(e) {
    const index = e.detail.value;
    const year = 1950 + index;
    const matchedZodiac = fortune.getZodiacByYear(year);

    this.setData({
      yearIndex: index,
      selectedYear: year,
      matchedZodiac: matchedZodiac
    });
  },

  viewFortune() {
    const { selectedYear, matchedZodiac } = this.data;

    if (!matchedZodiac) {
      wx.showToast({
        title: '请先选择出生年份',
        icon: 'none'
      });
      return;
    }

    wx.setStorageSync('userZodiac', {
      zodiacId: matchedZodiac.id,
      zodiacName: matchedZodiac.name,
      year: selectedYear
    });

    wx.navigateTo({
      url: `/pages/detail/detail?zodiac=${matchedZodiac.id}`
    });
  },

  goHome() {
    wx.navigateBack();
  }
});