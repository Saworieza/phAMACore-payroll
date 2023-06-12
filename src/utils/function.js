class Functions {
  constructor(that) {
    this.that = that
  }
  /**
   * TODO: Change user Input to new values
   */
  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.that.setState({
      [name]: value,
    })
  }

  /**
   * TODO: checks if All field are field before API
   */
  checkEmpty = (requiredFields) => {
    const empty = []
    requiredFields.forEach((field) =>
      this.that.state[`${field}`] === '' || this.that.state[`${field}`] === null
        ? empty.push(field)
        : false,
    )
    if (empty.length === 0) {
      return false
    } else {
      this.that.setState({
        error: 'please fill the empty fields required!', // It appears there are required fields you haven't filled!
      })
    }

    empty.forEach((emptyField) => {
      const requiredInput = document.getElementById(`${emptyField}`)
      return requiredInput ? requiredInput.classList.add('required') : false
    })

    setTimeout(() => {
      this.that.setState({
        error: '',
      })
      empty.forEach((emptyField) => {
        const requiredInput = document.getElementById(`${emptyField}`)
        return requiredInput ? requiredInput.classList.remove('required') : false
      })
    }, 8000)
    return true
  }

  handleRowClick = (e, rowData) => {
    // rowData.tableData.checked = !rowData.tableData.checked;
    // call the onSelectionChange and pass it the row selected to ensure it updates your selection properly for any custom onSelectionChange functions.
    // this.that.state.tableRef.current.onSelectionChange(rowData);
    // JSON.stringify(rowData)
    this.that.setState({
      rowId: rowData.tableData.id,
      // rowId: rowData.length === 0 ? '' : rowData.tableData.id,
      selectedItems: rowData,
    })
    console.log(rowData)
  }
}

export default Functions
