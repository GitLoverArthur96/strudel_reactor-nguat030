function DJControls() {
    return (
        <>
            <h5 className="section-title">DJ Controls</h5>
            <br />
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="cpm_input_box">SetCPM</span>
                <input type="text" className="form-control" placeholder="120" aria-label="cpm" aria-describedby="cpm_input_box" />
            </div>

            <br />

            <label htmlFor="volume_range" className="form-label">Set Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"></input>

            <br/>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </div>



        </>
    );


}

export default DJControls