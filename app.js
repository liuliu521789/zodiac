App({
  onLaunch() {
    const zodiacData = wx.getStorageSync('userZodiac');
    if (zodiacData) {
      this.globalData.userZodiac = zodiacData;
    }
  },
  globalData: {
    userZodiac: null
  }
});