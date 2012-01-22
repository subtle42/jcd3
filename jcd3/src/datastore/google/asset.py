from google.appengine.ext import db

class Asset(db.Model):
    name = db.StringProperty()
    desc = db.StringProperty()
    state_id = db.StringProperty()
    
    
    
    def get_all_assets(self):
        my_query = Asset.all()
        my_query.order("name")
        results = my_query.fetch(1000)
        return results
    
    def put_results_in_dictionary(self, results):
        item_list = []
        
        for item in results:
            new_item = {
                    'name': item.name
                    ,'desc': item.desc
                    ,'state_id': item.state_id
                        }
            item_list.append(new_item)
            
        return item_list