import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

interface Props {
  id: string
  label: string
  classes: any
}

const styles = () => ({
  root: {
    border: 'none',
  },
})

const iconFolder = <FontAwesomeIcon icon={faFolderOpen} />

const DirectoryListItem: React.FC<Props> = ({ id, label, classes }) => (
  <ListItem className={classes.root} button component="a" href={`/${id}`}>
    <ListItemIcon>{iconFolder}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

DirectoryListItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DirectoryListItem)
