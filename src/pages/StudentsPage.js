import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import the notification library
import 'react-toastify/dist/ReactToastify.css';
import { StudentList } from '../components/StudentList.tsx';
import axios from 'axios';
import { ConfirmDelete } from '../components/ConfirmDelete.tsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';


function StudentsPage() {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents()
  }, []);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  const validateForm = () => {
    let errors = [];
    let counter = 0;
    if (!firstName) {
      errors[counter] = 'First name is required';
      counter++;
    }
    if (!familyName) {
      errors[counter] = 'Family name is required';
      counter++;
    }
    if (!dateOfBirth) {
      errors[counter] = 'Date of birth is required';
      counter++;
    } else {
      // Check if the student is at least 10 years old
      var age = getAge(dateOfBirth);
      if (age < 10) {
        errors[counter] = 'Student must be at least 10 years old';
        counter++;
      }
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
      console.log('Form data:', { firstName, familyName, dateOfBirth });
      axios
      .post('http://localhost:4001/students/create', {
        firstName: firstName,
        familyName: familyName,
        birthDate: dateOfBirth,
      })
      .then(res => {
        console.log(res.data);

        // update student display
        fetchStudents();

        //clear form display
        setFirstName('');
        setFamilyName('');
        setDateOfBirth('');

        toast.success('Success! New student added.');
      });
    } else {
      console.log(errors);
      // Display the errors
      for (let i = 0; i < errors.length; i++) {
        toast.error(errors[i]);
      }
    }
  }

  const handleStudentRemove = (id) => {
    // Send PUT request to 'students/delete' endpoint
    axios
      .put('http://localhost:4001/students/delete', { id: id})
      .then(() => {
        console.log(`Student removed.`)

        // Fetch all students to refresh the student list
        fetchStudents()
      })
      .catch(error => console.error(`There was an error removing the student: ${error}`))
  }

  const handleStudentUpdate = (event) => {

  }

  const handleDelete = (all, id) => {
    if (all === true) {
      handleListReset();
    } else {
      handleStudentRemove(id);
    }
  }

  // delete all students
  const handleListReset = (event) => {
    // Send PUT request to 'students/reset' endpoint
    axios.put('http://localhost:4001/students/reset')
    .then(() => {
      // fetch all students to refresh student list
      fetchStudents()
    })
    .catch(error => console.error(`There was an error resetting the student list: ${error}`))
  }

  const fetchStudents = async () => {
    // Send GET request to 'students/all' endpoint
    axios
      .get('http://localhost:4001/students/all')
      .then(response => {
        // Update the student state
        setStudents(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the student list: ${error}`))
  }
  
  return (
    <div>
      <Navigation />
      <div className='text-center'>
        <h1>Students Page</h1>
      </div>
      <h3>Add New Student: </h3>
      <Form className='mb-3'>
        <Row>
          <Col>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Spongebob" 
            value={firstName} // connect input to state
            onChange={(e) => setFirstName(e.target.value)} // update state on input change
            />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3">
          <Form.Label>Family Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Squarepants" 
            value={familyName} // connect the input value to state
            onChange={(e) => setFamilyName(e.target.value)} // update state on input change
          />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control 
            type="date" 
            value={dateOfBirth} // connect the input value to state
            onChange={(e) => setDateOfBirth(e.target.value)} // update state on input change
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
        {/* Render student list component */}
      <StudentList students={students} loading={loading} handleDelete={handleDelete} handleStudentUpdate={handleStudentUpdate}/>

      {/* Show reset button if list contains at least one student */}
      {students.length > 0 && (<ConfirmDelete buttonText='Delete All Students' 
      confirmText={`You are about to delete ${students.length} student records. Are you sure?`}
      id={-1} all={true} handleDelete={handleDelete}/>)}
      </div>
    </div>
  );
}

export default StudentsPage;