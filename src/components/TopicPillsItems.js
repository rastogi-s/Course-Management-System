import React from 'react';


class TopicPillsItems extends React.Component {

    render() {

        return (

            <li className="nav-item">
                <span className="btn nav-link" >
                <a  onClick={() => {this.props.toggleContent(this.props.topic.id)}}
                >{this.props.topic.title}</a>
                <i className="btn fa-1x fa fa-trash py-1 ml-2  float-right" title="Delete Lesson"
                   style={{color: 'black', borderRadius: "50px"}} onClick={() => {this.props.deleteItem(this.props.topic.id)}}></i>
            </span>
            </li>

        );
    }
}

export default TopicPillsItems;