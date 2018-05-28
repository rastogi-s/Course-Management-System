import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.idState[0]);
        this.props.findAllWidgetsForTopic(this.props.idState[0],this.props.idState[1],this.props.idState[2],this.props.idState[3]);
    }

    render() {
        return(
            <div>
                <h1>Widget List {this.props.widgets.length} and this is {this.props.courseId} </h1>

                <button hidden={this.props.previewMode} onClick={this.props.save}>
                    Save
                </button>
                <button onClick={this.props.preview}>
                    Preview
                </button>

                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>Add widget
                </button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    // courseId:ownProps.idState[0],
    // moduleId:ownProps.idState[1],
    // lessonId:ownProps.idState[2],
    // topicId:ownProps.idState[3],
    widgets: state.widgets,
    previewMode: state.preview

})


const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgetsForTopic: (courseId,moduleId,lessonId,topicId) => actions.findAllWidgetsForTopic(dispatch,
        courseId,moduleId,lessonId,topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})


const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)


export default App