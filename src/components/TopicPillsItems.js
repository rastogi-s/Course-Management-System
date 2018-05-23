import React from 'react';

import ConfirmationModal from './ConfirmationModal'
class TopicPillsItems extends React.Component {


    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteItem}
                                  property={this.props.topic} />;
    }

    render() {

        return (

            <li className="nav-item p-0 pr-3">
                <span className="btn nav-link btn-primary" >
                <a  onClick={() => {this.props.toggleContent(this.props.topic.id)}}
                >{this.props.topic.title}</a>
                <i className="btn fa-1x fa fa-trash py-1 ml-2  float-right" title="Delete Lesson"
                   style={{color: 'black', borderRadius: "50px"}} data-toggle="modal" data-target={"#"+this.props.topic.id}></i>
            </span>
                {this.renderModalComp()}
            </li>

        );
    }
}

export default TopicPillsItems;