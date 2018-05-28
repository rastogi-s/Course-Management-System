let _singleton = Symbol();


class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }


    createWidgetUrl(){

        const WIDGET_API_URL = 'http://localhost:8080/api/widget';

        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/widget';
        else
            return WIDGET_API_URL;

    }

    createCourseUrl(){
        const COURSE_API_URL = 'http://localhost:8080/api/course';
        var url=window.location.href;
        if(!url.toString().includes('localhost'))
            return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        else
            return COURSE_API_URL;

    }

    findAllWidgets() {
        return fetch(this.createWidgetUrl())
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createWidget(courseId,moduleId,lessonId,topicId,widget) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic'
            +topicId+'/widget' ,{
            body: JSON.stringify(widget),
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

    deleteWidget(widgetId,callback) {
        return fetch(this.createWidgetUrl() + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findWidgetById(widgetId) {
        return fetch(this.createWidgetUrl() + '/' + widgetId,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllWidgetsForTopic(courseId,moduleId,lessonId,topicId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic/'+topicId+'/widget' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    updateWidget(widgetId,widget) {
        return fetch(this.createWidgetUrl() + '/' + widgetId,
            {
                body: JSON.stringify(widget),
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

export default WidgetServiceClient;