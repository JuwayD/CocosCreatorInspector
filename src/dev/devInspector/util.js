import Vue from 'vue'

export default function () {
  // String 字符串扩展函数
  // firstUpperCase 将字符串首字母大写
  String.prototype.firstUpperCase = function () {
    let that = this;
    return that.toString()[0].toUpperCase() + that.toString().slice(1);
  };

  // eraseSubstring 将字符串删去子串部分
  String.prototype.eraseSubstring = function (str) {
    let that = this;
    return that.replace(str, "");
  };

  // 判断有没有子串，大小写不灵敏
  String.prototype.hasSubstrIgnoreCase = function (substr) {
    return this.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
  };

  // 将首字母大写
  String.prototype.capitalize = function () {
    let c = this.charCodeAt(0);
    if (97 <= c && c <= 122) {
      c -= 32;
    }
    return String.fromCharCode(c) + this.slice(1);
  };

  // Array 数组扩展函数
  // sliceByObj 通过给定的obj切分数组，只取前半部分
  Array.prototype.sliceByObj = function (obj) {
    let that = this;
    let index = that.indexOf(obj);
    if (index == -1) {
      return that;
    } else {
      return that.slice(0, index);
    }
  };

  // Vue util
  // 刷新节点
  Vue.prototype._freshNode = function (uuid) {
    if (uuid) {
      let code2 = "ccIns.getNodeInfo('" + uuid + "')";
      this._evalCode(code2);
    }
  };

  // 执行代码
  Vue.prototype._evalCode = function (code) {
    if (chrome && chrome.devtools) {
      chrome.devtools.inspectedWindow.eval(code);
    } else {
      console.log(code);
    }
  };

  // 枚举类型储存的地方
  Vue.enumStorage = {};

  // 添加枚举类型
  Vue.addEnumType = function (comp, type, data) {
    if (!Vue.enumStorage[comp]) {
      Vue.enumStorage[comp] = {};
    }
    Vue.enumStorage[comp][type] = data;
  };

  // 获得枚举类型
  Vue.getEnumType = function (comp, type) {
    return Vue.enumStorage[comp][type];
  };

  // 判断是否为枚举类型
  Vue.isEnumType = function (comp, type) {
    comp = comp.capitalize();
    type = type.capitalize();
    return Vue.enumStorage[comp] && Vue.enumStorage[comp][type];
  }
}