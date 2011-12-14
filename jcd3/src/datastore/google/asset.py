from google.appengine.ext import db

class Asset():
    name = db.StringProperty()
    desc = db.StringProperty()
    state_id = db.StringProperty()