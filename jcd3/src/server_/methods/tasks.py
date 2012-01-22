from django.utils import simplejson

from datastore.google.task import Task

class TaskMethods():
    def get_all_tasks(self):
        my_tasks = Task()
        results = my_tasks.get_all_tasks()
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)

    def get_sub_tasks(self, request):
        parent_id = str(request.get('taskId'))
        my_tasks = Task()
        results = my_tasks.get_sub_tasks(parent_id)
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)

    def get_top_level_tasks(self):
        my_tasks = Task()
        results = my_tasks.get_tasks_by_level(1)
        results = my_tasks.put_results_in_dictionary(results)
        return simplejson.dumps(results)
        