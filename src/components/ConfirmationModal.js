import React from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

class ConfirmationModal extends React.Component {

    constructor(props){
        super(props);
        this.myRef=React.createRef();
        this.delete=this.delete.bind(this);
    }

    delete(){
        console.log(this.props.id);
        console.log('sasasadada');
        this.props.onClickConfirm(this.props.property.id);
        const elem=findDOMNode(this.myRef.current);
        $(elem).modal('toggle');
    }

    render() {
        return (
            <div className="modal fade" ref={this.myRef} id={this.props.property.id} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are You sure you want to delete :{this.props.property.title}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No
                            </button>
                            <button type="button" className="btn btn-primary"
                                    onClick={()=>this.delete()}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ConfirmationModal;