let _singleton = Symbol();

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

    createLessonUrl(){
        const LESSON_API_URL = 'http://localhost:8080/api/lesson';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/lesson';
        else
            return LESSON_API_URL;

    }

    createCourseUrl(){
        const COURSE_API_URL = 'http://localhost:8080/api/course';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        else
            return COURSE_API_URL;

    }

    findAllLessons() {
        return fetch(this.createLessonUrl())
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createLesson(courseId,moduleId,lesson) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,{
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
        return fetch(this.createLessonUrl() + '/' + lessonId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findLessonById(lessonId,callback) {
        return fetch(this.createLessonUrl() + '/' + lessonId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        }).then(callback);
    }

    findAllLessonsForModule(courseId,moduleId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateLesson(lessonId,lesson,callback) {
        return fetch(this.createLessonUrl() + '/' + lessonId,
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