import React from 'react'

const Header = () => {
  return (
    <div className='header-box'>
      <div className='header'>
        <div id="img">
          <a href="">
            <img src="https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png" alt="" />
          </a>
        </div>

        <div className='header-btns'>
          <button>INR</button>
          <button>BTC</button>
          <button>BUY BTC</button>
        </div>

        <div id='switch'>
        <label class="switch">
  <input type="checkbox"/>
  <span class="slider round"></span>
</label>
        </div>
      </div>
    </div>
  )
}

export default Header