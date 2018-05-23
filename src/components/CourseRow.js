import React from 'react';
import {Link} from 'react-router-dom'
import ConfirmationModal from "./ConfirmationModal";

class CourseRow extends React.Component {


    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteRow}
                                  property={this.props.course} />;
    }


    render() {
        const link = (<Link to={`/course/${this.props.course.id}/edit`}>
            {this.props.course.title}
        </Link>);
        return (
            <tr style={{background: 'white'}}>
                <td style={{width: "40%"}}>{link}</td>
                <td style={{width: "25%", paddingLeft: 30}}>me</td>
                <td style={{width: "25%"}}>{this.props.course.displayModDate}</td>
                <td style={{width: "10%"}}>
                    <i className="btn fa-2x fa fa-trash p-0" title="Remove"
                       style={{color: 'black', background: 'white'}} data-toggle="modal" data-target={"#"+this.props.course.id}> </i>

                    {this.renderModalComp()}
                </td>

            </tr>



        )
    }
}

export default CourseRow;