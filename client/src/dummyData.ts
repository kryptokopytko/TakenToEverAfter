import { Guest } from "./types";
export const guests: Guest[] = [
  { name: "Baby Smurf", decision: "yes", tags: ["family"] },
  { name: "Baker Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Brainy Smurf", decision: "maybe", tags: ["brides", "friends"] },
  { name: "Chef Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Clumsy Smurf", decision: "yes", tags: ["grooms", "friends"] },
  { name: "Dizzy Smurf", decision: "yes", tags: ["brides", "friends"] },
  { name: "Farmer Smurf", decision: "maybe", tags: ["grooms", "family"] },
  { name: "Greedy Smurf", decision: "no", tags: ["brides", "family"] },
  { name: "Grouchy Smurf", decision: "no", tags: ["grooms", "friends"] },
  { name: "Hefty Smurf", decision: "yes", tags: ["grooms", "friends"] },
  { name: "Jokey Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "New Smurf", decision: "not invited", tags: ["friends"] },
  { name: "Painter Smurf", decision: "maybe", tags: ["brides", "friends"] },
  { name: "Papa Smurf", decision: "yes", tags: ["family"] },
  { name: "Sassy Smurf", decision: "yes", tags: ["brides", "friends"] },
  { name: "Scaredy Smurf", decision: "no", tags: ["grooms", "friends"] },
  { name: "Smurf Lily", decision: "yes", tags: ["brides", "family"] },
  { name: "Smurf Storm", decision: "maybe", tags: ["brides", "friends"] },
  { name: "Smurfette", decision: "yes", tags: ["brides", "friends"] },
  { name: "Snappy Smurf", decision: "yes", tags: ["grooms", "friends"] },
  { name: "Vanity Smurf", decision: "maybe", tags: ["brides", "family"] },
  { name: "Architect Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Astro Smurf", decision: "yes", tags: ["brides", "friends"] },
  { name: "Clockwork Smurf", decision: "maybe", tags: ["grooms", "family"] },
  { name: "Doctor Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "Dopey Smurf", decision: "no", tags: ["grooms", "friends"] },
  { name: "Druid Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Editor Smurf", decision: "maybe", tags: ["brides", "friends"] },
  { name: "Fisher Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "Handy Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Hunter Smurf", decision: "yes", tags: ["brides", "friends"] },
  { name: "King Smurf", decision: "no", tags: ["grooms", "family"] },
  { name: "Lazy Smurf", decision: "maybe", tags: ["brides", "friends"] },
  { name: "Miner Smurf", decision: "yes", tags: ["grooms", "family"] },
  { name: "Nanny Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "Navigator Smurf", decision: "yes", tags: ["grooms", "friends"] },
  { name: "Natural Smurf", decision: "yes", tags: ["brides", "friends"] },
  { name: "Poet Smurf", decision: "maybe", tags: ["grooms", "friends"] },
  { name: "Reporter Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "Sculptor Smurf", decision: "maybe", tags: ["grooms", "family"] },
  { name: "Sloppy Smurf", decision: "no", tags: ["brides", "friends"] },
  { name: "Timid Smurf", decision: "maybe", tags: ["grooms", "friends"] },
  { name: "Tracker Smurf", decision: "yes", tags: ["brides", "family"] },
  { name: "Weepy Smurf", decision: "no", tags: ["grooms", "friends"] },
  { name: "Wild Smurf", decision: "yes", tags: ["brides", "family"] },
];

export const expenses = [
  {
    category: "Venue",
    subExpenses: [
      { subCategory: "Rental", amount: 700 },
      { subCategory: "Cleaning", amount: 300 },
    ],
  },

  {
    category: "Photography",
    subExpenses: [
      { subCategory: "Photographer", amount: 250 },
      { subCategory: "Album", amount: 50 },
    ],
  },

  {
    category: "Entertainment",
    subExpenses: [
      { subCategory: "DJ", amount: 80 },
      { subCategory: "Games", amount: 20 },
    ],
  },
  {
    category: "Catering",
    subExpenses: [
      { subCategory: "Dinner", amount: 300 },
      { subCategory: "Vodka", amount: 50 },
      { subCategory: "Vine", amount: 300 },
      { subCategory: "Supper", amount: 200 },
      { subCategory: "Ice Cream", amount: 100 },
    ],
  },
  {
    category: "Decorations",
    subExpenses: [
      { subCategory: "Flowers", amount: 100 },
      { subCategory: "Lighting", amount: 100 },
    ],
  },
];
