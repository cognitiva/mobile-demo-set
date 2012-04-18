# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, 'lib')
import os
import tornado.web
import tornado.wsgi
import wsgiref.handlers
from apps.mobibatchinfo import handlers as batchinfohandlers
from apps.mobilauncher import handlers as launcherhandlers
from apps.mobibase import handlers as basehandlers
from apps.mobidataview import handlers as dataviewhandlers

settings = {
    'system_version': 1,                  #used to expire cache of static files
    'site_title': u'Demo zone',
    'xsrf_cookies': False,
    'cookie_secret': '61fErzKYQAGhdFuYh7Eq432415asCxXP1ojKo=',
    'template_path': os.path.join(os.path.dirname(__file__), 'templates'),
    'debug': os.environ.get('SERVER_SOFTWARE', '').startswith('Development/'),
}

application = tornado.wsgi.WSGIApplication([
  #mobile base
  (r'/sap/bc/bsp/sap/ymwbase/barcodescanner.js', basehandlers.StaticHandler, dict(filename='mobibase/barcodescanner.js')),
  (r'/sap/bc/bsp/sap/ymwbase/cordova.js', basehandlers.StaticHandler, dict(filename='mobibase/cordova.js')),
  #mobile launcher
  (r'/sap/bc/bsp/sap/ymwlauncher/index.do', launcherhandlers.Index),
  #mobile batchinfo
  (r'/sap/bc/bsp/sap/ymwbatchinfo/index.html', batchinfohandlers.Index),
  (r'/sap/bc/bsp/sap/ymwbatchinfo/batchinfo.do', batchinfohandlers.BatchInfo),
  (r'/sap/bc/bsp/sap/ymwbatchinfo/changestatus.do', batchinfohandlers.ChangeStatus),
  (r'/sap/bc/bsp/sap/ymwbatchinfo/batchinfo.js', basehandlers.StaticHandler, dict(filename='mobibatchinfo/batchinfo.js')),
  #mobile dataview
  (r'/sap/bc/bsp/sap/ymwdataview/index.html', dataviewhandlers.Index),
  (r'/sap/bc/bsp/sap/ymwdataview/grid.html', dataviewhandlers.DataGrid),
  #### mobile Sencha Touch #####
  # DEV:
  # /static/stweaver/index.html   <- launcher
  # /static/stw_batchinfo/index.html  <- batch info
  # /static/dataview/index.html  <- data view
  # PROD:
  # /static/stweaver/build/production/index.html   <- launcher
  # /static/stw_batchinfo/build/production/index.html  <- batch info
  (r'/sap/bc/bsp/sap/ymwdataview/table/([a-zA-Z0-9]+)/meta', dataviewhandlers.TableMeta),
  (r'/sap/bc/bsp/sap/ymwdataview/table/([a-zA-Z0-9]+)', dataviewhandlers.TableData),
], **settings)


def main():
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()