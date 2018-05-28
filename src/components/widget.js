import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
    let selectElem
    let inputElem
    return(
        <div>
            <div hidden={preview}>
                <h2> Heading {widget.size}</h2>
                <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}
const dispathToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Heading)

const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)

const Image = () => (
    <h2>Image</h2>
)

const List = () => (
    <h2>List</h2>
)

const Widget = ({widget, preview, dispatch}) => {
    let selectElement
    return(
        <li>
            <div hidden={preview}>
                {widget.id} {widget.widgetType}

                <select value={widget.widgetType}
                        onChange={e =>
                            dispatch({
                                type: 'SELECT_WIDGET_TYPE',
                                id: widget.id,
                                widgetType: selectElement.value
                            })} ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                </select>

                <button onClick={e => (
                    dispatch({type: DELETE_WIDGET, id: widget.id})
                )}>Delete</button>
            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <Paragraph/>}
                {widget.widgetType==='List' && <List/>}
                {widget.widgetType==='Image' && <Image/>}
            </div>
        </li>
    )
}

const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)

export default WidgetContainer