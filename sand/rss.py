import rfeed
import datetime

class Plugin:
    def get_blog_pages(self):
        blog = [(r, p) for r, p in self.site.page_reference.get("/blog", []) if not p.data("index_page", False)]
        blog.sort(key=lambda x: x[1].data("created"))
        blog_items = []
        for route, page in blog:
            item = rfeed.Item(
                title = page.data("title"),
                link = "https://headwillcollapse.net/blog/%s" % (route, ),
                description = page.data("sub_title"),
                pubDate = datetime.datetime.strptime(page.data("created"), '%Y-%m-%d %H:%M:%S'),
                guid =  rfeed.Guid("https://headwillcollapse.net/blog/%s" % (route, ))
            )
            blog_items.append(item)

        feed = rfeed.Feed(
            title = "HeadWillCollapse.net RSS Feed",
            link = "https://headwillcollapse.net/rss.xml",
            description = "HeadWillCollapse blog entry RSS feed.",
            language = "en-US",
            lastBuildDate = datetime.datetime.now(),
            items = blog_items,
        )
        return feed.rss()

    def configure(self, site_data, site):
        self.site = site

    #Called during the parsing phase of the processing
    def parse(self, site_data, site):
        rss_content = self.get_blog_pages()
        out_path = "./rss.xml"
        page_dict = {'source': None, 'target': out_path}
        page_dict["config"] = {
            "jinja_pass": False,
            "is_index": False,
            "static_content": rss_content
        }
        page = self.site.add_page(page_dict)


    def add_render_context(self, page, environment, data):
        data["RSS"] = self
