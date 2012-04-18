# coding: utf-8
from operator import itemgetter
import tornado.web
import simplejson as json
from basehandler import BaseHandler


class Index(BaseHandler):
    def get(self):
        self.render('mobidataview/index.html')


class DataGrid(BaseHandler):
    def get(self):
        tabname = self.get_argument('tabname','')
        if not tabname:
            raise tornado.web.HTTPError(404)
        from apps.mobidataview.data import DATA
        try:
            table = DATA[tabname.upper()]
        except KeyError:
            raise tornado.web.HTTPError(404)
        if len(table['headers']) != len(table['values'][0]):
            raise tornado.web.HTTPError(404)
        #headers = json.dumps(table['headers'])
        values = json.dumps(convert_table(table['values'], table['headers']))
        self.render('mobidataview/grid.html', headers=table['headers'], values=values)


class TableData(BaseHandler):
    def get(self, tabname):
        start = int(self.get_argument('start', 0)) # validate 
        limit = self.get_argument('limit', None) # validate
        sort = self.get_argument('sort', None)
        sort_dir = self.get_argument('dir', None)
        data_filter = self.get_argument('filter', None)
        if not tabname:
            raise tornado.web.HTTPError(404)
        from apps.mobidataview.data import DATA
        try:
            table = DATA[tabname.upper()]
        except KeyError:
            raise tornado.web.HTTPError(404)
        if len(table['headers']) != len(table['values'][0]):
            raise tornado.web.HTTPError(404)
        values = convert_table(table['values'], table['headers'])
        values = sort_table(values, sort, sort_dir)
        if data_filter:
            data_filter = json.loads(data_filter)[0]
            values = filter_table(values, data_filter['value'])
        if limit:
            values = values[start:start+int(limit)]
        else:
            values = values[start:]
        res = {
            'success': True,
            'values': values,
            'total': len(table['values'])
            }
        self.write(res)


class TableMeta(BaseHandler):
    def get(self, tabname):
        if not tabname:
            raise tornado.web.HTTPError(404)
        from apps.mobidataview.data import DATA
        try:
            table = DATA[tabname.upper()]
        except KeyError:
            raise tornado.web.HTTPError(404)
        if len(table['headers']) != len(table['values'][0]):
            raise tornado.web.HTTPError(404)
        res = {
            'success': True,
            'data': {
                'headers': table['headers'],
                }
            }
        self.write(res)


def convert_table(table, headers):
    """ strips all elements from the table """
    rows = len(table)
    cols = len(table[0])
    result = []
    for i in range(rows):
        row = {}
        row['id'] = 'id_%s' % i 
        for j in range(cols):
            row[headers[j]] = table[i][j].strip()
        result.append(row)
    return result

def sort_table(table, sort, sort_dir):
    if not sort:
        return table
    r = True if sort_dir == 'DESC' else False
    table = sorted(table, key=itemgetter(sort), reverse=r)
    return table

def filter_table(table, value):
    def filter_row(row, value):
        for key in row:
            #import pdb; pdb.set_trace()
            if value in row[key]:
                return True
        return False
    return [r for r in table if filter_row(r, value)]
