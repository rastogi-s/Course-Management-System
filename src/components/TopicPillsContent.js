import React from 'react';


class TopicPillsContent extends React.Component {

    render() {

        return (
            <div>
                <i className="btn fa-2x fa fa-pencil " title="Edit Topic"
                   style={{color: 'black', borderRadius: "50px"}} onClick={() => {this.props.editItem(this.props.topic.id)}}></i>
            <div className="tab-pane fade show active jumbotron" id="pills-home" role="tabpanel"
                 aria-labelledby="pills-home-tab">{this.props.content}
            </div>
                </div>

        );
    }
}

export default TopicPillsContent;