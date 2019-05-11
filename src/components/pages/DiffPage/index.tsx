import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import DiffTemplate from '../../templates/DiffTemplate'

interface StateProps {
  selectedDirectoryId: string | null
  selectedBranchId: string | null
}

const DiffPage: React.FC<StateProps & RouteComponentProps> = ({
  selectedDirectoryId,
  selectedBranchId,
  history,
}) => (
  <DiffTemplate
    history={history}
    selectedDirectoryId={selectedDirectoryId}
    selectedBranchId={selectedBranchId}
  />
)

export default connect(
  ({ selectedDirectoryId, selectedBranchId }: StateProps) => ({
    selectedDirectoryId,
    selectedBranchId,
  }),
  null
)(DiffPage)
