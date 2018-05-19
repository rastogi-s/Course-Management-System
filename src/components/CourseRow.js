import React from 'react';

class CourseRow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <tr style={{ background:'white'}}>
                <td style={{width:"40%"}}>{this.props.course.title}</td>
                <td style={{width:"25%",paddingLeft:30}}>me</td>
                <td style={{width:"25%"}}>{this.props.course.displayModDate}</td>
                <td style={{width:"10%"}}>
                    <i className="btn fa-2x fa fa-trash p-0" title="Remove"
                       style={{color:'black',background:'white'}} onClick={() => {this.props.deleteRow(this.props.course.id)}}></i>
                </td>

            </tr>

        )
    }
}

export default CourseRow;