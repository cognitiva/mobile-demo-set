from basehandler import BaseHandler

class Index(BaseHandler):
    def get(self):
        self.render('mobilauncher/index.html')