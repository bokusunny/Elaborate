import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { mergeBranch } from '../../../../actions/branches'

interface Props {
  currentUserUid: string
  directoryId: string
  branchId: string
  branchName: string
}

interface DispatchProps {
  mergeBranch: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const BranchListItem: React.FC<Props & DispatchProps> = ({
  currentUserUid,
  branchName,
  directoryId,
  branchId,
  mergeBranch,
}) => (
  <Fragment>
    <ListItem button component="a" href={`${directoryId}/${branchId}/edit`}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faCodeBranch} />
      </ListItemIcon>
      <ListItemText primary={branchName} />
    </ListItem>
    {branchName !== 'master' && (
      <button onClick={() => mergeBranch(currentUserUid, directoryId, branchId)}>
        merge to master
      </button>
    )}
  </Fragment>
)

export default connect(
  null,
  { mergeBranch }
)(BranchListItem)
