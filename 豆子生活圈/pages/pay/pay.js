// pages/index/pay/pay.js
//获取应用实例
const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    store_id: 1,
    store_name: "",
    //会员信息
    memberInfo: {
      available_predeposit: 0,//可用积分
      available_rc_balance:0,//可用余额
    },
    forbidden: true, //默认禁止买单
    is_coupon: true, //默认隐藏优惠券列表
    isNoDiscount: true, //是否输入不参与优惠部分 
    consumeAmount: '', //消费金额
    payableAmount: 0.00, //实际支付的金额
    noDiscountAmount: '', //不参加优惠部分的金额
    discountAmount: 0.00, //优惠的金额
    is_integral: false, //是否使用积分
    use_balanc: false,//是否使用余额支付
    use_balance_number: 0.00,//使用余额支付
    use_integral: 0.00, //使用积分
    ispayForAnother: true,
    payment_mode: 1, //默认支付方式 微信支付
    is_paypwd: false, //支付密码是否已经正确输入，默认未输入密码
    is_pop_paypwd: false, //是否弹出支付密码窗
    is_focus_paypwd: false, //默认控制input聚焦到支付密码上
    payErrNum: 0,//输入密码错误次数
    //我的优惠券
    mycoupon: [
      {
        coupon_id: 0,
        coupon_name: '省5元：满50减5元',
        discount_price: '5', //优惠金额
        is_checked: true, //是否选中
        is_use: false //是否可用
      },
      { coupon_name: '不使用优惠券', discount_price: '0' },
    ],
    use_coupon_id: 0,
    use_coupon_amount: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //店铺不存在

    if (!options.store_id) {
      wx.navigateBack({
        delta: 1
      })
    }
    that.setData({
      store_id: options.store_id,
      store_name: options.store_name,
      consumeAmount: options.consumeAmount,
      member_id: app.globalData.member_id,
      member_name: app.globalData.member_name,
    });
    //加载会员信息
    that.loadMemberInfo();
    if (options.to_from) {
      console.log("设置了支付密码后，跳转回来的");
      that.setData({
        to_from: options.to_from,
        is_paypwd: options.is_paypwd,
        is_integral: options.is_integral,
        consumeAmount: options.consumeAmount,
        noDiscountAmount: options.noDiscountAmount,
      });
      //判断满足条件的优惠券
      that.satisfyCoupon();
    }

    if (options.consumeAmount > 0) {
      let e = {
        detail: { value: options.consumeAmount }
      };
      that.inputConsume(e);
    }
  },
  //加载会员信息
  loadMemberInfo: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      store_id: that.data.store_id,//店铺ID
    };
    util.Ajax("member/paybill", data, function (res) {
      var data = res.datas;
      // console.log('返回会员信息:', res);
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        that.setData({
          memberInfo: data.memberInfo,
          mycoupon: data.mycoupon,
        })
      }
    });
  },
  //输入消费金额 发生变化时
  inputConsume: function (e) {
    var that = this,
      consumeAmount = e.detail.value,
      forbidden = that.data.forbidden;
    if (consumeAmount == 0 || '') {
      forbidden = true;//确定买单不可用
    } else {
      forbidden = false;  //确定买单可用
    }
    that.setData({
      consumeAmount: consumeAmount,
      payableAmount: consumeAmount,
      discountAmount: 0.00,//每次重输入恢复
      forbidden: forbidden,
      payment_mode: 2,
    })
    //判断满足条件的优惠券
    that.satisfyCoupon();

    //这里解除买单按钮禁用

    //触发是否使用积分了
    if (that.data.is_integral) {
      that.useIntegral();
    }
  },
  //加载出满足条件的优惠券
  satisfyCoupon: function () {
    var that = this;
    let mycoupon = that.data.mycoupon,
      is_mc = 0,//定义是否已经使用优惠券
      is_integral = that.data.is_integral,//是否勾选使用积分
      consumeAmount = that.data.consumeAmount,//消费金额
      payableAmount = that.data.payableAmount,//应付金额
      noDiscountAmount = that.data.noDiscountAmount,//不参加优惠金额
      discountAmount = Number(that.data.discountAmount); //优惠的金额
    if (mycoupon) {
      var _param = mycoupon.map(function (item) {
        // 判断当前优惠券满足金额 是否小于等于 （消费金额 - 不参加优惠部分的金额）
        if (Number(item.satisfy_price) <= consumeAmount - noDiscountAmount) {
          item.is_use = false; //满足条件
          //console.log('mckey:', mckey);
          //系统默认分配第一个为当前选中的优惠券
          if (is_mc == 0) {
            item.is_checked = true;
            discountAmount = discountAmount + Number(item.discount_price);
            that.setData({
              use_coupon_id: item.coupon_id,
              use_coupon_amount: item.discount_price, //
            })
            is_mc = 1;
          }
        } else {
          item.is_use = true; //不满足
          item.is_checked = '';
          //曾今被选中过，现在又不满足的优惠券
          if (item.is_checked) {
            discountAmount = discountAmount - Number(item.discount_price);
          }
        }
        return item;
      });
      //console.log("重组后：", _param);
      that.setData({
        mycoupon: _param,
        discountAmount: discountAmount,
        payableAmount: payableAmount - discountAmount,
      })
      if (is_integral) { //勾选了使用积分支付
        that.useIntegral();
      }
    }
  },
  // 是否输入不参与优惠金额
  isNoDiscount: function (e) {
    var that = this,
      isNoDiscount = that.data.isNoDiscount;
    if (e.detail.value[0] == 1) {
      isNoDiscount = false;
    } else {
      isNoDiscount = true;
    }
    that.setData({
      isNoDiscount: isNoDiscount,
    })
  },
  //输入不参与优惠金额
  inputNoDiscount: function (e) {
    var that = this;
    let noDiscountAmount = Number(e.detail.value),
      discountAmount = Number(that.data.discountAmount),
      payableAmount = Number(that.data.payableAmount),
      use_integral = Number(that.data.use_integral),
      use_coupon_id = that.data.use_coupon_id,
      use_coupon_amount = Number(that.data.use_coupon_amount);//已使用优惠券金额
    that.setData({
      noDiscountAmount: noDiscountAmount,
    })
    //曾今选中的重新计算
    if (use_coupon_amount > 0) {
      that.setData({
        use_coupon_id: 0,
        use_coupon_amount: 0,
        use_integral: 0,
        discountAmount: discountAmount - use_coupon_amount,
        payableAmount: payableAmount + use_coupon_amount + use_integral,
      })
      //判断满足条件的优惠券
      that.satisfyCoupon();
    }
  },
  //选择是否使用积分
  radioUseIntegral: function () {
    let that = this,
      use_integral = Number(that.data.use_integral), //使用积分
      payableAmount = Number(that.data.payableAmount), //实际需支付金额
      is_integral = that.data.is_integral;//是否勾选使用积分
    //如果当前的值是勾选了那么将设置成不使用积分，操作动作是相反的

    if (is_integral) {
      is_integral = false;
      payableAmount = payableAmount + use_integral;
      use_integral = 0;
    } else {
      is_integral = true;
    }
    that.setData({
      is_integral: is_integral,
      use_integral: use_integral,
      payableAmount: payableAmount,
    });
    that.useIntegral(); //输入支付的密码
  },
  // 使用积分抵现
  useIntegral: function () {
    let that = this;
    let is_integral = that.data.is_integral,//是否勾选使用积分
      use_integral = Number(that.data.use_integral), //使用积分
      is_paypwd = that.data.is_paypwd,//支付密码
      pay_pwd = that.data.memberInfo.member_paypwd,//支付密码
      is_pop_paypwd = that.data.is_pop_paypwd,//跳出支付框
      is_focus_paypwd = that.data.is_focus_paypwd,//聚焦到支付框
      payableAmount = Number(that.data.payableAmount), //实际需支付金额
      available_predeposit = Number(that.data.memberInfo.available_predeposit); //可用积分
    if (is_integral) {//选中使用积分抵扣
      if (use_integral) {
        //可能原包就已经勾选了使用积分抵扣，而此时重新计算时，应付金额应该加上原来的积分抵扣部分
        payableAmount = payableAmount
        // payableAmount = payableAmount + use_integral;
      }
      if (payableAmount >= available_predeposit) {//账户积分不足时
        use_integral = available_predeposit;
        payableAmount = payableAmount - use_integral;
      } else {
        //积分充足时
        use_integral = payableAmount;
        payableAmount = 0.00;
      }

      that.setData({
        is_pop_paypwd: is_pop_paypwd,
        is_focus_paypwd: is_focus_paypwd,
        is_integral: true,
      })
    } else {//选中后又取消使用
      payableAmount = payableAmount + use_integral;
      that.setData({
        is_integral: false,
      })
    }
    that.setData({
      use_integral: use_integral,
      payableAmount: payableAmount,
    })

    //使用积分为零时，取消选中积分
    if (use_integral == 0) {
      that.setData({
        is_integral: false,
      })
    }
    var use_balance = that.data.use_balance,//使用余额
      consumeAmount = Number(that.data.consumeAmount).toFixed(2),//消费的金额
      use_balance_number = Number(that.data.use_balance_number).toFixed(2),//页面显示的扣除金额
      available_rc_balance = Number(that.data.memberInfo.available_rc_balance);//可用的余额
    if (use_balance) {
      //账户余额充足
      if (available_rc_balance >= consumeAmount - use_integral) {
        use_balance_number = consumeAmount - use_integral;
      } else {
        use_balance_number = available_rc_balance;
      }
    } else {
      use_balance_number = 0;
    }
    that.setData({
      use_balance_number: use_balance_number,
    })
  },
  // 使用余额付款
  usethebalance: function () {
    var that = this;
    that.setData({
      use_balance: !that.data.use_balance//使用余额付款
    });
    var use_balance = that.data.use_balance,//使用余额
      consumeAmount = Number(that.data.consumeAmount).toFixed(2),//消费的金额
      use_balance_number = Number(that.data.use_balance_number).toFixed(2),//页面显示的扣除金额
      use_integral = Number(that.data.use_integral).toFixed(2),//页面显示的积分余额
      available_rc_balance = Number(that.data.memberInfo.available_rc_balance);//可用的余额

    if (use_balance) {
      //账户余额充足
      if (available_rc_balance >= consumeAmount - use_integral){
        use_balance_number = consumeAmount - use_integral;
      }else{
        use_balance_number = available_rc_balance;
      }
    } else {
      use_balance_number = 0;
    }
    that.setData({
      use_balance_number: use_balance_number,
    })
  },
  //打开选择优惠券页面
  tapOpenCoupon: function () {
    var that = this,
      mycoupon = that.data.mycoupon;
    if (mycoupon) {
      that.setData({
        is_coupon: false,
      })
    } else {
      app.showErrMsg('当前您没有可用的优惠券');
    }
  },
  //关闭选择优惠券
  tapCloseCoupon: function () {
    var that = this;
    that.setData({
      is_coupon: true,
    })
  },
  // 选择优惠券
  radioMyCoupon: function (e) {
    let that = this,
      payableAmount = Number(that.data.payableAmount),//应付的金额
      use_coupon_amount = Number(that.data.use_coupon_amount),
      discountAmount = Number(that.data.discountAmount),//优惠的金额
      opt_coupon = e.detail.value; //选择的优惠券信息
    var _coupon = opt_coupon.split('-');
    if (!judge.judgeNull(opt_coupon)) {
      //已选中优惠券
      that.setData({
        use_coupon_id: _coupon[0],
        use_coupon_amount: _coupon[1],
        discountAmount: discountAmount + Number(_coupon[1]) - use_coupon_amount,
        payableAmount: payableAmount - Number(_coupon[1]) + use_coupon_amount,//应付金额应该减少
      });
    } else {
      //取消优惠券
      that.setData({
        use_coupon_id: 0,
        use_coupon_amount: 0,
        discountAmount: discountAmount - use_coupon_amount,
        payableAmount: payableAmount + use_coupon_amount, //应付金额加回
      });
    }
    //是否 已经选中了使用积分
    if (that.data.is_integral) {
      that.useIntegral();
    }
  },
  //输入支付密码
  inputPaypwd: function (e) { //获取支付密码
    var that = this;
    let pay_password = e.detail.value,
      is_integral = that.data.is_integral, //是否使用积分支付
      pay_pwd = that.data.memberInfo.member_paypwd,
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    //console.log('支付密码pay_pwd：', pay_pwd)
    if (!pay_pwd) {//去设置密码
      app.showErrMsg('您的支付密码还未设置！');
      that.toSetPaypwd();
      return false;
    }
    if (payErrNum > 5) {
      app.showErrMsg('您的支付密码输入错误次数已超过5次，不允许再输入');
      return false;
    }
    that.setData({
      pay_password: pay_password,
      is_integral: is_integral,
    });
    if (pay_password.length == 6) { //密码长度6位时，自动验证钱包支付结果
      that.checkPaypwd();//验证支付密码准确性
    }
  },
  //关闭支付密码的遮罩
  closePaypwd: function () {
    var that = this;
    let is_paypwd = that.data.is_paypwd, //支付密码是否正确
      is_integral = that.data.is_integral, //是否使用积分支付
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    //支付密码不正确或密码次数大于3次 而且又使用了积分支付，关闭支付密码后是需要禁止使用积分支付
    that.setData({
      is_focus_paypwd: false, //失去聚焦支付密码
      is_pop_paypwd: false,//关闭支付框
    })
    if ((!is_paypwd || payErrNum > 3) && is_integral) {
      that.setData({
        is_integral: false, //取消积分支付
      })
      that.useIntegral();//再去触发使用积分的条件
    }
  },
  //验证支付密码
  checkPaypwd: function () {
    var that = this;
    let is_integral = that.data.is_integral, //是否使用积分支付
      use_integral = Number(that.data.use_integral), //使用积分
      payableAmount = Number(that.data.payableAmount), //实际需支付金额
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    if (payErrNum > 3) {
      app.showErrMsg('您的支付密码输入错误次数已超过3次，不允许再输入');
      return false;
    }
    var data = {
      token: app.globalData.token, //必带
      pay_pwd: that.data.pay_password,//支付密码
    };
    util.Ajax("member/check_paypwd", data, function (res) {
      var data = res.datas;
      //console.log('返回验证支付密码的结果:', res);
      if (data.is_check) {
        that.setData({
          is_focus_paypwd: false, //失去聚焦支付密码
          is_pop_paypwd: false,//关闭支付框
          is_paypwd: true, //支付密码正确
        })
        var param = {
          token: app.globalData.token, //必带
          pay_pwd: that.data.pay_password,//支付密码
          store_id: that.data.store_id,
          store_name: that.data.store_name,
          member_id: that.data.member_id,
          is_integral: is_integral ? 1 : 0,//是否勾选使用积分
          rcb_pay: that.data.use_balance ? 1 : 0,//是否勾选使用余额
          use_balance : that.data.use_balance ? that.data.use_balance_number : 0,
          use_integral: that.data.use_integral, //使用积分
          total_price: that.data.consumeAmount, //消费金额
          is_paypwd: that.data.is_paypwd ? 1 : 0,//是否使用支付密码
          pay_price: that.data.payableAmount, //实际需支付金额
          use_coupon_id: that.data.use_coupon_id, //使用的优惠券ID
          use_coupon_amount: that.data.use_coupon_amount, //使用的优惠券金额
          discountAmount: Number(that.data.discountAmount), //优惠的金额
          available_predeposit: Number(that.data.memberInfo.available_predeposit) //可用积分
        };
        console.log(param);
        //return false;
        util.Ajax("member_buy/buy_step", param, function (res) {
          var data = res.datas;
          console.log('返回买单的结果:', res);
          if (data.order_sn) {
            app.showSucMsg(res.sucMsg);
            wx.setStorageSync('order_sn', data.order_sn); //将订单号存入缓存
            if (data.order_state == '20') { //支付成功
              wx.redirectTo({
                url: 'paySuc?order_sn=' + data.order_sn + '&way=' + that.data.cutdata.way
              })
            } else if (data.order_state == '10') { //未支付
              //部分付款或未付款 应该弹出选择支付方式窗口
              wx.redirectTo({
                url: 'toPay?order_sn=' + data.order_sn + '&payableAmount=' + that.data.payableAmount
              })
            } else {
              //支付失败
              wx.redirectTo({
                url: 'payFail?order_sn=' + data.order_sn + "&payableAmount=" + that.data.payableAmount + "&errMsg=" + res.sucMsg
              })
            }
          } else {
            app.showErrMsg("订单创建失败！");
          }
        });
      } else {
        if (payErrNum > 0) {
          app.showErrMsg(res.sucMsg + '您已' + payErrNum + '次输错密码，还有' + (3 - payErrNum) + '机会');
        } else {
          app.showErrMsg(res.sucMsg);
        }
        that.setData({
          use_integral: 0,
          payableAmount: payableAmount + use_integral,
          pay_password: '',
          is_focus_paypwd: true,
          payErrNum: payErrNum + 1,
          is_integral: false,
        });
        that.closePaypwd();//关闭积分支付
  
      }
    });
  },
  //去设置支付密码
  toSetPaypwd: function () {
    var that = this;
    let store_id = that.data.store_id,
      store_name = that.data.store_name,
      is_integral = that.data.is_integral, //是否使用积分支付
      consumeAmount = that.data.consumeAmount,
      noDiscountAmount = that.data.noDiscountAmount;
    wx.navigateTo({
      url: '../../my/setting/setpwd/paypwd?to_from=index-pay-pay&store_id=' + store_id + '&store_name=' + store_name + '&consumeAmount=' + consumeAmount + '&is_integral=' + is_integral + '&noDiscountAmount=' + noDiscountAmount
    });
  },
  //获取支付密码焦点
  setPaypwdFocus: function () {
    var that = this;
    that.setData({
      pay_password: '',
      is_focus_paypwd: true,
    })
  },
  //确定买单
  confirmPay: function (e) {
    var that = this;
    that.setData({
      cutdata : e.currentTarget.dataset,
      forbidden: true //防止重复点击
    })
    let is_integral = that.data.is_integral,//是否勾选使用积分
      // is_paypwd = that.data.is_paypwd,//是否使用支付密码; //可用积分
      use_balance = that.data.use_balance;//是否使用了余额付款
    if (is_integral || use_balance) {
      var that = this;
      that.setData({
        is_pop_paypwd:true,
      })
    }else{
      console.log("微信买单")
      var param = {
        token: app.globalData.token, //必带
        pay_pwd: that.data.pay_password,//支付密码
        store_id: that.data.store_id,
        store_name: that.data.store_name,
        member_id: that.data.member_id,
        is_integral: is_integral ? 1 : 0,//是否勾选使用积分
        rcb_pay: that.data.use_balance ? 1 : 0,//是否勾选使用余额
        use_integral: that.data.use_integral, //使用积分
        total_price: that.data.consumeAmount, //消费金额
        is_paypwd: that.data.is_paypwd ? 1 : 0,//是否使用支付密码
        pay_price: that.data.payableAmount, //实际需支付金额
        use_coupon_id: that.data.use_coupon_id, //使用的优惠券ID
        use_coupon_amount: that.data.use_coupon_amount, //使用的优惠券金额
        discountAmount: Number(that.data.discountAmount), //优惠的金额
        available_predeposit: Number(that.data.memberInfo.available_predeposit) //可用积分
      };
      util.Ajax("member_buy/buy_step", param, function (res) {
        var data = res.datas;
        console.log('返回买单的结果:', res);
        if (data.order_sn) {
          app.showSucMsg(res.sucMsg);
          wx.setStorageSync('order_sn', data.order_sn); //将订单号存入缓存
          if (data.order_state == '20') { //支付成功
            wx.redirectTo({
              url: 'paySuc?order_sn=' + data.order_sn + '&way=' + that.data.cutdata.way
            })
          } else if (data.order_state == '10') { //未支付
            //部分付款或未付款 应该弹出选择支付方式窗口
            wx.redirectTo({
              url: 'toPay?order_sn=' + data.order_sn + '&payableAmount=' + that.data.payableAmount
            })
          } else {
            //支付失败
            wx.redirectTo({
              url: 'payFail?order_sn=' + data.order_sn + "&payableAmount=" + that.data.payableAmount + "&errMsg=" + res.sucMsg
            })
          }
        } else {
          app.showErrMsg("订单创建失败！");
        }
      });
    }
  },
})
