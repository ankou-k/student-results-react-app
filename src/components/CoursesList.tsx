// Import deps
import React from 'react';
import { CourseListRow } from './CourseListRow.tsx';
import { Table } from 'react-bootstrap';

// Create interfaces
interface CourseUI {
  id: number;
  courseName: string;
}

interface CoursesListUI {
  courses: CourseUI[];
  loading: boolean;
  handleDelete: (all: boolean, id: number) => void;
}

// Create list component
export const CoursesList = (props: CoursesListUI) => {
  // Show loading message
  if (props.loading) return <p>Courses table is loading...</p>

  return (
    <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Course name</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.courses.length > 0 ? (
            props.courses.map((course: CourseUI, idx) => (
              <CourseListRow
                key={course.id}
                course={course}
                position={idx + 1}
                handleDelete={props.handleDelete}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no courses to show. Add one!</td>
            </tr>
          )
        }
        </tbody>
    </Table>
  )
}