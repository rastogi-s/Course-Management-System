import React from 'react';
//import ReactDOM, {render} from 'react-dom';
import CourseRow from './../components/CourseRow';
import EmptyRow from './../components/EmptyRow';
import AlertDiv from './../components/AlertDiv';
import CourseServiceClient from './../services/CourseServiceClient'
// import {DropdownButton} from 'react-bootstrap';
// import {MenuItem} from 'react-bootstrap';


class CourseList extends React.Component {

    // componentDidUpdate()
    // {
    //    console.log(document.getElementsByClassName('dropdown-toggle'));
    //     document.getElementsByClassName('dropdown-toggle')[0].bootstrapToggle();
    //     // $('.dropdown-toggle').bootstrapToggle();
    // }
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.state = {
            courses: [],
            course: {},
            alertMessage: '',
            alertDisplay: 'none',
            alertClass: '',
            sortType: 'modified'
        };
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.removeError = this.removeError.bind(this);
        this.setSortByTitle = this.setSortByTitle.bind(this);
        this.setSortByLastModified = this.setSortByLastModified.bind(this);
        this.setSortByLastOpened = this.setSortByLastOpened.bind(this);

    }

    setSortByTitle() {
        this.setState({sortType: 'title'});
        this.findAllCourses();
    }

    setSortByLastModified() {
        this.setState({sortType: 'modified'});
        this.findAllCourses();
    }

    setSortByLastOpened() {

    }

    deleteCourse(id) {

        this.courseService.deleteCourse(id).then(() => {
            this.findAllCourses();
        });
    }

    componentDidMount() {
        this.findAllCourses();
    }


    sortByDate(jsonObj, dateType) {
        jsonObj.sort(function (p, q) {
            var pDate = new Date(p[dateType]);
            var qDate = new Date(q[dateType]);
            return qDate.getTime() - pDate.getTime();
        });


    }


    sortByTitle(jsonObj) {
        jsonObj.sort(function (p, q) {
            if (p['title'].toLowerCase() > q['title'].toLowerCase())
                return 1;
            else if (p['title'].toLowerCase() < q['title'].toLowerCase())
                return 1;
            else
                return 0;
        });
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            if (this.state.sortType != 'title')
                this.sortByDate(courses, this.state.sortType);
            else
                this.sortByTitle(courses);

            for (var c in courses) {

                var modifiedDate = courses[c].modified;
                var d = new Date(modifiedDate);
                d = this.handleDate(d);
                courses[c]['displayModDate'] = d;

            }
            this.setState({courses: courses});
            //console.log(this.state.courses);
        });
    }

    handleDate(date) {

        var month = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August'
            , 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        };

        //console.log('in handle date');
        var today = new Date();
        var returnDate = date;
        if (date.getDay() === today.getDay() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            //console.log("todays date:" + date); 
            if (date.getHours() < 12)
                returnDate = date.getHours() + ':' + date.getMinutes() + ' AM';
            else
                returnDate = date.getHours() - 12 + ':' + date.getMinutes() + ' PM';
        }
        else {

            returnDate = month[date.getMonth()] + " " + (date.getDate()) + ", " + date.getFullYear();
        }
        return returnDate;
    }


    courseRow() {
        var courses = this.state.courses;
        var groupedCourses;
        if(courses!=null && courses.length!=0){
            groupedCourses=this.groupCoursesOnDate(courses);
            //console.log(groupedCourses);
        }
        var rows = [];

        for (var cat in groupedCourses) {
            //console.log(cat);
            rows.push(<EmptyRow key={cat} day={cat}/>);
            courses=groupedCourses[cat];
            for (var c in courses) {
                rows.push(<CourseRow course={courses[c]} key={courses[c].id} deleteRow={this.deleteCourse}/>);
            }
        }


        return (rows);
    }


    groupCoursesOnDate(courses){

        var month = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August'
            , 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        };
        var today = new Date();
        var currentDate = {'day': today.getDate(), 'month': today.getMonth(), 'year': today.getFullYear()};
        var newJson={};
        for(var c in courses) {
            var modifiedDate=new Date(courses[c].modified);

            var modDate = {
                'day': modifiedDate.getDate(),
                'month': modifiedDate.getMonth() ,
                'year': modifiedDate.getFullYear()
            };

            console.log();
            if (modDate['year'] < currentDate['year']) {
                if(newJson["Previous Year"]==null)
                    newJson["Previous Year"]=[];
                newJson["Previous Year"].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month'] - modDate['month'] > 1 ) {
                if(newJson[month[modDate['month']]]==null)
                    newJson[month[modDate['month']]]=[];
                newJson[month[modDate['month']]].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month']- modDate['month'] ==1) {
                if(newJson['Previous Month']==null)
                    newJson['Previous Month']=[];
                newJson['Previous Month'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month'] === modDate['month']
            && currentDate['day']- modDate['day']  >= 7) {
                if(newJson['Current Month']==null)
                    newJson['Current Month']=[];
                newJson['Current Month'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && modDate['month'] === currentDate['month']
                && currentDate['day']- modDate['day']  < 7 && currentDate['day']- modDate['day']  > 1) {
                if(newJson['Previous 7 days']==null)
                    newJson['Previous 7 days']=[];
                newJson['Previous 7 days'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && modDate['month'] === currentDate['month']
                && currentDate['day'] - modDate['day'] === 1) {
                if(newJson['Yesterday']==null)
                    newJson['Yesterday']=[];
                newJson['Yesterday'].push(courses[c]);
            }
            else{
                if(newJson['Today']==null)
                    newJson['Today']=[];
                newJson['Today'].push(courses[c]);

            }


        }

        //console.log("newJson");
        console.log(newJson);

    return newJson;

    }

    // addEmptyRows(modifDate, previous) {
    //
    //     var today = new Date(previous);
    //     var modifiedDate = new Date(modifDate);
    //     var currentDate = {'day': today.getDate(), 'month': today.getMonth()+1, 'year': today.getFullYear()};
    //     var modDate = {
    //         'day': modifiedDate.getDate(),
    //         'month': modifiedDate.getMonth()+1,
    //         'year': modifiedDate.getFullYear()
    //     };
    //
    //     console.log('previous');
    //     console.log(currentDate);
    //     console.log('currebt');
    //     console.log(modDate);
    //
    //
    //     if (modDate['year'] < currentDate['year'])
    //         return "Previous Year";
    //     else if (modDate['year'] === currentDate['year'] && modDate['month'] < currentDate['month']
    //         && currentDate['month'] - modDate['month'] == 1) {
    //         return "Previous Month";
    //     }
    //     else if (modDate['month'] === currentDate['month'] && modDate['year'] === currentDate['year']
    //         && currentDate['day'] - modDate['day'] < 7 && currentDate['day'] - modDate['day'] > 1) {
    //         return "Previous 7 days";
    //     }
    //     else if (modDate['month'] == currentDate['month'] && modDate['year'] === currentDate['year']
    //         && currentDate['day'] - modDate['day'] === 1) {
    //         return "Yesterday";
    //     }
    //     else {
    //         return null;
    //     }
    //
    // }

    createCourse() {
        console.log(this.state.course.title);
        if (this.state.course.title != null && this.state.course.title != '') {
            this.courseService
                .createCourse(this.state.course)
                .then(() => {
                    this.setState({
                        alertMessage: 'Course created successfully!!',
                        alertDisplay: 'block',
                        alertClass: 'alert-success',
                        course: {title: ''}
                    });
                    this.findAllCourses();
                });
        }
        else {
            console.log('title empty');
            this.setState({alertMessage: 'Title is required', alertDisplay: 'block', alertClass: 'alert-danger'});
        }

    }

    titleChange(event) {
        var date = new Date();
        console.log(date.getTime());
        this.setState({course: {title: event.target.value, created: date.getTime(), modified: date.getTime()}});
    }

    removeError() {
        this.setState({alertMessage: '', alertDisplay: 'none'});
    }


    render() {


        return (
            <div>
                <AlertDiv alertMessage={this.state.alertMessage} display={this.state.alertDisplay}
                          class={this.state.alertClass}/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th><select style={{background: 'lightgrey', border: 'none', fontWeight: 'bold'}}>
                            <option>Owned By Me</option>
                            <option>Owned By Others</option>
                            <option>Owned By Anyone</option>
                        </select>
                        </th>
                        <th>Last Modified</th>
                        <th style={{whiteSpace: "nowrap"}}>
                            <div className="dropdown">
                                <i className="btn fa-1x fa fa-th " title="grid"
                                   style={{color: 'black'}}></i>
                                <i className="btn fa-1x fa dropdown-toggle" title="Sort"
                                   style={{color: 'black'}} id="dropdownMenuButton" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false"></i>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={this.setSortByTitle}>Sort By Title</a>
                                    <a className="dropdown-item" onClick={this.setSortByLastModified}>Sort By Last
                                        Modified</a>
                                    <a className="dropdown-item" onClick={this.setSortByLastOpened}>Sort By Last
                                        Opened</a>
                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <th colSpan="3"><input id="newCourse" className="form-control" type="text"
                                               placeholder="New Course Title" value={this.state.course.title}
                                               onChange={this.titleChange} onFocus={this.removeError}/>

                        </th>
                        <th><i className="btn fa-2x fa fa-plus " title="Create"
                               style={{color: 'white', background: 'red', marginLeft: "6px", borderRadius: "50px"}}
                               onClick={this.createCourse}></i>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.courseRow()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default CourseList;