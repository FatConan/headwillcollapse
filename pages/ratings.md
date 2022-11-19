page_title: Nonsensical Arbitrary Scoring System 
template: page.html
sub_title: Nonsensical Arbitrary Scoring System 
created: 2019-07-24 00:00:00
jinja_pass: True

# Nonsensical Arbitrary Scoring System 

Here at HeadWillCollapse we've learned that you're not supposed to put out any game review
without some sort of accompanying objective rating system. We've therefore implemented the 
N.A.S.S. a clever algorithm that can process the sentiment of text and condense it down into
a single, encapsulating noun.

As an example, running this page through our sophisticated rating process produces:

<div>
    {% with rating_class="COW_FARTS", rating="COW FARTS", blurb="This is Cow Farts... Utter Cow Farts... Udder Cow Farts." %}
        {% include "snippets/nass.html" %}
    {% endwith %}
</div>