export interface DirectoryDocumentData {
  name: string
  createdAt: number
  updatedAt: number
}

export interface BranchDocumentData {
  name: string
  baseBranchId: string
  baseBranchName: string
  body: string
  state: 'open' | 'closed' | 'merged'
  createdAt: number
  updatedAt: number
}

export interface CommitDocumentData {
  name: string
  body: string
  createdAt: number
}
