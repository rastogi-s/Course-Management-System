import React from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'


class LessonTabsItem extends React.Component {

    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteItem}
                                  property={this.props.lesson} />;
    }


    render() {

        const link=(<Link
            to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId }/edit/lesson/${this.props.lesson.id}`}>
            <strong style={{fontFamily:'Ariel',fontSize:"large",color:"black" }}>{this.props.lesson.title}</strong>
        </Link>);
        return (
            <li className="nav-item">
                <span className="nav-link active"   role="tab"
                   aria-controls={this.props.lesson.title} aria-selected="true" ref={this.myRef} >{link}
                    <i className="btn fa-1x fa fa-trash py-1 ml-5 m-0 float-right" title="Delete Lesson"
                       style={{color: 'black', borderRadius: "50px"}} data-toggle="modal" data-target={"#"+this.props.lesson.id}></i>
                </span>
                {this.renderModalComp()}

            </li>
        );
    }
}

export default LessonTabsItem;