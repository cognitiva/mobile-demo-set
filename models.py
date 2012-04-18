from google.appengine.ext import db

class Shipment(db.Model):
    tknum = db.StringProperty(verbose_name="Shipment Number")
    shtyp = db.StringProperty(verbose_name="Shipment type")
    tplst = db.StringProperty(verbose_name="Transportation planning point")
    ernam = db.StringProperty(verbose_name="Name of Person who Created the Object")
    erdat = db.DateProperty(verbose_name="Date on Which Record Was Created")
    vsart = db.StringProperty(verbose_name="Shipping type")
    vsbed = db.StringProperty(verbose_name="Shipping Conditions")
    route = db.StringProperty(verbose_name="Shipping Route")
    bezei = db.StringProperty(verbose_name="Description of Route")
    sttrg = db.StringProperty(verbose_name="Overall transportation status")
    tdlnr = db.StringProperty(verbose_name="Number of forwarding agent")
    name1 = db.StringProperty(verbose_name="Name of forwarding agent")
    dplbg = db.DateProperty(verbose_name="Planned date for start of loading")
    uplbg = db.TimeProperty(verbose_name="Planned loading start time")
    streg = db.StringProperty(verbose_name="Status of check-in")
    dareg = db.DateProperty(verbose_name="Actual date of check-in")
    uareg = db.TimeProperty(verbose_name="Current time of check-in")
    stlbg = db.StringProperty(verbose_name="Status for start of loading")
    dalbg = db.DateProperty(verbose_name="Current date for start of loading")
    ualbg = db.TimeProperty(verbose_name="Actual loading start time")
    stlad = db.StringProperty(verbose_name="Status for end of loading")
    dalen = db.DateProperty(verbose_name="Actual date for end of loading")
    ualen = db.TimeProperty(verbose_name="Actual loading end time")
    stabf = db.StringProperty(verbose_name="Status of shipment completion")
    dtabf = db.DateProperty(verbose_name="Current date of shipment completion")
    uzabf = db.TimeProperty(verbose_name="Time of transportation processing")
    sttbg = db.StringProperty(verbose_name="Status for start of shipment")
    datbg = db.DateProperty(verbose_name="Current date for start of shipment")
    uatbg = db.TimeProperty(verbose_name="Actual transport start time")
    stten = db.StringProperty(verbose_name="Status for end of shipment")
    daten = db.DateProperty(verbose_name="Actual Date for End of Shipment")
    uaten = db.TimeProperty(verbose_name="Actual shipment end time")
    textlog = db.TextProperty(verbose_name="Shipment Log")

    def get_list_fields(self):
        list_fields = ['tknum','tplst','sttrg','tdlnr','route','bezei','name1','dplbg','uplbg','textlog',
                       'streg','dareg','uareg','stlbg','dalbg','ualbg','stlad','dalen','ualen',
                       'stabf','dtabf','uzabf','sttbg','datbg','uatbg','stten','daten','uaten']
        return [ (field, getattr(self, field)) for field in list_fields ]

    def get_fields(self):
        return [ (field.name, getattr(self, field.name)) for field in self._meta.fields if field.get_internal_type() != 'AutoField']

    def __str__(self):
        return self.tknum