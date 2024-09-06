title: Brain Fillers 
template: page.html
sub_title: Brain Fillers
index_page: True
jinja_pass: True
rss: false


# Brain Fillers

<div class="tag-group-collection">
    {% set tag_groups = HWC.TAG_GROUPS %}
    {% for tag in tag_groups.keys() %}
        <div class="tag-group {{ tag }}">
            <div class="tag-group-inner">
                <div class="tag-title {{ tag }}">{{ tag }}</div>
                <ul>
                    {% for page in tag_groups[tag] %}
                        <li><a href="{{ page.target_url }}">{{ page.data("sub_title") }}</a></li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    {% endfor %}
</div>