$(document).ready(function() {

    var completed = 0;  // Counter of completed slot 
    var imgHeight = 1374;
    var posArr = [
            0,     //orange
            80,    //number 7 
            165,   //bar
            237,   //guava
            310,   //banana
            378,   //cherry
            454,   //orange
            539,   //number 7
            624,   //bar
            696,   //guava
            769,   //banana
            913,   //orange
            837,   //cherry
            1000,  //number 7
            1085,  //bar
            1157,  //guava
            1230,  //banana
            1298   //cherry
        ];
    
    var win = [];
    win[0] = win[454] = win[913] = 1;
    win[80] = win[539] = win[1000] = 2;
    win[165] = win[624] = win[1085] = 3;
    win[237] = win[696] = win[1157] = 4;
    win[310] = win[769] = win[1230] = 5;
    win[378] = win[837] = win[1298] = 6;


    function Slot(domObj, speed) {
        this.speed = 0; //speed of the slot at any point of time
        this.si = null; //holds setInterval object for the given slot
        this.domObj = domObj;    //dom element of the slot
        this.pos = null; //final position of the slot
        this.maxSpeed = speed;    

        $(domObj).pan({
            fps:30,
            dir:'down'
        });
        $(domObj).spStop();
    }


    // Start slot machine
    Slot.prototype.start = function() {

        // Make item move
        $(this.domObj).spStart();
        this.speed = this.maxSpeed;    
        $(this.domObj).spSpeed(this.speed);

        /// TODO 1: Get DOM object of itself (hint: keyword 'this')
        ///         add 'moving' to its classes to set a blurring effect.

        
        ///
    };


    // Stop a slot
    Slot.prototype.stop = function() {
        var _this = this,
            limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            // If slot speed > limit, decrease speed at a certain rate.
            if(_this.speed > limit) {
                _this.speed -= 5;
                $(_this.domObj).spSpeed(_this.speed);
            }
            // Else, stop the slot.
            if(_this.speed <= limit) {
                $(_this.domObj).spSpeed(0);
                $(_this.domObj).spStop();   
                clearInterval(_this.si);    // Clear timer event.

                /// TODO 2: Stop the slot:
                ///         1. set _this.speed to zero 
                ///         2. remove blurring effect
                ///         3. set final position by passing dom object to function 'finalPos()'.
                
                
                
                
                
                ///         
            }
        }, 100);
    };


    // Set final pos of a slot
    Slot.prototype.finalPos = function() {
        var domObj = this.domObj,
            domObj_id,
            pos,
            posMin = 2000000000,
            best,
            bgPos;

            domObj_id = $(domObj).attr('id');

        pos = document.getElementById(domObj_id).style.backgroundPosition;
        pos = pos.split(' ')[1];
        pos = parseInt(pos, 10);

        for(var i = 0; i < posArr.length; i++) {
            for(var j = 0;;j++) {
                var k = posArr[i] + (imgHeight * j);
                if(k > pos) {
                    if((k - pos) < posMin) {
                        posMin = k - pos;
                        best = k;
                        this.pos = posArr[i]; //update the final position of the slot
                    }
                    break;
                }
            }
        }

        best += imgHeight + 4;
        bgPos = "0 " + best + "px";
        console.log(bgPos);
        bgPosStr = "(" + bgPos + ")";

        /// TODO 3: "bgPosStr" holds the position of a slot will stop.
        ///         1. Use jQuery's animate to set the background position to "bgPosStr" in 200 ms (Hint: CSS attribute 'backgroundPosition').
        ///         2. After animation finished, increase the counter of completed slot by callback function.
        ///             Hint: Counter is at line 3.

        //
    };
    

    Slot.prototype.reset = function() {
        var domObj_id = $(this.domObj).attr('id');
        $._spritely.instances[domObj_id].t = 0;
        $(this.domObj).css('background-position', '0px 4px');
        this.speed = 0;
        completed = 0;
        $('#result').html('');
    };

    function printResult() {
        var res; // result message
        if(win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
            res = "You Win :D";
        } else {
            res = "You Lose :(";
        }
        /// TODO 4: Get DOM object with id "result"
        ///         set the content to result message 

        //
    }

    //create slot objects with different speed
    var a = new Slot('#slot1', 30),
        b = new Slot('#slot2', 50),
        c = new Slot('#slot3', 70);

    /**
    * Slot machine controller (all the actions of slot are controlled by the button)
    */
    /// TODO 5: Complete the click function to control the slot machine
    ///         1. Calling corresponding function (stop, reset)
    ///         2. In action "stop", check if slots have stopped, if so, print result by calling 'printResult()'.
    ///             Hint: Use 'Slot.speed' and 'completed counter (Line 3)' to check if all slots have stopped. 
    $('#control').click(function() {
        var x;
        if(this.innerHTML == "Start") {
            /// Start action (ToDo 5-1)
            //
            a.start();
            b.start();
            c.start();
            //
            this.innerHTML = "Stop";
        } else if(this.innerHTML == "Stop") {
            /// Stop action (ToDo 5-1)
            //

            //
            this.innerHTML = "Reset";

            // The timer is used to check slots every 100ms
            x = window.setInterval(function() {
                /// Check stop and print result (ToDo 5-2)
                // 

                //
            }, 100);
        } else { //reset
            /// Reset action (ToDo 5-1)
            //

            //
            this.innerHTML = "Start";
        }
    });
});
