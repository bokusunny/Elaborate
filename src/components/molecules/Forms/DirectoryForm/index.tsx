import React from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import Typography from '@material-ui/core/Typography'
import { createDirectory } from '../../../../actions/directories'
import * as styles from './style.css'
const { directoryFormWrapper, title, whiteBase, directoryName, errorMessage } = styles

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
  <div className={directoryFormWrapper}>
    <Typography variant="h6" className={title}>
      New Directory
    </Typography>
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
          <Field
            className={directoryName}
            name="directoryName"
            placeholder="directory name"
            type="text"
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                return
              } else if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
          <ErrorMessage component="div" name="directoryName" className={errorMessage} />
          <button type="submit" className={whiteBase}>
            Submit
          </button>
        </Form>
      )}
    />
  </div>
)

export default connect(
  null,
  { createDirectory }
)(DirectoryForm)
