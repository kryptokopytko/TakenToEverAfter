import { Guest, Image, TaskCard, Account, AccountDetails, WeddingDetails, Tag, Invitation, ExpenseCard, Choice } from "./types";

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
  groomSurname: "Elderberry",
  brideSurname: "Tumblesworth"
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

const invitations: Invitation[] = [
  {
    id: 0,
    handedOut: false
  },
  {
    id: 1,
    handedOut: false
  },
  {
    id: 2,
    handedOut: true
  },
  {
    id: 3,
    handedOut: false
  }
];

const guests: Guest[] = [
  {
    id: 0,
    name: "Baby Smurf",
    decision: "yes",
    tags: [0],
    invitationId: 0
  },
  {
    id: 1,
    name: "Baker Smurf",
    decision: "yes",
    tags: [0],
    invitationId: 0
  },
  {
    id: 2,
    name: "Brainy Smurf",
    decision: "unknown",
    tags: [1],
    invitationId: 1
  },
  {
    id: 3,
    name: "Chef Smurf",
    decision: "yes",
    tags: [1],
    hasPlusOne: false,
    invitationId: 2
  },
  {
    id: 4,
    name: "Clumsy Smurf",
    decision: "yes",
    tags: [],
    hasPlusOne: true,
    invitationId: 3
  },
  {
    id: 5,
    name: "Dizzy Smurf",
    decision: "yes",
    tags: [0],
    invitationId: 2
  },
  {
    id: 6,
    name: "Farmer Smurf",
    decision: "unknown",
    tags: [0],
    invitationId: 2
  },
  {
    id: 7,
    name: "Greedy Smurf",
    decision: "no",
    tags: [1],
    invitationId: 1
  },
];

// ***********************EXPENSES*********************************
const expenses: ExpenseCard[] = [
  {
    id: 1,
    category: "Venue",
    expenses: [
      { id: 1, name: "Wedding hall rental", amount: 5000, description: "Rental fee for the wedding venue including space for ceremony and reception." },
      { id: 2, name: "Ceremony location setup", amount: 1000, description: "Cost for arranging chairs, decor, and sound system at the ceremony location." }
    ]
  },
  {
    id: 2,
    category: "Catering",
    expenses: [
      { id: 3, name: "Full course meal for guests", amount: 3000, description: "Three-course meal served to all wedding guests." },
      { id: 4, name: "Wedding cake", amount: 800, description: "Large wedding cake with multiple tiers and decorations." },
      { id: 5, name: "Beverages and drinks", amount: 500, description: "Alcoholic and non-alcoholic drinks for guests throughout the event." }
    ]
  },
  {
    id: 3,
    category: "Photography",
    expenses: [
      { id: 6, name: "Professional wedding photography package", amount: 1500, description: "Full-day professional photography for the wedding day." },
      { id: 7, name: "Videography services", amount: 1200, description: "Videographer to capture video footage throughout the wedding day." }
    ]
  },
  {
    id: 4,
    category: "Attire",
    expenses: [
      { id: 8, name: "Wedding dress and accessories", amount: 2000, description: "Bridal gown with accessories such as veil and jewelry." },
      { id: 9, name: "Groom's suit and shoes", amount: 1000, description: "Formal suit and shoes for the groom." }
    ]
  },
  {
    id: 5,
    category: "Entertainment",
    expenses: [
      { id: 10, name: "Live band for the reception", amount: 800, description: "Live music performed by a band at the reception." },
      { id: 11, name: "DJ and sound system rental", amount: 400, description: "DJ services and sound equipment for music and announcements." }
    ]
  },
  {
    id: 6,
    category: "Decorations",
    expenses: [
      { id: 12, name: "Flowers and table decorations", amount: 1500, description: "Floral arrangements and centerpieces for tables." },
      { id: 13, name: "Lighting setup for venue", amount: 700, description: "Lighting setup to enhance the ambiance of the venue." }
    ]
  },
  {
    id: 7,
    category: "Transportation",
    expenses: [
      { id: 14, name: "Limousine rental for the couple", amount: 600, description: "Luxury limousine for the couple’s arrival and departure." },
      { id: 15, name: "Shuttle service for guests", amount: 300, description: "Shuttle buses for transporting guests to and from the venue." }
    ]
  },
  {
    id: 8,
    category: "Miscellaneous",
    expenses: [
      { id: 16, name: "Wedding invitations", amount: 500, description: "Design and printing of wedding invitations for guests." },
      { id: 17, name: "Guest favors", amount: 200, description: "Small gifts for guests as a token of appreciation." }
    ]
  }
];

const choices: Choice[] = [
  {
    id: 1,
    category: "Photography",
    options: [
      {
        id: 1,
        name: "Full-day photography with two photographers",
        amount: 1500,
        description: "Two photographers capturing the entire day from start to finish.",
        pros: "Comprehensive coverage, high-quality photos",
        cons: "Expensive package"
      },
      {
        id: 2,
        name: "Half-day photography with one photographer",
        amount: 800,
        description: "One photographer covering just the ceremony and key moments.",
        pros: "More affordable",
        cons: "Limited photo coverage"
      }
    ]
  },
  {
    id: 2,
    category: "Entertainment",
    options: [
      {
        id: 3,
        name: "Live band (5 musicians) for the entire evening",
        amount: 1200,
        description: "A live band providing music throughout the reception.",
        pros: "Live performance creates a great atmosphere",
        cons: "Higher cost"
      },
      {
        id: 4,
        name: "Professional DJ and sound system",
        amount: 400,
        description: "A DJ with a sound system providing music and announcements.",
        pros: "More affordable and flexible music selection",
        cons: "Less unique than live music"
      }
    ]
  },
  {
    id: 3,
    category: "Transportation",
    options: [
      {
        id: 5,
        name: "Luxury limousine for the wedding couple",
        amount: 600,
        description: "Luxury limousine rental for the bride and groom’s transport.",
        pros: "Elegant and stylish arrival",
        cons: "High rental cost"
      },
      {
        id: 6,
        name: "Classic car rental",
        amount: 300,
        description: "Classic car for a more affordable yet stylish wedding ride.",
        pros: "Affordable and still classy",
        cons: "Less luxurious option"
      }
    ]
  },
  {
    id: 4,
    category: "Venue Decorations",
    options: [
      {
        id: 7,
        name: "Premium floral and lighting decorations",
        amount: 1500,
        description: "Luxurious flowers and lighting setup for the venue.",
        pros: "Stunning and photogenic setup",
        cons: "Expensive option"
      },
      {
        id: 8,
        name: "Basic table and lighting setup",
        amount: 700,
        description: "Simple yet elegant flowers and lighting for the tables.",
        pros: "More budget-friendly",
        cons: "Simpler, less visually impressive"
      }
    ]
  }
];

// ***********************TASKS*************************************

const taskCards: TaskCard[] = [
  {
    id: 0,
    category: "Planning",
    tasks: [
      {
        id: 0,
        name: "Create guest list",
        description: "Compile a list of all guests for the wedding.",
        completed: false,
        deadline: "2024-10-05",
        assignees: []
      },
      {
        id: 1,
        name: "Select venue",
        description: "Decide on the location for the ceremony and reception.",
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
        id: 2,
        name: "Confirm menu",
        description: "Finalize the food and drink options for the event.",
        completed: false,
        deadline: "2024-10-10",
        assignees: []
      },
      {
        id: 3,
        name: "Hire caterer",
        description: "Book a catering company to provide food for the wedding.",
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
        id: 4,
        name: "Choose flowers",
        description: "Select flower arrangements for the ceremony and tables.",
        completed: false,
        deadline: "2024-10-15",
        assignees: []
      },
      {
        id: 5,
        name: "Design table setup",
        description: "Plan the layout and decorations for guest tables.",
        completed: false,
        deadline: "2024-10-12",
        assignees: []
      },
      {
        id: 6,
        name: "Choose color theme",
        description: "Pick the main color palette for the wedding decor.",
        completed: false,
        deadline: "2024-10-20",
        assignees: []
      },
      {
        id: 7,
        name: "Choose kayaks",
        description: "Decide on decorative kayaks for the outdoor theme.",
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
        id: 8,
        name: "Book DJ",
        description: "Hire a DJ to provide music during the reception.",
        completed: true,
        deadline: "2024-09-22",
        assignees: []
      },
      {
        id: 9,
        name: "Plan activities",
        description: "Organize fun games or activities for the guests.",
        completed: true,
        deadline: "2024-09-23",
        assignees: []
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
  tags, guests, invitations,
  expenses, taskCards, choices,
  images, oldPhotos,
  roundTables, rectangularTables
};
export default Example;
