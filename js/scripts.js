
var map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//0
    [1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//1
    [0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,1,0,1,1,0,0,1,1,1,0,1,0,0,0,0,1,1,0,0,0,1,0,1,0,1,0],//2
    [0,1,0,0,1,1,0,0,0,0,0,0,1,1,0,1,0,1,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],//3
    [0,1,0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1,1,0,0,0,0,0,0,0,1,0],//4
    [0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,1,1,0,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,0],//5
    [0,1,0,1,1,0,0,0,1,1,1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0],//6
    [0,1,0,1,1,0,0,0,1,0,0,0,1,0,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,0,1,0,1,1,1,1,1,0],//7
    [0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0],//8
    [0,1,0,1,1,0,1,1,1,0,0,0,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1],//9
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] //10
]; //0 1 2 3 4 5 6 7 8 9 10  12  14  16
                         //11  13  15



document.getElementById("backgroundMusic").volume = 0.7;
var heroPosition = { //starting position for hero
    x: 0, //vertical
    y: 1, //horisontell
}
var consoleDiv = document.getElementById("console");
var heroAttributes = {
    health: 0,
    strength: 3,
    agility: 3,
    mind: 3,
}

var counter = 0; 
var heroInventory = [];

//x horisontell  +1 x left -1 x right
//y vertical    -1 y up   +1 y down

//checking keys on keyboard that is pressed down and add 1 to coutner for each pressed down key/////
document.addEventListener ("keydown", function(e){
    counter++;
    document.getElementById("counter").innerHTML = "Actions done: " + counter;
    if (e.keyCode == 39) {moveRight(); document.getElementById("myAudio").play();} //when key is pressed call function for those keys (wsad)
    if (e.keyCode == 37) {moveLeft(); document.getElementById("myAudio").play();}     
    if (e.keyCode == 38) {moveUp(); document.getElementById("myAudio").play();}     
    if (e.keyCode == 40) {moveDown(); document.getElementById("myAudio").play();}
    if (e.keyCode == 32) {actionButton();} // space for pick up things
});

// Button functions 
function moveRight(){
    if ((heroPosition.x + 1)  < map[heroPosition.y].length && map[heroPosition.y][heroPosition.x+1] == 1) heroPosition.x++;
    drawMap(); // redraw the map each time the this function is called
    checkRoom(heroPosition.x,heroPosition.y);
};

function moveLeft(){
    if (heroPosition.x > 0 && map[heroPosition.y][heroPosition.x-1] == 1 ) heroPosition.x--;
    drawMap();
    checkRoom(heroPosition.x,heroPosition.y);
};

function moveUp(){
    if (heroPosition.y > 0 && map[heroPosition.y-1][heroPosition.x] == 1 ) heroPosition.y--;
    drawMap();
    checkRoom(heroPosition.x,heroPosition.y);
};

function moveDown(){
    if ((heroPosition.y + 1) < map.length && [1,4].indexOf(map[heroPosition.y+1][heroPosition.x]) != -1) heroPosition.y++;
    drawMap();
    checkRoom(heroPosition.x,heroPosition.y);
};

// Action Button
function actionButton(){
    for (var i in roomEvents){
        if (heroPosition.x == roomEvents[i].x && heroPosition.y == roomEvents[i].y && roomEvents[i].picked == false){ //check if the item you want to pick up is true or false, picked = false you have not picked it yet.
            heroInventory.push(roomEvents[i]);
            eventChecker(roomEvents[i]);
//            drawInventory(); // Not sure if this funtion should be here anymore
        }    
    }
};

//Check health function

function  checkHealth(){
    // If health is under 0 you die and get this end.
    if (heroAttributes.health <= -2){
        var end = false; 
        moveUp = undefined;
        moveDown = undefined;
        moveRight = undefined;
        moveLeft = undefined;
        actionButton = undefined;
        consoleDiv.innerHTML = "You are dead!";
        drawEnd(end);
    }
    // If you manage to walk to the end you get this ending.
    if (heroPosition.x == 64 && heroPosition.y == 9){
        var end = true;
        moveUp = undefined;
        moveDown = undefined;
        moveRight = undefined;
        moveLeft = undefined;
        actionButton = undefined;
        consoleDiv.innerHTML = "You made it!";
        drawEnd(end);
    }    
}

//Check items and set new attribute, also unlock doors.
function eventChecker(roomEvent){
    switch(roomEvent.type){
        case "key":
            var keyObj = roomEvents[roomEvent.name];
            var doorObj = roomEvents[roomEvent.door];
            var doorX = doorObj.x;
            var doorY = doorObj.y;
            map[doorY][doorX] = 1;
            keyObj.picked = true;
            roomEvents[roomEvent.door].picked = true;
            document.getElementById(doorObj.sound).play(); // Need to fix this code
            drawMap();
            consoleDiv.innerHTML = "Door opened";
            break;

        case "item":
            var itemObj = roomEvents[roomEvent.name];
            for (var stat in roomEvent.stats){
                var statValue = roomEvent.stats[stat];
                heroAttributes[stat] += statValue;
                drawAttributes();
            }
            var itemX = roomEvent.x;
            var itemY = roomEvent.y;
            map[itemY][itemX] = 1;
            itemObj.picked = true;
                if (itemObj.sound) document.getElementById(itemObj.sound).play(); //plays sound of that specific item
                    checkHealth();
                    drawMap();
                    break;

        case "monster":
            var monsterObj = roomEvents[roomEvent.name];
            var monsterCounter = roomEvent.counter;
            var monsterCounterFound = false;
            for (var i = 0; i < heroInventory.length; i++){
                if (heroInventory[i].name == monsterCounter) {
                    monsterCounterFound = true;
                }
            }
            if (monsterCounterFound) {
                var doorObjMonster = roomEvents[roomEvent.door];
                var doorX = doorObjMonster.x;
                var doorY = doorObjMonster.y;
                map[doorY][doorX] = 1;
                monsterObj.cssClass = monsterObj.cssClassDead;
                document.getElementById(monsterObj.sound).play(); // Plays the sound of the monster.
            }
            else heroAttributes.health -= monsterObj.damage;
                //check health function.
            checkHealth();
            drawAttributes();
            drawMap();
            break;
    }
}


// Moving and draws map
var element = document.getElementById("map"); 

function drawMap(){    
    while (element.firstChild) { //removes all child elements of map so the function can rewrite the map on the same location.
        element.removeChild(element.firstChild);
    }
    for (var y = 0; y < map.length; y++){
        for (var x = 0; x < map[y].length; x++){
            var blockClass = "wall";
            if (y == heroPosition.y && x == heroPosition.x) blockClass = "hero";
            else {
                //check items on the map and add the cssClass for it
                for (var i in roomEvents){
                    if (roomEvents[i].x == x && roomEvents[i].y == y && roomEvents[i].picked  == false) blockClass = roomEvents[i].cssClass;
                }
                if (blockClass == "wall" && map[y][x] == 1) blockClass = "floor";
            }
            var newDiv = document.createElement("div");
            newDiv.classList.add(blockClass);
            element.appendChild(newDiv);
        }
    }
}

//draw dead end
function drawEnd(end){
    console.log(end);
    if (end == false){
    var endDiv = document.getElementById("end");
    endDiv.innerHTML = "You are dead <br> Game Over!";
    }
    else if (end == true){
        var endDiv = document.getElementById("end");
    endDiv.innerHTML = "You made it!";
    }
}

// Draw inventory
function drawInventory(){
    var items = [];
    for (var i = 0; i < heroInventory.length; i++){
        var item = heroInventory[i];
        items.push(item.name);
    }
    document.getElementById("inventory").innerHTML = items.join(", ");
}

// Draw attributes
function drawAttributes(){
    var attributes = [];
    for (var attribute in heroAttributes){
        attributes.push(attribute + ": " + heroAttributes[attribute]);
    }
    document.getElementById("attributeDiv").innerHTML = attributes.join(" || ");
}

// Check whats inside a room
function checkRoom(heroX,heroY){
    for (var i in roomEvents){
        if (heroX == roomEvents[i].x && heroY == roomEvents[i].y) {
            if (roomEvents[i].description) consoleDiv.innerHTML = roomEvents[i].description;
        } 
    }
}
// Check for room events 
var roomEvents = {
    // Items
    axe: {
        name: "axe",
        cssClass: "axe",
        picked: false, //if not picked false, when picked change to true
        description: "You see a shiny Axe!",
        sound: "myAudioAxe",
        type: "item",
        stats: {strength: 2, agility: -1},
        x: 1,
        y: 9,
    },
    
    chest: {
        name: "chest",
        cssClass: "chest",
        picked: false, //if not picked false, when picked change to true
        description: "WOW im rich!",
        sound: "myAudioChest",
        type: "item",
        x: 54,
        y: 6,
    },
    
    potionOne: {
        name: "potionOne",
        cssClass: "potion",
        picked: false, //if not picked false, when picked changes to true
        description: "Hmm should I drink it or not?!",
        sound: "myAudioDrink",
        type: "item",
        stats: {health: -10},
        x: 2,
        y: 2,
    },
    
    potionTwo: {
        name: "potionTwo",
        cssClass: "potionPink",
        picked: false, //if not picked false, when picked changes to true
        description: "Pink is good right?",
        sound: "myAudioDrink",
        type: "item",
        stats: {health: -10},
        x: 34,
        y: 2,
    },
    
    sunlight: {
        name: "sunlight",
        cssClass: "potionLight",
        picked: false, //if not picked false, when picked changes to true
        description: "Something is burning inside.",
        sound: "myAudioDrink",
        type: "item",
        x: 34,
        y: 4,
    },
    
    potionFour: {
        name: "potionFour",
        cssClass: "potionBlack",
        picked: false, //if not picked false, when picked changes to true
        description: "Black blood it says on the description. This one I should drink!",
        sound: "myAudioDrink",
        type: "item",
        stats: {health: +5},
        x: 34,
        y: 6,
    },
    
    end: {
        name: "end",
        cssClass: "end",
        picked: false, //if not picked false, when picked changes to true
        description: "Click me?!",
        type: "item",
        x: 64,
        y: 9,
    },
    
    heart: {
        name: "heart",
        cssClass: "heart",
        sound: "myAudioHeartBeat",
        picked: false,
        description: "Buh-bump! You love kittens!!!",
        type: "item",
        x: 8,
        y: 4,
    },
    // Doors
    doorOne: {
        name: "doorOne",
        cssClass: "door",
        sound: "myAudioDoor",
        picked: false,
        type: "door",
        x: 2,
        y: 5,
    },

    doorTwo: {
        name: "doorTwo",
        cssClass: "door",
        sound: "myAudioDoor",
        picked: false,
        type: "door",
        x: 5,
        y: 9,
    },
    
    doorThree: {
        name: "doorThree",
        cssClass: "floor",
        sound: "myAudioDoor",
        picked: false,
        type: "door",
        x: 7,
        y: 4,
    },
    
    doorFour: {
        name: "doorFour",
        cssClass: "floor",
        picked: false,
        type: "door",
        x: 51,
        y: 5,
    },
//    6,4
    
    
    doorSecretOne: { //Pick up key to show new path
        name: "doorSecretOne",
        cssClass: "wall",
        sound: "myAudioDoor",
        picked: false,
        type: "door",
        x: 13,
        y: 9,    
    },

    doorSecretTwo: { // After killing cookimonster makes you able to walk through him
        name: "doorSecretTwo",
        cssClass: "floor",
        sound: "myAudioDoor",
        picked: false,
        type: "door",
        x: 14,
        y: 3,    
    },
    // Keys
    keyOne: {
        name: "keyOne",
        cssClass: "floor",
        picked: false,
        type: "key",
        door: "doorOne",
        x: 1,
        y: 5,
    },

    keyTwo: {
        name: "keyTwo",
        cssClass: "floor",
        picked: false,
        type: "key",
        door: "doorTwo",
        x: 4,
        y: 9,
    },

    keyBig: {
        name: "keyBig",
        cssClass: "keybig",
        picked: false,
        type: "key",
        door: "doorSecretOne",
        x: 15,
        y: 2,
    },

    // Treasures

    coinOne: {
        name: "coinOne",
        cssClass: "coin",
        sound: "myAudioCoin",
        picked: false,
        type: "item",
        x: 4,
        y: 6,
    },

    coinTwo: {
        name: "coinTwo",
        cssClass: "coin",
        sound: "myAudioCoin",
        picked: false,
        type: "item",
        x: 4,
        y: 7,
    },

    coinThree: {
        name: "coinThree",
        cssClass: "coin",
        sound: "myAudioCoin",
        picked: false,
        type: "item",
        x: 7,
        y: 4,
    }
    
    ,coinFour: {
        name: "coinFour",
        cssClass: "coin",
        sound: "myAudioCoin",
        picked: false,
        type: "item",
        x: 18,
        y: 1,
    }
    
    ,coinFive: {
        name: "coinFive",
        cssClass: "coin",
        sound: "myAudioCoin",
        picked: false,
        type: "item",
        x: 24,
        y: 4,
    },

    

    // Monsters

    monsterOne: {
        name: "monsterOne",
        counter: "axe",
        cssClass: "monster",
        cssClassDead: "monsterDead",
        sound: "myAudioDead",
        picked: false,
        damage: 2,
        door: "doorSecretTwo",
        description: "Arrrr!!",
        type: "monster",
        x: 13,
        y: 3,
    },
    
    monsterTwo: {
        name: "monsterTwo",
        counter: "heart",
        cssClass: "cat",
        cssClassDead: "catDead",
        sound: "myAudioCatPurr",
        picked: false,
        damage: 2,
        door: "doorSecretTwo",
        description: "meow!",
        type: "monster",
        x: 15,
        y: 7,
    },
    
    monsterThree: {
        name: "monsterThree",
        counter: "axe",
        cssClass: "blob",
        cssClassDead: "blobDead",
        sound: "myAudioBlob",
        picked: false,
        damage: 2,
        door: "doorSecretTwo",
        description: "Blobliby!!",
        type: "monster",
        x: 21,
        y: 2,
    },
    
    monsterFour: {
        name: "monsterFour",
        counter: "axe",
        cssClass: "blob",
        cssClassDead: "blobDead",
        sound: "myAudioBlob",
        picked: false,
        damage: 2,
        door: "doorSecretTwo",
        description: "Blobliby!!",
        type: "monster",
        x: 22,
        y: 9,
    },
    
    monsterFive: {
        name: "monsterFive",
        counter: "axe",
        cssClass: "blob",
        cssClassDead: "blobDead",
        sound: "myAudioBlob",
        picked: false,
        damage: 2,
        door: "doorThree",
        description: "Blobliby!!",
        type: "monster",
        x: 6,
        y: 4,
    },
    
    monsterSix: {
        name: "monsterSix",
        counter: "axe",
        cssClass: "tomte",
        cssClassDead: "tomteDead",
        picked: false,
        damage: 2,
        description: "HO ho Ho im you'r master!!",
        type: "monster",
        x: 30,
        y: 4,
    },
    
    monsterSeven: {
        name: "monsterSeven",
        counter: "sunlight",
        cssClass: "troll",
        cssClassDead: "trollDead",
        sound: "myAudioTroll",
        picked: false,
        door: "doorFour",
        damage: 2,
        description: "Hiieee Hiieeee Dont take my drinks!",
        type: "monster",
        x: 50,
        y: 5,
    },
};
// Calls functions at start.
drawMap();
drawAttributes();


