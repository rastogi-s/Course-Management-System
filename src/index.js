import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import '../node_modules/react-bootstrap-toggle/dist/react-bootstrap-toggle';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
//import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery'

import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';


var containers = (

    <div>
        <CourseManager/>
    </div>

);




ReactDOM.render(containers,document.getElementById('root'));
