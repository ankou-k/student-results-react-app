import React from 'react'
import { ConfirmDelete } from './ConfirmDelete.tsx';

// Create interfaces
interface CourseListRowUI {
  position: number;
  course: {
    id: number;
    courseName: string;
  }
  handleDelete: (all: boolean, id: number) => void;
}

// Create row component
export const CourseListRow = (props: CourseListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.course.courseName}
    </td>

    <td className="table-item">
      <ConfirmDelete buttonText='Remove Course' 
      confirmText={`You are about to remove the course called ${props.course.courseName}. Are you sure?`}
      id={props.course.id} all={false} handleDelete={props.handleDelete}/>
    </td>

  </tr>
)