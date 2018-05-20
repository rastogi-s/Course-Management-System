import React from 'react';
import { Link } from 'react-router-dom';

class LessonTabsItem extends React.Component {

    render() {

        const link=(<Link to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId }/edit/lesson/${this.props.lesson.id}/edit/topic`}>
            {this.props.lesson.title}
        </Link>);
        return (
            <li className="nav-item">
                <span className="nav-link" data-toggle="tab"  role="tab"
                   aria-controls={this.props.lesson.title} aria-selected="true">{link}
                    <i className="btn fa-1x fa fa-times py-1 pl-5 m-0 float-right" title="Delete Lesson"
                       style={{color: 'black', borderRadius: "50px"}}></i>
                   </span>

            </li>
        );
    }
}

export default LessonTabsItem;