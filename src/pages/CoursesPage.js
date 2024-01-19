import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import the notification library
import 'react-toastify/dist/ReactToastify.css';
import { CoursesList } from '../components/CoursesList.tsx';
import axios from 'axios';
import { ConfirmDelete } from '../components/ConfirmDelete.tsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';


function CoursesPage() {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
  }, []);

  const validateForm = () => {
    let errors = [];
    let counter = 0;
    if (!courseName) {
      errors[counter] = 'Course name is required';
      counter++;
    }

    return errors;
  }

  const handleSubmit = (event) => {

    // do not submit right away
    event.preventDefault();

    // check input validity
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Submit the form data here (no errors)
      console.log('Form data:', { courseName });
      axios
      .post('http://localhost:4001/courses/create', {
        courseName: courseName,
      })
      .then(res => {
        console.log(res.data);

        // update display
        fetchCourses();

        //clear form
        setCourseName('');
        toast.success('Success! New course added.');
      });
    } else {
      console.log(errors);
      // Display the errors
      for (let i = 0; i < errors.length; i++) {
        toast.error(errors[i]);
      }
    }
  }

  const handleCourseRemove = (id) => {
    // Send PUT request to 'courses/delete' endpoint
    axios
      .put('http://localhost:4001/courses/delete', { id: id})
      .then(() => {
        console.log(`Course removed.`)

        // Fetch all courses to refresh the display list
        fetchCourses()
      })
      .catch(error => console.error(`There was an error removing the course: ${error}`))
  }

  // handles deletion of singular and all courses
  const handleDelete = (all, id) => {
    if (all === true) {
      handleListReset();
    } else {
      handleCourseRemove(id);
    }
  }

  // delete all courses
  const handleListReset = (event) => {
    // send PUT request to 'courses/reset' endpoint
    axios.put('http://localhost:4001/courses/reset')
    .then(() => {
      // fetch all courses to refresh course list
      fetchCourses()
    })
    .catch(error => console.error(`There was an error resetting the courses list: ${error}`))
  }

  const fetchCourses = async () => {
    // Send GET request to 'courses/all' endpoint
    axios
      .get('http://localhost:4001/courses/all')
      .then(response => {
        // update the course state
        setCourses(response.data)

        // update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the course list: ${error}`))
  }
  
  return (
    <div>
      <Navigation />
      <div className='text-center'>
        <h1>Courses Page</h1>
      </div>
      <h3>Add New Course: </h3>
      <Form className='mb-3'>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="MATH 123" 
                value={courseName} // connect input to state
                onChange={(e) => setCourseName(e.target.value)} // update state on input change
                />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      
      <div>
        {/* Render courses list component */}
      <CoursesList courses={courses} loading={loading} handleDelete={handleDelete}/>

      {/* Show reset button if list contains at least one course */}
      {courses.length > 0 && (<ConfirmDelete buttonText='Delete All Courses' 
      confirmText={`You are about to delete all ${courses.length} course records. Are you sure?`}
      id={-1} all={true} handleDelete={handleDelete}/>)}
      </div>
    </div>
  );
}

export default CoursesPage;