# Elevator Panel UI

## Overview

A user interface proof of concept that simulates an elevator panel.  Based on HTML, CSS, and JavaScript.

### Usage
* The elevator starts off at the first floor on the page load.  Select the desired floors.
* The elevator will process all buttons pushed until it completed an up or down cycle.
* Any floor requested that is below the elevator's current floor on an up cycle will be processed once the cycle is complete, and vice versa for down cycles.
* Any floor requested that is above the elevator's current floor on a down cycle will be processed once it completes its down cycle.
* The button for a requested floor will backlight until the floor is reached.
* A chime will sound and the floor indicator will temporarily backlight and enlarge when a requested floor has been reached.
* Directional arrows will indicate if the elevator is on an up or down cycle, will not appear when the elevator has no requests queued.
* The default bottom floor is 1, and the default number of floors from the bottom floor is 4.  These values can be adjusted on about line 14 and line 23 on js/elevator.js respectively.

### Additional Information
This application is a tablet optimized platform that utilizes jQuery and various HTML5 components.  Some features may not work on older browser versions.  Code level documentation has been provided throughout the CSS and JavaScript.  Bug reports, feature requests, and pull requests are always welcome.

