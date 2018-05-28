import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import TopicPills from './TopicPills'
import TopicEditor from './TopicEditor'
import {Route} from 'react-router-dom';

class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        // this.selectCourse = this.selectCourse.bind(this);
        // this.selectModule = this.selectModule.bind(this);
        // this.selectLesson = this.selectLesson.bind(this);
         this.select = this.select.bind(this);
        this.lessonService = LessonServiceClient.instance;
        this.populate = this.populate.bind(this);
        this.renderTopicPills=this.renderTopicPills.bind(this);
        this.updateLessonDetails = this.updateLessonDetails.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.state = {
            courseId:'',
            moduleId:'',
            lessonId:'',
            topic:{},
            lesson:{},
            updateLesson:{}
        };
    }

    componentWillReceiveProps(newProps){
        // this.selectCourse
        // (newProps.match.params.courseId);
        // this.selectModule
        // (newProps.match.params.moduleId);
        // this.selectLesson
        this.select
        (newProps.match.params.courseId,newProps.match.params.moduleId,newProps.match.params.lessonId);

        var lessonId=newProps.match.params.lessonId;

        if(lessonId!=null && lessonId!='')
            this.lessonService.findLessonById(lessonId, this.populate);
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

    select(courseId,moduleId,lessonId) {
        this.setState({courseId:courseId,lessonId:lessonId,moduleId:moduleId});

    }


    populate(lesson) {
        this.setState({lesson: lesson});
        document.getElementById('form3').style.display="none";
        document.getElementById('title3').style.display='';
    }

    renderTopicPills() {

        if(this.state.lessonId!=null && this.state.lessonId!='')
         return <TopicPills key={this.state.lessonId} courseId={this.state.courseId} moduleId={this.state.moduleId}
                           lessonId={this.state.lessonId} />
    }

    titleChange(event) {
        console.log(event.target.value);
        this.setState({updateLesson: {title: event.target.value}});
    }

    updateLessonDetails(){
        //console.log(this.state.updateCourse);
        this.lessonService.updateLesson(this.state.lessonId,this.state.updateLesson ,this.populate);
    }

    editModule(){

        document.getElementById('form3').style.display="";
        document.getElementById('title3').style.display='none';

    }

    render() {
        return (
            <div className="mt-5" >
                <nav className="navbar navbar-dark bg-dark mb-3" style={{borderRadius: 5}}>
                    <a className="navbar-brand"
                       style={{fontFamily: 'Ariel', fontSize: "x-large", color: 'white'}} id='title3'>{this.state.lesson.title}</a>
                    <form className="form-inline navbar-brand" style={{display:'none'}} id='form3'>
                        <input type="text" className="form-control"  defaultValue={this.state.lesson.title}
                               onChange={this.titleChange}/>
                        <i className="btn fa-2x fa fa-check" title="Update Lesson Name"
                           style={{color: 'white', borderRadius: "50px"}} onClick={this.updateLessonDetails} ></i>
                    </form>
                    <i className="btn fa-2x fa fa-pencil ml-auto" title="Edit Lesson Name"
                       style={{color: 'white', borderRadius: "50px"}} onClick={this.editModule}></i>
                </nav>
                {this.renderTopicPills()}
                <div >
                    <Route path="/course/:courseId/edit/module/:moduleId/edit/lesson/:lessonId/topic/:topicId"
                           component={TopicEditor}  ></Route>
                </div>
            </div>
        );
    }
}

export default LessonEditor;