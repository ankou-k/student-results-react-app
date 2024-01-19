// Import deps
import React from 'react';
import { Table } from 'react-bootstrap';
import { ResultsListRow } from './ResultsListRow.tsx';

// Create interfaces
interface ResultsUI {
    id: number;
    studentName: string,
    courseName: string;
    score: string;
}

interface ResultsListUI {
  records: ResultsUI[];
  loading: boolean;
  handleDelete: (all: boolean, id: number) => void;
}

// Create list component
export const ResultsList = (props: ResultsListUI) => {
  // Show loading message
  if (props.loading) return <p>Results table is loading...</p>

  return (
    <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Course</th>

            <th className="table-head-item">Student</th>

            <th className="table-head-item">Score</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.records.length > 0 ? (
            props.records.map((record: ResultsUI, idx) => (
              <ResultsListRow
                key={record.id}
                record={record}
                position={idx + 1}
                handleDelete={props.handleDelete}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no scores to show. Add one!</td>
            </tr>
          )
        }
        </tbody>
    </Table>
  )
}