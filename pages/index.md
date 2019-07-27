page_title: If there's nothing in it
template: index.html
extended_classes: homepage
homepage: true
jinja_pass: True

# Welcome

This site is a repository of things [@fatconan](https://twitter.com/fatconan) desperately jams into his head in an effort to 
keep it from collapsing in on itself like a sad soufflé. It's at least partially successfully in that his mind hasn't yet 
fully deflated. He hopes that others in similar situations to his, whose minds are equally leaky, find something here to help counter the loss.

FatConan is usually somewhat of an anode insofar as he spews a lot of negativity, but this site is a negativity-free zone
in his otherwise miserable, contrarian existence. Everything here is here because he genuinely loves them, and he hopes that
whomever reads this discovers they love them too. 

## The latest 3 brain fillers
<nav class="inline">
    <ul>
    {% for page_path, page in GLOBALS["site"].get_shortlist() %}
        <li><a href="{{ page.target_url }}">{{ page.data("sub_title", "Unknown") }}</a></li>
    {% endfor %}
    </ul>
</nav>