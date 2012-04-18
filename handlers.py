#coding: utf-8
from basehandler import BaseHandler
from models import Shipment
import datetime
import logging

class Index(BaseHandler):
    def get(self):
        self.render('index.html')

class Heuristic(BaseHandler):
    def get(self):
        self.render('heuristic.html')
                
class GoogleMap(BaseHandler):
    def get(self):
        self.render('map.html')

class SapMobileDemo(BaseHandler):
    def get(self):
        self.render('sapmobile/sapmobiledemo.html')
        
class SapMobile(BaseHandler):
    def get(self):
        self.render('sapmobile/sapmobile.html')

class SapMobileList(BaseHandler):
    def get(self):
        loaddate = self.get_argument('date','')
        ldate = datetime.date(*map(int, loaddate.split('-')))
        loadstatus = self.get_argument('status','')
        shipment_query = Shipment.all().filter('dplbg =', ldate)
        if loadstatus:
            shipment_query = shipment_query.filter('sttrg =', loadstatus)
        self.set_header('Content-Type', 'text/xml')
        self.render('sapmobile/list.xml', shipments=shipment_query.fetch(1000))

class SapMobileAction(BaseHandler):
    def get(self):
        mode = self.get_argument('mode','')
        sid = self.get_argument('sid','')
        logging.info('mode %s sid %s' % (mode, sid))
        if mode and sid:
            shipment = Shipment.all().filter('tknum =', sid).get()
            if mode == 'streg':
                return self.set_shipment_status(shipment, 'streg', 'dareg', 'uareg')
            elif mode == 'stlbg':
                return self.set_shipment_status(shipment, 'stlbg', 'dalbg', 'ualbg')
            elif mode == 'stlad':
                return self.set_shipment_status(shipment, 'stlad', 'dalen', 'ualen')
            elif mode == 'stabf':
                return self.set_shipment_status(shipment, 'stabf', 'dtabf', 'uzabf')
            elif mode == 'sttbg':
                return self.set_shipment_status(shipment, 'sttbg', 'datbg', 'uatbg')
            elif mode == 'stten':
                return self.set_shipment_status(shipment, 'stten', 'daten', 'uaten')

    def set_shipment_status(self, shipment, status_field, date_field, time_field):
        if getattr(shipment, status_field) == 'X':
            setattr(shipment, status_field, '')
            setattr(shipment, date_field, None)
            setattr(shipment, time_field, None)
            logging.info('shipment %s %s' % (date_field, getattr(shipment, date_field)))
            shipment.put()
        else:
            now = datetime.datetime.now()
            setattr(shipment, status_field, 'X')
            setattr(shipment, date_field, now.date())
            setattr(shipment, time_field, now.time())
            logging.info('shipment %s %s' % (date_field, getattr(shipment, date_field)))
            shipment.put()
        self.set_header('Content-Type', 'text/xml')
        self.render('sapmobile/detail.xml', shipment=shipment)


class SapMobileLog(BaseHandler):
    def post(self):
        sid = self.get_argument('sid','')
        shipment = Shipment.all().filter('tknum =', sid).get()
        logtext = self.get_argument('logtext','')
        if logtext:
            shipment.textlog += '\n' + logtext
            shipment.put()
        self.set_header('Content-Type', 'text/xml')
        self.render('sapmobile/detail.xml', shipment=shipment)


class SapMobileLoad(BaseHandler):
    def get(self):
        import data
        data.load_data()
        self.write("load ok")

# ---- F4 widget ----

class SearchHelpFields(BaseHandler):
    def get(self):
        shname = self.get_argument('sh','')
        if shname == 'sh_tknum':
            fields = (
                ('route', 'text', 'Route'),
                ('tplst', 'text', 'Planning Point'),
            )
        elif shname == 'sh_vsbed':
            fields = (
                ('vkorg', 'text', 'Sales Org.'),
                ('vtweg', 'text', 'Dist. Channel'),
            )            
        self.set_header('Content-Type', 'text/xml')
        self.render('sapmobile/searchhelpfields.xml', fields=fields)


class SearchHelpList(BaseHandler):
    def get(self):
        logging.info(self.get_argument('route','____'))
        logging.info(self.get_argument('sh','____'))
        if len(self.request.arguments) > 1: #sh
            fields = (
                    ('tknum', 'int', 'TKNUM'),
                    ('route', 'text', 'Route'),
                    ('tplst', 'text', 'Planning Point'),
                )
            results = (
                      { 'tknum': 1, 'route': 'Route 1', 'tplst': 'Point 1' },
                      { 'tknum': 2, 'route': 'Route 2', 'tplst': 'Point 2' },
                      { 'tknum': 3, 'route': 'Route 3', 'tplst': 'Point 3' },
                      { 'tknum': 4, 'route': 'Route 4', 'tplst': 'Point 4' },
                      )
        else:
            fields = results = ()
        self.set_header('Content-Type', 'text/xml')
        self.render('sapmobile/searchhelplist.xml', results=results, fields=fields)

# ---- testes ----
class CalculatorUI(BaseHandler):
    def get(self):
        self.render('tests/calculator.html')


class YouTubeURL(BaseHandler):
    def get(self):
        res = None
        if len(self.request.arguments) > 0:
            yturl = self.get_argument('yturl','')
            from urlparse import urlparse
            from cgi import parse_qs
            parts = urlparse(yturl)
            if parts[2].startswith('/embed/'):
                vid = parts[2][7:]
            else:
                qs = parts[4]
                vid = parse_qs(qs).get('v', '???')[0]
            from google.appengine.api import urlfetch
            url = "http://gdata.youtube.com/feeds/api/videos/%s?alt=json" % vid
            result = urlfetch.fetch(url=url)
            if result.status_code == 200:
                from django.utils import simplejson as json
                obj = json.loads(result.content)
                res = obj['entry']['media$group']
                content = res['media$content']
                ##1   URL de transmissão RTSP para reprodução de vídeos em celulares. Vídeo H.263 (até 176 x 144) e áudio AMR.
                ##5   URL HTTP para o player incorporável (SWF) do vídeo. Esse formato não está disponível para um vídeo que não pode ser incorporado. Os desenvolvedores geralmente adicionam &format=5 às suas consultas para restringir os resultados aos vídeos que podem ser incorporados aos seus respectivos sites.
                ##6   URL de transmissão RTSP para reprodução de vídeos em celulares. Vídeo MPEG-4 SP (até 176 x 144) e áudio AAC.
                FORMATS = {
                        1: u'3gpp - H.263/AMR',
                        5: u'SWF',
                        6: u'3gpp - MPEG-4 SP/AAC'
                    }
                video_formats = [{'url': v['url'], 'format': FORMATS[v['yt$format']]} for v in content]
                thumbnails = res["media$thumbnail"]
        self.render('tests/youtubeurl.html', vid=video_formats, thumbs=thumbnails)
