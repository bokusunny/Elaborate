import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import { RawDraftContentBlock } from 'draft-js'
import Typography from '@material-ui/core/Typography'
import { createCommit } from '../../../../actions/commits'

export interface Values {
  commitName: string
}

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  rawContentBlocks: RawDraftContentBlock[]
}

interface DispatchProps {
  createCommit: (
    values: Values,
    currentUserUid: string,
    directoryId: string,
    branchId: string,
    rawContentBlocks: RawDraftContentBlock[]
  ) => Promise<void>
}

interface ErrorMessages {
  commitName?: string
}

const validate = (values: Values) => {
  const errors: ErrorMessages = {}

  if (!values.commitName) {
    errors.commitName = 'Required'
  }

  return errors
}

const CommitForm: React.FC<Props & DispatchProps> = ({
  currentUser,
  directoryId,
  branchId,
  rawContentBlocks,
  createCommit,
}) => (
  <Fragment>
    <Typography variant="h6">New Commit</Typography>
    <Formik
      initialValues={{ commitName: '' }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createCommit(values, currentUser.uid, directoryId, branchId, rawContentBlocks).then(() => {
          setSubmitting(false)
        })
      }}
      render={() => (
        <Form>
          <label htmlFor="commitName">branch Name</label>
          <Field id="commitName" name="commitName" placeholder="commit name" type="text" />
          <ErrorMessage component="div" name="commitName" />
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
  { createCommit }
)(CommitForm)
