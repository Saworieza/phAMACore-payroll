/* eslint-disable react/prop-types */
import React from 'react'
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'

export const Errors = ({ error }) => {
  return (
    <>
      <CAlert color="danger" className="d-flex align-items-center rounded-0 p-2 mb-2">
        <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
        <span>{error}</span>
      </CAlert>
    </>
  )
}
