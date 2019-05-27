import React from 'react'
import { disclaimerMessageWrapper, disclaimerMessage } from './style.css'

const DisclaimerMessage: React.FC = () => (
  <div className={disclaimerMessageWrapper}>
    <p className={disclaimerMessage}>
      Elaborateをご利用頂きありがとうございます。本サービスは現在、スマートフォン、タブレットによるご利用に対応しておりません。お手数ですが、PCでのご利用をお願いいたします。
    </p>
  </div>
)

export default DisclaimerMessage
