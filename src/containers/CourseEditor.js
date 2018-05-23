import React from 'react';
import CourseServiceClient from "../services/CourseServiceClient";
import {Link} from 'react-router-dom'
import ModuleList from "./ModuleList";
import {Route} from 'react-router-dom';
import ModuleEditor from "./ModuleEditor";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseServiceClient.instance;
        this.populateTitle = this.populateTitle.bind(this);
        this.state = {
            courseId:'',
            course: {}
        };
    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
    }
    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
    }



    selectCourse(courseId) {
        //console.log('in course editor select course');
        this.setState({courseId:courseId});
        if(courseId!=null && courseId!='')
        this.courseService.findCourseById(courseId, this.populateTitle);

    }

    populateTitle(course) {
        //console.log('in course editor populate title');
        this.setState({course: course});

    }

    renderModuleList() {
        var modules = this.state.course.modules;
        if(this.state.courseId!=null && this.state.courseId!='')
        return <ModuleList key={this.state.courseId} courseId={this.state.courseId} modules={modules}/>
    }


    render() {


        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#"><h1
                        style={{fontFamily: 'Serif', color: 'white'}}>{this.state.course.title}</h1></a>
                    <Link to={`/course/list`}>
                        <i className="btn fa-2x fa fa-times" title="Close"
                           style={{color: 'white', borderRadius: "50px"}}></i>
                    </Link>

                </nav>
                <div   style={{
                    display:'table',
                    paddingTop: "5rem",
                    color: "5a5a5a",
                    width:'100%',
                    height:'100%',
                    paddingLeft:0,
                    paddingRight:0,
                    margin:0,

                }}>
                    <div className="row">
                        <div className="col-md-3 float-left" style={{background: 'black', padding: 40,margin:20,marginLeft:30,borderRadius:10}}>
                            {this.renderModuleList()}
                        </div>
                        <div className="col-md-8 float-right" style={{background: 'black', padding: 40,margin:20,borderRadius:10}}>
                            <Route path="/course/:courseId/edit/module/:moduleId"
                                component={ModuleEditor} />
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default CourseEditor;