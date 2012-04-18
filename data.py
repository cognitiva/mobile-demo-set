import datetime
from models import Shipment

def makedate(d):
    return datetime.date(*map(int, d.split('-')))

def maketime(t):
    return datetime.time(*map(int, t.split(':')))

SHIPMENTS = (
{"ualbg": None, "stlbg": "", "streg": "", "tdlnr": "SL2468", "stabf": "", "bezei": "Eastern Route", 
"erdat": makedate("2011-11-10"), "stten": "", "uplbg": maketime("12:06:31"), "vsbed": "", "dalen": None, "datbg": None, 
"ernam": "ANSELMANNA", "uatbg": None, "uzabf": None, "vsart": "03", "stlad": "", "uaten": None, 
"textlog": "", "tplst": "SL31", "shtyp": "ZSL5", "sttbg": "", "tknum": "1214", "uareg": None, 
"name1": "Rail Trans Inc.", "ualen": None, "sttrg": "3", "dtabf": None, "route": "000003", "dalbg": None, 
"dareg": None, "dplbg": makedate("2011-11-10"), "daten": None},

{"ualbg": None, "stlbg": "", "streg": "", "tdlnr": "SP33001", "stabf": "", "bezei": "Berlin - Hamburg", 
"erdat": makedate("2011-11-10"), "stten": "", "uplbg": maketime("12:20:45"), "vsbed": "01", "dalen": None, "datbg": None, 
"ernam": "SCHULZET", "uatbg": None, "uzabf": None, "vsart": "03", "stlad": "", "uaten": None, 
"textlog": "", "tplst": "1000", "shtyp": "0002", "sttbg": "", "tknum": "1194", "uareg": None, 
"name1": "Italian Freight Company", "ualen": None, "sttrg": "2", "dtabf": None, "route": "R00050", 
"dalbg": None, "dareg": None, "dplbg": makedate("2011-11-10"), "daten": None},

{"ualbg": None, "stlbg": "", "streg": "", "tdlnr": "SL2468", "stabf": "", "bezei": "Eastern Route", 
"erdat": makedate("2011-11-10"), "stten": "", "uplbg": maketime("12:21:51"), "vsbed": "01", "dalen": None, "datbg": None, 
"ernam": "PEDERSENJ", "uatbg": None, "uzabf": None, "vsart": "01", "stlad": "", "uaten": None, 
"textlog": "", "tplst": "SL31", "shtyp": "ZSL5", "sttbg": "", "tknum": "1205", "uareg": None, 
"name1": "Rail Trans Inc.", "ualen": None, "sttrg": "2", "dtabf": None, "route": "000003", 
"dalbg": None, "dareg": None, "dplbg": makedate("2011-11-10"), "daten": None},

{"ualbg": None, "stlbg": "", "streg": "", "tdlnr": "SL5678", "stabf": "", "bezei": "Bev Northern Route", 
"erdat": makedate("2011-11-10"), "stten": "", "uplbg": maketime("12:22:45"), "vsbed": "01", "dalen": None, "datbg": None, 
"ernam": "PEDERSENJ", "uatbg": None, "uzabf": None, "vsart": "01", "stlad": "", "uaten": None, 
"textlog": "", "tplst": "CPB1", "shtyp": "CPB1", "sttbg": "", "tknum": "1164", "uareg": None, 
"name1": "Atlantic Trucking Inc.", "ualen": None, "sttrg": "2", "dtabf": None, "route": "CPB100", 
"dalbg": None, "dareg": None, "dplbg": makedate("2011-11-10"), "daten": None},
)

def load_data():
    for shipd in SHIPMENTS:
        s = Shipment()
        for key in shipd.keys():
            setattr(s, key, shipd[key])
        s.put()