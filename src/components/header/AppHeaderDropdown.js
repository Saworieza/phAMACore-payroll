import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  // cilBell,
  // cilCreditCard,
  // cilCommentSquare,
  // cilEnvelopeOpen,
  // cilFile,
  cilLockLocked,
  // cilSettings,
  // cilTask,
  // cilUser,
} from '@coreui/icons'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  let history = useHistory()
  const handleLogOut = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <CDropdown className=" d-none d-md-block ">
      <span>Logged in as:</span>
      {/* <CDropdownToggle placement="bottom-end" className="py-0"> */}
      <CDropdownToggle className="profile" size="sm">
        {localStorage.getItem('fullusername')}
        {/* <CAvatar src={avatar8} size="md" /> */}
      </CDropdownToggle>
      <CDropdownMenu className="p-1 rounded-0">
        <CDropdownHeader className="bg-light fw-semibold p-1">Account</CDropdownHeader>
        <CDropdownItem onClick={handleLogOut} className="logout">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
