function SetCpm({ cpm, onCpmChange }) {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="cpm_input_box">SetCPM</span>
            <input type="number" className="form-control" placeholder="120" min={0} value={cpm} onChange={onCpmChange} aria-label="cpm" aria-describedby="cpm_input_box" />
        </div>
    );



}

export default SetCpm