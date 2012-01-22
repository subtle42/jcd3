from django.utils import simplejson as json

from datastore.google.state import State


class StateMethods:
    def get_all_states(self):
        myStates = State()
        state_list = myStates.get_states()
        myjsonlist = []
        for state in state_list:
            my_dict = {state.state_abbr: state.state_name
                       }
            myjsonlist.append(my_dict)
        
        final_output = json.dumps(myjsonlist)
        return final_output