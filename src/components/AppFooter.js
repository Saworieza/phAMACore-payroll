import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <footer className="footer mt-2 d-flex justify-content-center">
      <p className="m-0">
        All rights Reserved{' '}
        <a href="https://corebase.co.ke/" rel="noopener noreferrer" target="_blank">
          &copy; CoreBase Solutions Limited
        </a>
      </p>
    </footer>
  )
}

export default React.memo(AppFooter)
