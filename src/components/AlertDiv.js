import React from 'react';

class AlertDiv extends React.Component {

    constructor(props){
        super(props);

    }

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