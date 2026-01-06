// E17,a create new class and play around with it
// in JS we don't have a protected for a class, which means a #xx can only be access within the same class, not even share with it's child class

class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;
    topSpeed;
    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
        this.isTrunkOpen = false;
        this.topSpeed = 200;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk Open: ${this.isTrunkOpen}`);
    }

    go() {
        if (this.isTrunkOpen) {
            return;
        }
        if (this.speed <= this.topSpeed - 5) {
            this.speed = this.speed + 5;
        } else {
            this.speed = this.topSpeed;
        }
    }

    brake() {
        if (this.speed >= 5) {
            this.speed = this.speed - 5;
        } else {
            this.speed = 0;
        }
    }

    openTrunk() {
        if (this.speed != 0) {
            return;
        }
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const cars = [
    {
        brand: 'Toyota',
        model: 'Corolla',
    },
    {
        brand: 'Tesla',
        model: 'Model 3'
    }].map((carDetails) => {
        return new Car(carDetails);
    });

console.log(cars);
cars.forEach(car => {
    // check go and brake
    car.displayInfo();
    car.go();
    car.go();
    car.displayInfo();
    car.brake();
    car.displayInfo();
    // check open truck won't work while driving
    car.openTrunk();
    car.displayInfo();
    car.brake();
    car.openTrunk();
    car.displayInfo();
});

class RaceCar extends Car {
    acceleration;
    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    //override
    go() {
        this.topSpeed = 300;
        if (this.speed <= this.topSpeed - this.acceleration) {
            this.speed = this.speed + this.acceleration;
        } else {
            this.speed = this.topSpeed;
        }
    }

    openTrunk(){
        console.log('Race cars do not have a trunk.');
    }

    closeTrunk(){
        console.log('Race cars do not have a trunk.');
    }
}

const raceCar1 = new RaceCar({brand: 'Mclaren', model: 'F1', acceleration: 20});
raceCar1.displayInfo();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();
