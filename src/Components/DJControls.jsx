function DJControls({volume, onVolumeChange, cpm, onCpmChange}) {
    return (
        <>
            <h4 className="section-title">DJ Controls</h4>
            <br />
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="cpm_input_box">SetCPM</span>
                <input type="number" className="form-control" placeholder="120" min={0} value={cpm} onChange={onCpmChange} aria-label="cpm" aria-describedby="cpm_input_box" />
            </div>

            <br />

            <label htmlFor="volume_range" className="form-label">Set Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={onVolumeChange}></input>

            <br/>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">S1</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">D1</label>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">C1</label>
            </div>



        </>
    );


}

export default DJControls