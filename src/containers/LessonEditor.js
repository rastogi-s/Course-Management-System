import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import TopicPills from './TopicPills'

class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.lessonService = LessonServiceClient.instance;
        this.populate = this.populate.bind(this);
        this.renderTopicPills=this.renderTopicPills.bind(this);
        this.state = {
            courseId:'',
            moduleId:'',
            lessonId:'',
            topic:{}
        };
    }

    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
        this.selectModule
        (newProps.match.params.moduleId);
        this.selectLesson
        (newProps.match.params.lessonId);

        var lessonId=newProps.match.params.lessonId;

        if(lessonId!=null && lessonId!='')
            this.lessonService.findLessonById(lessonId, this.populate);
    }


    selectCourse(courseId) {
        this.setState({courseId:courseId});
    }


    selectLesson(lessonId) {
        this.setState({lessonId:lessonId});
    }

    selectModule(moduleId) {
        this.setState({moduleId:moduleId});

    }

    populate(lesson) {
        this.setState({lesson: lesson});
    }

    renderTopicPills() {

        if(this.state.lessonId!=null && this.state.lessonId!='')
         return <TopicPills key={this.state.lessonId} courseId={this.state.courseId} moduleId={this.state.moduleId}
                           lessonId={this.state.lessonId} />
    }

    render() {
        return (
            <div >
                {this.renderTopicPills()}
            </div>
        );
    }
}

export default LessonEditor;