import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor"
import { Route} from 'react-router-dom';

class ModuleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.moduleService = ModuleServiceClient.instance;
        this.populateTitle = this.populateTitle.bind(this);
        this.state = {
            courseId:'',
            moduleId:'',
            module:{}
        };
    }

    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
        this.selectModule
        (newProps.match.params.moduleId);
    }



    selectCourse(courseId) {
        this.setState({courseId:courseId});
    }

    selectModule(moduleId) {
        this.setState({moduleId:moduleId});
        if(moduleId!=null && moduleId!='')
            this.moduleService.findModuleById(moduleId, this.populateTitle);
    }

    populateTitle(module) {
        this.setState({module: module});
    }

    renderLessonTabs() {
        var module = this.state.module;
        if(this.state.moduleId!=null && this.state.moduleId!='' && this.state.module!=null)
            return <LessonTabs key={this.state.moduleId} courseId={this.state.courseId} moduleId={this.state.moduleId}
                               module={module}/>
    }


    render() {


        return (
            <div>
                {this.renderLessonTabs()}
                <div >
                    <Route path="/course/:courseId/edit/module/:moduleId/edit/lesson/:lessonId"
                           component={LessonEditor}  />
                </div>
            </div>

        );

    }
}

export default ModuleEditor;