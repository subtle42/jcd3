from google.appengine.ext import db

from google.appengine.ext.db import Query

class Resume(db.Model):
    xml_data = db.BlobProperty()
    last_updated = db.DateTimeProperty()
    
    def get_all_resumes(self):
        my_query = Resume.all()
        return  my_query.fetch(100)
    
    def get_resume_state(self, key_value):
        my_query = Query()
        my_query.filter('__key__=', key_value)
        return my_query.fetch(100)
        