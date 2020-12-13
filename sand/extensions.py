import datetime
from collections import OrderedDict

VERSION = "2020.12.12.1"

class SiteExt:
    def get_version(self):
        return VERSION

    def get_tag_groups(self):
        blog = self.page_reference.get("/blog", [])
        tag_groups = {}
        tags = [(page.data("tags").split(","), page) for route, page in blog if page.data("tags") is not None]
        for tag_list, page in tags:
            for tag in tag_list:
                try:
                    tag_groups[tag].append(page)
                except KeyError:
                    tag_groups[tag] = [page]
        return OrderedDict(sorted([(tag, tag_group) for tag, tag_group in tag_groups.items()], key=lambda t: len(t[1]), reverse=True))

    def get_shortlist(self):
        blog = self.page_reference.get("/blog", [])
        hits = [(r, p) for r, p in blog if not p.data("index_page", False)]
        for r, h in hits:
            if h.data("created") is not None:
                h.created = datetime.datetime.strptime(h.data("created"), '%Y-%m-%d %H:%M:%S')
            else:
                h.created = datetime.datetime.today()
        hits = sorted(hits, key=lambda i: i[1].created, reverse=True)
        return hits[:3]
