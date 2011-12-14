from server_.methods import addTest
from server_.methods import myxml_
from server_.methods import upload
from server_.methods import tasks

class RPCMethods:
    """ Defines the methods that can be RPCed.
    NOTE: Do not allow remote callers access to private/protected "_*" methods.
    """

    def Add(self, request):
        asdf = addTest.MyClass();
        return asdf.run(request)
    
    def XmlMethods(self, request):
        asdf = myxml_.XmlGetInfo()
        return asdf.run(request)
    
    def state_upload(self, request):
        asdf = upload.StateUpload()
        return asdf.run()
    
    def task_upload(self, request):
        asdf = upload.TaskUpload()
        return asdf.run()
    
    def get_top_level_tasks(self, request):
        asdf = tasks.GetTopLevelTasks()
        return asdf.run()
    
    def get_sub_tasks(self, request):
        asdf = tasks.GetSubTasks()
        return asdf.run(request)