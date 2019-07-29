import datetime

class SiteExt:
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
        return tag_groups

    def get_shortlist(self):
        blog = self.page_reference.get("/blog", [])
        hits = [(r, p) for r, p in blog if not p.data("index_page", False)]
        hits = sorted(hits, key=lambda i: datetime.datetime.strptime(i[1].data("created"), '%Y-%m-%d %H:%M:%S'), reverse=True)
        return hits[:3]
