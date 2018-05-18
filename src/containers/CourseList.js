import React from 'react';
import CourseRow from './../components/CourseRow';
import EmptyRow from './../components/EmptyRow';

class CourseList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By <i className="btn fa-1x fa fa-sort-down" title="Sort" style={{color:'black'}}></i></th>
                        <th>Last Modified</th>
                        <th style={{whiteSpace:"nowrap"}}><i className="btn fa-1x fa fa-th" title="grid" style={{color:'black'}}></i>
                            <i className="btn fa-1x fa fa-sort" title="Sort" style={{color:'black'}}></i>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <CourseRow/>
                    <CourseRow/>
                    <CourseRow/>
                    <CourseRow/>
                    <EmptyRow day="Yesterday"/>
                    <CourseRow/>
                    <CourseRow/>
                    <CourseRow/>
                    <EmptyRow day="May 1st"/>
                    <CourseRow/>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default CourseList;