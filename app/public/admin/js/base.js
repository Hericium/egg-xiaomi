'use strict';
$(function() {
  app.init();
});
const app = {
  init() {
    this.toggleAside();
    this.deleteConfirm();
  },
  deleteConfirm() {
    $('.delete').click(function() {
      const flag = confirm('您确定要删除吗?');
      return flag;
    });
  },
  toggleAside() {
    $('.aside h4').click(function() {
      $(this).siblings('ul').slideToggle();
    });
  },
  changeStatus(el, model, attr, _id) {
    $.get('/admin/base/changeStatus', { model, attr, _id }, function(data) {
      if (data.code === 0) {
        if (el.src.indexOf('yes') != -1) {
          el.src = '/public/admin/images/no.gif';
        } else {
          el.src = '/public/admin/images/yes.gif';
        }
      }
    });
  },
  editNum(el, model, attr, _id) {
    const val = $(el).html();
    const input = $("<input value='' />");
    // 把input放在span里面
    $(el).html(input);
    // 让input获取焦点  给input赋值
    $(input).trigger('focus').val(val);
    // 点击input的时候阻止冒泡
    $(input).click(function() {
      return false;
    });
    // 鼠标离开的时候给span赋值
    $(input).blur(function() {
      const num = $(this).val();
      $(el).html(num);
      // console.log(model,attr,id)
      $.get('/admin/base/editNum', { model, attr, _id, num }, function(data) {
        console.log(data);
      });
    });
  },
};
