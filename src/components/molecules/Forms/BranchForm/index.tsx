import React from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik'
import Typography from '@material-ui/core/Typography'
import { createBranch } from '../../../../actions/branches'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'
import { BranchDocumentData } from '../../../../common/static-types/document-data'
import * as styles from './style.css'
import { handleEnterKey } from '../../../../common/functions'
const {
  branchFormWrapper,
  whiteBase,
  title,
  branchName,
  baseBranch,
  errorMessage,
  selectedField,
} = styles

interface Props {
  directoryId: string
  currentUser: firebase.User
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  handleClose: () => void
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

const BranchForm: React.FC<Props> = ({
  directoryId,
  currentUser,
  createBranch,
  branches,
  handleClose,
}) => (
  <div className={branchFormWrapper}>
    <Typography variant="h6" className={title}>
      New Branch
    </Typography>
    <Formik
      initialValues={{
        newBranchName: '',
        baseBranchId: ((branches.data as FirebaseSnapShot[]).find(
          branch => (branch.data() as BranchDocumentData).name === 'master'
        ) as FirebaseSnapShot).id,
      }}
      validate={validate}
      onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
        createBranch(values, currentUser.uid, directoryId).then(() => {
          setSubmitting(false)
          handleClose()
        })
      }}
      render={() => (
        <Form>
          <Field
            className={branchName}
            name="newBranchName"
            placeholder="branch name"
            type="text"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              handleEnterKey(e)
            }}
          />
          <ErrorMessage component="div" name="newBranchName" className={errorMessage} />
          <div className={`${title} ${baseBranch}`}>Base branch</div>
          <Field name="baseBranchId" component="select" className={selectedField}>
            {(branches.data as FirebaseSnapShot[]).map(branch => (
              <option key={branch.id} value={branch.id}>
                {(branch.data() as BranchDocumentData).name}
              </option>
            ))}
          </Field>
          <ErrorMessage component="div" name="baseBranchId" className={errorMessage} />
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
  { createBranch }
)(BranchForm)
