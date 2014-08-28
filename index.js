var jsonp = require('jsonp'),
    Config = require('seedit-config'),
    Handlebars = require('handlebarser'),
    baseAPI = Config.getSiteUrl('ad') + '/restful/cast',
    sidAPI = baseAPI + '/space.jsonp',
    gidAPI = baseAPI + '/group.jsonp?gid=';

// get by sid
var getBySid = exports.getBySid = function(sid, callback) {
    console.log(sidAPI + sid);
    jsonp(sidAPI, {
        space_id: sid
    }, '__c', function(data) {
        callback && callback(data);
    });
};

// get by gid
var getByGid = exports.getByGid = function(gid) {

};

// auto run
var init = exports.render = function(target) {
    var $target = document.getElementById(target);
    var sid = $target.getAttribute('data-sid');
    var tpl = document.getElementById('ooxx-tpl-' + sid).innerHTML;
    getBySid(sid, function(data) {
        console.log(data);
        var html = Handlebars.compile(tpl)(data.data[0]);
        console.log(html);
        $target.innerHTML = html;
    });
};