from django.utils import simplejson
from google.appengine.ext import webapp

from server_.rpc_methods import RPCMethods


class RPCHandler(webapp.RequestHandler):
    """ Allows the functions defined in the RPCMethods class to be RPCed."""

    def __init__(self):
        webapp.RequestHandler.__init__(self)
        self.methods = RPCMethods()

    def get(self):
        func = None

        action = self.request.get('action')
        if action:
            if action[0] == '_':
                self.error(403) # access denied
                return
            else:
                func = getattr(self.methods, action, None)

        if not func:
            self.error(404) # file not found
            return

        args = ()
        while True:
            key = 'arg%d' % len(args)
            val = self.request.get(key)
            if val:
                args += (simplejson.loads(val),)
            else:
                break
        result = func(*args)
        self.response.out.write(simplejson.dumps(result))
        
    def post(self):
        data = self.request.POST
        #TODO: figure out how to get a dictionary from self.request.POST.multi
        #args = simplejson.loads(self.request.body)

        func = data.get('action')
                
        #func, args = args[0], args[1:]

        if func[0] == '_':
            self.error(403) # access denied
            return

        func = getattr(self.methods, func, None)
        if not func:
            self.error(404) # file not found
            return
        
        #This sends the data to the specific web service
        result = func(self.request)
        self.response.out.write(result)
        #self.response.out.write(simplejson.dumps(result))

    def _check_for_underscore(self):
        action = self.request.get('action')
        if action[0] == '_':
            raise