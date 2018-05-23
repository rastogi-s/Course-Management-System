import React from 'react';
import {Link} from 'react-router-dom'
import ConfirmationModal from "./ConfirmationModal";
import image from './../images/image1.jpg';

class CourseCard extends React.Component {

    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteRow}
                                  property={this.props.course} />;
    }

    render() {
        const link = (<Link to={`/course/${this.props.course.id}/edit`} style={{fontFamily:'Ariel',fontSize:"x-large",color:"black" }}  >
            {this.props.course.title}
        </Link>);
        return(
        <div className="card">
            <img className="card-img-top" src={image} alt="Card image cap" />

            <div className="card-footer">
                <h5 className="card-title">{link}</h5>
                <small className="text-muted">Modified: {this.props.course.displayModDate}</small>
                <i className="btn fa-2x fa fa-trash p-0 mb-3  float-right" title="Remove"
                   style={{color: 'black', background: 'white'}} data-toggle="modal" data-target={"#"+this.props.course.id}> </i>

                {this.renderModalComp()}
            </div>

        </div>
        );
    }
}

export default CourseCard;