'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    this.ctx.body = 'index';
  }
  async show() {

    this.ctx.body = 'show';
  }
  async edit() {

    this.ctx.body = 'edit';
  }
  async create() {

    this.ctx.body = 'create';
  }
  async update() {

    this.ctx.body = 'update';
  }
  async destroy() {

    this.ctx.body = 'destroy';
  }
}

module.exports = ManagerController;
