'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ID number verification v0.0.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 中国身份证号验证(内地)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 作者 xxf1991-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ps:加微信请备注原因。 微信号 xxf1991-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IdValidate = function () {
  function IdValidate(areaNumber) {
    _classCallCheck(this, IdValidate);

    this.areaNumber = areaNumber;
    this.errorMessage = null;
    this.area = null;
    this.birth = null;
    this.isValidateArea = !!areaNumber;
  }

  _createClass(IdValidate, [{
    key: 'validate',
    value: function validate(idCard, areaNumber) {
      this.id = idCard;
      if (areaNumber) this.areaNumber = areaNumber;
      this.isValidateArea = this.isValidateArea || !!areaNumber;
      if (this.basicFormat(idCard)) {
        var res = true;
        if (idCard.length === 18) {
          res = this.id18Validate(idCard);
        }
        if (idCard.length === 15) {
          res = this.id15Validate(idCard);
        }
        if (res) {
          this.errorMessage = '验证通过';
        }
        return res;
      }
      return false;
    }
  }, {
    key: 'basicFormat',
    value: function basicFormat(idCard) {
      if (typeof idCard !== 'string') {
        this.errorMessage = '请输入一个字符串格式的身份证号';
        return false;
      }
      var len = idCard.length;
      if (len === 15 || len === 18) {
        return true;
      } else {
        this.errorMessage = '请输入一个15位或18位的身份证号';
        return false;
      }
    }
  }, {
    key: 'id18Validate',
    value: function id18Validate(idCard) {
      var res = this.id18Format(idCard);
      if (this.isValidateArea) {
        res = res && this.validateArea(idCard, this.areaNumber);
      }
      res = res && this.validateBirth(idCard);
      res = res && this.validateBit(idCard);
      return res;
    }
  }, {
    key: 'id15Validate',
    value: function id15Validate(idCard) {
      var res = this.id15Format(idCard);
      if (this.isValidateArea) {
        res = res && this.validateArea(idCard, this.areaNumber);
      }
      res = res && this.validateBirth(idCard);
      return res;
    }
  }, {
    key: 'id18Format',
    value: function id18Format(idCard) {
      var mes = '18位身份证号格式错误应该是18位数字或17位数字加X';
      if (idCard.slice(-1) !== 'X') {
        if (!/^[0-9]*$/.test(idCard)) {
          this.errorMessage = mes;
          return false;
        } else {
          return true;
        }
      } else {
        if (!/^[0-9]*$/.test(idCard.slice(0, 17))) {
          this.errorMessage = mes;
          return false;
        } else {
          return true;
        }
      }
    }
  }, {
    key: 'id15Format',
    value: function id15Format(idCard) {
      var mes = '15位身份证号格式错误应该是15位数字';
      if (!/^[0-9]*$/.test(idCard)) {
        this.errorMessage = mes;
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'validateArea',
    value: function validateArea(idCard, areaNumber) {
      var mes = '地区编号不正确';
      var area = idCard.slice(0, 6);
      if (!areaNumber.hasOwnProperty(area)) {
        var tmp = void 0;
        tmp = idCard.slice(0, 4) + '00';
        if (!areaNumber.hasOwnProperty(tmp)) {
          tmp = idCard.slice(0, 2) + '0000';
          if (!areaNumber.hasOwnProperty(tmp)) {
            this.errorMessage = mes;
          } else {
            this.errorMessage = areaNumber[tmp] + '未知地区';
          }
        } else {
          this.errorMessage = areaNumber[tmp] + '未知地区';
        }
        return false;
      } else {
        this.area = areaNumber[area];
        return true;
      }
    }
  }, {
    key: 'validateBirth',
    value: function validateBirth(idCard) {
      var birth = idCard.length === 18 ? idCard.slice(6, 14) : idCard.slice(6, 12);
      var year = void 0,
          month = void 0,
          day = void 0;
      if (birth.length === 8) {
        year = parseInt(birth.slice(0, 4), 10);
        month = parseInt(birth.slice(4, 6), 10);
        day = parseInt(birth.slice(-2), 10);
      } else if (birth.length === 6) {
        year = parseInt('19' + birth.slice(0, 2), 10);
        month = parseInt(birth.slice(2, 4), 10);
        day = parseInt(birth.slice(-2), 10);
      } else {
        this.errorMessage = '出生日期的位数6位或8位';
        return false;
      }
      if (isNaN(month) || isNaN(day) || month > 12 || month === 0 || day > 31 || day === 0) {
        this.errorMessage = '出生日期的格式错误';
        return false;
      }
      this.birth = year + '-' + month + '-' + day;
      return true;
    }
  }, {
    key: 'validateBit',
    value: function validateBit(idCard) {
      if (idCard.length !== 18) {
        this.errorMessage = '只有18位身份证号才会验证校验码';
        return false;
      }
      var posWeight = [];
      for (var i = 18; i > 1; i--) {
        var wei = this.weight(i);
        posWeight[i] = wei;
      }

      var sum = 0;
      var arr = idCard.split('');
      for (var j = 0; j < arr.length - 1; j++) {
        sum += parseInt(arr[j], 10) * posWeight[18 - j];
      }

      var checkBit = 12 - sum % 11;
      if (checkBit === 10) {
        checkBit = 'X';
      } else if (checkBit > 10) {
        checkBit = checkBit % 11;
      }
      checkBit = typeof checkBit === 'number' ? checkBit.toString() : checkBit;

      if (checkBit !== idCard.slice(-1)) {
        this.errorMessage = '校检码错误';
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'weight',
    value: function weight(t) {
      return Math.pow(2, t - 1) % 11;
    }
  }, {
    key: 'info',
    get: function get() {
      var sex = this.id.length === 18 ? this.id.slice(-2, -1) : this.id.slice(-1);
      return {
        sex: sex % 2 === 0 ? '女' : '男',
        birthday: this.birth,
        age: (0, _moment2.default)().diff((0, _moment2.default)(this.birth), 'years'),
        address: this.area
      };
    }
  }]);

  return IdValidate;
}();

exports.default = IdValidate;


var validator = new IdValidate();
exports.validator = validator;