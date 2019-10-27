import React from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import { RawDraftContentBlock } from 'draft-js'
import Typography from '@material-ui/core/Typography'
import { createCommit } from '../../../../actions/commits'
import * as styles from './style.css'
const { commitFormWrapper, title, whiteBase, commitName, errorMessage } = styles

export interface Values {
  commitName: string
}

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchName: string
  rawContentBlocks: RawDraftContentBlock[]
  handleClose: () => void
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
  branchName,
  rawContentBlocks,
  handleClose,
  createCommit,
}) => (
  <div className={commitFormWrapper}>
    <Typography variant="h6" className={title}>
      To {branchName}
    </Typography>
    <Formik
      initialValues={{ commitName: '' }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createCommit(values, currentUser.uid, directoryId, branchId, rawContentBlocks).then(() => {
          setSubmitting(false)
          handleClose()
        })
      }}
      render={() => (
        <Form>
          <Field
            className={commitName}
            name="commitName"
            placeholder="commit name"
            type="text"
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                return
              } else if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
          <ErrorMessage component="div" name="commitName" className={errorMessage} />
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
  { createCommit }
)(CommitForm)
