let _singleton = Symbol();


class TopicServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }


    createTopicUrl(){

        const TOPIC_API_URL = 'http://localhost:8080/api/topic';

        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/topic';
        else
            return TOPIC_API_URL;

    }

    createCourseUrl(){
        const COURSE_API_URL = 'http://localhost:8080/api/course';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        else
            return COURSE_API_URL;

    }

    findAllLTopics() {
        return fetch(this.createTopicUrl())
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createTopic(courseId,moduleId,lessonId,topic) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic' ,{
            body: JSON.stringify(topic),
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

    deleteTopic(topicId,callback) {
        return fetch(this.createTopicUrl() + '/' + topicId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findTopicById(topicId) {
        return fetch(this.createTopicUrl() + '/' + topicId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateTopic(topicId,topic) {
        return fetch(this.createTopicUrl() + '/' + topicId,
            {
                body: JSON.stringify(topic),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

}

export default TopicServiceClient;