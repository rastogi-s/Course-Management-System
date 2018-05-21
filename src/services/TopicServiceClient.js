let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const TOPIC_API_URL = 'http://localhost:8080/api/topic';

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

    findAllLTopics() {
        return fetch(TOPIC_API_URL)
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createTopic(courseId,moduleId,lessonId,topic) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic' ,{
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
        return fetch(TOPIC_API_URL + '/' + topicId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findTopicById(topicId) {
        return fetch(TOPIC_API_URL + '/' + topicId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(COURSE_API_URL+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateTopic(topicId,topic) {
        return fetch(TOPIC_API_URL + '/' + topicId,
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