import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor"
import {Route} from 'react-router-dom';

class ModuleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.moduleService = ModuleServiceClient.instance;
        this.populateTitle = this.populateTitle.bind(this);
        this.updateModuleDetails = this.updateModuleDetails.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.state = {
            courseId:'',
            moduleId:'',
            module:{},
            updateModule:{}
        };
    }

    componentWillReceiveProps(newProps){
        this.select
        (newProps.match.params.courseId,newProps.match.params.moduleId);

    }


    select(courseId,moduleId) {
        this.setState({moduleId:moduleId,courseId:courseId});
        if(moduleId!=null && moduleId!='')
            this.moduleService.findModuleById(moduleId, this.populateTitle);
    }


    populateTitle(module) {
        this.setState({module: module});
        document.getElementById('form2').style.display="none";
        document.getElementById('title2').style.display='';
    }

    renderLessonTabs() {
        var module = this.state.module;
        if(this.state.moduleId!=null && this.state.moduleId!='' && this.state.module!=null)
            return <LessonTabs key={this.state.moduleId} courseId={this.state.courseId} moduleId={this.state.moduleId}
                               module={module}/>
    }

    titleChange(event) {
        console.log(event.target.value);
        this.setState({updateModule: {title: event.target.value}});
    }

    updateModuleDetails(){
        this.moduleService.updateModule(this.state.moduleId,this.state.updateModule ,this.populateTitle);
    }

    editModule(){

        document.getElementById('form2').style.display="";
        document.getElementById('title2').style.display='none';

    }


    render() {


        return (
            <div>
                <nav className="navbar navbar-dark bg-dark mb-3" style={{borderRadius: 5}}>
                    <a className="navbar-brand"
                       style={{fontFamily: 'Ariel', fontSize: "x-large", color: 'white'}} id='title2'>{this.state.module.title}</a>
                    <form className="form-inline navbar-brand" style={{display:'none'}} id='form2'>
                        <input type="text" className="form-control"  defaultValue={this.state.module.title}
                               onChange={this.titleChange}/>
                        <i className="btn fa-2x fa fa-check" title="Update Module Name"
                           style={{color: 'white', borderRadius: "50px"}} onClick={this.updateModuleDetails} ></i>
                    </form>
                    <i className="btn fa-2x fa fa-pencil ml-auto" title="Edit Module Name"
                       style={{color: 'white', borderRadius: "50px"}} onClick={this.editModule}></i>
                </nav>
                {this.renderLessonTabs()}
                <div >
                    <Route path="/course/:courseId/edit/module/:moduleId/edit/lesson/:lessonId"
                           component={LessonEditor}  ></Route>
                </div>
            </div>

        );
    }
}

export default ModuleEditor;