let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';

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

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
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
        return fetch(COURSE_API_URL + '/' + courseId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findCourseById(courseId, callback) {
        return fetch(COURSE_API_URL + '/' + courseId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    updateCourse(courseId,course ,callback) {
        return fetch(COURSE_API_URL + '/' + courseId,
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
        });
    }


}

export default CourseServiceClient;