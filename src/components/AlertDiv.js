import React from 'react';

class AlertDiv extends React.Component {


    render() {

        var className='alert '+this.props.class;//+" alert-dismissible";
        return (
            <div className={className} id="alert" style={{ marginTop:10,display:this.props.display}}>
                {this.props.alertMessage}
            </div>

        )
    }
}

export default AlertDiv;