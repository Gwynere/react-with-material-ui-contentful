import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import Course from '../components/Course';

const SPACE_ID = 'bswolui59a1o';
const ACCESS_TOKEN = 'OPBx_jGb0hzdQA53P-qaXpPVkdbLxS4nhO9BT0umReg';

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

export default class CourseList extends Component {
    state = {
        courses: [],
        searchString: ''
    }

    constructor(){
        super()
        this.getCourses()
    }

    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({
                courses: response.items
            })
        })
        .catch((error) => {
            console.log('error occured while fetching data')
            console.log(error)
        })
    }

    onSearchInputChange = (event) => {
        if(event.target.value){
            this.setState({
                searchString: event.target.value
            })
        } else{
            this.setState({
                searchString: ''
            })
        }

        this.getCourses()
    }

    render() {
        return (
            <div>
                {this.state.courses ? (
                    <div>
                        <TextField 
                            style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for courses"
                            margin="normal"
                            onChange={this.onSearchInputChange} />
                        
                        <Grid container spacing={24} style={{padding: 24}}>
                            {this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'No courses found'}
            </div>
        )
    }
}
