#! /usr/bin/env node
import inquirer from "inquirer";
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
async function main() {
    const heroNameAnswer = await inquirer.prompt([{
            name: "heroName",
            type: "input",
            message: "Enter your hero name."
        }]);
    const heroName = heroNameAnswer.heroName;
    const enemyTypeAnswer = await inquirer.prompt([{
            name: "enemyType",
            type: "list",
            choices: ["alien", "witch", "zombie"],
            message: "Select the enemy you want to fight with."
        }]);
    const enemyType = enemyTypeAnswer.enemyType;
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(`${hero.name} VS ${enemy.name}`);
    do {
        const actionAnswer = await inquirer.prompt([{
                name: "action",
                type: "list",
                choices: ["attack", "defend", "range target", "run"],
                message: "Choose the attack type to perform action."
            }]);
        const action = actionAnswer.action;
        switch (action) {
            case "attack":
                const randomNumber = Math.random();
                if (randomNumber > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} took damage! Health: ${hero.health}`);
                    console.log(`${enemy.name} Health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("You lost. Try again.");
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(`${enemy.name} took damage! Health: ${enemy.health}`);
                    console.log(`${hero.name} Health: ${hero.health}`);
                    if (enemy.health <= 0) {
                        console.log("Congratulations! You Won!");
                        return;
                    }
                }
                break;
            case "defend":
                console.log(`${hero.name} is defending!`);
                break;
            case "range target":
                console.log(`${hero.name} is targeting from range!`);
                break;
            case "run":
                console.log(`${hero.name} ran away! Game over.`);
                return;
            default:
                console.log("Invalid action!");
                break;
        }
    } while (true);
}
main();
