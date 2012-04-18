# -*- coding: utf-8 -*-
import os
import logging
import tornado.web
from google.appengine.api import memcache


class BaseHandler(tornado.web.RequestHandler):
    
    def flash(self, msg):
        self.set_secure_cookie('flash_msg', msg.encode('UTF-8'))

    def get_ip(self):
        if 'X-Real-IP' in self.request.headers:
            return self.request.headers['X-Real-IP']
        elif self.request.headers.has_key('REMOTE_ADDR'):
            return self.request.headers.get('REMOTE_ADDR')
        else:
            return os.environ.get('REMOTE_ADDR','')

    def get_flash(self):
        msg = self.get_secure_cookie("flash_msg")
        self.set_secure_cookie('flash_msg', '')
        return msg
                    
    def render_string(self, template_name, **values):
        template_values = {
            'flash': self.get_flash(),
        }
        template_values.update(values)
        return tornado.web.RequestHandler.render_string(self, template_name, **template_values)
