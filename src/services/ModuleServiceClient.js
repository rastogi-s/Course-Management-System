let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const MODULE_API_URL = 'http://localhost:8080/api/module';

class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }

    findAllModules() {
        return fetch(MODULE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    createModule(courseId,module) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module', {
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    deleteModule(moduleId,callback) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findModuleById(moduleId,callback) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    findAllModulesForCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId+'/module',
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateModule(moduleId,module,callback) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                body: JSON.stringify(module),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }



}

export default ModuleServiceClient;