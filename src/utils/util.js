let util = {

};
util.title = function (title) {
    title = title ? title : 'erp';
    window.document.title = title;
};
util.permission = function (permission) {
   	sessionStorage.setItem('permission',permission);
};

// 测试域名
util.apiUrl = 'http://api_dev.yilianerptest.com/api/';

export default util;