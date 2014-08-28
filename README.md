# JS使用文档及约定 [![spm version](http://spmjs.io/badge/seedit-ooxx)](http://spmjs.io/package/seedit-ooxx)

---


## Usage
一般情况不需要手动加载模块，PC站的common.min.js会自动调用。

```js
var seeditOoxx = require('seedit-ooxx');
// use seeditOoxx
```

## HTML约定

```html
<div data-sid="2" data-gid=""></div>
```

+ ***data-sid*** 广告位id
+ ***data-gid*** 广告位分组id
+ ***data-easing***  缓动效果
+ ***data-placeholder*** 占位广告sid，当没有广告时使用这个

## 广告模板约定

```html
 <script type="seedit/template" id="ooxx-tpl-{{sid}}">
    {{#each ad_show_info}}
    <li class="ooxx-item-wrap">
        <div class="ooxx-item" style="display:block;background:url({{ad_content}}) top center no-repeat">
            <a href="{{ad_link}}" target="_blank" style="display:block;width:100%;height:250px;">&nbsp;</a>
        </div>
    </li>
    {{/each}}
</script>
```

+ type固定为`seedit/template`,id为`ooxx-tpl-{{sid}}`,{{sid}}替换成当成广告位id
+ data-track统计`不需要`加，加了也会被覆盖
+ ?from 参数`不需要`加，加了也会被覆盖

## 后台广告位约定

### 扩展字段

+ 命名为驼峰式，如`backgroundColor`,因为中划线形式会在handlebars模板中出错，不能用`.`来获取属性值