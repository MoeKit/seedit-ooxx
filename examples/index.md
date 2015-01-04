# Demo

---

## Normal usage

````html
<link rel="stylesheet" href="../slicker/1.3.14/slick/slick.css">
 <script type="seedit/template" id="ooxx-tpl-70">
 <ul>
    {{#each list}}
    <li class="ooxx-item-wrap" style="display:block;background-color:{{expand.backgroundColor}}">
        <div class="ooxx-item" style="display:block;background:url({{content}}) top center no-repeat">
            <a href="{{link}}" target="_blank"
                       data-track="OOXX/{{../space.name}}/{{name}}" style="display:block;width:100%;height:250px;">&nbsp;</a>
        </div>
    </li>
    {{/each}}
</ul>
</script>

<h3>轮播</h3>

<div data-sid="70" id="ooxx-70" data-page="" data-block="" data-effect="slide" class="ooxx-loading" data-rendered="false"></div>

<h3>贴间通栏</h3>

<div data-sid="62" id="ooxx-62" data-page="" data-block="" data-effect="slide" class="ooxx-loading" data-rendered="false" style="width:680px;height:90px;"></div>
<script type="seedit/template" id="ooxx-tpl-62">
{{#each list}}
    <a href="{{link}}" target="_blank" data-track="OOXX/{{../space.name}}/{{name}}" draggable="true">
        <img src="{{content}}">
    </a>
{{/each}}
</script>

````

````javascript
seajs.use('index', function(seeditOoxx) {
var ooxx = seeditOoxx.render();
   /** var ooxx = new seeditOoxx('70|62');
   ooxx.
   on('space_fetched',function(data){
       // 单个广告位数据
       // 多次触发
   }).
   on('space_fetched_time',function(time){
       // 获取到了时间，用于性能监控
       // 触发一次
       console.log(time);
   }).
   on('all',function(a,b,c){
   console.log(a,b,c);
   }); **/
});
````
