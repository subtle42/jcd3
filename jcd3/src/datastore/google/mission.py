from google.appengine.ext import db

class Mission():
    name = db.StringProperty()
    desc = db.StringProperty()
    task_list = db.StringListProperty()
    
    