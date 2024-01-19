import React from 'react'
import { ConfirmDelete } from './ConfirmDelete.tsx';

// Create interfaces
interface ResultsListRowUI {
  position: number;
  record: {
    id: number;
    studentName: string,
    courseName: string;
    score: string;
  }
  handleDelete: (all: boolean, id: number) => void;
}

// Create row component
export const ResultsListRow = (props: ResultsListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.record.courseName}
    </td>

    <td className="table-item">
      {props.record.studentName}
    </td>

    <td className="table-item">
      {props.record.score}
    </td>

    <td className="table-item">
      <ConfirmDelete buttonText='Remove Score Record' 
      confirmText={`You are about to remove ${props.record.studentName}'s score for ${props.record.courseName}. Are you sure?`}
      id={props.record.id} all={false} handleDelete={props.handleDelete}/>
    </td>

  </tr>
)