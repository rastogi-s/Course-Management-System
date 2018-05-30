import React from 'react';

class EmptyRow extends React.Component {

    render() {
        return (
            <tr style={{ background:'lightgray'}}>
                <td>{this.props.day}</td>
            </tr>

        )
    }
}

export default EmptyRow;