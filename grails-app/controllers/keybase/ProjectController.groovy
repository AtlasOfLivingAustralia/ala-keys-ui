package keybase

import org.apache.commons.httpclient.methods.GetMethod
import org.apache.commons.httpclient.HttpClient
import grails.converters.JSON
import groovy.json.JsonOutput

class ProjectController {

    def index() {
        redirect(action: 'list')
    }
    
    def list() {
    }

    def show() {
        def project_id = params.id
        [project_id: project_id]
    }
    
    def edit() {
        
    }
    
    def add() {

        
    }
    
    def delete() {
        
    }

    def getprojects(){
        def get = new GetMethod('http://dev-keys.ala.org.au/ala-keys/ws/search/project?q=')
        def http = new HttpClient()
        http.executeMethod(get)
        def response = get.getResponseBody()
        get.releaseConnection();
        render new String(response);
    }

}
