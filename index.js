var jsonp = require('jsonp'),
    Config = require('seedit-config'),
    Handlebars = require('handlebarser'),
    baseAPI = Config.getSiteUrl('common') + '/restful/ad',
    sidAPI = baseAPI + '/space.jsonp',
    gidAPI = baseAPI + '/group.jsonp?gid=';

var $ = require('jquery');

var Uuid = require('i-tracker/lib/iuuid');
Uuid.init({
    cookieDomain: Config.getMainDomain()
});
var uuid = Uuid.get();
var defaultTpl = require('./ooxx.tpl');
var eventor = require('eventor');

// @todo 效果选择
// @todo 多图时切换成轮播效果
// render data
var render = exports.render = function(target, data, cb) {
    var $target = document.getElementById(target);
    var sid = $target.getAttribute('data-sid');
    var tpl = defaultTpl;
    // attach sid 
    for (var i = 0; i < data.list.length; i++) {
        data.list[i].sid = sid;
    }
    // check if tpl exists
    var tplTarget = document.getElementById('ooxx-tpl-' + sid);
    if (tplTarget) {
        tpl = tplTarget.innerHTML;
    }
    tpl = filterParams(tpl);
    var html = Handlebars.compile(tpl)(data);
    $target.innerHTML = /<li>/.test(tpl) ? ('<ul id="ooxx-' + sid + '-ul">' + html + '</ul>') : html;
    cb && cb(data, tpl);
};



function ooxx(sids) {
    var _this = this;
    _this.sids = sids;
    _this.fetch(sids);
    _this._on_fetched();
};

eventor.mixTo(ooxx);

ooxx.prototype._on_fetched = function(){
	var _this = this;
    _this.
    on('space_fetched', function(data) {
        render('ooxx-' + data.id, {
            list: data.data,
            space: {
                name: data.space.name
            }
        }, function(datas, tpl) {
            // 图片大于一个变成轮播的
            var target = null;
            var slide = 'div';
            var dots = document.getElementById('ooxx-' + data.id).getAttribute('data-dots') === 'true';
            if (datas.list.length>1) {
                if (/<li>/.test(tpl)) {
                    target = '#ooxx-' + data.id + '-ul';
                    slide = 'li';
                } else if (/ooxx-item/.test(tpl)) {
                    target = '#ooxx-' + data.id;
                    slide = 'div';
                } else {
                    target = '#ooxx-' + data.id;
                    slide = 'a';
                }


                seajs.use('slicker/1.3.14/index', function(Slicker) {
                    new Slicker(target, {
                        slide: slide,
                        autoplay: true,
                        dots: dots,
                        dotsClass: 'slick-dots-wrap',
                        fade: false
                    });
                });
            }
            _this.emit('space_rendered', data.id);
        });
    }).
    on('space_rendered', function(id) {
        document.getElementById('ooxx-' + id).setAttribute('data-rendered', 'true');
    });
    return _this;
};

ooxx.prototype.fetch = function(sids) {
    var _this = this;
    getBySid(sids, function(data, time) {
        _this.emit('space_fetched_time', time);
        for (var i in data) {
            var item = data[i][0];
            var rs = [];
            // 过滤掉联盟广告条目
            for (var j = 0; j < item.space_ad_info.length; j++) {
                if (item.space_ad_info[j]['ad_type'] !== 3) {
                    rs.push(item.space_ad_info[j]);
                }
            }
            _this.emit('space_fetched', {
                id: i.replace('space_', ''),
                data: rs,
                space: {
                    name: item.space_name
                }
            });
        }
    });
};


// 获取所有的sid, 目前只处理空标签，不为空说明为cms输出
// @todo 获取广告后对比替换cms的输出
function getSidByDom(callback) {
    var sids = [];
    $('div[data-sid]').each(function() {
    	if(!$(this).text()){
    		sids.push($(this).data('sid'));
    	}else{
    		// 处理成轮播
    	}
    });
    callback(sids.join('|'));
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


// 根据sid获取广告数据
var getBySid = exports.getBySid = function(sid, callback) {
    var begin = new Date().getTime();
    jsonp(sidAPI, {
        space: sid,
        cookie: uuid
    }, '__c', function(data) {
        var length = new Date().getTime() - begin;
        callback && callback(data.data, length);
    });
};


module.exports = ooxx;
module.exports.render = function() {
    getSidByDom(function(sids) {
        return new ooxx(sids);
    });
};