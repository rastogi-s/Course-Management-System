let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const MODULE_API_URL = 'http://localhost:8080/api/module';
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
                return response.json();
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
            return response.json();
        });
    }

    deleteLesson(lessonId,callback) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findLessonById(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'GET'
            }).then(function (response) {
            return response.json();
        });
    }

    findAllLessonsForModule(courseId,moduleId) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,
            {
                method: 'GET'
            }).then(function (response) {
            return response.json();
        });
    }

    updateLesson(lessonId,lesson) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                body: JSON.stringify(lesson),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }



}

export default LessonServiceClient;