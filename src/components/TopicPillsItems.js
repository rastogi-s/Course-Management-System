import React from 'react';
import {Link} from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'
class TopicPillsItems extends React.Component {


    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteItem}
                                  property={this.props.topic} />;
    }

    render() {

        const link=(<Link
            to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId }/edit/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
            <strong style={{fontFamily:'Ariel',fontSize:"large",color:"black" }}>{this.props.topic.title}</strong>
        </Link>);
        return (

            <li className="nav-item p-0 pr-3">
                <span className="btn nav-link btn-primary" >
                    {link}
                <i className="btn fa-1x fa fa-trash py-1 ml-2  float-right" title="Delete Lesson"
                   style={{color: 'black', borderRadius: "50px"}} data-toggle="modal" data-target={"#"+this.props.topic.id}></i>
            </span>
                {this.renderModalComp()}
            </li>

        );
    }
}

export default TopicPillsItems;