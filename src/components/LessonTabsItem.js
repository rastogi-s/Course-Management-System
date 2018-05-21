import React from 'react';
import { Link } from 'react-router-dom';

class LessonTabsItem extends React.Component {

    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    makeActive(){
        this.myRef.classList.add('active');
    }

    render() {

        const link=(<Link to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId }/edit/lesson/${this.props.lesson.id}`}>
            {this.props.lesson.title}
        </Link>);
        return (
            <li className="nav-item">
                <span className="nav-link"   role="tab"
                   aria-controls={this.props.lesson.title} aria-selected="true" ref={this.myRef} >{link}
                    <i className="btn fa-1x fa fa-trash py-1 ml-5 m-0 float-right" title="Delete Lesson"
                       style={{color: 'black', borderRadius: "50px"}} onClick={() => {this.props.deleteItem(this.props.lesson.id)}}></i>
                </span>

            </li>
        );
    }
}

export default LessonTabsItem;