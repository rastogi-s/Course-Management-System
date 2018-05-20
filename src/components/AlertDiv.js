import React from 'react';

class AlertDiv extends React.Component {


    render() {

        var className='alert '+this.props.class;
        return (
            <div className={className} style={{ marginTop:10,display:this.props.display}}>
                {this.props.alertMessage}
            </div>

        )
    }
}

export default AlertDiv;