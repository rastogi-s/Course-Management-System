import React from 'react';
import TopicServiceClient from "../services/TopicServiceClient";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from './../reducers/widgetReducer';
import App from './../containers/WidgetList';

class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        // this.selectCourse = this.selectCourse.bind(this);
        // this.selectModule = this.selectModule.bind(this);
        // this.selectLesson = this.selectLesson.bind(this);
        this.select = this.select.bind(this);
        this.topicService = TopicServiceClient.instance;
        this.populate = this.populate.bind(this);
        this.updateTopicDetails = this.updateTopicDetails.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.state = {
            courseId:'',
            moduleId:'',
            lessonId:'',
            topic:{},
            updateTopic:{}
        };
    }

    componentWillReceiveProps(newProps){
        // this.selectCourse
        // (newProps.match.params.courseId);
        // this.selectModule
        // (newProps.match.params.moduleId);
        // this.selectLesson
        // (newProps.match.params.lessonId);
        // this.selectTopic
        // (newProps.match.params.topicId);

        this.select(newProps.match.params.courseId,newProps.match.params.moduleId,
            newProps.match.params.lessonId,newProps.match.params.topicId);
        var topicId=newProps.match.params.topicId;

        if(topicId!=null && topicId!='')
            this.topicService.findTopicById(topicId, this.populate);
    }

    select(courseId,moduleId,lessonId,topicId) {
        this.setState({courseId:courseId,moduleId:moduleId,lessonId:lessonId,topicId:topicId});
    }

    // selectCourse(courseId) {
    //     this.setState({courseId:courseId});
    // }
    //
    //
    // selectLesson(lessonId) {
    //     this.setState({lessonId:lessonId});
    // }
    //
    // selectModule(moduleId) {
    //     this.setState({moduleId:moduleId});
    //
    // }
    //
    // selectTopic(topicId) {
    //     this.setState({topicId:topicId});
    //
    // }

    populate(topic) {

        this.setState({topic: topic});
        document.getElementById('form4').style.display="none";
        document.getElementById('title4').style.display='';
    }


    titleChange(event) {
        //console.log(event.target.value);
        this.setState({updateTopic: {title: event.target.value}});
    }

    updateTopicDetails(){
        //console.log(this.state.updateCourse);
        this.topicService.updateTopic(this.state.topicId,this.state.updateTopic ,this.populate);
    }

    editTopic(){

        document.getElementById('form4').style.display="";
        document.getElementById('title4').style.display='none';

    }

    render() {

        let store = createStore(widgetReducer);
        let idState=[this.state.courseId,this.state.moduleId,this.state.lessonId,this.state.topicId];

        return (
            <div className="mt-5" >
                <nav className="navbar navbar-dark bg-dark mb-3" style={{borderRadius: 5}}>
                    <a className="navbar-brand"
                       style={{fontFamily: 'Ariel', fontSize: "x-large", color: 'white'}} id='title4'>{this.state.topic.title}</a>
                    <form className="form-inline navbar-brand" style={{display:'none'}} id='form4'>
                        <input type="text" className="form-control"  defaultValue={this.state.topic.title}
                               onChange={this.titleChange}/>
                        <i className="btn fa-2x fa fa-check" title="Update Topic Name"
                           style={{color: 'white', borderRadius: "50px"}} onClick={this.updateTopicDetails} ></i>
                    </form>
                    <i className="btn fa-2x fa fa-pencil ml-auto" title="Edit Topic Name"
                       style={{color: 'white', borderRadius: "50px"}} onClick={this.editTopic}></i>
                </nav>
                <div>
                    <Provider store={store} >
                        <App idState={idState}/>
                    </Provider>
                </div>

            </div>
        );
    }
}

export default LessonEditor;