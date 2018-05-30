import * as constants from "../constants/index";
import WidgetServiceClient from "../services/WidgetServiceClient";


export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)


export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)

export const widgetTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.WIDGET_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const imageURLChanged = (dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.IMAGE_SRC_CHANGED,
        id: widgetId,
        src: newUrl
    })
)

export const linkURLChanged = (dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        href: newUrl
    })
)

export const listItemsChanged = (dispatch, widgetId, newItems) => (
    dispatch({
        type: constants.LIST_ITEMS_CHANGED,
        id: widgetId,
        listItems: newItems
    })
)

export const listTypeChanged = (dispatch, widgetId, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType
    })
)


export const findAllWidgetsForTopic = (dispatch) => {
    var loc = window.location.href;
    var arrUrl = loc.split('/');
    console.log(arrUrl);
    var courseId = arrUrl[4];
    var moduleId = arrUrl[7];
    var lessonId = arrUrl[10];
    var topicId = arrUrl[13];
    console.log(courseId, moduleId, lessonId, topicId);
    var widgetService = WidgetServiceClient.instance;
    widgetService.findAllWidgetsForTopic(courseId, moduleId, lessonId, topicId).then(widgets => dispatch({
        type: constants.FIND_ALL_WIDGETS,
        widgets: widgets
    }));
}

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)
export const save = dispatch => (
    dispatch({type: constants.SAVE})
)
export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)