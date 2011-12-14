from google.appengine.ext import db

class State(db.Model):
    state_abbr = db.StringProperty()
    state_name = db.StringProperty()
    region_id = db.IntegerProperty()
    
    
    def get_states(self):
        my_query = State.all()
        my_query.order("state_abbr")
        asdf = my_query.fetch(100)
        return asdf
    
    def get_single_state(self, state_abbr):
        query_string = "".join('SELECT * FROM State WHERE key_name =', state_abbr)
        results = db.GqlQuery(query_string)
        return results
