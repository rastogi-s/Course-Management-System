import React from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from './../reducers/widgetReducer';
import App from './../containers/WidgetList';


class TopicPillsContent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {topic:{},topicId:''};

        this.modifyContent = this.modifyContent.bind(this);
        this.textContentChange = this.textContentChange.bind(this);
        this.textTitleChange = this.textTitleChange.bind(this);
        this.setTopic=this.setTopic.bind(this);
    }

    componentWillReceiveProps(props){
        console.log('aaaaaaaaaaaaaadfsdfsd');
        this.setTopic(props.topic,props.topicId);
        document.getElementById("content").setAttribute('disabled','true');
        document.getElementById("topicTitle").setAttribute('disabled','true');

    }

    componentDidMount(){
        this.setTopic(this.props.topic,this.props.topicId);

    }

    modifyContent() {

        document.getElementById("content").removeAttribute("disabled");
        document.getElementById("topicTitle").removeAttribute("disabled");

    }

    setTopic(topic,id){
        this.setState({topic:topic});
        this.setState({topicId:id});
    }

    textContentChange(event) {

        this.setState({topic:{title:this.state.topic.title,content:event.target.value}});
    }

    textTitleChange(event) {

        this.setState({topic:{title:event.target.value,content:this.state.topic.content}});
    }

    render() {
        let store = createStore(widgetReducer);
        //let idState=[this.setCourseId()]

        return (
            <div>
                <div className="d-inline">
                    {/*<i className="btn btn-danger fa-2x fa fa-pencil mt-3 mb-3" title="Edit Topic"*/}
                       {/*style={{color: 'white'}} onClick={() => {*/}
                        {/*this.modifyContent()*/}
                    {/*}}></i>*/}
                    {/*<i className="btn btn-success fa-2x fa fa-check mt-3 mb-3 ml-3" title="Update Topic"*/}
                       {/*style={{color: 'white'}} onClick={() => {*/}
                        {/*this.props.editItem(this.state.topic,this.state.topicId)*/}
                    {/*}}></i>*/}

                    <div>
                    <Provider store={store} >
                    <App />
                    </Provider>
                    </div>
                </div>
                {/*<div className="input-group input-group-lg w-50 mb-3" id="dispTitleDiv">*/}
                    {/*<div className="input-group-prepend">*/}
                        {/*<span className="input-group-text bg-dark text-light" >Topic Name</span>*/}
                    {/*</div>*/}
                    {/*<input className="form-control" disabled id="content"  id="topicTitle" aria-label="With textarea"*/}
                           {/*onChange={this.textTitleChange} defaultValue={this.props.topic.title}/>*/}
                {/*</div>*/}

                {/*<div className="input-group input-group-lg " id="dispContDiv">*/}
                    {/*<div className="input-group-prepend">*/}
                        {/*<span className="input-group-text bg-dark text-light" >Content for the Topic</span>*/}
                    {/*</div>*/}
                    {/*<textarea className="form-control" disabled id="content" aria-label="With textarea"*/}
                              {/*onChange={this.textContentChange} defaultValue={this.props.topic.content}></textarea>*/}
                {/*</div>*/}

                {/*<div>*/}
                    {/*<Provider>*/}
                        {/*<App />*/}
                    {/*</Provider>*/}
                {/*</div>*/}

            </div>

        );
    }
}

export default TopicPillsContent;