import { Guest, Image, TaskCard, Account, AccountDetails, WeddingDetails, Tag, Invitation, ExpenseCard, Choice, Question, Answer } from "./types";

// ***********************ACCOUNT*********************************
const accountEng: Account = {
  groomName: "John",
  brideName: "Jane",
  email: "john.jane@example.com",
  mailFrequency: "none",
};

const accountPl: Account = {
  groomName: "Jan",
  brideName: "Anna",
  email: "jan.anna@przykladowy.pl",
  mailFrequency: "none",
};

const account = { english: accountEng, polish: accountPl };

const accountDetails : AccountDetails = {
  weddingDate: "06.12.2025", 
  newlywedsTableId: null,
  budgetLimit: 2000,
  photoAlbumUrl: "album",
  invitationMainText: null,
  invitationAdditionalText: null,
  invitationGuestText: null
}

const weddingDetailsEng: WeddingDetails = {
  weddingTime: "3:00 PM",
  weddingLocation: ["St. John's Church", "123 Blossom Street", "London"],
  groomSurname: "Smith",
  brideSurname: "Johnson",
};

const weddingDetailsPl: WeddingDetails = {
  weddingTime: "15:00",
  weddingLocation: ["Kościół św. Jana", "ul. Kwiatowa 123", "Warszawa"],
  groomSurname: "Kot",
  brideSurname: "Kwiatkowska",
};
const weddingDetails = { english: weddingDetailsEng, polish: weddingDetailsPl };

// ***********************GUESTS*********************************

const tagsEng: Tag[] = [
  {
    id: 0,
    name: "family",
    rank: 2,
  },
  {
    id: 1,
    name: "friends",
    rank: 1,
  },
];

const tagsPl: Tag[] = [
  {
    id: 0,
    name: "rodzina",
    rank: 2,
  },
  {
    id: 1,
    name: "przyjaciele",
    rank: 1,
  },
];
const tags = { english: tagsEng, polish: tagsPl };

const guestsEng: Guest[] = [
  {
    id: 0,
    name: "Anna Taylor",
    decision: "yes",
    tags: [0],
    invitationId: 0,
    hasPlusOne: true,
  },
  {
    id: 1,
    name: "John Smith",
    decision: "yes",
    tags: [0],
    invitationId: 0,
    hasPlusOne: false,
  },
  {
    id: 2,
    name: "Emily Brown",
    decision: "unknown",
    tags: [1],
    invitationId: 1,
    hasPlusOne: false,
  },
  {
    id: 3,
    name: "Michael Johnson",
    decision: "yes",
    tags: [1],
    hasPlusOne: false,
    invitationId: 2,
  },
  {
    id: 4,
    name: "Olivia White",
    decision: "yes",
    tags: [],
    hasPlusOne: true,
    invitationId: 3,
  },
  {
    id: 5,
    name: "James Wilson",
    decision: "yes",
    tags: [0],
    invitationId: 2,
    hasPlusOne: false,
  },
  {
    id: 6,
    name: "Sophia Miller",
    decision: "unknown",
    tags: [0],
    invitationId: 2,
    hasPlusOne: false,
  },
  {
    id: 7,
    name: "Jacob Davis",
    decision: "no",
    tags: [1],
    invitationId: 1,
    hasPlusOne: false,
  },
];

const guestsPl: Guest[] = [
  {
    id: 0,
    name: "Anna Kowalska",
    decision: "yes",
    tags: [0],
    invitationId: 0,
    hasPlusOne: true,
  },
  {
    id: 1,
    name: "Jan Nowak",
    decision: "yes",
    tags: [0],
    invitationId: 0,
    hasPlusOne: false,
  },
  {
    id: 2,
    name: "Emilia Wiśniewska",
    decision: "unknown",
    tags: [1],
    invitationId: 1,
    hasPlusOne: false,
  },
  {
    id: 3,
    name: "Michał Lewandowski",
    decision: "yes",
    tags: [1],
    hasPlusOne: false,
    invitationId: 2,
  },
  {
    id: 4,
    name: "Katarzyna Kwiatkowska",
    decision: "yes",
    tags: [],
    hasPlusOne: true,
    invitationId: 3,
  },
  {
    id: 5,
    name: "Adam Zieliński",
    decision: "yes",
    tags: [0],
    invitationId: 2,
    hasPlusOne: false,
  },
  {
    id: 6,
    name: "Zofia Nowicka",
    decision: "unknown",
    tags: [0],
    invitationId: 2,
    hasPlusOne: false,
  },
  {
    id: 7,
    name: "Jakub Mazur",
    decision: "no",
    tags: [1],
    invitationId: 1,
    hasPlusOne: false,
  },
];

const guests = { english: guestsEng, polish: guestsPl };

const invitations: Invitation[] = [
  {
    id: 0,
    handedOut: false,
    confirmationUrl: "0",
  },
  {
    id: 1,
    handedOut: false,
    confirmationUrl: "1",
  },
  {
    id: 2,
    handedOut: true,
    confirmationUrl: "2",
  },
  {
    id: 3,
    handedOut: false,
    confirmationUrl: "3",
  },
];

// ***********************EXPENSES*********************************
const expensesEng: ExpenseCard[] = [
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

const expensesPl: ExpenseCard[] = [
  {
    id: 1,
    category: "Miejsce",
    expenses: [
      { id: 1, name: "Wynajem sali weselnej", amount: 5000, description: "Opłata za wynajem miejsca weselnego, w tym przestrzeń na ceremonię i przyjęcie." },
      { id: 2, name: "Przygotowanie miejsca ceremonii", amount: 1000, description: "Koszt ustawienia krzeseł, dekoracji i nagłośnienia w miejscu ceremonii." }
    ]
  },
  {
    id: 2,
    category: "Catering",
    expenses: [
      { id: 3, name: "Pełny obiad dla gości", amount: 3000, description: "Trzydaniowy posiłek serwowany wszystkim gościom weselnym." },
      { id: 4, name: "Tort weselny", amount: 800, description: "Duży tort weselny z wieloma warstwami i dekoracjami." },
      { id: 5, name: "Napoje i drinki", amount: 500, description: "Alkoholowe i bezalkoholowe napoje dla gości podczas całego wydarzenia." }
    ]
  },
  {
    id: 3,
    category: "Fotografia",
    expenses: [
      { id: 6, name: "Profesjonalny pakiet fotografii weselnej", amount: 1500, description: "Fotografia całodzienna na wesele." },
      { id: 7, name: "Usługi wideofilmowania", amount: 1200, description: "Wideofilmowanie całego dnia weselnego." }
    ]
  },
  {
    id: 4,
    category: "Ubrania",
    expenses: [
      { id: 8, name: "Suknia ślubna i akcesoria", amount: 2000, description: "Suknia ślubna z dodatkami, takimi jak welon i biżuteria." },
      { id: 9, name: "Garnitur i buty pana młodego", amount: 1000, description: "Formalny garnitur i buty dla pana młodego." }
    ]
  },
  {
    id: 5,
    category: "Rozrywka",
    expenses: [
      { id: 10, name: "Zespół muzyczny na przyjęciu", amount: 800, description: "Muzyka na żywo wykonywana przez zespół na przyjęciu." },
      { id: 11, name: "DJ i wynajem sprzętu nagłaśniającego", amount: 400, description: "Usługi DJ-a oraz sprzęt nagłośnieniowy do muzyki i ogłoszeń." }
    ]
  },
  {
    id: 6,
    category: "Dekoracje",
    expenses: [
      { id: 12, name: "Kwiaty i dekoracje stołów", amount: 1500, description: "Dekoracje kwiatowe i środkowe kompozycje na stołach." },
      { id: 13, name: "Ustawienie oświetlenia w miejscu weselnym", amount: 700, description: "Ustawienie oświetlenia, które poprawia atmosferę w sali." }
    ]
  },
  {
    id: 7,
    category: "Transport",
    expenses: [
      { id: 14, name: "Wynajem limuzyny dla pary młodej", amount: 600, description: "Luksusowa limuzyna dla pary młodej do przyjazdu i wyjazdu." },
      { id: 15, name: "Transport gości", amount: 300, description: "Busy transportujące gości do i z miejsca wesela." }
    ]
  },
  {
    id: 8,
    category: "Różne",
    expenses: [
      { id: 16, name: "Zaproszenia weselne", amount: 500, description: "Projektowanie i drukowanie zaproszeń weselnych dla gości." },
      { id: 17, name: "Prezenty dla gości", amount: 200, description: "Małe upominki dla gości jako wyraz wdzięczności." }
    ]
  }
];

const expenses = { english: expensesEng, polish: expensesPl };


const choicesEng: Choice[] = [
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
        description: "Luxury limousine rental for the bride and groom's transport.",
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

const choicesPl: Choice[] = [
  {
    id: 1,
    category: "Fotografia",
    options: [
      {
        id: 1,
        name: "Fotografia całodzienna z dwoma fotografami",
        amount: 1500,
        description: "Dwóch fotografów uwieczniających cały dzień od początku do końca.",
        pros: "Kompleksowa obsługa, wysokiej jakości zdjęcia",
        cons: "Drogi pakiet"
      },
      {
        id: 2,
        name: "Fotografia półdniowa z jednym fotografem",
        amount: 800,
        description: "Jeden fotograf obsługujący tylko ceremonię i kluczowe momenty.",
        pros: "Bardziej przystępna cena",
        cons: "Ograniczona liczba zdjęć"
      }
    ]
  },
  {
    id: 2,
    category: "Rozrywka",
    options: [
      {
        id: 3,
        name: "Zespół muzyczny (5 muzyków) na całe przyjęcie",
        amount: 1200,
        description: "Zespół muzyczny zapewniający muzykę przez całe przyjęcie.",
        pros: "Występ na żywo tworzy niesamowitą atmosferę",
        cons: "Wyższy koszt"
      },
      {
        id: 4,
        name: "DJ z systemem nagłośnieniowym",
        amount: 400,
        description: "DJ z nagłośnieniem zapewniający muzykę i ogłoszenia.",
        pros: "Bardziej przystępna cena i elastyczny dobór muzyki",
        cons: "Mniej wyjątkowe niż muzyka na żywo"
      }
    ]
  },
  {
    id: 3,
    category: "Transport",
    options: [
      {
        id: 5,
        name: "Wynajem limuzyny dla pary młodej",
        amount: 600,
        description: "Wynajem luksusowej limuzyny dla panny młodej i pana młodego.",
        pros: "Elegancki i stylowy przyjazd",
        cons: "Wysoki koszt wynajmu"
      },
      {
        id: 6,
        name: "Wynajem klasycznego samochodu",
        amount: 300,
        description: "Wynajem klasycznego samochodu, tańszy, ale wciąż elegancki.",
        pros: "Przystępna cena, wciąż elegancki",
        cons: "Mniej luksusowa opcja"
      }
    ]
  },
  {
    id: 4,
    category: "Dekoracje miejsca",
    options: [
      {
        id: 7,
        name: "Ekskluzywne dekoracje kwiatowe i oświetlenie",
        amount: 1500,
        description: "Luksusowe dekoracje kwiatowe i oświetlenie w miejscu weselnym.",
        pros: "Niesamowita, fotogeniczna aranżacja",
        cons: "Droga opcja"
      },
      {
        id: 8,
        name: "Podstawowa dekoracja stołów i oświetlenie",
        amount: 700,
        description: "Proste, ale eleganckie kwiaty i oświetlenie na stołach.",
        pros: "Bardziej przystępna cena",
        cons: "Prostsza, mniej efektowna"
      }
    ]
  }
];

const choices = { english: choicesEng, polish: choicesPl };

// ***********************TASKS*************************************

const taskCardsEng: TaskCard[] = [
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

const taskCardsPl: TaskCard[] = [
  {
    id: 0,
    category: "Planowanie",
    tasks: [
      {
        id: 0,
        name: "Stwórz listę gości",
        description: "Sporządź listę wszystkich gości na wesele.",
        completed: false,
        deadline: "2024-10-05",
        assignees: []
      },
      {
        id: 1,
        name: "Wybierz miejsce",
        description: "Zdecyduj o lokalizacji ceremonii i przyjęcia.",
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
        name: "Potwierdź menu",
        description: "Sfinalizuj opcje jedzenia i napojów na wydarzenie.",
        completed: false,
        deadline: "2024-10-10",
        assignees: []
      },
      {
        id: 3,
        name: "Zatrudnij katering",
        description: "Zarezerwuj firmę cateringową do obsługi wesela.",
        completed: true,
        deadline: "2024-09-28",
        assignees: []
      },
    ],
  },
  {
    id: 2,
    category: "Dekoracje",
    tasks: [
      {
        id: 4,
        name: "Wybierz kwiaty",
        description: "Wybierz dekoracje kwiatowe na ceremonię i stoły.",
        completed: false,
        deadline: "2024-10-15",
        assignees: []
      },
      {
        id: 5,
        name: "Zaprojektuj ustawienie stołów",
        description: "Zaplanuj układ i dekoracje na stołach dla gości.",
        completed: false,
        deadline: "2024-10-12",
        assignees: []
      },
      {
        id: 6,
        name: "Wybierz motyw kolorystyczny",
        description: "Wybierz główną paletę kolorów do dekoracji wesela.",
        completed: false,
        deadline: "2024-10-20",
        assignees: []
      },
      {
        id: 7,
        name: "Wybierz kajaki",
        description: "Zdecyduj o dekoracyjnych kajakach na zewnątrz.",
        completed: true,
        deadline: "2024-09-29",
        assignees: []
      },
    ],
  },
  {
    id: 3,
    category: "Rozrywka",
    tasks: [
      {
        id: 8,
        name: "Zarezerwuj DJ-a",
        description: "Zatrudnij DJ-a do zapewnienia muzyki podczas przyjęcia.",
        completed: true,
        deadline: "2024-09-22",
        assignees: []
      },
      {
        id: 9,
        name: "Zaplanuj atrakcje",
        description: "Zorganizuj zabawne gry lub atrakcje dla gości.",
        completed: true,
        deadline: "2024-09-23",
        assignees: []
      },
    ],
  },
];

const taskCards = { english: taskCardsEng, polish: taskCardsPl };

// ***********************PHOTOS*************************************


const imageLinks = {
  weddingCeremony: "/pictures/wedding_ceremony.png",
  brideAndGroom: "/pictures/bride_and_groom.png",
  firstDance: "/pictures/dancing2.png",
  weddingRings: "/pictures/wedding_rings.png",
  flowers: "/pictures/flowers.png",
  receptionDinner: "/pictures/reception_dinner.png",
  weddingCake: "/pictures/wedding_cake.png",
  bridalParty: "/pictures/bridal_party.png",
  brideDress: "/pictures/bride_dress.png",
};

const imagesEng: Image[] = [
  {
    id: 1,
    name: "Wedding Ceremony",
    link: imageLinks.weddingCeremony,
    isFavorite: false,
    author: "Jane Doe",
  },
  {
    id: 2,
    name: "Bride and Groom",
    link: imageLinks.brideAndGroom,
    isFavorite: true,
    author: "John Doe",
    isApproved: true,
  },
  {
    id: 3,
    name: "First Dance",
    link: imageLinks.firstDance,
    isFavorite: false,
    author: "Alice Johnson",
  },
  {
    id: 4,
    name: "Wedding Rings",
    link: imageLinks.weddingRings,
    isFavorite: true,
    author: "Mark Smith",
    isApproved: true,
  },
  {
    id: 5,
    name: "Flower Bouquet",
    link: imageLinks.flowers,
    isFavorite: false,
    author: "Emily Davis",
  },
  {
    id: 6,
    name: "Reception Dinner",
    link: imageLinks.receptionDinner,
    isFavorite: true,
    author: "James White",
    isApproved: true,
  },
  {
    id: 7,
    name: "Wedding Cake",
    link: imageLinks.weddingCake,
    isFavorite: false,
    author: "Sophia Lee",
  },
  {
    id: 8,
    name: "Bridal Party",
    link: imageLinks.bridalParty,
    isFavorite: true,
    author: "Robert Wilson",
    isApproved: true,
  },
  {
    id: 9,
    name: "Bride's Dress",
    link: imageLinks.brideDress,
    isFavorite: false,
    author: "Mary Jackson",
    isApproved: true,
  },
];

const imagesPl: Image[] = [
  {
    id: 1,
    name: "Ceremonia Ślubna",
    link: imageLinks.weddingCeremony,
    isFavorite: false,
    author: "Anna Kowalska",
  },
  {
    id: 2,
    name: "Para Młoda",
    link: imageLinks.brideAndGroom,
    isFavorite: true,
    author: "Piotr Nowak",
    isApproved: true,
  },
  {
    id: 3,
    name: "Pierwszy Taniec",
    link: imageLinks.firstDance,
    isFavorite: false,
    author: "Katarzyna Wójcik",
  },
  {
    id: 4,
    name: "Obrączki Ślubne",
    link: imageLinks.weddingRings,
    isFavorite: true,
    author: "Michał Zieliński",
    isApproved: true,
  },
  {
    id: 5,
    name: "Bukiet Kwiatów",
    link: imageLinks.flowers,
    isFavorite: false,
    author: "Ewa Lewandowska",
  },
  {
    id: 6,
    name: "Obiad Weselny",
    link: imageLinks.receptionDinner,
    isFavorite: true,
    author: "Tomasz Jankowski",
    isApproved: true,
  },
  {
    id: 7,
    name: "Tort Weselny",
    link: imageLinks.weddingCake,
    isFavorite: false,
    author: "Joanna Adamczyk",
  },
  {
    id: 8,
    name: "Wesele - Druhny",
    link: imageLinks.bridalParty,
    isFavorite: true,
    author: "Andrzej Pawlak",
    isApproved: true,
  },
  {
    id: 9,
    name: "Suknia Ślubna",
    link: imageLinks.brideDress,
    isFavorite: false,
    author: "Magdalena Kwiatkowska",
    isApproved: true,
  },
];

const images = { english: imagesEng, polish: imagesPl };

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

// **********************QUESTIONNAIRE**********************************

const questionsEng: Question[] = [
  {
    id: 1,
    text: "What is your dietary preference?",
    type: "choice",
    options: ["No preference", "Vegetarian", "Vegan", "Lactose-free", "Gluten-free"],
  },
  {
    id: 2,
    text: "Do you need accommodation?",
    type: "yes/no",
  }
];

const questionsPl: Question[] = [
  {
    id: 1,
    text: "Jakie są Twoje preferencje dietetyczne?",
    type: "choice",
    options: ["Brak preferencji", "Wegetariańska", "Wegańska", "Bez laktozy", "Bezglutenowa"],
  },
  {
    id: 2,
    text: "Czy potrzebujesz noclegu?",
    type: "yes/no",
  }
];

const questions = { english: questionsEng, polish: questionsPl };

const answersEng: Answer[] = [
  {
    questionId: 1,
    guestId: 1,
    answer: "Vegetarian",
  },
  {
    questionId: 1,
    guestId: 2,
    answer: "Vegan",
  },
  {
    questionId: 2,
    guestId: 1,
    answer: "yes",
  },
  {
    questionId: 2,
    guestId: 3,
    answer: "no",
  },
];

const answersPl: Answer[] = [
  {
    questionId: 1,
    guestId: 1,
    answer: "Wegetariańska",
  },
  {
    questionId: 1,
    guestId: 2,
    answer: "Wegańska",
  },
  {
    questionId: 2,
    guestId: 1,
    answer: "tak",
  },
  {
    questionId: 2,
    guestId: 3,
    answer: "nie",
  },
];

const answers = { english: answersEng, polish: answersPl };

// *******************************************************************
const Example = { 
  account, accountDetails, 
  weddingDetails,
  tags, guests, invitations,
  expenses, taskCards, choices,
  images,
  roundTables, rectangularTables, 
  questions, answers,
};
export default Example;
