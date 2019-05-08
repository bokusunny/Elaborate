import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import Typography from '@material-ui/core/Typography'
import { createBranch } from '../../../../actions/branches'

interface Props {
  directoryId: string
  currentUser: firebase.User
  createBranch: (values: Values, currentUserUid: string, directoryId: string) => Promise<void>
}

export interface Values {
  branchName: string
}

interface ErrorMessages {
  branchName?: string
}

const validate = (values: Values) => {
  const errors: ErrorMessages = {}

  const lowercaseBranchName = values.branchName.toLowerCase()
  if (!values.branchName) {
    errors.branchName = 'Required'
  } else if (lowercaseBranchName === 'master') {
    errors.branchName = "'master' is not allowed for a branch name"
  }

  return errors
}

const BranchForm: React.FC<Props> = ({ directoryId, currentUser, createBranch }) => (
  <Fragment>
    <Typography variant="h6">New Branch</Typography>
    <Formik
      initialValues={{ branchName: '' }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createBranch(values, currentUser.uid, directoryId).then(() => {
          setSubmitting(false)
        })
      }}
      render={() => (
        <Form>
          <label htmlFor="branchName">branch Name</label>
          <Field id="branchName" name="branchName" placeholder="branch name" type="text" />
          <ErrorMessage component="div" name="branchName" />
          <button type="submit" style={{ display: 'block' }}>
            Submit
          </button>
        </Form>
      )}
    />
  </Fragment>
)

export default connect(
  null,
  { createBranch }
)(BranchForm)
