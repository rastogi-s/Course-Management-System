import React from 'react';
import TopicPillsItems from './../components/TopicPillsItems'
import TopicPillsContent from './../components/TopicPillsContent'
import TopicServiceClient from './../services/TopicServiceClient'
import AlertDiv from './../components/AlertDiv';

class TopicPills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId:'',
            lesson:{},
            topic:'',
            topics:[],
            alertMessage: '',
            alertDisplay: 'none',
            alertClass: '',
            showContent:{}
        };
        this.topicService = TopicServiceClient.instance;
        this.myRef = React.createRef();
        this.myForm = React.createRef();
        this.textAreaRef=React.createRef();
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        //this.setLesson = this.setLesson.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.editTopic = this.editTopic.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.removeError = this.removeError.bind(this);
        this.toggleShowContent= this.toggleShowContent.bind(this);
        this.findAllTopicsForLesson = this.findAllTopicsForLesson.bind(this);
        this.showAddTopicForm = this.showAddTopicForm.bind(this);

    }


    componentWillReceiveProps(props) {

        this.setCourseId(props.courseId);
        this.setModuleId(props.moduleId);
        this.setLessonId(props.lessonId);
        this.findAllTopicsForLesson();
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    findAllTopicsForLesson() {
        if(this.state.courseId!=null && this.state.courseId!='' && this.state.moduleId!=null &&
            this.state.moduleId!='' && this.state.lessonId!=null && this.state.lessonId!='')
        this.topicService.findAllTopicsForLesson(this.state.courseId,this.state.moduleId,this.state.lessonId)
            .then((topics) => {
            this.setState({topics: topics});
        });
    }

    titleChange(event) {
        var content=this.state.topic.content;
        this.setState({topic: {title: event.target.value,content:content}});
    }

    contentChange(event) {
        console.log(this.state.topic.title);
        var title=this.state.topic.title;
        this.setState({topic: {title:title,content: event.target.value}});
    }

    removeError() {
        this.setState({alertMessage: '', alertDisplay: 'none'});
    }

    createTopic() {
        if (this.state.topic.title != null && this.state.topic.title != '') {

            this.topicService
                .createTopic(this.state.courseId,this.state.moduleId,this.state.lessonId,this.state.topic)
                .then(() => {
                    this.setState({
                        alertMessage: 'Topic created successfully!!',
                        alertDisplay: 'block',
                        alertClass: 'alert-success',
                        topic: {title: '',content:''}
                    });
                    this.myRef.current.value='';
                    this.textAreaRef.current.value='';
                    this.findAllTopicsForLesson();
                    var form=document.getElementById('myForm');
                    form.classList.remove('d-block');
                    var addBtn=document.getElementById('firstAdd');
                    addBtn.classList.remove('d-none');
                });
        }
        else {

            this.setState({alertMessage: 'Title is required', alertDisplay: 'block', alertClass: 'alert-danger'});
        }
    }

    deleteTopic(id) {
        this.topicService.deleteTopic(id).then(() => {
            this.findAllTopicsForLesson();
        });
    }

    editTopic(topic,id) {
        this.topicService.updateTopic(id,topic).then(() => {
            this.findAllTopicsForLesson();
        });
    }


    renderTopicPillItems(){
        var topics=this.state.topics;
        var topicsList=[];
        for(var m in topics) {
            topicsList.push(<TopicPillsItems key={topics[m].id} courseId={this.state.courseId} topic={topics[m]}
                                             moduleId={this.state.moduleId}  lessonId={this.state.lessonId}
                                             deleteItem={this.deleteTopic} toggleContent={this.toggleShowContent}/>);
        }
        return topicsList;
    }

    showContentDiv(){

        var topics=this.state.topics;
        var topicsList=[];
        for(var m in topics){
            console.log(this.state.showContent.id);
            if(this.state.showContent!=null && this.state.showContent!={}  && topics[m].id==this.state.showContent.id){
                var div=document.getElementById("contentDiv");
                div.classList.add('d-block');
                topicsList.push(<TopicPillsContent key={topics[m].id} topicId={topics[m].id}  topic={topics[m]} editItem={this.editTopic} />)
            }
        }

        return topicsList;

    }

    toggleShowContent(topicId){

        this.setState({showContent:{id:topicId}});

    }

    showAddTopicForm(){
        var div=document.getElementById("contentDiv");
        div.classList.remove('d-block');
        div.classList.add('d-none');
        var form=document.getElementById('myForm');
        form.classList.add('d-block');
        var addBtn=document.getElementById('firstAdd');
        addBtn.classList.add('d-none');

    }

    hideAddTopic(){
        var form=document.getElementById('myForm');
        form.classList.remove('d-block');
        var addBtn=document.getElementById('firstAdd');
        addBtn.classList.remove('d-none');
    }

    render() {
        console.log('in topic pills');
        return (
            <div>
                <AlertDiv alertMessage={this.state.alertMessage} display={this.state.alertDisplay}
                          class={this.state.alertClass}/>

                <ul className="nav nav-pills p-0 pt-5">
                    {this.renderTopicPillItems()}
                    <li className="nav-item p-0 pr-3">
                        <i className="btn btn-danger fa-2x fa fa-plus ml-4" id="firstAdd" title="Add a topic"
                           style={{ color:'white'}} onClick={this.showAddTopicForm}></i>
                    </li>

                </ul>
                <div >
                    <form className="form-inline d-none" id="myForm" ref={this.myForm} >
                        <input className="form-control w-75" placeholder="New Topic Name"
                               onChange={this.titleChange} onFocus={this.removeError} ref={this.myRef}/>
                        <i className="btn btn-success fa-2x fa fa-plus ml-4"  title="Add"
                           style={{ color:'white'}} onClick={this.createTopic}></i>
                        <i className="btn btn-danger fa-2x fa fa-times m-4" title="Cancel"
                           style={{ color:'white'}} onClick={this.hideAddTopic}></i>
                        <div className="input-group w-100">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Topic content</span>
                            </div>
                            <textarea className="form-control" onChange={this.contentChange} onFocus={this.removeError}
                                      ref={this.textAreaRef} aria-label="With textarea"></textarea>
                        </div>
                    </form>

                    {/*//<Route path="" > </Route>*/}
                    <div  className="d-none" id="contentDiv">
                    {this.showContentDiv()}
                    </div>
                </div>
                </div>
        );
    }
}

export default TopicPills;