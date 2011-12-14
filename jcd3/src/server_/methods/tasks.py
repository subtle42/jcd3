from django.utils import simplejson

from datastore.google.task import Task

class GetAllTasks():
    def run(self):
        my_tasks = Task()
        results = my_tasks.get_all_tasks()
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)
    
class GetSubTasks():
    def run(self, request):
        parent_id = str(request.get('taskId'))
        my_tasks = Task()
        results = my_tasks.get_sub_tasks(parent_id)
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)
            
class GetTopLevelTasks():
    def run(self):
        my_tasks = Task()
        results = my_tasks.get_tasks_by_level(1)
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)
        