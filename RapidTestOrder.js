class RapidTestOrder {
    constructor(sFrom) {
        this.item;
        this.size;
        this.toppings;
        this.OrderState = {
            WELCOMING: () => {
                let aReturn = [];
                this.stateCur = this.OrderState.ORDER;
                aReturn.push("Welcome to the Krusty Krab.");
                aReturn.push("What can we get for you? You can order a Krabby Patty or a Salty Sea Dog.");
                return aReturn;
            },
            ORDER: () => {
                let aReturn = [];
                this.stateCur = this.OrderState.SIZE;
                if (sInput.toLowerCase().includes('krabby patty')) {
                    this.item = "Krabby Patty";
                    aReturn.push(`Single Patty, Double, or Triple?`);
                } else if (sInput.toLowerCase().includes('sea dog')) {
                    this.item = "Salty Sea Dog";
                    aReturn.push("Regular or Jumbo?");
                } else {
                    aReturn.push(`Sorry, we didn't get that. Please try again.`);
                    this.stateCur = this.OrderState.WELCOMING;
                    return aReturn;
                }
                return aReturn;
            },
            SIZE: (sInput) => {
                let aReturn = [];
                this.stateCur = this.OrderState.OPTIONS;
                if (this.item == "Krabby Patty") {
                    if (sInput.toLowerCase().includes('single')) {
                        this.size = "Single";
                    } else if (sInput.toLowerCase().includes('double')) {
                        this.size = "Double";
                    } else if (sInput.toLowerCase().includes('triple')) {
                        this.size = "Triple";
                    } else {
                        aReturn.push(`Sorry, we didn't get that. Please try again.`);
                        this.stateCur = this.OrderState.WELCOMING;
                        return aReturn;
                    }
                    aReturn.push(`Got it, one ${this.size} ${this.item} coming right up`);
                    aReturn.push(`Would you like to add Sea Cheese? Type (Y/N)`);
                }
                else if (this.item == "Salty Sea Dog") {
                    if (sInput.toLowerCase().includes('regular')) {
                        this.size = "Regular";
                    }
                    else if (sInput.toLowerCase().includes('jumbo')) {
                        this.size = "Jumbo";
                    } else {
                        aReturn.push(`Sorry, we didn't get that. Please try again.`);
                        this.stateCur = this.OrderState.WELCOMING;
                        return aReturn;
                    }
                    aReturn.push(`Got it, one ${this.size} ${this.item} coming right up`);
                    aReturn.push(`Would you like to add Coral Mustard? Type (Y/N)`);
                }
                else {
                    aReturn.push(`Sorry, we didn't get that. Please try again.`);
                    this.stateCur = this.OrderState.WELCOMING;
                    return aReturn;
                }
                return aReturn;
            },
            OPTIONS: (sInput) => {
                let aReturn = [];
                this.stateCur = this.OrderState.UPSELL;
                if (this.item == "krabby patty") {
                    if (sInput.toLowerCase().startsWith('y')) {
                        this.topping = "with Sea Cheese";
                        aReturn.push(`Got it. Your Krabby Patty will include Sea Cheese.`);
                    } else if (sInput.toLowerCase().startsWith('n')) {
                        this.topping = "";
                        aReturn.push(`Alright, no Sea Cheese. Fine.`);
                    } else {
                        aReturn.push(`Sorry, we didn't get that. Please try again.`);
                        this.stateCur = this.OrderState.WELCOMING;
                        return aReturn;
                    }
                }
                if (this.item == "sea dog") {
                    if (sInput.toLowerCase().startsWith('y')) {
                        this.topping = "with Coral Mustard";
                        aReturn.push(`Got it. Your Salty Sea Dog will include Coral Mustard.`);
                    } else if (sInput.toLowerCase().startsWith('n')) {
                        this.topping = "";
                        aReturn.push(`Alright, no Coral Mustard. Suit yourself.`);
                    } else {
                        aReturn.push(`Sorry, we didn't get that. Please try again.`);
                        this.stateCur = this.OrderState.WELCOMING;
                        return aReturn;
                    }
                }
                aReturn.push("Do you want a Kelp Shake with your meal? Type (Y/N)");
                return aReturn;
            },
            UPSELL: (sInput) => {
                let aReturn = [];
                this.isDone = true;
                if (sInput.toLowerCase().startsWith('y')) {
                    aReturn.push(`Your order is complete. You have ordered a ${this.size} ${this.item} ${this.topping} and a Kelp Shake.`);
                } else if (sInput.toLowerCase().startsWith('n')) {
                    aReturn.push(`Your order is complete. You have ordered a ${size} ${item} ${topping}`);
                } else {
                    aReturn.push(`Sorry, we didn't get that. Please try again.`);
                    this.stateCur = this.OrderState.WELCOMING;
                }
                aReturn.push(`Your order is reserved under the phone number ${this.sFrom}`);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 30);
                aReturn.push(`Please pick it up at 124 Conch St., Bikini Bottom before ${d.toTimeString()}`);
                return aReturn;
            }
        };

        this.stateCur = this.OrderState.WELCOMING;
        this.isDone = false;
        this.sFrom = sFrom;

        this.item = "";
        this.size = "";
        this.topping = "";
    }
    handleInput(sInput) {
        return this.stateCur(sInput);
    }
    isDone() {
        return this.isDone;
    }
}

export { RapidTestOrder }