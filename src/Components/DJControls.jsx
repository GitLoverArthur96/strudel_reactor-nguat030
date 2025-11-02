function DJControls() {
    return (
        <>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="cpm_input_box">SetCPM</span>
                <input type="text" class="form-control" placeholder="120" aria-label="cpm" aria-describedby="cpm_input_box" />
            </div>

            <br />

            <label for="volume_range" class="form-label">Set Volume</label>
            <input type="range" class="form-range" min="0" max="1" step="0.01" id="volume_range"></input>

            <br/>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </div>



        </>
    );


}

export default DJControls