page_title: headwillcollapse.net
template: index.html
extended_classes: homepage
homepage: true

# Welcome

This site is a repository of things [@fatconan](https://twitter.com/fatconan) desperately jams into his head in an effort to 
keep it from collapsing. It's partially successfully in that his mind hasn't yet fully deflated. He hopes that others in similar 
situations to his, whose minds are equally leaky, find something here to help counter the loss.

## The latest 3 brain fillers
<nav class="inline">
    <ul>
    {% for page_path, page in GLOBALS["site"].page_reference.get("/blog", []) %}
        <li><a href="{{ page.target_url }}">{{ page.data.get("sub_title", "Unknown") }}</a></li>
    {% endfor %}
    </ul>
</nav>