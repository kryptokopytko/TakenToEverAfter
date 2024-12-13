import { Guest, Image, TaskCard, Account, AccountDetails, WeddingDetails, Tag } from "./types";

// ***********************ACCOUNT*********************************

const account : Account = {
  groomName: "Smurf",
  brideName: "Smurfette",
  email: "",
  mailFrequency: 'none'
}

const accountDetails : AccountDetails = {
  weddingDate: "06.12.2025", 
  newlywedsTableId: null,
  budgetLimit: 1234 
}

const weddingDetails : WeddingDetails = {
  weddingTime: "15:00",
  weddingLocation: ["Kościół św. Marii", "ul. Wesoła 12", "Kraków"],
  surnames: ["Elderberry", "Tumblesworth"]
};

// ***********************GUESTS*********************************

const tags: Tag[] = [
  {
    id: 0,
    name: "family",
    rank: 2
  },
  {
    id: 1,
    name: "friends",
    rank: 1
  }
];

const guests: Guest[] = [
  {
    name: "Baby Smurf",
    decision: "yes",
    tags: [0],
  },
  {
    name: "Baker Smurf",
    decision: "yes",
    tags: [0],
  },
  {
    name: "Brainy Smurf",
    decision: "unknown",
    tags: [1],
  },
  {
    name: "Chef Smurf",
    decision: "yes",
    tags: [1],
  },
  {
    name: "Clumsy Smurf",
    decision: "yes",
    tags: [],
  },
  {
    name: "Dizzy Smurf",
    decision: "yes",
    tags: [0],
  },
  {
    name: "Farmer Smurf",
    decision: "unknown",
    tags: [0],
  },
  {
    name: "Greedy Smurf",
    decision: "no",
    tags: [1],
  },
];

// ***********************EXPENSES*********************************

const description =
  "How does a bastard, orphan, son of a whore and a Scotsman, dropped in the middle of a forgotten Spot in the Caribbean by providence, impoverished, in squalor Grow up to be a hero and a scholar?";

const expenses = [
  {
    category: "Venue",
    subExpenses: [
      { subCategory: "Rental", amount: 700, description: description },
      { subCategory: "Cleaning", amount: 300, description: description },
    ],
  },

  {
    category: "Photography",
    subExpenses: [
      { subCategory: "Photographer", amount: 250, description: description },
      { subCategory: "Album", amount: 50, description: description },
    ],
  },

  {
    category: "Entertainment",
    subExpenses: [
      { subCategory: "DJ", amount: 80, description: description },
      { subCategory: "Games", amount: 20, description: description },
    ],
  },
  {
    category: "Catering",
    subExpenses: [
      { subCategory: "Dinner", amount: 300, description: description },
      { subCategory: "Vodka", amount: 50, description: description },
      { subCategory: "Vine", amount: 300, description: description },
      { subCategory: "Supper", amount: 200, description: description },
      { subCategory: "Ice Cream", amount: 100, description: description },
    ],
  },
  {
    category: "Decorations",
    subExpenses: [
      { subCategory: "Flowers", amount: 100, description: description },
      { subCategory: "Lighting", amount: 100, description: description },
    ],
  },
];

// ***********************TASKS*************************************

const taskCards: TaskCard[] = [
  {
    id: 0,
    category: "Planning",
    tasks: [
      {
        id:0,
        name: "Create guest list",
        description: description,
        completed: false,
        deadline: "2024-10-05",
        assignees: []
      },
      {
        id:1,
        name: "Select venue",
        description: description,
        completed: true,
        deadline: "2024-09-25",
        assignees: []
      },
    ],
  },
  {
    id: 1,
    category: "Catering",
    tasks: [
      {
        id:2,
        name: "Confirm menu",
        description: description,
        completed: false,
        deadline: "2024-10-10",
        assignees: []
      },
      {
        id:3,
        name: "Hire caterer",
        description: description,
        completed: true,
        deadline: "2024-09-28",
        assignees: []
      },
    ],
  },
  {
    id: 2,
    category: "Decorations",
    tasks: [
      {
        id:4,
        name: "Choose flowers",
        description: description,
        completed: false,
        deadline: "2024-10-15",
        assignees: []
      },
      {
        id:5,
        name: "Design table setup",
        description: description,
        completed: false,
        deadline: "2024-10-12",
        assignees: []
      },
      {
        id:6,
        name: "Choose color theme",
        description: description,
        completed: false,
        deadline: "2024-10-20",
        assignees: []
      },
      {
        id:7,
        name: "Choose kayaks",
        description: description,
        completed: true,
        deadline: "2024-09-29",
        assignees: []
      },
    ],
  },
  {
    id: 3,
    category: "Entertainment",
    tasks: [
      {
        id:8,
        name: "Book DJ",
        description: description,
        completed: true,
        deadline: "2024-09-22",
        assignees: []
      },
      {
        id:9,
        name: "Plan activities",
        description: description,
        completed: true,
        deadline: "2024-09-23",
        assignees: []
      },
    ],
  },
];

const choices = [
  {
    choice: "Venue",

    options: [
      {
        option: "Castle",
        description: description,
        amount: 700,
        isPicked: false,
      },
      {
        option: "Beach",
        description: description,
        amount: 300,
        isPicked: false,
      },
      {
        option: "Garden",
        description: description,
        amount: 400,
        isPicked: false,
      },
      {
        option: "Hotel",
        description: description,
        amount: 500,
        isPicked: false,
      },
    ],
  },
  {
    choice: "Catering",
    options: [
      {
        option: "Buffet",
        description: description,
        amount: 50,
        isPicked: false,
      },
      {
        option: "Sit-down dinner",
        description: description,
        amount: 75,
        isPicked: false,
      },
      {
        option: "Barbecue",
        description: description,
        amount: 60,
        isPicked: true,
      },
    ],
  },
  {
    choice: "Decor",
    options: [
      {
        option: "Floral arrangements",
        description: description,
        amount: 200,
        isPicked: true,
      },
      {
        option: "Balloon decorations",
        description: description,
        amount: 100,
        isPicked: false,
      },
      {
        option: "Fairy lights",
        description: description,
        amount: 150,
        isPicked: true,
      },
    ],
  },
  {
    choice: "Entertainment",
    options: [
      {
        option: "Live band",
        description: description,
        amount: 1000,
        isPicked: true,
      },
      { option: "DJ", amount: 500, description: description, isPicked: false },
      {
        option: "Photo booth",
        description: description,
        amount: 300,
        isPicked: true,
      },
    ],
  },
  {
    choice: "Photography",
    options: [
      {
        option: "Professional photographer",
        description: description,
        amount: 1200,
        isPicked: false,
      },
      {
        option: "Videographer",
        description: description,
        amount: 1500,
        isPicked: false,
      },
      {
        option: "Photo package",
        description: description,
        amount: 800,
        isPicked: false,
      },
    ],
  },
];

// ***********************PHOTOS*************************************

const images: Image[] = [
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
    isFavorite: true,
    author: "James Hernandez",
    isApproved: true,
  },
  {
    id: 11,
    name: "Snowy Mountains",
    link: "https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=",
    isFavorite: true,
    author: "Olivia Lee",
    isApproved: true,
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
    name: "The Duck That Rules THEM ALL",
    link: "https://homeinthefingerlakes.com/wp-content/uploads/2020/04/Ducks-0025-718x1024.jpg",
    isFavorite: true,
    author: "Marcinos",
    isApproved: true,
  },
];
const oldPhotos = [
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

// **********************SEATINGS*************************************
const roundTables = [{
  id: "children", x: 600, y: 600, seats: 12, guests: ['Antoni Kowalski',
      'Bernadeta Nowak',
      'Celina Wiśniewska',
      'Derek Jankowski',
      'Eugenia Zawisza',
      'Felicja Grabowska',
      'Genowefa Zielińska',
      'Hiacynta Kaczmarek',
      'Irenka Lewandowska',
      'Józefina Szymańska',
      'Kornela Kamińska']
}];

const rectangularTables = [{
  id: "main", x: 50, y: 50, width: 3, length: 12, guests: ['Antoni Kowalski',
      'Bernadeta Nowak',
      'Celina Wiśniewska',
      'Derek Jankowski',
      'Eugenia Zawisza',
      'Felicja Grabowska',
      'Genowefa Zielińska',
      'Hiacynta Kaczmarek',
      'Irenka Lewandowska',
      'Józefina Szymańska',
      'Kornela Kamińska']
}];

// *******************************************************************
const Example = { 
  account, accountDetails, 
  weddingDetails,
  tags, guests,
  expenses, taskCards, choices,
  images, oldPhotos,
  roundTables, rectangularTables
};
export default Example;
