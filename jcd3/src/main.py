import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util

from server_.rpc_handler import RPCHandler


class MainPage(webapp.RequestHandler):
    """ Renders the main template."""
    def get(self):
        template_values = { 'title':'AJAX Add (via GET)', }
        path = os.path.join(os.path.dirname(__file__), "interface/index.html")
        self.response.out.write(template.render(path, template_values))
        
        
def main():
    app = webapp.WSGIApplication([
        ('/', MainPage)
        ,('/rpc', RPCHandler),
        ], debug=True)
    util.run_wsgi_app(app)

if __name__ == '__main__':
    main()
    
