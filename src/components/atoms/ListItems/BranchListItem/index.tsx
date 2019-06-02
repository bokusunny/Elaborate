import React, { Fragment } from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'
const { listItemText, listItemSubText, subTextSpan, masterIcon, branchIcon } = styles

interface Props {
  directoryId: string
  currentBranchId: string
  branchName: string
  baseBranchName: string
  updatedAt: number
}

const BranchListItem: React.FC<Props> = ({
  directoryId,
  currentBranchId,
  branchName,
  baseBranchName,
  updatedAt,
}) => {
  const daysFromLastUpdate = moment.unix(updatedAt / 1000).from()
  const span = branchName !== 'master' ? subTextSpan : ''

  return (
    <ListItem
      button
      component="a"
      href={`${directoryId}/${currentBranchId}/edit`}
      className={styles.listItem}
    >
      <ListItemIcon>
        {branchName === 'master' ? (
          <img
            className={masterIcon}
            src="https://firebasestorage.googleapis.com/v0/b/elaborate.appspot.com/o/master%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.png?alt=media&token=ada980f3-098b-4140-b747-a88c3747d844"
          />
        ) : (
          <img
            className={branchIcon}
            src="https://firebasestorage.googleapis.com/v0/b/elaborate.appspot.com/o/branch%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.png?alt=media&token=f909dad7-c251-49d4-9c95-d2db76cef21c"
          />
        )}
      </ListItemIcon>
      <div>
        <div className={listItemText}>{branchName}</div>
        <div className={listItemSubText}>
          {branchName !== 'master' && (
            <Fragment>
              <FontAwesomeIcon icon={faArrowRight} />
              <span className={span}>{baseBranchName}</span>
              <span className={span}>|</span>
            </Fragment>
          )}
          <span className={span}>Updated {daysFromLastUpdate}</span>
        </div>
      </div>
    </ListItem>
  )
}

export default BranchListItem
