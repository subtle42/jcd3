import os
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import tostring


class XmlGetInfo():
    
    def run(self, request):
        lookup_attr = request.get("findattr")

        if(lookup_attr == "ResumeId"):
            result = self._get_info("ResumeId/IdValue")
        elif(lookup_attr == "DistributionGuidelines"):
            result = self._get_xml("DistributionGuidelines")
        elif(lookup_attr == "ContactInfo"):
            result = self._get_xml("StructuredXMLResume/ContactInfo")
        elif(lookup_attr == "ExecutiveSummary"):
            result = self._get_info("StructuredXMLResume/ExecutiveSummary")
        elif(lookup_attr == "Objective"):
            result = self._get_info("StructuredXMLResume/Objective")
        elif(lookup_attr == "EmploymentHistory"):
            result = self._get_xml("StructuredXMLResume/EmploymentHistory")
        elif(lookup_attr == "EducationHistory"):
            result = self._get_xml("StructuredXMLResume/EducationHistory")
        elif(lookup_attr == "LicensesAndCertifications"):
            result = self._get_xml("StructuredXMLResume/LicensesAndCertifications")
        elif(lookup_attr == "LastUpdated"):
            result = self._get_info("StructuredXMLResume/RevisionDate")
        else:
            result = self._get_xml("")
            
        return result
        
    def _get_info(self, xml_path):
        path = os.path.join(os.path.dirname(__file__), "../../datastore/xml/myResume.xml")
        try:
            tree = ET.parse(path)
        except Exception, inst:
            print "Unexpected error opening %s: %s" % (path, inst)
            return
        
        tree = tree.getroot()
        result = tree.find(xml_path)
        
        return result.text
    
    def _get_xml(self, xml_path):
        path = os.path.join(os.path.dirname(__file__), "../../datastore/xml/gottliebResume.xml")
        try:
            tree = ET.parse(path)
        except Exception, inst:
            print "Unexpected error opening %s: %s" % (path, inst)
            return
        
        tree = tree.getroot()
        result = tree.find(xml_path)
        
        return tostring(result)