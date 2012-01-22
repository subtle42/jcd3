from django.utils import simplejson

from datastore.google.asset import Asset

class AssetMethods:
    def save_asset(self, request):
        my_asset = Asset()
        my_asset.name = request.get("assetName")
        my_asset.desc = request.get("desc")
        my_asset.state_id = request.get("state")
        
        response = my_asset.put()
        
        if response.has_id_or_name():
            return True
        else:
            return False
    
    def get_all_assets(self, request):
        my_asset = Asset()
        results = my_asset.get_all_assets()
        results = my_asset.put_results_in_dictionary(results)
        return simplejson.dumps(results)