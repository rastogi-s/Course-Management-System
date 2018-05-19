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

    createModule(module,courseId) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module', {
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteModule(moduleId,callback) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findModuleById(moduleId) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                method: 'GET'
            }).then(function (response) {
            return response.json();
        });
    }

    findAllModulesForCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId+'/module',
            {
                method: 'GET'
            }).then(function (response) {
            return response.json();
        });
    }

    updateCourse(moduleId,course) {
        return fetch(MODULE_API_URL + '/' + moduleId,
            {
                body: JSON.stringify(course),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }



}

export default ModuleServiceClient;