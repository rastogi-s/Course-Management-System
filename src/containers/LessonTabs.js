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
        this.set = this.set.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
    }



    componentWillReceiveProps(props) {
        this.set(props.courseId,props.module,props.moduleId)
        if (props.courseId != undefined && props.courseId != '' && props.moduleId != null && props.moduleId != '') {

            this.findAllLessonsForModule();
        }
    }

    set(courseId,module,moduleId) {
        this.setState({module: module,lessons: module.lessons, courseId: courseId, moduleId: moduleId});
    }


    findAllLessonsForModule() {

       if (this.state.courseId != undefined && this.state.courseId != '' ) {
           this.lessonService.findAllLessonsForModule(this.state.courseId, this.state.moduleId).then((lessons) => {
               this.setState({lessons: lessons});
           });
       }
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
                <form className="form-inline mb-4">
                    <input className="form-control" placeholder="New Lesson Name"
                           onChange={this.titleChange} ref={this.myRef}/>
                    <i className="btn fa-2x fa fa-plus pl-4 " title="Add"
                       style={{color: 'white'}} onClick={this.createLesson}></i>
                </form>
                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    {this.renderLessonTabsItem()}
                </ul>

            </div>
        );
    }
}

export default LessonTabs;

