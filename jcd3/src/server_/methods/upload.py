import os
import fileinput

from google.appengine.ext import db

from datastore.google.task import Task
from server_.methods.tasks import GetAllTasks
from datastore.google.state import State
from server_.methods.states import StatesMethod

class Upload():
    def _format_lines(self, my_file):
        formatted_list = []
        
        for line in my_file:
            if not my_file.isfirstline():
                line = line.replace("\n", "")
                line = line.split(";")
                formatted_list.append(line)
                
        self._close_file(my_file)
        return formatted_list                
        
    def _get_file(self, file_name):
        path = os.path.join(os.path.dirname(__file__), "../../datastore/upload/" + file_name)
        my_file = fileinput.input(path)
        return my_file
    
    def _close_file(self, my_file):
        my_file.close()
    
class TaskUpload(Upload):
    def run(self):
        import_list = []
        
        my_file = self._get_file('cstl.txt')
        formatted_list = self._format_lines(my_file)
        
        for item in formatted_list:
            my_task = Task()
            my_task.task_id = item[0]
            my_task.name = item[1]
            my_task.description = item[2]
            my_task.parent_id = item[3]
            my_task.task_level = int(item[4])
            import_list.append(my_task)
            
        db.put(import_list)
        my_q = GetAllTasks()
        asdf = my_q.run()
        return asdf
        
class StateUpload(Upload):
    def run(self):
        import_list = []
        
        my_file = self._get_file('states.txt')
        formatted_list = self._format_lines(my_file)
        
        for item in formatted_list:
            my_state = State()
            my_state.state_abbr = item[1]
            my_state.state_name = item[0]
            import_list.append(my_state)    
        
        #Commented out just in case of accidents
        db.put(import_list)
        
        new_states = StatesMethod()
        return new_states.get_all_states()
        
