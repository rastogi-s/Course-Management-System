import React from 'react';
import CourseCard from './../components/CourseCard';
import {Link} from 'react-router-dom';
import CourseServiceClient from './../services/CourseServiceClient';


class CourseGrid extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.myRef = React.createRef();
        this.state = {
            courses: [],
            course: {},
            sortType: 'modified'
        };
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.setSortByTitle = this.setSortByTitle.bind(this);
        this.selectTypeOfSort = this.selectTypeOfSort.bind(this);
        this.setSortByLastModified = this.setSortByLastModified.bind(this);

    }

    setSortByTitle() {
        this.setState({sortType: 'title'});
        this.findAllCourses();
    }

    setSortByLastModified() {
        this.setState({sortType: 'modified'});
        this.findAllCourses();
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
                return -1;
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

        var today = new Date();
        var returnDate = date;
        if (date.getDay() === today.getDay() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            if (date.getHours() < 12) {
                var min=date.getMinutes();
                if(min<10)
                    returnDate = date.getHours() + ':' + '0'+date.getMinutes() + ' AM';
                else
                    returnDate = date.getHours() + ':' + date.getMinutes() + ' AM';
            }
            else {
                var min=date.getMinutes();
                if(min<10)
                    returnDate = date.getHours()- 12 + ':' + '0'+date.getMinutes() + ' PM';
                else
                    returnDate = date.getHours()- 12 + ':' + date.getMinutes() + ' PM';
            }
        }
        else {

            returnDate = month[date.getMonth()] + " " + (date.getDate()) + ", " + date.getFullYear();
        }
        return returnDate;
    }


    courseCard() {
        var courses = this.state.courses;
        var rows = [];

        for (var c in courses) {
            rows.push(<CourseCard course={courses[c]} key={courses[c].id} deleteRow={this.deleteCourse}/>);
        }

        return (rows);
    }


    createCourse() {
        console.log(this.state.course.toString());
        var course = this.state.course;
        if (course.title === undefined || course.title === '') {
            var date = new Date();
            course = {title: 'New Course', created: date.getTime(), modified: date.getTime()};
        }
        this.courseService
            .createCourse(course)
            .then(() => {
                this.setState({
                    course: {title: ''}
                });
                this.myRef.current.value = '';
                this.findAllCourses();
            });

    }

    titleChange(event) {
        var date = new Date();
        console.log(date.getTime());
        this.setState({course: {title: event.target.value, created: date.getTime(), modified: date.getTime()}});
    }


    selectTypeOfSort(e){

        var val=e.target.selectedIndex;
        console.log(val);
        if(val==0){
            this.setSortByTitle();
        }
       else
           this.setSortByLastModified();
    }


    render() {

        const link = (<Link to={`/course/list`}><i className="btn fa-1x fa fa-list " title="list"
                                                   style={{color: 'black'}}></i></Link>);

        return (
            <div>
                <nav className="navbar navbar-dark  fixed-top bg-dark">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                    <a className="navbar-brand mr-auto" href="#"><h1 style={{fontFamily: 'Serif',paddingLeft:20,paddingTop:7}}>Course
                        Manager</h1></a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Course"
                               aria-label="Search" required/>
                        <i className="btn btn-dark fa-2x fa fa-search" title="Search"
                           style={{color: 'white'}}></i>
                    </form>
                </nav>

                <div style={{
                    paddingTop: "5.5rem",
                    paddingBottom: "5rem",
                    color: "black"
                }}>
                    <nav className="navbar  navbar-light bg-light ">
                        <div className="container">
                            <a className="navbar-brand" style={{fontWeight: 'bold'}}>Recent Documents</a>

                            <select style={{border: 'none', fontWeight: 'bold', marginLeft: 200}}>
                                <option>Owned By Me</option>
                            </select>


                            {link}

                            <select style={{border: 'none', fontWeight: 'bold'}} onChange={this.selectTypeOfSort}>
                                <option value="1" >Sort By Title</option>
                                <option value="2" >Sort By Last Modified</option>
                            </select>
                            <form className="form-inline">
                                <input id="newCourse" className="form-control" type="text"
                                       placeholder="New Course Title" ref={this.myRef}
                                       onChange={this.titleChange} />


                                <i className="btn btn-dark  fa-2x fa fa-plus ml-4" title="Create"
                                   style={{color: 'white', marginLeft: "6px"}}
                                   onClick={this.createCourse}></i>
                            </form>
                        </div>

                    </nav>
                    <div className="container mt-5">
                        <div className="card-columns">
                            {this.courseCard()}
                        </div>
                    </div>
                </div>


            </div>


        )
    }
}

export default CourseGrid;