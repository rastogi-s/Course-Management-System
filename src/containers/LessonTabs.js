import React from 'react';
import LessonTabsItem from './../components/LessonTabsItem';
import LessonServiceClient from './../services/LessonServiceClient';

class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {},
            lessons: [],
            lesson: {},
            moduleId: ''
        };
        this.lessonService = LessonServiceClient.instance;
        this.myRef = React.createRef();
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setModule = this.setModule.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChange = this.titleChange.bind(this);
        //this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setModule(this.props.module);
        // if(this.state.courseId!=null && this.state.courseId!='' && this.state.moduleId!=null && this.state.moduleId!='' )
        //  this.findAllLessonsForModule();
    }


    componentWillReceiveProps(props) {

        this.setCourseId(props.courseId);
        this.setModule(props.module);
        this.setModuleId(props.moduleId);
        if (props.courseId != null && props.courseId != '' && props.moduleId != null && props.moduleId != '')
            this.findAllLessonsForModule();
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setModule(module) {
        this.setState({module: module});
        this.setState({lessons: module.lessons});
    }

    findAllLessonsForModule() {

        this.lessonService.findAllLessonsForModule(this.state.courseId, this.state.moduleId).then((lessons) => {
            this.setState({lessons: lessons});
        });
    }

    titleChange(event) {
        this.setState({lesson: {title: event.target.value}});
    }


    createLesson() {

        var lesson = this.state.lesson;
        if (lesson.title === undefined || lesson.title === '') {
            lesson = {title: 'New Lesson'};
        }

        this.lessonService
            .createLesson(this.state.courseId, this.state.moduleId, lesson)
            .then(() => {
                this.setState({

                    lesson: {title: ''}
                });
                this.myRef.current.value = '';
                this.findAllLessonsForModule();
            });

    }

    deleteLesson(id) {
        this.lessonService.deleteLesson(id).then(() => {
            var loc = window.location.href;
            if (loc.indexOf("lesson") != -1) {

                var newLoc = loc.substring(0, loc.indexOf("lesson") - 2);
                console.log(loc);
                console.log(newLoc);
                window.location.href = newLoc;
            }
            else {
                this.findAllLessonsForModule();
            }


        });
    }


    renderLessonTabsItem() {
        var lessons = this.state.lessons;
        var lessonList = [];
        for (var m in lessons) {

            lessonList.push(<LessonTabsItem key={lessons[m].id} lesson={lessons[m]}
                                            courseId={this.state.courseId} moduleId={this.state.moduleId}
                                            deleteItem={this.deleteLesson}/>);
        }
        return lessonList;
    }


    render() {

        return (

            <div>
                <nav className="navbar navbar-dark bg-dark mb-3" style={{borderRadius: 5}}>
                    <a className="navbar-brand"
                       style={{fontFamily: 'Ariel', fontSize: "x-large", color: 'white'}}>{this.props.module.title}</a>
                    <form className="form-inline">
                        <input className="form-control w-75" placeholder="New Lesson Name"
                               onChange={this.titleChange} ref={this.myRef}/>
                        <i className="btn fa-2x fa fa-plus pl-4" title="Add"
                           style={{color: 'white'}} onClick={this.createLesson}></i>
                    </form>
                </nav>
                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    {this.renderLessonTabsItem()}
                </ul>

            </div>
        );
    }
}

export default LessonTabs;

