import React from 'react';
import LessonTabsItem from './../components/LessonTabsItem'
import LessonServiceClient from './../services/LessonServiceClient'

class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {},
            lessons:[],
            lesson:{},
            alertMessage: '',
            alertDisplay: 'none',
            alertClass: '',
        };
        this.lessonService = LessonServiceClient.instance;
        this.myRef = React.createRef();
        this.setCourseId = this.setCourseId.bind(this);
        this.setModule = this.setModule.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.removeError = this.removeError.bind(this);
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
    }


    componentWillReceiveProps(props) {
        this.setCourseId(props.courseId);
        this.setModule(props.module);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModule(module) {
        this.setState({module: module});
    }

    findAllLessonsForModule() {
        this.lessonService.findAllLessonsForModule(this.state.courseId,this.state.module.id).then((lessons) => {
            this.setState({lessons: lessons});
        });
    }

    titleChange(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    removeError() {
        this.setState({alertMessage: '', alertDisplay: 'none'});
    }

    createLesson() {
        if (this.state.lesson.title != null && this.state.lesson.title != '') {

            console.log(this.state.module.id);
            this.lessonService
                .createLesson(this.state.courseId,this.state.module.id,this.state.lesson)
                .then(() => {
                    this.setState({
                        alertMessage: 'Module created successfully!!',
                        alertDisplay: 'block',
                        alertClass: 'alert-success',
                        lesson: {title: ''}
                    });
                    this.myRef.current.value='';
                    this.findAllLessonsForModule();
                });
        }
        else {
            console.log('title empty');

            this.setState({alertMessage: 'Title is required', alertDisplay: 'block', alertClass: 'alert-danger'});
        }
    }

    deleteLesson(id) {
        this.lessonService.deleteLesson(id).then(() => {
            this.findAllLessonsForModule();
        });
    }


    renderLessonTabsItem(){
        var lessons=this.state.module.lessons;
        var lessonList=[];
        for(var m in lessons) {
            lessonList.push(<LessonTabsItem key={lessons[m].id} lesson={lessons[m]} moduleId={this.state.moduleId} deleteItem={this.deleteLesson}/>);
        }
        return lessonList;
    }


    render() {
        return (

            <div>
                <nav className="navbar navbar-dark bg-dark mb-3">
                    <a className="navbar-brand" href="#">{this.props.module.title}</a>
                    <form className="form-inline"  >
                        <input className="form-control w-75" placeholder="New Lesson Name"
                               onChange={this.titleChange} onFocus={this.removeError} ref={this.myRef}/>
                        <i className="btn fa-2x fa fa-plus pl-4" title="Add"
                           style={{ color:'white'}} onClick={this.createLesson}></i>
                    </form>
                </nav>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.renderLessonTabsItem()}
                </ul>

            </div>
        );
    }
}

export default LessonTabs;

