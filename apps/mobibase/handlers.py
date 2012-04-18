import mimetypes
from basehandler import BaseHandler


class StaticHandler(BaseHandler):
    def initialize(self, filename):
        super(StaticHandler, self).initialize()
        self.filename = filename
        
    def get(self):
        mt, enc = mimetypes.guess_type(self.filename)
        if mt:
            self.set_header('Content-Type', mt)
        self.render(self.filename)