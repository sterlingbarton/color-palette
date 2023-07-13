import './ColorBox.css'

export default function ColorBox({background, name}) {
  return (
    <div style={{background}} className="color-box">
        <div className='copy-container'>
            <div className='box-content'>
                <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
        </div>
        <span className='see-more'>MORE</span>
    </div>
  )
}

