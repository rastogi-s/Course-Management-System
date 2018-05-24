let _singleton = Symbol();


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


    createModuleUrl(){
        const MODULE_API_URL = 'http://localhost:8080/api/module';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/module';
        else
            return MODULE_API_URL;

    }

    createCourseUrl(){
        const COURSE_API_URL = 'http://localhost:8080/api/course';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        else
            return COURSE_API_URL;

    }

    findAllModules() {
        return fetch(this.createModuleUrl())
            .then(function (response) {
                return response.json();
            });
    }

    createModule(courseId,module) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module', {
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
        return fetch(this.createModuleUrl() + '/' + moduleId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findModuleById(moduleId,callback) {
        return fetch(this.createModuleUrl() + '/' + moduleId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    findAllModulesForCourse(courseId) {
        return fetch(this.createCourseUrl() + '/' + courseId+'/module',
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateModule(moduleId,module,callback) {
        return fetch(this.createModuleUrl() + '/' + moduleId,
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