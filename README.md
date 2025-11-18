# Strudel Demo - music coder

A web-based music app built with React and Strudel.js to create and play sounds using controls and buttons


### D3 Graph

Gain Visualisation

Graph showing gain levels as well as cpm
Color gradient from green to red



### Controls

# Stop and Play
Play Button: Starts/resumes playback of the current song
Stop Button: Stops all audio playback

# Save and Load
Save Json: Saves your current settings (CPM, volume) to browser localStorage
Load Json: Loads previously saved settings from localStorage

Shows a warning if no saved data exists

# Roll Canva
Shows the instruments as a roll for the user to see



# Text Area/ Editor
Text Area: Edit your Strudel code here
Changes are shown in the Text Editor below

Text Editor (Mirrors Code): Interactive code editor with syntax highlighting
Shows the processed/compiled version of your code

Hotkeys are disabled when typing here



### DJ Controls 

# Set Cpm
SetCPM: Control the tempo of the song (Cycles Per Minute)
Default: 120

# Volume Slider
Slider to control volume

From 0% to 100%
Shows current percentage
Default: 100%


# Hot Keys
Keyboard Shortcuts

Spacebar: Play/Pause toggle
R: Reload saved preset
S: Save preset
↑ / ↓: Increase/decrease volume by 10%
← / →: Decrease/increase CPM by 10
?: Show keyboard shortcuts help

Note: Hotkeys are disabled when typing in text inputs or the code editor.


### Link to Video Demo
https://www.youtube.com/watch?v=GzsLZijAFAw


### Getting Started

Open Terminal in View
Run "npm install" to install dependencies
Run "npm start" to start the development server


### Song Code Sources
Original Author: Algorave Dave
Source: https://www.youtube.com/watch?v=ZCcpWzhekEY



AI Tools Used: ChatGPT

Whats the syntax to use sweetalert ?

Swal.fire({
  title: "Your Title",
  text: "Your message here",
  icon: "success",  // success, error, warning, info, question
  showCancelButton: true,
  confirmButtonText: "OK",
  cancelButtonText: "Cancel"
});

and more similar templates