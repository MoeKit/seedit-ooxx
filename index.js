var jsonp = require('jsonp'),
    Config = require('seedit-config'),
    Handlebars = require('handlebarser'),
    baseAPI = Config.getSiteUrl('common') + '/restful/ad',
    sidAPI = baseAPI + '/space.jsonp',
    gidAPI = baseAPI + '/group.jsonp?gid=';

var eventor = require('eventor');

// @todo 效果选择
// @todo 多图时切换成轮播效果

// fetching data
var getBySid = exports.getBySid = function(sid, callback) {
    var begin = new Date().getTime();
    jsonp(sidAPI, {
        space: sid
    }, '__c', function(data) {
        var length = new Date().getTime() - begin;
        callback && callback(data.data, length);
    });
};


// render data
var render = exports.render = function(target, data, cb) {
    var $target = document.getElementById(target);
    var sid = $target.getAttribute('data-sid');
    var tpl = document.getElementById('ooxx-tpl-' + sid).innerHTML;
    tpl = filterParams(tpl);
    var html = Handlebars.compile(tpl)(data);
    $target.innerHTML = html;
    cb && cb();
};

// 变换参数名，在模板中隐藏 ad_的前缀
function filterParams(tpl) {
    var arrays = ['id', 'adm_id', 'name', 'type', 'content', 'link', 'expand'];
    for (var i = 0; i < arrays.length; i++) {
        var item = arrays[i];
        tpl = tpl.replace(new RegExp('{{' + item, 'g'), '{{ad_' + item);
    }
    return tpl;
};

function ooxx(sids) {
    var _this = this;
    _this.sids = sids;
    _this.fetch(sids);
    _this.
    on('space_fetched', function(data) {
        render('ooxx-' + data.id, {
            list: data.data,
            space: {
                name: data.space.name
            }
        }, function() {
            _this.emit('space_rendered', data.id);
        });
    }).
    on('space_rendered', function(id) {
        document.getElementById('ooxx-' + id).setAttribute('data-rendered', 'true');
    });
};

eventor.mixTo(ooxx);

ooxx.prototype.fetch = function(sids) {
    var _this = this;
    getBySid(sids, function(data, time) {
        _this.emit('space_fetched_time', time);
        for (var i in data) {
            var item = data[i][0];
            _this.emit('space_fetched', {
                id: i.replace('space_', ''),
                data: item.space_ad_info,
                space: {
                    name: item.space_name
                }
            });
        }
    });
};

function getSidByDom(callback) {
    var sids = [];
    seajs.use('jquery', function($) {
        $('div[data-sid]').each(function() {
            sids.push($(this).data('sid'));
        });
        callback(sids.join('|'));
    });
};

module.exports = ooxx;
module.exports.render = function() {
    getSidByDom(function(sids) {
        return new ooxx(sids);
    });
};