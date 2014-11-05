# Demo

---

## Normal usage

````html
 <script type="seedit/template" id="ooxx-tpl-70">
 <ul>
    {{#each list}}
    <li class="ooxx-item-wrap" style="display:block;background-color:{{expand.backgroundColor}}">
        <div class="ooxx-item" style="display:block;background:url({{content}}) top center no-repeat">
            <a href="{{link}}" target="_blank"
                       data-track="OOXX/顶部通栏/{{name}}" style="display:block;width:100%;height:250px;">&nbsp;</a>
        </div>
    </li>
    {{/each}}
</ul>
</script>

<div data-sid="70" id="ooxx-70" data-page="" data-block="" data-effect="slide" class="ooxx-loading"></div>


````

````javascript
seajs.use('index', function(seeditOoxx) {
    var ooxx = new seeditOoxx('70')
    ooxx.
    on('space_fetched',function(data){
    	// 单个广告位数据
    	// 多次触发
    }).
    on('space_fetched_time',function(time){
    	// 获取到了时间，用于性能监控
    	// 触发一次
    	console.log(time);
    });
});
````
