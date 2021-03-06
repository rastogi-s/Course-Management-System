import React from 'react';
import { Link } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'

class ModuleListItem extends React.Component {

    renderModalComp(){
        return <ConfirmationModal onClickConfirm={this.props.deleteItem}
                                  property={this.props.module} />;
    }

    render() {

        const link=(<Link to={`/course/${this.props.courseId}/edit/module/${this.props.module.id}`}>
            <strong style={{fontFamily:'Ariel',fontSize:"x-large",color:"black" }}>{this.props.module.title}</strong>
        </Link>);
        return (
            <div>
            <span className="list-group-item list-group-item-action my-1" style={{borderRadius:7, background:'lightgray'}}
               role="tab">{link}
                <i className="btn fa-2x fa fa-trash p-0 float-right" title="Remove"
                   style={{color:'black'}} data-toggle="modal" data-target={"#"+this.props.module.id}></i>

            </span>
                {this.renderModalComp()}

            </div>
        );
    }
}

export default ModuleListItem;