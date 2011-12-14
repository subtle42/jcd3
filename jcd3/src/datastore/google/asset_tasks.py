from google.appengine.ext import db

class AssetTasks():
    asset_key = db.StringProperty()
    task_key = db.StringProperty()
    assigned = db.BooleanProperty()
    actual = db.BooleanProperty()
    
    