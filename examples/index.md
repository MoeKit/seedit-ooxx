# Demo

---

## Normal usage

````html
 <script type="seedit/template" id="ooxx-tpl-2">
 <ul>
    {{#each ad_show_info}}
    <li class="ooxx-item-wrap" style="display:block;background-color:{{ad_expand.backgroundColor}}">
        <div class="ooxx-item" style="display:block;background:url({{ad_content}}) top center no-repeat">
            <a href="{{ad_link}}" target="_blank"
                       data-track="OOXX/顶部通栏/{{ad_name}}" style="display:block;width:100%;height:250px;">&nbsp;</a>
        </div>
    </li>
    {{/each}}
</ul>
</script>

<div data-sid="2" id="ooxx-2"></div>


````

````javascript
seajs.use('index', function(seeditOoxx) {
    seeditOoxx.render('ooxx-2');
});
````
