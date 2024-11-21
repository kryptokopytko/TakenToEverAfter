import { Guest, Image, Task } from "./types";
export const guests: Guest[] = [
  {
    name: "Baby Smurf",
    decision: "yes",
    tags: ["family"],
    email: "baby.smurf@smurfvillage.com",
  },
  {
    name: "Baker Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "baker.smurf@smurfvillage.com",
  },
  {
    name: "Brainy Smurf",
    decision: "maybe",
    tags: ["brides", "friends"],
    email: "brainy.smurf@smurfvillage.com",
  },
  {
    name: "Chef Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "chef.smurf@smurfvillage.com",
  },
  {
    name: "Clumsy Smurf",
    decision: "yes",
    tags: ["grooms", "friends"],
    email: "clumsy.smurf@smurfvillage.com",
  },
  {
    name: "Dizzy Smurf",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "dizzy.smurf@smurfvillage.com",
  },
  {
    name: "Farmer Smurf",
    decision: "maybe",
    tags: ["grooms", "family"],
    email: "farmer.smurf@smurfvillage.com",
  },
  {
    name: "Greedy Smurf",
    decision: "no",
    tags: ["brides", "family"],
    email: "greedy.smurf@smurfvillage.com",
  },
  {
    name: "Grouchy Smurf",
    decision: "no",
    tags: ["grooms", "friends"],
    email: "grouchy.smurf@smurfvillage.com",
  },
  {
    name: "Hefty Smurf",
    decision: "yes",
    tags: ["grooms", "friends"],
    email: "hefty.smurf@smurfvillage.com",
  },
  {
    name: "Jokey Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "jokey.smurf@smurfvillage.com",
  },
  {
    name: "New Smurf",
    decision: "not invited",
    tags: ["friends"],
    email: "new.smurf@smurfvillage.com",
  },
  {
    name: "Painter Smurf",
    decision: "maybe",
    tags: ["brides", "friends"],
    email: "painter.smurf@smurfvillage.com",
  },
  {
    name: "Papa Smurf",
    decision: "yes",
    tags: ["family"],
    email: "papa.smurf@smurfvillage.com",
  },
  {
    name: "Sassy Smurf",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "sassy.smurf@smurfvillage.com",
  },
  {
    name: "Scaredy Smurf",
    decision: "no",
    tags: ["grooms", "friends"],
    email: "scaredy.smurf@smurfvillage.com",
  },
  {
    name: "Smurf Lily",
    decision: "yes",
    tags: ["brides", "family"],
    email: "smurf.lily@smurfvillage.com",
  },
  {
    name: "Smurf Storm",
    decision: "maybe",
    tags: ["brides", "friends"],
    email: "smurf.storm@smurfvillage.com",
  },
  {
    name: "Smurfette",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "smurfette@smurfvillage.com",
  },
  {
    name: "Snappy Smurf",
    decision: "yes",
    tags: ["grooms", "friends"],
    email: "snappy.smurf@smurfvillage.com",
  },
  {
    name: "Vanity Smurf",
    decision: "maybe",
    tags: ["brides", "family"],
    email: "vanity.smurf@smurfvillage.com",
  },
  {
    name: "Architect Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "architect.smurf@smurfvillage.com",
  },
  {
    name: "Astro Smurf",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "astro.smurf@smurfvillage.com",
  },
  {
    name: "Clockwork Smurf",
    decision: "maybe",
    tags: ["grooms", "family"],
    email: "clockwork.smurf@smurfvillage.com",
  },
  {
    name: "Doctor Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "doctor.smurf@smurfvillage.com",
  },
  {
    name: "Dopey Smurf",
    decision: "no",
    tags: ["grooms", "friends"],
    email: "dopey.smurf@smurfvillage.com",
  },
  {
    name: "Druid Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "druid.smurf@smurfvillage.com",
  },
  {
    name: "Editor Smurf",
    decision: "maybe",
    tags: ["brides", "friends"],
    email: "editor.smurf@smurfvillage.com",
  },
  {
    name: "Fisher Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "fisher.smurf@smurfvillage.com",
  },
  {
    name: "Handy Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "handy.smurf@smurfvillage.com",
  },
  {
    name: "Hunter Smurf",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "hunter.smurf@smurfvillage.com",
  },
  {
    name: "King Smurf",
    decision: "no",
    tags: ["grooms", "family"],
    email: "king.smurf@smurfvillage.com",
  },
  {
    name: "Lazy Smurf",
    decision: "maybe",
    tags: ["brides", "friends"],
    email: "lazy.smurf@smurfvillage.com",
  },
  {
    name: "Miner Smurf",
    decision: "yes",
    tags: ["grooms", "family"],
    email: "miner.smurf@smurfvillage.com",
  },
  {
    name: "Nanny Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "nanny.smurf@smurfvillage.com",
  },
  {
    name: "Navigator Smurf",
    decision: "yes",
    tags: ["grooms", "friends"],
    email: "navigator.smurf@smurfvillage.com",
  },
  {
    name: "Natural Smurf",
    decision: "yes",
    tags: ["brides", "friends"],
    email: "natural.smurf@smurfvillage.com",
  },
  {
    name: "Poet Smurf",
    decision: "maybe",
    tags: ["grooms", "friends"],
    email: "poet.smurf@smurfvillage.com",
  },
  {
    name: "Reporter Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "reporter.smurf@smurfvillage.com",
  },
  {
    name: "Sculptor Smurf",
    decision: "maybe",
    tags: ["grooms", "family"],
    email: "sculptor.smurf@smurfvillage.com",
  },
  {
    name: "Sloppy Smurf",
    decision: "no",
    tags: ["brides", "friends"],
    email: "sloppy.smurf@smurfvillage.com",
  },
  {
    name: "Timid Smurf",
    decision: "maybe",
    tags: ["grooms", "friends"],
    email: "timid.smurf@smurfvillage.com",
  },
  {
    name: "Tracker Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "tracker.smurf@smurfvillage.com",
  },
  {
    name: "Weepy Smurf",
    decision: "no",
    tags: ["grooms", "friends"],
    email: "weepy.smurf@smurfvillage.com",
  },
  {
    name: "Wild Smurf",
    decision: "yes",
    tags: ["brides", "family"],
    email: "wild.smurf@smurfvillage.com",
  },
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

export const initialTasks: Task[] = [
  {
    category: "Planning",
    subTasks: [
      { name: "Create guest list", completed: false, deadline: "2024-10-05" },
      { name: "Select venue", completed: true, deadline: "2024-09-25" },
    ],
  },
  {
    category: "Catering",
    subTasks: [
      { name: "Confirm menu", completed: false, deadline: "2024-10-10" },
      { name: "Hire caterer", completed: true, deadline: "2024-09-28" },
    ],
  },
  {
    category: "Decorations",
    subTasks: [
      { name: "Choose flowers", completed: false, deadline: "2024-10-15" },
      { name: "Design table setup", completed: false, deadline: "2024-10-12" },
      { name: "Choose color theme", completed: false, deadline: "2024-10-20" },
      { name: "Choose kayaks", completed: true, deadline: "2024-09-29" },
    ],
  },
  {
    category: "Entertainment",
    subTasks: [
      { name: "Book DJ", completed: true, deadline: "2024-09-22" },
      { name: "Plan activities", completed: true, deadline: "2024-09-23" },
    ],
  },
];

export const initialChoices = [
  {
    choice: "Venue",
    options: [
      { option: "Castle", amount: 700, isPicked: false },
      { option: "Beach", amount: 300, isPicked: false },
      { option: "Garden", amount: 400, isPicked: false },
      { option: "Hotel", amount: 500, isPicked: false },
    ],
  },
  {
    choice: "Catering",
    options: [
      { option: "Buffet", amount: 50, isPicked: false },
      { option: "Sit-down dinner", amount: 75, isPicked: false },
      { option: "Barbecue", amount: 60, isPicked: true },
    ],
  },
  {
    choice: "Decor",
    options: [
      { option: "Floral arrangements", amount: 200, isPicked: true },
      { option: "Balloon decorations", amount: 100, isPicked: false },
      { option: "Fairy lights", amount: 150, isPicked: true },
    ],
  },
  {
    choice: "Entertainment",
    options: [
      { option: "Live band", amount: 1000, isPicked: true },
      { option: "DJ", amount: 500, isPicked: false },
      { option: "Photo booth", amount: 300, isPicked: true },
    ],
  },
  {
    choice: "Photography",
    options: [
      { option: "Professional photographer", amount: 1200, isPicked: false },
      { option: "Videographer", amount: 1500, isPicked: false },
      { option: "Photo package", amount: 800, isPicked: false },
    ],
  },
];

export const exampleImages: Image[] = [
  {
    id: 1,
    name: "Sunset",
    link: "https://plus.unsplash.com/premium_photo-1673448391005-d65e815bd026?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D",
    isFavorite: false,
    author: "John Doe",
  },
  {
    id: 2,
    name: "Mountains",
    link: "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp",
    isFavorite: false,
    author: "Jane Smith",
    isVertical: true,
    isApproved: true,
  },
  {
    id: 3,
    name: "Beach",
    link: "https://img.freepik.com/premium-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_1033124-10.jpg",
    isFavorite: false,
    author: "Alice Johnson",
  },
  {
    id: 4,
    name: "Forest",
    link: "https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478039.jpg",
    isFavorite: false,
    author: "Jan",
    isVertical: true,
  },
  {
    id: 5,
    name: "City Skyline",
    link: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    isFavorite: false,
    author: "Jan",
    isApproved: true,
  },
  {
    id: 6,
    name: "River",
    link: "https://st.depositphotos.com/2001755/3622/i/450/depositphotos_36220949-stock-photo-beautiful-landscape.jpg",
    isFavorite: false,
    author: "Robert Wilson",
    isVertical: true,
  },
  {
    id: 7,
    name: "Desert",
    link: "https://media.licdn.com/dms/image/D5612AQE8NiooxTxA3w/article-cover_image-shrink_720_1280/0/1695825196046?e=2147483647&v=beta&t=UIlR0tBOMVHcLHo2wSJkVycZM7MyUYThqdTFz-Zad8o",
    isFavorite: false,
    author: "Jessica Garcia",
  },
  {
    id: 8,
    name: "Waterfall",
    link: "https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg",
    isFavorite: false,
    author: "Daniel Martinez",
    isVertical: true,
    isApproved: true,
  },
  {
    id: 9,
    name: "Starry Night",
    link: "https://media.istockphoto.com/id/843408508/photo/photography-camera-lens-concept.jpg?s=612x612&w=0&k=20&c=-tm5TKrPDMakrT1vcOE-4Rlyj-iBVdzKuX4viFkd7Vo=",
    isFavorite: false,
    author: "Sophia Rodriguez",
  },
  {
    id: 10,
    name: "Autumn Leaves",
    link: "https://www.shutterstock.com/image-photo/anonymous-female-traveler-casual-sweater-600nw-2258700909.jpg",
    isFavorite: false,
    author: "James Hernandez",
    isApproved: true,
  },
  {
    id: 11,
    name: "Snowy Mountains",
    link: "https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=",
    isFavorite: false,
    author: "Olivia Lee",
  },
  {
    id: 12,
    name: "Lighthouse",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBu0Qci4XpOynaH98Bt1q_n-5d2hJ3eOTa2Q&s",
    isFavorite: false,
    author: "William Walker",
  },
  {
    id: 13,
    name: "Dancing",
    link: "http://localhost:5173/pictures/dancing1.png",
    isFavorite: true,
    author: "Emily Johnson",
  },
  {
    id: 14,
    name: "Flowers",
    link: "http://localhost:5173/pictures/flowers.png",
    isFavorite: true,
    author: "Lucas Brown",
  },
  {
    id: 15,
    name: "Car",
    link: "http://localhost:5173/pictures/car.png",
    isFavorite: true,
    author: "Ava Williams",
  },
];
