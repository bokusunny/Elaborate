import React, { Fragment } from 'react'
import BlockTypeControls from '../../molecules/TypeControls/BlockTypeControls'
import InlineStyleControls from '../../molecules/TypeControls/InlineStyleControls'

import * as styles from './style.css'

const { toolBar } = styles

interface Props {
  shouldShowToolBar: boolean
  shouldShowToolBarInline: boolean
  toggleBlockType: (blockStyle: string) => void
  toggleInlineStyle: (inlineStyle: string) => void
}

const EditorToolBar: React.FC<Props> = ({
  shouldShowToolBar,
  shouldShowToolBarInline,
  toggleBlockType,
  toggleInlineStyle,
}) => (
  <Fragment>
    {shouldShowToolBar && (
      <div className={toolBar}>
        <BlockTypeControls onToggle={toggleBlockType} />
        {shouldShowToolBarInline && <InlineStyleControls onToggle={toggleInlineStyle} />}
      </div>
    )}
  </Fragment>
)

export default EditorToolBar
