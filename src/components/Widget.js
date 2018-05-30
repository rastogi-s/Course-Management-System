import React from 'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET, MOVE_DOWN, MOVE_UP} from "../constants/index"
import * as actions from '../actions'

const dispatchToPropsMapper = dispatch => ({
    // heading
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),

    // paragraph
    widgetTextChanged: (widgetId, newText) =>
        actions.widgetTextChanged(dispatch, widgetId, newText),

    // Image
    imageURLChanged: (widgetId, newUrl) =>
        actions.imageURLChanged(dispatch, widgetId, newUrl),

    // Link
    linkURLChanged: (widgetId, newLinkUrl) =>
        actions.linkURLChanged(dispatch, widgetId, newLinkUrl),

    // List
    listItemsChanged: (widgetId, newListItems) =>
        actions.listItemsChanged(dispatch, widgetId, newListItems),

    listTypeChanged: (widgetId, newListType) =>
        actions.listTypeChanged(dispatch, widgetId, newListType),

})

const stateToPropsMapper = state => ({
    preview: state.preview,
    nonUniqueName: state.nonUniqueName,
    nonUniqueWidgetId: state.nonUniqueWidgetId
})

const Heading = ({widget, preview, widgetTextChanged, headingSizeChanged,widgetNameChanged , nonUniqueName, nonUniqueWidgetId}) => {
    let selectElem;
    let inputElemHead;
    let inputNameElemHead;
    let name;
    if (widget.name != null)
        name = widget.name;
    else
        name = '';
    return (
        <div>
            <div className="mt-3" hidden={preview}>
                <form className="">
                    <div className="form-group row">
                        <label htmlFor="headingText" className="col-sm-2 col-form-label "><h5>Heading Text</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="headingText"
                                   onChange={() => widgetTextChanged(widget.id, inputElemHead.value)}
                                   value={widget.text}
                                   ref={node => inputElemHead = node} placeholder="Heading Text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="headingSize" className="col-sm-2 col-form-label"><h5>Heading Size</h5></label>
                        <div className="col-sm-10">
                            <select className="form-control" id="headingSize"
                                    onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                                    value={widget.size}
                                    ref={node => selectElem = node}>
                                <option value="1">Heading 1</option>
                                <option value="2">Heading 2</option>
                                <option value="3">Heading 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="widgetName" className="col-sm-2 col-form-label"><h5>Widget Name</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="widgetName"
                                   onChange={() => widgetNameChanged(widget.id, inputNameElemHead.value)}
                                   value={name}
                                   ref={node => inputNameElemHead = node} placeholder="Widget Name"/>
                            {nonUniqueName && nonUniqueWidgetId === widget.id &&
                            <div className="alert alert-danger mt-2" role="alert">
                                The widget name is not unique!
                            </div>}
                        </div>
                    </div>
                    {/*{widget.name}*/}

                </form>
                <h3>Preview</h3>
            </div>
            <div className="row mt-2">
                <div className="col">
                    {widget.size == 1 && <h1>{widget.text}</h1>}
                    {widget.size == 2 && <h2>{widget.text}</h2>}
                    {widget.size == 3 && <h3>{widget.text}</h3>}
                </div>
            </div>
        </div>
    )
}

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)

const Paragraph = ({widget, preview, widgetTextChanged, widgetNameChanged, nonUniqueName, nonUniqueWidgetId}) => {
    let inputElem;
    let inputNameElem;
    let name;
    if (widget.name != null)
        name = widget.name;
    else
        name = '';
    return (
        <div>
            <div className="mt-3" hidden={preview}>
                <form className="">
                    <div className="form-group row">
                        <label htmlFor="paragraphText" className="col-sm-2 col-form-label "><h5>Paragraph Text</h5>
                        </label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="paragraphText"
                                      onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                                      value={widget.text}
                                      ref={node => inputElem = node} placeholder="Paragraph Text"></textarea>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="widgetName" className="col-sm-2 col-form-label"><h5>Widget Name</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="widgetName" placeholder="Widget Name"
                                   onChange={() => widgetNameChanged(widget.id, inputNameElem.value)}
                                   value={name}
                                   ref={node => inputNameElem = node}/>
                            {nonUniqueName && nonUniqueWidgetId === widget.id &&
                            <div className="alert alert-danger mt-2" role="alert">
                                The widget name is not unique!
                            </div>}
                        </div>
                    </div>
                </form>
                <h3>Preview</h3>
            </div>
            <div className="row mt-2">
                <div className="col">
                    {widget.text}
                </div>
            </div>
        </div>
    )
}

const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)

const Image = ({widget, preview, imageURLChanged, widgetNameChanged, nonUniqueName, nonUniqueWidgetId}) => {
    let inputElem;
    let inputNameElem;
    let name;
    if (widget.name != null)
        name = widget.name;
    else
        name = '';

    let src;
    if (widget.src != null)
        src = widget.src;
    else
        src = '';


    return (
        <div>
            <div className="mt-3" hidden={preview}>
                <form className="">
                    <div className="form-group row">
                        <label htmlFor="imageUrl" className="col-sm-2 col-form-label "><h5>Image URL</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="imageUrl"
                                   onChange={() => imageURLChanged(widget.id, inputElem.value)}
                                   value={src}
                                   ref={node => inputElem = node} placeholder="Image URL"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="widgetName" className="col-sm-2 col-form-label"><h5>Widget Name</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="widgetName" placeholder="Widget Name"
                                   onChange={() => widgetNameChanged(widget.id, inputNameElem.value)}
                                   value={name}
                                   ref={node => inputNameElem = node}/>
                            {nonUniqueName && nonUniqueWidgetId === widget.id &&
                            <div className="alert alert-danger mt-2" role="alert">
                                The widget name is not unique!
                            </div>}
                        </div>
                    </div>
                </form>
                <h3>Preview</h3>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <img src={src} className="form-control" alt="Image"/>
                </div>
            </div>
        </div>
    )
}

const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)

const Link = ({widget, preview, linkURLChanged, widgetNameChanged, widgetTextChanged, nonUniqueName, nonUniqueWidgetId}) => {
    let inputElem;
    let inputNameElem;
    let inputUrlElem;
    let name;
    if (widget.name != null)
        name = widget.name;
    else
        name = '';
    let href;
    if (widget.href != null)
        href = widget.href;
    else
        href = '';
    return (
        <div>
            <div className="mt-3" hidden={preview}>
                <form className="">
                    <div className="form-group row">
                        <label htmlFor="linkUrl" className="col-sm-2 col-form-label "><h5>Link URL</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="linkUrl"
                                   onChange={() => linkURLChanged(widget.id, inputUrlElem.value)}
                                   value={href}
                                   ref={node => inputUrlElem = node} placeholder="Link URL"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="linkText" className="col-sm-2 col-form-label "><h5>Link Text</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="linkText"
                                   onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                                   value={widget.text}
                                   ref={node => inputElem = node} placeholder="Link Text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="widgetName" className="col-sm-2 col-form-label"><h5>Widget Name</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="widgetName" placeholder="Widget Name"
                                   onChange={() => widgetNameChanged(widget.id, inputNameElem.value)}
                                   value={name}
                                   ref={node => inputNameElem = node}/>
                            {nonUniqueName && nonUniqueWidgetId === widget.id &&
                            <div className="alert alert-danger mt-2" role="alert">
                                The widget name is not unique!
                            </div>}
                        </div>
                    </div>
                </form>
                <h3>Preview</h3>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <a href={href}>{widget.text}</a>

                </div>
            </div>
        </div>
    )
}

const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)


const List = ({widget, preview, listItemsChanged, listTypeChanged, widgetNameChanged, nonUniqueName, nonUniqueWidgetId}) => {
    let inputElem;
    let selectElem;
    let inputNameElem;
    let name;
    if (widget.name != null)
        name = widget.name;
    else
        name = '';
    let listItems;
    if (widget.listItems != null)
        listItems = widget.listItems;
    else
        listItems = '';

    var previewList = [];
    var listOfLi = listItems.split(/\r?\n/);
    for (var x in listOfLi) {
        previewList.push(<li key={x}>{listOfLi[x]}</li>)
    }

    let listType;
    if (widget.listType != null)
        listType = widget.listType;
    else
        listType = 1;
    return (
        <div>
            <div className="mt-3" hidden={preview}>
                <form className="">
                    <div className="form-group row">
                        <label htmlFor="listItems" className="col-sm-2 col-form-label "><h5>List Items</h5></label>
                        <div className="col-sm-10">
                            <textarea className="form-control mt-3"
                                      onChange={() => listItemsChanged(widget.id, inputElem.value)}
                                      value={listItems}
                                      ref={node => inputElem = node}
                                      placeholder="Put each item in a separate row"></textarea>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="listType" className="col-sm-2 col-form-label "><h5>List Type</h5></label>
                        <div className="col-sm-10">
                            <select className="form-control mt-3"
                                    onChange={() => listTypeChanged(widget.id, selectElem.value)}
                                    value={listType}
                                    ref={node => selectElem = node} id="listType">
                                <option value="1">Unordered list</option>
                                <option value="2">Ordered List</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="widgetName" className="col-sm-2 col-form-label"><h5>Widget Name</h5></label>
                        <div className="col-sm-10">
                            <input className="form-control" id="widgetName" placeholder="Widget Name"
                                   onChange={() => widgetNameChanged(widget.id, inputNameElem.value)}
                                   value={name}
                                   ref={node => inputNameElem = node}/>
                            {nonUniqueName && nonUniqueWidgetId === widget.id &&
                            <div className="alert alert-danger mt-2" role="alert">
                                The widget name is not unique!
                            </div>}
                        </div>
                    </div>
                </form>
                <h3>Preview</h3>
            </div>
            <div className="row mt-2">
                <div className="col">
                    {listItems != '' && listType == 1 && <ul>{previewList}</ul>}
                    {listItems != '' && listType == 2 && <ol>{previewList}</ol>}
                </div>
            </div>
        </div>

    )
}

const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)


const Widget = ({widget, preview, disableUp, disableDown, dispatch}) => {

    let selectElement;
    return (
        <li className="" style={{color: 'white', listStyle: 'none', border: '1px dotted grey', padding: 20}}>
            <div hidden={preview}>
                <div className="row">
                    <div className="col">
                        <h1 className="float-left">{widget.widgetType} Widget</h1>
                        <i className="btn btn-danger fa-2x fa fa-times m-0 float-right " title="Update Topic Name"
                           onClick={e => (
                               dispatch({type: DELETE_WIDGET, id: widget.id})
                           )}></i>
                        <select className="form-control w-25 h-75 float-right m-0 mr-2" value={widget.widgetType}
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
                            <option>Link</option>
                        </select>
                        {!disableDown &&
                        <i className="btn btn-primary fa-2x fa fa-arrow-down float-right mr-2" title="Move Down"
                           onClick={e => (
                               dispatch({type: MOVE_DOWN, id: widget.id, orderOfWidget: widget.orderOfWidget})
                           )}></i>}
                        {!disableUp &&
                        <i className="btn btn-primary fa-2x fa fa-arrow-up float-right mr-2" title="Move Up"
                           onClick={e => (
                               dispatch({type: MOVE_UP, id: widget.id, orderOfWidget: widget.orderOfWidget})
                           )}></i>}

                    </div>
                </div>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )
}

const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)

export default WidgetContainer