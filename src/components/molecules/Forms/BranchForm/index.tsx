import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import Typography from '@material-ui/core/Typography'
import { createBranch } from '../../../../actions/branches'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'

interface Props {
  directoryId: string
  currentUser: firebase.User
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  createBranch: (values: Values, currentUserUid: string, directoryId: string) => Promise<void>
}

export interface Values {
  newBranchName: string
  baseBranchId: string
}

interface ErrorMessages {
  newBranchName?: string
  baseBranchId?: string
}

const validate = (values: Values) => {
  const errors: ErrorMessages = {}

  const lowercaseNewBranchName = values.newBranchName.toLowerCase()
  if (!values.newBranchName) {
    errors.newBranchName = 'Required'
  } else if (lowercaseNewBranchName === 'master') {
    errors.newBranchName = "'master' is not allowed for a branch name"
  }

  if (!values.baseBranchId) {
    errors.baseBranchId = 'Required'
  }

  return errors
}

const BranchForm: React.FC<Props> = ({ directoryId, currentUser, createBranch, branches }) => (
  <Fragment>
    <Typography variant="h6">New Branch</Typography>
    <Formik
      initialValues={{
        newBranchName: '',
        baseBranchId: ((branches.data as FirebaseSnapShot[]).find(
          branch => branch.data().name === 'master'
        ) as FirebaseSnapShot).id,
      }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createBranch(values, currentUser.uid, directoryId).then(() => {
          setSubmitting(false)
        })
      }}
      render={() => (
        <Form>
          <label htmlFor="newBranchName">branch Name</label>
          <Field id="newBranchName" name="newBranchName" placeholder="branch name" type="text" />
          <ErrorMessage component="div" name="newBranchName" />
          <Field name="baseBranchId" component="select">
            {(branches.data as FirebaseSnapShot[]).map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.data().name}
              </option>
            ))}
          </Field>
          <ErrorMessage component="div" name="baseBranchId" />
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
