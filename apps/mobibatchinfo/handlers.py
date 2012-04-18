import random
import datetime
import tornado.escape
from google.appengine.ext import db
from basehandler import BaseHandler

class Batch(db.Model):
    matnr = db.StringProperty()
    werks = db.StringProperty()
    lgort = db.StringProperty()
    charg = db.StringProperty()
    laeda = db.StringProperty()
    aenam = db.StringProperty()
    sperc = db.StringProperty()
    clabs = db.StringProperty()
    cumlm = db.StringProperty()
    cinsm = db.StringProperty()
    cspem = db.StringProperty()
    meins = db.StringProperty()
    
    def get_fields(self):
        res = []
        for key, prop in self.properties().iteritems():
            value = getattr(self, key)
            res.append((key,value))
        return res

def create_batch(werks, charg):
    today = datetime.date.today()
    batch = Batch()
    batch.werks = werks
    batch.charg = charg
    batch.matnr = "%s%s" % (random.choice(['P-','M','SP']), random.randrange(101,999))
    batch.lgort = str(random.randrange(100,300)*10)
    batch.laeda = "%s%s%s" % (today.year, today.month, today.day)
    batch.aenam = "PL"
    batch.sperc = ""
    batch.clabs = str(random.randrange(0,300))
    batch.cumlm = "0"
    batch.cinsm = "0"
    batch.cspem = "0"
    batch.meins = random.choice(['KG','L','M','UN'])
    batch.put()
    return batch

class Index(BaseHandler):
    def get(self):
        self.render('mobibatchinfo/index.html')

class BatchInfo(BaseHandler):
    def get(self):
        werks = self.get_argument('werks','')
        charg = self.get_argument('charg','')
        format = self.get_argument('format','xml')
        if werks and charg:
            mchb = Batch.all().filter('werks =', werks).filter('charg =', charg).get()
            if not mchb:
                mchb = create_batch(werks, charg)
        if format == 'json':
            res = dict(mchb.get_fields())
            self.set_header('Content-Type', 'application/json')
            self.write(tornado.escape.json_encode(res))
        else:
            self.set_header('Content-Type', 'text/xml')
            self.render('mobibatchinfo/batchinfo.xml', mchb=mchb)

class ChangeStatus(BaseHandler):
    def post(self):
        errors = []
        werks = self.get_argument('werks','')
        charg = self.get_argument('charg','')
        status = self.get_argument('status','')
        format = self.get_argument('format','xml')
        batch = Batch.all().filter('werks =', werks).filter('charg =', charg).get()
        if batch:
            if status == 'B':
                batch.cspem = batch.clabs
                batch.clabs = "0"
            elif status == 'U':
                batch.clabs = batch.cspem
                batch.cspem = "0"
            batch.put()
            if format == 'json':
                self.set_header('Content-Type', 'application/json')
                self.write(tornado.escape.json_encode(dict(batch.get_fields())))
            else:
                self.set_header('Content-Type', 'text/xml')
                self.render('mobibatchinfo/batchinfo.xml', mchb=batch)
        else:
            errors.append('Batch not found')
            self.render('mobibatchinfo/changestatus.xml', errors=errors)

