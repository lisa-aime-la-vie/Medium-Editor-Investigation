import React from 'react'
import classNames from 'classnames'

class InsertButton extends React.Component<*, *> {
  constructor() {
    super()
    this.state = {
      isShow: false
    }
  }
  handleClick = () => {
    this.setState(prev => ({
      isShow: !prev.isShow
    }))
  }

  render() {
    const dynamicContent = [
      {
        disable: false,
        labelKey: "Agency name",
        value: "agency_name"
      },
      {
        disable: false,
        labelKey: "Event name",
        value: "event_name"
      }
    ];
    const { isShow } = this.state
    return (
      <div className="dropdown">
        <button className="dropdown-toggle" id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleClick}>
          Insert object
        </button>
        <div className={classNames("dropdown-menu", { "show" : isShow })} aria-labelledby="dropdownMenuButton">
        {
          dynamicContent.map(ele => {
            return (
              <a className="dropdown-item" tabindex="-1" href="#">{ele.labelKey}</a>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default InsertButton