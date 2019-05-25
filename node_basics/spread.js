// var peaks = ["kilimanjaro", "Elgon", "Himalayas"]
// var canyons = ["ward", "blackwood"]
// var tahoe = [...peaks, ...canyons]

// console.log(tahoe.join(', '))

// CLASSES
class Vacation {
    constructor(destination, length){
        this.destination = destination
        this.length = length
    }

    print(){
        console.log(`${this.destination} will take ${this.length} days.`)
    }
}

// var t = new Vacation("kampala", 23);
// t.print()

//Inheritance
class Expedition extends Vacation{

    constructor(destination, length, gear){
        super(destination, length)
        this.gear = gear
    }

    print(){
        super.print()
        console.log(`Bring your ${this.gear.join(" and your ")}`)
    }
}

var r = new Expedition('Uganda', 34, ["gun", "cat"]);
r.print()