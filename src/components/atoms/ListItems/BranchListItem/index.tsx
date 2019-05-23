import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { mergeBranch, closeBranch } from '../../../../actions/branches'

interface Props {
  currentUserUid: string
  directoryId: string
  currentBranchId: string
  baseBranchId: string
  branchName: string
  history: H.History
}

interface DispatchProps {
  mergeBranch: (currentUserUid: string, directoryId: string, branchId: string) => Promise<void>
  closeBranch: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const BranchListItem: React.FC<Props & DispatchProps> = ({
  currentUserUid,
  branchName,
  history,
  directoryId,
  currentBranchId,
  baseBranchId,
  mergeBranch,
  closeBranch,
}) => (
  <Fragment>
    <ListItem button component="a" href={`${directoryId}/${currentBranchId}/edit`}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faCodeBranch} />
      </ListItemIcon>
      <ListItemText primary={branchName} />
    </ListItem>
    {branchName !== 'master' && (
      <Fragment>
        <button
          onClick={() => {
            // TODO: 帰ってきたPromiseを何もせず放置しているのでどうにかしたい
            mergeBranch(currentUserUid, directoryId, currentBranchId)
          }}
        >
          merge
        </button>
        <button
          onClick={() => history.push(`/${directoryId}/diff/${baseBranchId}/${currentBranchId}`)}
        >
          check diff
        </button>
        <button onClick={() => closeBranch(currentUserUid, directoryId, currentBranchId)}>
          close blanch
        </button>
      </Fragment>
    )}
  </Fragment>
)

export default connect(
  null,
  { mergeBranch, closeBranch }
)(BranchListItem)
