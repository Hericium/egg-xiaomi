'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {

    // 获取数据
    const api = `${this.config.api}appapi.php?a=getPortalList&catid=20&page=1`;
    const data = await this.app.curl(api, {
      method: 'GET',
      dataType: 'json',
    });
    return data && data.data.result || [];
  }

  async getNewsDetails(aid) {
    // 获取数据
    const api = `${this.config.api}appapi.php?a=getPortalArticle&aid=${aid}`;
    const data = await this.app.curl(api, {
      method: 'GET',
      dataType: 'json',
    });
    return data.data.result;
  }
}

module.exports = NewsService;
