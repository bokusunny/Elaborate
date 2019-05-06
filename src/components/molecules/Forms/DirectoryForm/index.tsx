import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import Typography from '@material-ui/core/Typography'
import { createDirectory } from '../../../../actions/directories'

interface Props {
  currentUser: firebase.User
  createDirectory: (values: Values, currentUserUid: string) => Promise<void>
}

export interface Values {
  directoryName: string
}

interface ErrorMessages {
  directoryName?: string
}

const validate = (values: Values) => {
  const errors: ErrorMessages = {}

  if (!values.directoryName) {
    errors.directoryName = 'Required'
  }

  return errors
}

const DirectoryForm: React.FC<Props> = ({ currentUser, createDirectory }) => (
  <Fragment>
    <Typography variant="h6">Create New Directory</Typography>
    <Formik
      initialValues={{ directoryName: '' }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createDirectory(values, currentUser.uid).then(() => {
          setSubmitting(false)
        })
      }}
      render={() => (
        <Form>
          <Field id="directoryName" name="directoryName" placeholder="Draft" type="text" />
          <ErrorMessage component="div" name="directoryName" />
          <button type="submit" style={{ display: 'block' }}>
            Add New Directory
          </button>
        </Form>
      )}
    />
  </Fragment>
)

export default connect(
  null,
  { createDirectory }
)(DirectoryForm)
