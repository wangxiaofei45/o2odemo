let util = {

};
util.title = function (title) {
    title = title ? title : 'erp';
    window.document.title = title;
};
util.apiUrl = 'http://erp_panda.hzlwo.com/api';
export default util;