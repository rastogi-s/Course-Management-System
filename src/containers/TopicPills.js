import React from 'react';
import TopicPillsItems from './../components/TopicPillsItems'
import TopicServiceClient from './../services/TopicServiceClient'
// import {Provider} from 'react-redux'
// import {createStore} from 'redux'
// import {widgetReducer} from './../reducers/widgetReducer';
// import App from './WidgetList';

class TopicPills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            lesson: {},
            topic: '',
            topics: [],
        };
        this.topicService = TopicServiceClient.instance;
        this.myRef = React.createRef();
        //this.setCourseId = this.setCourseId.bind(this);
        //this.setModuleId = this.setModuleId.bind(this);
        this.set = this.set.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.editTopic = this.editTopic.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.findAllTopicsForLesson = this.findAllTopicsForLesson.bind(this);

    }

    componentWillReceiveProps(props) {
        this.set(props.courseId,props.moduleId,props.lessonId);
        // this.setCourseId(props.courseId);
        // this.setModuleId(props.moduleId);
        // this.setLessonId(props.lessonId);
        this.findAllTopicsForLesson();
    }

    set(courseId,moduleId,lessonId) {
        this.setState({courseId: courseId,moduleId: moduleId,lessonId: lessonId});
    }

    // setCourseId(courseId) {
    //     this.setState({courseId: courseId});
    // }
    //
    // setModuleId(moduleId) {
    //     this.setState({moduleId: moduleId});
    // }
    //
    // setLessonId(lessonId) {
    //     this.setState({lessonId: lessonId});
    // }

    findAllTopicsForLesson() {
        if (this.state.courseId != null && this.state.courseId != '' && this.state.moduleId != null &&
            this.state.moduleId != '' && this.state.lessonId != null && this.state.lessonId != '')
            this.topicService.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId)
                .then((topics) => {
                    this.setState({topics: topics});
                });
    }

    titleChange(event) {
        var content = this.state.topic.content;
        this.setState({topic: {title: event.target.value}});
    }

    createTopic() {
        var topic = this.state.topic;
        if (topic.title === undefined || topic.title === '') {
            topic = {title: 'New Topic'};
        }

        this.topicService
            .createTopic(this.state.courseId, this.state.moduleId, this.state.lessonId, topic)
            .then(() => {
                this.setState({
                    topic: {title: ''}
                });
                this.myRef.current.value = '';
                this.findAllTopicsForLesson();
            });


    }

    deleteTopic(id) {
        this.topicService.deleteTopic(id).then(() => {
            this.findAllTopicsForLesson();
        });
    }

    editTopic(topic, id) {
        this.topicService.updateTopic(id, topic).then(() => {
            this.findAllTopicsForLesson();
        });
    }


    renderTopicPillItems() {
        var topics = this.state.topics;
        var topicsList = [];
        for (var m in topics) {
            topicsList.push(<TopicPillsItems key={topics[m].id} courseId={this.state.courseId} topic={topics[m]}
                                             moduleId={this.state.moduleId} lessonId={this.state.lessonId}
                                             deleteItem={this.deleteTopic}/>);
        }
        return topicsList;
    }

    render() {
        console.log('in topic pills');
        // let store = createStore(widgetReducer);
        // let idState=[this.setCourseId()]
        return (
            <div>
                <ul className="nav nav-pills p-0 pt-3">
                    {this.renderTopicPillItems()}
                    <li className="nav-item p-0 pr-3">
                        <form className="form-inline mb-4">
                            <input className="form-control" placeholder="New Lesson Name"
                                   onChange={this.titleChange} ref={this.myRef}/>
                            <i className="btn fa-2x fa fa-plus pl-4 " title="Add a topic"
                               style={{color: 'white'}} onClick={this.createTopic}></i>
                        </form>

                    </li>

                </ul>
                <div>

                    {/*//<Route path="" > </Route>*/}

                </div>
            </div>
        );
    }
}

export default TopicPills;