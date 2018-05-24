let _singleton = Symbol();


class CourseServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton]
    }

    createUrl(){
        const COURSE_API_URL = 'http://localhost:8080/api/course';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        else
          return COURSE_API_URL;

    }

    findAllCourses() {
        return fetch(this.createUrl())
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createCourse(course) {
        return fetch(this.createUrl(), {
            body: JSON.stringify(course),
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

    deleteCourse(courseId, callback) {
        return fetch(this.createUrl() + '/' + courseId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findCourseById(courseId, callback) {
        return fetch(this.createUrl() + '/' + courseId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    updateCourse(courseId,course ,callback) {
        return fetch(this.createUrl() + '/' + courseId,
            {
                body: JSON.stringify(course),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
            //return response.json();
        }).then(callback);
    }

}

export default CourseServiceClient;