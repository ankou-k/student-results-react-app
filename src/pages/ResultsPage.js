import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import the notification library
import 'react-toastify/dist/ReactToastify.css';
import { ResultsList } from '../components/ResultsList.tsx';
import axios from 'axios';
import { ConfirmDelete } from '../components/ConfirmDelete.tsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';


function ResultsPage() {
  const [courseName, setCourseName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const grades = ['A', 'B', 'C', 'D', 'F']

  useEffect(() => {
    fetchCourses()
  }, []);
  useEffect(() => {
    fetchStudents()
  }, []);
  useEffect(() => {
    fetchRecords()
  }, []);

  const validateForm = () => {
    let errors = [];
    let counter = 0;
    console.log(studentName);

    if (!courseName) {
      errors[counter] = 'Course name is required';
      counter++;
    }
    if (!studentName) {
      errors[counter] = 'Student name is required';
      counter++;
    }
    if (!grade) {
      errors[counter] = 'Grade is required';
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
      .post('http://localhost:4001/results/create', {
        courseName: courseName,
        studentName: studentName,
        score: grade,
      })
      .then(res => {
        // update display
        fetchRecords();

        //clear form
        setCourseName('');
        setGrade('');
        setStudentName('');
        toast.success('Success! New record added.');
      });
    } else {
      // Display the errors
      console.log(errors);
      for (let i = 0; i < errors.length; i++) {
        toast.error(errors[i]);
      }
    }
  }

  const handleRecordRemove = (id) => {
    // Send PUT request to 'results/delete' endpoint
    axios
      .put('http://localhost:4001/results/delete', { id: id})
      .then(() => {
        console.log(`Record removed.`)

        // Fetch all courses to refresh the display list
        fetchRecords()
      })
      .catch(error => console.error(`There was an error removing the record: ${error}`))
  }

  // handles deletion of singular and all courses
  const handleDelete = (all, id) => {
    if (all === true) {
      handleListReset();
    } else {
      handleRecordRemove(id);
    }
  }

  // delete all courses
  const handleListReset = (event) => {
    // send PUT request to 'results/reset' endpoint
    axios.put('http://localhost:4001/results/reset')
    .then(() => {
      // fetch all records to refresh record list
      fetchRecords()
    })
    .catch(error => console.error(`There was an error resetting the records list: ${error}`))
  }

  const fetchRecords = async () => {
    // Send GET request to 'results/all' endpoint
    axios
      .get('http://localhost:4001/results/all')
      .then(response => {
        // update the course state
        setRecords(response.data);

        // update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the student list: ${error}`))
  }

  const fetchCourses = async () => {
    // Send GET request to 'courses/all' endpoint
    axios
      .get('http://localhost:4001/courses/all')
      .then(response => {
        // update the course state
        setCourses(response.data);

        // update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the course list: ${error}`))
  }

  const fetchStudents = async () => {
    // Send GET request to 'students/all' endpoint
    axios
      .get('http://localhost:4001/students/all')
      .then(response => {

        // Update the students to only have the names
        let studentNames = [];
        for (let i = 0; i < response.data.length; i++) {
          studentNames[i] = response.data[i]["firstName"] + " " + response.data[i]["familyName"];
        }
        setStudents(studentNames);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the student list: ${error}`))
  }
  
  return (
    <div>
      <Navigation />
      <div className='text-center'>
        <h1>Add New Results Page</h1>
      </div>
      <h3>Add New Result: </h3>
      <Form className='mb-3'>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Select 
                value={courseName} // connect input to state
                onChange={(e) => setCourseName(e.target.value)} // update state on input change
              >
                <option>Choose Course</option>
                {courses.map((course, i) =>
                <option
                  key={i}
                  value={course.courseName}>
                  {course.courseName}
                </option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select 
                value={studentName} // connect input to state
                onChange={(e) => setStudentName(e.target.value)} // update state on input change
              >
                <option>Choose Student</option>
                {students.map((student, i) =>
                <option
                  key={i}
                  value={student}>
                  {student}
                </option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Score</Form.Label>
              <Form.Select 
                value={courseName} // connect input to state
                onChange={(e) => setGrade(e.target.value)} // update state on input change
              >
                <option>Add Grade</option>
                {grades.map((grade, i) =>
                <option
                  key={i}
                  value={grade}>
                  {grade}
                </option>)}
              </Form.Select>
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
      <ResultsList records={records} loading={loading} handleDelete={handleDelete}/>

      {/* Show reset button if list contains at least one course */}
      {records.length > 0 && (<ConfirmDelete buttonText='Delete All Records' 
      confirmText={`You are about to delete all ${courses.length} records. Are you sure?`}
      id={-1} all={true} handleDelete={handleDelete}/>)}
      </div>
    </div>
  );
}

export default ResultsPage;