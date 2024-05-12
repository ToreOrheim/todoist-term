import { Task, TodoistApi } from "@doist/todoist-api-typescript";

const API_SECRET = process.env.API_SECRET!;
const PROJECT_ID = process.env.PROJECT_ID;
const MEAT_ID = process.env.MEAT_ID;
const VEGGIES_ID = process.env.VEGGIES_ID;
const MILK_ID = process.env.MILK_ID;
const OTHER_ID = process.env.OTHER_ID;

class Shopping_List {
  Meat: Task[];
  VegetablesAndFruits: Task[];
  MilkAndMilkDerivatives: Task[];
  Other: Task[];

  constructor(
    meat: Task[],
    vegetablesAndFruits: Task[],
    milkAndMilkDerivatives: Task[],
    other: Task[],
  ) {
    this.Meat = meat;
    this.VegetablesAndFruits = vegetablesAndFruits;
    this.MilkAndMilkDerivatives = milkAndMilkDerivatives;
    this.Other = other;
  }
}

const api = new TodoistApi(API_SECRET);
async function main() {
  let shopping_list = await GetShoppingList();
  console.log(shopping_list);
}

async function GetShoppingList(): Promise<Shopping_List | undefined> {
  return api
    .getTasks()
    .then((tasks) => tasks.filter((task) => task.projectId === PROJECT_ID))
    .then((tasks) => {
      const meat_section = tasks.filter((task) => task.parentId === MEAT_ID);
      const vegetables_and_fruits = tasks.filter(
        (task) => task.parentId === VEGGIES_ID,
      );
      const milk_and_milk_derivatives = tasks.filter(
        (task) => task.parentId === MILK_ID,
      );
      const other = tasks.filter((task) => task.parentId === OTHER_ID);

      return new Shopping_List(
        meat_section,
        vegetables_and_fruits,
        milk_and_milk_derivatives,
        other,
      );
    });
}

main();
