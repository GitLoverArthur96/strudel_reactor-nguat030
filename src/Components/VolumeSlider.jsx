

function VolumeSlider({ volume, onVolumeChange }) {
    return (
        <div >

            <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="volume_range" className="form-label">Set Volume</label>
                <span className="badge bg-secondary">{Math.round(Number(volume) * 100)}%</span>
            </div>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={onVolumeChange}></input>

        </div>
    );



}

export default VolumeSlider