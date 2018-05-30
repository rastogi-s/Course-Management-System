import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        console.log('that is why?');
        this.props.findAllWidgetsForTopic();
        // this.state={
        //     id:this.props.courseId
        // }

    }

    componentWillReceiveProps(props){
        console.log(props.topicId);
        //this.props.findAllWidgetsForTopic();
    }

    componentDidUpdate(prevProps) {
        console.log('that is why in previous props?');
        console.log(this.props.topicId);
        console.log(prevProps.topicId);
        if (this.props.topicId !== prevProps.topicId) {
            console.log('inside if');
            this.props.findAllWidgetsForTopic();
        }
    }



    sort(jsonObj) {

        jsonObj.sort(function (p, q) {
            return p.orderOfWidget - q.orderOfWidget;
        });

        return jsonObj;
    }


    renderWidgets(){
        console.log('that is why in props in render?');
        var newWidgetList=[];
        if(this.props.widgets!=undefined) {
            var widgets = this.sort(this.props.widgets);


            for (var w in widgets) {
                var widget = widgets[w];
                var disableUp = false;
                var disableDown = false;
                if (w == 0)
                    disableUp = true;
                if (w == widgets.length - 1)
                    disableDown = true;
                newWidgetList.push(<WidgetContainer widget={widget}
                                                    preview={this.props.previewMode}
                                                    key={w}
                                                    disableUp={disableUp}
                                                    disableDown={disableDown}/>)
            }
        }
        console.log(newWidgetList);
        return newWidgetList;
    }

    render() {
        console.log("dsdsds",this.props.widgets);

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-danger float-right" onClick={this.props.preview} title="Preview">
                                Preview
                            </button>
                            <button className="btn btn-primary mr-3 float-right" hidden={this.props.previewMode}
                                    onClick={this.props.save} title="Save">
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ul className="mt-5">
                                {this.renderWidgets()}
                                {/*{this.props.widgets.map(widget => (*/}
                                    {/*<WidgetContainer widget={widget}*/}
                                                     {/*preview={this.props.previewMode}*/}
                                                     {/*key={widget.id}/>*/}
                                {/*))}*/}
                            </ul>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <i className="btn btn-success fa-2x fa fa-plus float-right" title="Add widget"
                               onClick={this.props.addWidget}></i>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state,ownProps) => ({
    // courseId: ownProps.courseId,
    // moduleId: ownProps.moduleId,
    // lessonId: ownProps.lessonId,
    topicId: ownProps.topicId,
    widgets: state.widgets,
    previewMode: state.preview

})


const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgetsForTopic: () => actions.findAllWidgetsForTopic(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})


const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)


export default App