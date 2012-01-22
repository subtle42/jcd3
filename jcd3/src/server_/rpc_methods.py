from server_.methods import addTest
from server_.methods import myxml_
from server_.methods import upload
from server_.methods.tasks import TaskMethods
from server_.methods.states import StateMethods
from server_.methods.assets import AssetMethods

class RPCMethods:
    """ Defines the methods that can be RPCed.
    NOTE: Do not allow remote callers access to private/protected "_*" methods.
    """
    
    def get_all_assets(self, request):
        asdf = AssetMethods()
        return asdf.get_all_assets(request)

    def save_asset(self, request):
        asdf = AssetMethods()
        return asdf.save_asset(request)

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
        asdf = TaskMethods()
        return asdf.get_top_level_tasks()
    
    def get_sub_tasks(self, request):
        asdf = TaskMethods()
        return asdf.get_sub_tasks(request)
    
    def get_all_states(self, request):
        asdf = StateMethods()
        return asdf.get_all_states()