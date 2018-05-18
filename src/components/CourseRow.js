import React from 'react';

class CourseRow extends React.Component {
    render() {
        return (
            <tr style={{ background:'white'}}>
                <td style={{width:"50%"}}>Course Row</td>
                <td style={{width:"20%"}}>Course Row</td>
                <td style={{width:"20%"}}>Course Row</td>
                <td style={{width:"10%"}}>
                    <i className="fa-2x fa fa-trash" title="Remove" style={{color:'black'}}></i>
                </td>

            </tr>

        )
    }
}

export default CourseRow;