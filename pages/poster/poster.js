const fortune = require('../../utils/fortune.js');

Page({
  data: {
    zodiacId: '',
    zodiacName: '',
    zodiacEmoji: '',
    solarDate: '',
    lunarDate: '',
    fortune: {},
    posterPath: '',
    generating: true
  },

  onLoad(options) {
    const { zodiac, name, solarDate, lunarDate, fortune: fortuneStr } = options;

    this.setData({
      zodiacId: zodiac,
      zodiacName: name,
      solarDate: solarDate,
      lunarDate: decodeURIComponent(lunarDate),
      fortune: JSON.parse(decodeURIComponent(fortuneStr))
    });

    this.generatePoster();
  },

  async generatePoster() {
    this.setData({ generating: true });

    try {
      const zodiacList = fortune.getZodiacList();
      const zodiac = zodiacList.find(z => z.id === this.data.zodiacId);
      this.setData({ zodiacEmoji: zodiac ? zodiac.emoji : '' });

      const ctx = wx.createCanvasContext('posterCanvas');
      const WIDTH = 540;
      const HEIGHT = 960;

      ctx.setFillStyle('#fff5e6');
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.setFillStyle('#f0e6d8');
      ctx.fillRect(0, 0, WIDTH, 200);

      ctx.setFillStyle('#333');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.fillText(this.data.solarDate || '2026年4月8日', WIDTH / 2, 60);

      ctx.setFillStyle('#888');
      ctx.setFontSize(22);
      ctx.fillText(this.data.lunarDate || '农历三月廿一', WIDTH / 2, 95);

      ctx.setFillStyle('#333');
      ctx.setFontSize(36);
      ctx.setTextAlign('center');
      ctx.fillText(this.data.zodiacEmoji || '🐀', WIDTH / 2, 180);

      ctx.setFillStyle('#333');
      ctx.setFontSize(36);
      ctx.setTextAlign('center');
      ctx.fillText(`属${this.data.zodiacName}今日运势`, WIDTH / 2, 300);

      ctx.setFillStyle('#fff');
      ctx.fillRect(40, 340, WIDTH - 80, 420);
      ctx.setStrokeStyle('#ffe4b5');
      ctx.strokeRect(40, 340, WIDTH - 80, 420);

      ctx.setFillStyle('#333');
      ctx.setFontSize(26);
      ctx.setTextAlign('left');
      ctx.fillText('综合运势', 80, 385);

      ctx.setFillStyle('#666');
      ctx.setFontSize(20);
      this.wrapText(ctx, this.data.fortune.overall || '今日运势良好', 80, 420, WIDTH - 140, 28, 3);

      const sections = [
        { label: '💕 桃花运', text: this.data.fortune.love || '感情运势稳定' },
        { label: '💼 事业运', text: this.data.fortune.career || '事业运良好' },
        { label: '💰 财运', text: this.data.fortune.wealth || '财运一般' }
      ];

      let yPos = 540;
      sections.forEach(section => {
        ctx.setFillStyle('#333');
        ctx.setFontSize(24);
        ctx.fillText(section.label, 80, yPos);
        ctx.setFillStyle('#666');
        ctx.setFontSize(20);
        this.wrapText(ctx, section.text, 80, yPos + 30, WIDTH - 140, 28, 2);
        yPos += 80;
      });

      ctx.setFillStyle('#f0f9ff');
      ctx.fillRect(40, 780, WIDTH - 80, 100);
      ctx.setStrokeStyle('#b3d9ff');
      ctx.strokeRect(40, 780, WIDTH - 80, 100);

      ctx.setFillStyle('#333');
      ctx.setFontSize(24);
      ctx.fillText('💡 今日提醒', 80, 820);
      ctx.setFillStyle('#666');
      ctx.setFontSize(20);
      this.wrapText(ctx, this.data.fortune.tip || '今日运势不错', 80, 850, WIDTH - 140, 28, 2);

      ctx.setFillStyle('#ff6b6b');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.fillText('12生肖今日运势', WIDTH / 2, 920);

      ctx.setFillStyle('#888');
      ctx.setFontSize(18);
      ctx.fillText('仅供娱乐，请理性看待', WIDTH / 2, 945);

      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId: 'posterCanvas',
          success: (res) => {
            this.setData({
              posterPath: res.tempFilePath,
              generating: false
            });
          },
          fail: (err) => {
            console.error('Canvas to temp file failed:', err);
            wx.showToast({
              title: '海报生成失败',
              icon: 'none'
            });
            this.setData({ generating: false });
          }
        });
      });
    } catch (err) {
      console.error('Generate poster error:', err);
      wx.showToast({
        title: '海报生成失败',
        icon: 'none'
      });
      this.setData({ generating: false });
    }
  },

  wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    if (!text) return;
    
    const words = text.split('');
    let line = '';
    let lines = 0;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = ctx.measureText ? ctx.measureText(testLine) : { width: testLine.length * 10 };
      const testWidth = metrics.width || testLine.length * 10;
      
      if (testWidth > maxWidth && i > 0) {
        if (lines >= maxLines - 1) {
          ctx.fillText(line + '...', x, y);
          return;
        }
        ctx.fillText(line, x, y);
        line = words[i];
        y += lineHeight;
        lines++;
      } else {
        line = testLine;
      }
    }
    
    ctx.fillText(line, x, y);
  },

  onPreview() {
    if (this.data.posterPath) {
      wx.previewImage({
        urls: [this.data.posterPath],
        current: this.data.posterPath
      });
    }
  },

  goBack() {
    wx.navigateBack();
  },

  regenerate() {
    this.generatePoster();
  },

  saveImage() {
    if (!this.data.posterPath) {
      wx.showToast({
        title: '海报未生成',
        icon: 'none'
      });
      return;
    }

    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterPath,
      success: () => {
        wx.showToast({
          title: '已保存至相册',
          icon: 'success'
        });
      },
      fail: (err) => {
        if (err.errMsg && err.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '提示',
            content: '请允许小程序访问相册，以便保存海报',
            confirmText: '去授权',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      }
    });
  },

  shareToFriend() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    });

    setTimeout(() => {
      wx.showToast({
        title: '请点击右上角分享',
        icon: 'none'
      });
    }, 100);
  },

  shareToTimeline() {
    wx.showToast({
      title: '请先保存图片，再去朋友圈发布',
      icon: 'none',
      duration: 2000
    });

    setTimeout(() => {
      this.saveImage();
    }, 1500);
  },

  onShareAppMessage() {
    const { zodiacId, zodiacName } = this.data;
    return {
      title: `属${zodiacName}今日运势出炉！快来看看你的今日运气～`,
      path: `/pages/detail/detail?zodiac=${zodiacId}`,
      imageUrl: this.data.posterPath
    };
  },

  onShareTimeline() {
    const { zodiacId, zodiacName } = this.data;
    return {
      title: `属${zodiacName}今日运势出炉！快来看看你的今日运气～`,
      query: `zodiac=${zodiacId}`,
      imageUrl: this.data.posterPath
    };
  }
});