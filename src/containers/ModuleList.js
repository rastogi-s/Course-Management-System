import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import AlertDiv from './../components/AlertDiv';
import ModuleListItem from "../components/ModuleListItem";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleServiceClient.instance;
        this.myRef = React.createRef();
        this.state = {
            courseId:'',
            modules: [],
            module: {},
            alertMessage: '',
            alertDisplay: 'none',
            alertClass: '',
            //sortType: 'modified'
        };
        this.deleteModule = this.deleteModule.bind(this);
        this.createModule = this.createModule.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.removeError = this.removeError.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        // this.setModules = this.setModules.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);

    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse();
    }

    componentWillReceiveProps() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse();

    }


    findAllModulesForCourse() {
        this.moduleService.findAllModulesForCourse(this.props.courseId).then((modules) => {
            this.setState({modules: modules});
        });
    }

    titleChange(event) {
        this.setState({module: {title: event.target.value}});
    }

    removeError() {
        this.setState({alertMessage: '', alertDisplay: 'none'});
    }

    createModule() {
        if (this.state.module.title != null && this.state.module.title != '') {

            console.log(this.state.courseId);
            this.moduleService
                .createModule(this.state.courseId,this.state.module)
                .then(() => {
                    this.setState({
                        alertMessage: 'Module created successfully!!',
                        alertDisplay: 'block',
                        alertClass: 'alert-success',
                        module: {title: ''}
                    });
                    this.myRef.current.value='';
                    this.findAllModulesForCourse();
                });
        }
        else {
            console.log('title empty');

            this.setState({alertMessage: 'Title is required', alertDisplay: 'block', alertClass: 'alert-danger'});
        }
    }

    deleteModule(id) {
        this.moduleService.deleteModule(id).then(() => {
            this.findAllModulesForCourse();
        });
    }


    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    // setModules(modules) {
    //     this.setState({modules: modules});
    // }

    renderModuleListItem(){
        var modules=this.state.modules;
        var moduleList=[];
        for(var m in modules) {
            moduleList.push(<ModuleListItem key={modules[m].id} module={modules[m]} courseId={this.state.courseId} deleteItem={this.deleteModule}/>);
        }

       // console.log(modules);

        return moduleList;

    }

    render() {

        return (
            <div >
                <AlertDiv alertMessage={this.state.alertMessage} display={this.state.alertDisplay}
                          class={this.state.alertClass}/>
                <form className="form-inline"  >
                    <input className="form-control w-75" placeholder="New Module Name"
                           onChange={this.titleChange} onFocus={this.removeError} ref={this.myRef}/>
                    <i className="btn fa-2x fa fa-plus pl-4" title="Add"
                       style={{ color:'white'}} onClick={this.createModule}></i>
                </form>

                <div className="list-group" id="myList" role="tablist">
                    {this.renderModuleListItem()}
                </div>
            </div>

        );
    }
}

export default ModuleList;

