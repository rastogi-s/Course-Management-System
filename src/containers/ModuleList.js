import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import ModuleListItem from "../components/ModuleListItem";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleServiceClient.instance;
        this.myRef = React.createRef();
        this.state = {
            courseId: '',
            modules: [],
            module: {}
        };
        this.deleteModule = this.deleteModule.bind(this);
        this.createModule = this.createModule.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);

    }


    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse();

    }


    findAllModulesForCourse() {
        console.log('ddddd');
        console.log(this.props.courseId);
        if (this.props.courseId != null && this.props.courseId != "")
            this.moduleService.findAllModulesForCourse(this.props.courseId).then((modules) => {
                this.setState({modules: modules});
            });
    }

    titleChange(event) {
        this.setState({module: {title: event.target.value}});
    }

    createModule() {

        var module = this.state.module;
        if (module.title === undefined || module.title === '') {
            module = {title: 'New Module'};
        }
        console.log(module);
        this.moduleService
            .createModule(this.state.courseId, module)
            .then(() => {
                this.setState({
                    module: {title: ''}
                });
                this.myRef.current.value = '';
                this.findAllModulesForCourse();
            });

    }

    deleteModule(id) {
        this.moduleService.deleteModule(id).then(() => {

            var loc = window.location.href;
            var newLoc = loc.substring(0, loc.indexOf("edit") + 4)
            console.log(loc);
            console.log(newLoc);
            if (newLoc === loc || newLoc === (loc + "/") || (newLoc + "/") === loc)
                this.findAllModulesForCourse();
            else
                window.location.href = newLoc;
        });
    }


    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }


    renderModuleListItem() {
        var modules = this.state.modules;
        var moduleList = [];
        for (var m in modules) {
            moduleList.push(<ModuleListItem key={modules[m].id} module={modules[m]} courseId={this.state.courseId}
                                            deleteItem={this.deleteModule}/>);
        }

        return moduleList;

    }

    render() {

        return (
            <div>


                <div className="list-group " id="myList" role="tablist">
                    <span className="list-group-item list-group-item-action mb-5" style={{borderRadius:7,background:'lightgrey'}}
                          role="tab">
                        <form className="form-inline">
                    <input className="form-control" placeholder="New Module Name"
                           onChange={this.titleChange} ref={this.myRef}/>
                    <i className="btn float-right fa-2x fa fa-plus ml-auto p-0" title="Add"
                       style={{color: 'black'}} onClick={this.createModule}></i>
                </form>
                    </span>
                    {this.renderModuleListItem()}
                </div>
            </div>

        );
    }
}

export default ModuleList;

