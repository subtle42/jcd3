from google.appengine.ext import db

class Task(db.Model):
    task_id = db.StringProperty()
    name = db.StringProperty()
    description = db.StringProperty()
    standards_list = db.StringListProperty()
    parent_id = db.StringProperty()
    task_level = db.IntegerProperty()
    
    def get_all_tasks(self):
        query = Task.all()
        query.order("task_id")
        results = query.fetch(1000)
        return results
    
    def get_sub_tasks(self, parent_id):
        if type(parent_id) is not str:
            raise TypeError
        query = Task.all()
        query.filter("parent_id =", parent_id)
        query.order("task_id")
        results = query.fetch(100)
        return results
    
    def get_tasks_by_level(self, level):
        if type(level) is not int:
            raise TypeError("Should be int, was given " + type(level))
        query = Task.all()
        query.filter("task_level =", level)
        query.order("task_id")
        query.fetch(100)
        return query
    
    def put_results_in_dictionary(self, results):
        item_list = []
        
        for item in results:
            new_item = {
                    'task_id': item.task_id
                    ,'name': item.name
                    ,'description': item.description
                    ,'parent_id': item.parent_id
                    ,'task_level': item.task_level
                        }
            item_list.append(new_item)
            
        return item_list
    