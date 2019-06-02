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
          <img className={masterIcon} src="https://elabor-8.com/src/img/master.png" />
        ) : (
          <img className={branchIcon} src="https://elabor-8.com/src/img/branch.png" />
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
