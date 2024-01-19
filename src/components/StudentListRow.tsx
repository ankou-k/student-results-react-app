import React from 'react'
import { ConfirmDelete } from './ConfirmDelete.tsx';

// Create interfaces
interface StudentListRowUI {
  position: number;
  student: {
    id: number;
    firstName: string;
    familyName: string;
    birthDate: string;
  }
  handleDelete: (all: boolean, id: number) => void;
  handleStudentUpdate: (id: number, firstName: string, familyName: string) => void;
}

// Create row component
export const StudentListRow = (props: StudentListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.student.firstName}
    </td>

    {/*<td className="table-item">
      <Button variant="secondary" onClick={() => props.handleStudentUpdate(props.student.id, props.student.firstName, props.student.familyName)}>
        Edit student name
      </Button>
    </td>*/}

    <td className="table-item">
      {props.student.familyName}
    </td>

    {/*<td className="table-item">
      <Button variant="secondary" onClick={() => props.handleStudentUpdate(props.student.id, props.student.firstName, props.student.familyName)}>
        Edit student name
      </Button>
    </td>
  */}

    <td className="table-item">
      {props.student.birthDate}
    </td>

    <td className="table-item">
      <ConfirmDelete buttonText='Remove Student' 
      confirmText={`You are about to remove student named ${props.student.firstName} ${props.student.familyName}. Are you sure?`}
      id={props.student.id} all={false} handleDelete={props.handleDelete}/>
    </td>

  </tr>
)