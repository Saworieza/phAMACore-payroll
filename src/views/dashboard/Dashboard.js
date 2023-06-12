import React from 'react'
import Services from '../../utils/services/service'
import Functions from '../../utils/function'
import { Errors } from '../../utils/components/alerts'
import { tableIcons, tableOptions } from '../../utils/helpers'
import MaterialTable, { MTableToolbar } from 'material-table'
import { FaCaretRight } from 'react-icons/fa'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import { TelerikReportViewer } from '@progress/telerik-react-report-viewer'
import DatePicker from 'react-datepicker'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      isLoading: false,
      paySlipModal: false,
      viewerRef: React.createRef(),
      paySlips: [],
      selectedItems: [],
      error: '',
      rowId: '',
      queryDate: new Date().getFullYear(),
    }
    this.services = new Services(this)
    this.functions = new Functions(this)
  }
  componentDidMount() {
    this._isMounted = true
    this.services.GetPayslips()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  handleRowClick = (e, rowData) => {
    // rowData.tableData.checked = !rowData.tableData.checked;
    // call the onSelectionChange and pass it the row selected to ensure it updates your selection properly for any custom onSelectionChange functions.
    // this.that.state.tableRef.current.onSelectionChange(rowData);
    // JSON.stringify(rowData)
    this.setState({
      rowId: rowData.tableData.id,
      selectedItems: rowData,
      // prdNum: rowData?.prdNum,
      // emP_NUM: rowData?.emP_NUM,
      // payPeriod: rowData?.payPeriod,
      // payyear: rowData?.payyear,
      // branch: rowData?.branch,
      // dept: rowData?.dept,
      // MonthYear: rowData?.period,
    })
    const { viewerObject } = this.state.viewerRef.current
    viewerObject.reportSource({
      report: viewerObject.reportSource().report,
      parameters: {
        prdNum: rowData?.prdNum,
        emP_NUM: rowData?.emP_NUM,
        payPeriod: rowData?.payPeriod,
        payyear: rowData?.payyear,
        branch: rowData?.branch,
        dept: rowData?.dept,
        MonthYear: rowData?.period,
        ClientName: localStorage.getItem('clientName'),
        serverName: process.env.REACT_APP_SERVERNAME,
        companyName: 'malipoDB',
      },
    })
    console.log(rowData)
  }
  render() {
    let columns = [
      {
        title: '',
        field: 'icon',
        render: (rowData) => (this.state.rowId === rowData.tableData.id ? <FaCaretRight /> : ''),
        cellStyle: {
          width: '1%',
          textAlign: 'center',
        },
      },
      // { title: 'prdNum', field: 'prdNum' },
      // { title: 'Employer No', field: 'emP_NUM' },
      // { title: 'Acct Name', field: 'acctname' },
      { title: 'Pay Period', field: 'payPeriod' },
      { title: 'Period', field: 'period' },
      // { title: 'Department', field: 'dept' },
      // { title: 'Branch', field: 'branch' },
    ]
    return (
      <>
        <hr className="my-2" />
        <div className="container-fluid bg-light p-0">
          <div className="d-flex justify-content-between">
            <div className="flex-fill d-flex align-items-center">
              <div className="d-flex">
                <h6 className="m-0">Pay Slips</h6>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        {this.state.error && <Errors error={this.state.error} />}
        <div className="row">
          <div className="col-3">
            <div className="card rounded-0">
              <div className="card-body">
                <MaterialTable
                  icons={tableIcons}
                  options={{
                    ...tableOptions,
                    rowStyle: (rowData) => ({
                      backgroundColor:
                        this.state.rowId === rowData.tableData.id ? '#d8d8d8' : '#FFF',
                    }),
                  }}
                  components={{
                    Toolbar: (props) => (
                      <div
                        className="d-flex flex-row justify-content-end"
                        style={{ paddingTop: '1px' }}
                      >
                        <DatePicker
                          selected={this.state.queryDate}
                          placeholderText="DD/MM/YYYY"
                          className="form-control form-control-sm rounded-0 px-1"
                          id="entryDate"
                          name="entryDate"
                          dateFormat="yyyy"
                          maxDate={new Date()}
                          onChange={(date) => {
                            this.setState({ entryDate: date })
                          }}
                        />
                        {/* <MTableToolbar {...props} /> */}
                      </div>
                    ),
                  }}
                  onRowClick={(e, selectedRow) => this.handleRowClick(e, selectedRow)}
                  isLoading={this.state.isLoading}
                  columns={columns}
                  data={this.state.paySlips}
                  title=""
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-0">
              <div
                className="card-body"
                style={{
                  height: '570px',
                }}
              >
                <TelerikReportViewer
                  // ref={(el) => (Dashboard = el)}
                  ref={this.state.viewerRef}
                  serviceUrl={`${process.env.REACT_APP_URL_CONFIG}/api/reports`}
                  reportSource={{
                    report: 'rptpayslip.trdp',
                    parameters: {
                      // prdNum: 2,
                      // emP_NUM: 'CMP0001',
                      // payPeriod: '202302',
                      // payyear: 2023,
                      // branch: 1,
                      // dept: 1,
                      // MonthYear: 'Feb-2023',
                      // ClientName: 'Corebase Solutions Ltd',
                      // serverName: process.env.REACT_APP_SERVERNAME,
                      // companyName: 'malipoDB',
                    },
                  }}
                  viewerContainerStyle={{
                    position: 'absolute',
                    left: '10px',
                    right: '10px',
                    top: '10px',
                    bottom: '10px',
                  }}
                  viewMode="PRINT_PREVIEW"
                  // scaleMode="FIT_PAGE_WIDTH"
                  scaleMode="FIT_PAGE"
                  // scaleMode="SPECIFIC"
                  // scale={1.0}
                  enableAccessibility={false}
                />
              </div>
            </div>
          </div>
        </div>
        <CModal
          alignment="center"
          visible={this.state.paySlipModal}
          backdrop="static"
          size="xl"
          scrollable
        >
          <CModalHeader>
            <CModalTitle>Pay slip</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* <h1>Headed to greatness with Kinjoz</h1> */}
            <div className="card rounded-0">
              <div
                className="card-body"
                style={{
                  height: '570px',
                }}
              >
                <TelerikReportViewer
                  // ref={this.state.viewerRef}
                  serviceUrl={`${process.env.REACT_APP_URL_CONFIG}/api/reports`}
                  // serviceUrl={`https://phamacoreonline.co.ke:5022/api/reports`}
                  reportSource={{
                    report: 'rptpayslip.trdp',
                    parameters: {
                      // prdNum: 2,
                      // emP_NUM: 'CMP0001',
                      // payPeriod: '202302',
                      // payyear: 2023,
                      // branch: 1,
                      // dept: 1,
                      // MonthYear: 'Feb-2023',
                      // ClientName: localStorage.getItem('companyName'),
                      // serverName: process.env.REACT_APP_SERVERNAME,
                      // companyName: localStorage.getItem('clientCode'),
                    },
                  }}
                  viewerContainerStyle={{
                    position: 'absolute',
                    left: '10px',
                    right: '10px',
                    top: '10px',
                    bottom: '10px',
                  }}
                  viewMode="INTERACTIVE"
                  scaleMode="FIT_PAGE_WIDTH"
                  // scaleMode="FIT_PAGE"
                  // scaleMode="SPECIFIC"
                  // scale={1.0}
                  enableAccessibility={false}
                />
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <div className="d-flex justify-content-end">
              {/* <button
                type="button"
                className="btn update-btn btn-sm rounded-0 me-3"
                style={{ width: '5rem' }}
                // onClick={() => this.setState({ singleReport: true, viewReceipt: false })}
                onClick={this.handleReport}
              >
                Print
              </button> */}

              <button
                type="button"
                style={{ width: '5rem' }}
                className="btn btn-sm reverse-btn rounded-0"
                onClick={() => this.setState({ paySlipModal: false })}
                // onClick={() => this.props.history.push('/customer-quotations/quotations')}
              >
                Cancel
              </button>
            </div>
          </CModalFooter>
        </CModal>
      </>
    )
  }
}

export default Dashboard
