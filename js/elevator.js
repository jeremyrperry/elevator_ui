/*
* Requirements:
*  A floor can be selected from the elevator panel.
*  A visual cue is provided of which floor was selected.
*  A visual cue is provided of the current floor.
*  A visual cue is provided of the elevator's direction (up/down).
*  The panel provides a visual cue when you have arrived at the selected floor.
*	Selecting a button anchor does not navigate or change the URL.
*/

//The elevator object
elevator = {
    //Variables that will be used throughout the application.
    bottomFloor: 1,//Sets the bottom floor
    currentFloor: null,
    direction: 'up',
    elevatorDing: null,
    inTransit: false,
    maxUp: false,
    maxDown: false,
    selectedFloors: [],
    topFloor: null,
    totalFloors: 20,//Sets the total number of floors, relative to the bottom floor.
    //The init function initializes the application.
    init: function(){
        //Values are computed as necessary
        this.topFloor = (this.bottomFloor+this.totalFloors)-1;
        this.currentFloor = this.bottomFloor;
        this.elevatorDing = document.getElementById('elevator_ding');
        var self  = this;
        $('#floor_number').text(this.currentFloor);
        //The elevator buttons are added to the floor button div element
        for(var i=this.topFloor; i>=this.bottomFloor; i--){
            $("#floor_buttons").append('<div class="floor" id="floor_'+i+'" data-floor="'+i+'">'+i+'</div>');
        }
        $('#msg').text('Please select your desired floor.');
        //Event listener for floor buttons
        $('.floor').on('click', function(){
            var dest = parseInt($(this).attr('data-floor'));
            if(dest != self.currentFloor && self.selectedFloors.indexOf(dest) == -1){
                $('#msg').text('Floor '+dest+' selected.');
                $(this).addClass('selected');
                self.selectedFloors.push(dest);
                if(self.selectedFloors.length < 2){
                    if(dest > self.currentFloor){
                        self.setDirection('up');
                    }
                    if(dest < self.currentFloor){
                        self.setDirection('down');
                    }
                }
                if(!self.inTransit) self.setTransit();
            }
        });
    },
    //resets the maximum and minimum floors recorded after a floor is reached.
    resetMax: function(){
        this.maxUp = false;
        this.maxDown = false;
    },
    //Sets the direction of the elevator
    setDirection: function(dir){
        var oppDir = (dir == 'up'? 'down': 'up');
        $('#direction').removeClass(oppDir).addClass(dir);
        this.direction = dir;

    },
    //Sets the timeout for the elevator to begin a transit.
    setTransit: function(timeout){
        if(typeof(timeout) == 'undefined') timeout = 2000;
        this.inTransit = true;
        var self = this;
        var transitTimeout = setTimeout(function(){
            $('#msg').text('Going '+self.direction+'.');
            self.transit();
        }, timeout);
    },
    //The code for once the elevator has stopped a transit.
    stopTransit: function(){
        this.elevatorDing.play();
        $('#floor_number').toggleClass('selected_text');
        setTimeout(function(){
            $('#floor_number').toggleClass('selected_text');
        }, 1500);
        var tmpArr = [];
        //Ensures the max values are reset, and the array has the current floor purged.
        this.resetMax();
        for(var i=0; i<this.selectedFloors.length; i++){
            var num = this.selectedFloors[i];
            if(num != this.currentFloor){
                tmpArr.push(num);
                if(!this.maxUp || this.maxUp < num) this.maxUp = num;
                if(!this.maxDown || this.maxDown > num) this.maxDown = num;
            }
        }
        this.selectedFloors = tmpArr;
        $('#msg').text('Arriving at floor '+this.currentFloor+'.');
        $('#floor_'+this.currentFloor).removeClass('selected');
        //For when no more floors are queued in the array.
        if(this.selectedFloors.length == 0){
            setTimeout(function(){
                $('#msg').text('Please select your desired floor.');
            }, 2000);
            this.inTransit = false;
            this.resetMax();
            $('#direction').removeClass(this.direction);
        }
        //If floors are still in the queue, this section will determine if the current up or down cycle is complete, and resumes the transit.
        else{
            var lastIndex = this.selectedFloors.length;
            lastIndex--;
            if(this.maxUp > this.currentFloor || this.currentFloor == this.bottomFloor){
                this.setDirection('up');
            }
            if(this.maxDown < this.currentFloor || this.currentFloor == this.totalFloors){
                this.setDirection('down');
            }
            this.setTransit(5000);
        }
    },
    //Starts the elevator transit, and checks each floor as the elevator passes to see if it needs to stop at the floor
    transit: function(){
        this.selectedFloors.sort();
        var self = this;
        var transitInterval = setInterval(function(){
            if(self.direction == 'up'){
                self.currentFloor++;
            }
            else{
                self.currentFloor--;
            }
            $('#floor_number').text(self.currentFloor);
            if(self.selectedFloors.indexOf(self.currentFloor) != -1){
                clearInterval(transitInterval);
                self.stopTransit();
            }
        }, 1000);
    }
};

//Starts the application on the document ready.
$(document).ready(function(){
    elevator.init();
});