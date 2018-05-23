let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const LESSON_API_URL = 'http://localhost:8080/api/lesson';

class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createLesson(courseId,moduleId,lesson) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,{
            body: JSON.stringify(lesson),
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

    deleteLesson(lessonId,callback) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findLessonById(lessonId,callback) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    findAllLessonsForModule(courseId,moduleId) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateLesson(lessonId,lesson,callback) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                body: JSON.stringify(lesson),
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

export default LessonServiceClient;