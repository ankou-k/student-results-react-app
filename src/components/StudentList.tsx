// Import deps
import React from 'react';
import { StudentListRow } from './StudentListRow.tsx';
import { Table } from 'react-bootstrap';

// Create interfaces
interface StudentUI {
  id: number;
  firstName: string;
  familyName: string;
  birthDate: string;
}

interface StudentListUI {
  students: StudentUI[];
  loading: boolean;
  handleDelete: (all: boolean, id: number) => void;
  handleStudentUpdate: (id: number, firstName: string, familyName: string) => void;
}

// Create list component
export const StudentList = (props: StudentListUI) => {
  // Show loading message
  if (props.loading) return <p>Student table is loading...</p>

  return (
    <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">First Name</th>

            <th className="table-head-item">Family Name</th>

            <th className="table-head-item">Date of Birth</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.students.length > 0 ? (
            props.students.map((student: StudentUI, idx) => (
              <StudentListRow
                key={student.id}
                student={student}
                position={idx + 1}
                handleDelete={props.handleDelete}
                handleStudentUpdate={props.handleStudentUpdate}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no students to show. Add one!</td>
            </tr>
          )
        }
        </tbody>
    </Table>
  )
}