export type ToxicPersonality = {
  name: string;
  description: string;
};

export type Result = {
  personality: number;
  points: number;
};

export type Answer = {
  personality: string;
  weight: number;
};

export type Question = {
  question: string;
  answers: {
    text: string;
    points: Answer[];
  }[];
};

export const toxicPersonalitiesPol: ToxicPersonality[] = [
  {
    name: "Nitrogliceryna",
    description:
      "Nieprzewidywalny i wybuchowy – nigdy nie wiadomo, kiedy stracisz kontrolę. Możesz być przydatny, ale lepiej z Tobą nie igrać.",
  },
  {
    name: "Kwas siarkowy",
    description:
      "Powoli, ale skutecznie niszczysz wszystko, co stanie Ci na drodze. Twoja siła tkwi w cierpliwości i trwałości – słowa i czyny zostawiają ślady na długo.",
  },
  {
    name: "Czarny dym",
    description:
      "Jesteś cichy, ale nie do zignorowania. Wchodzisz niezauważony, a potem wszyscy czują Twoją obecność. Idealny w subtelnym przejmowaniu kontroli.",
  },
  {
    name: "Ciekły azot",
    description:
      "Zimny jak lód, działasz z precyzją i szybkością. Trzymasz emocje na wodzy, ale Twoje reakcje mogą być ekstremalne, jeśli ktoś Cię sprowokuje.",
  },
  {
    name: "Rtęć",
    description:
      "Fascynujący, ale niebezpieczny. Twoja osobowość jest płynna i nieprzewidywalna – można Cię podziwiać, ale lepiej zachować dystans.",
  },
  {
    name: "Amoniak",
    description:
      "Intensywny i trudny do zniesienia, szczególnie gdy zbyt długo pozostajesz w jednym miejscu. Twoja osobowość wywołuje skrajne emocje – od uwielbienia po irytację.",
  },
  {
    name: "Radioaktywny uran",
    description:
      "Zostawiasz ślad na lata, nawet jeśli już Cię nie ma. Twoja obecność jest potężna, ale czasem wymaga ostrożności i dystansu.",
  },
  {
    name: "Gaz musztardowy",
    description:
      "Jesteś subtelny i skuteczny – pojawiasz się tam, gdzie nikt Cię nie spodziewa, a efekty Twojego działania są odczuwalne jeszcze długo po fakcie.",
  },
  {
    name: "Chlor",
    description:
      "Na pierwszy rzut oka jesteś przydatny i pomocny, ale jeśli ktoś przesadzi z dawkowaniem Twojej osobowości, robi się naprawdę nieprzyjemnie.",
  },
  {
    name: "Fosfor biały",
    description:
      "Twoja pasja i energia potrafią rozświetlić każdy pokój, ale niekontrolowane emocje mogą szybko wszystko spalić.",
  },
  {
    name: "Czarny proch",
    description:
      "Klasyczna mieszanka wybuchowa – nie masz nowoczesnych dodatków, ale zawsze robisz swoje w odpowiednim momencie.",
  },
  {
    name: "Asfalt",
    description:
      "Działasz powoli i spokojnie, ale Twoja lepkość i ciężkość zostawiają nieusuwalne ślady. Nikt nie ucieknie przed Twoim urokiem, jeśli już ich złapiesz.",
  },
  {
    name: "Freon",
    description:
      "Twoje chłodne podejście potrafi uspokoić atmosferę, ale każdy wie, że Twoja obecność może mieć długofalowe skutki.",
  },
  {
    name: "Kwas azotowy",
    description:
      "Jesteś skoncentrowany i przenikliwy – potrafisz rozłożyć na czynniki pierwsze wszystko, co stanie Ci na drodze. Twoja bystrość bywa jednak przytłaczająca.",
  },
  {
    name: "Gaz rozweselający",
    description:
      "Zawsze wywołujesz uśmiech na twarzach innych, ale Twoja radość bywa czasem… zbyt intensywna. Potrzebujesz balansu!",
  },
];

export const questionsPol: Question[] = [
  {
    question: "Jak reagujesz na trudne sytuacje?",
    answers: [
      {
        text: "Wybucham natychmiast jak wulkan.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Powoli się gotuję, aż w końcu eksploduję.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Unikam konfliktów, ale po cichu truję atmosferę.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Neutralizuję napięcia, ale czasami nieprzewidywalnie się zapalam.",
        points: [{ personality: "Fosfor biały", weight: 2 * 3.222 }],
      },
    ],
  },
  {
    question: "Jak opisaliby Cię Twoi znajomi?",
    answers: [
      {
        text: "Intensywny i nieprzewidywalny.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Powolny, ale skuteczny.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Subtelny, ale zostawiający trwałe wrażenie.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Szybki i nie do zatrzymania.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Co robisz, gdy ktoś Cię ignoruje?",
    answers: [
      {
        text: "Daję o sobie znać głośno i wyraźnie.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Powoli planuję zemstę.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Znikam, ale później wracam z podwójną siłą.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Staram się ich zneutralizować w sposób pokojowy.",
        points: [{ personality: "Chlor", weight: 4.833 }],
      },
    ],
  },
  {
    question: "Które miejsce najlepiej opisuje Twój charakter?",
    answers: [
      {
        text: "Laboratorium chemiczne pełne wybuchowych substancji.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Bagno, gdzie powoli dzieją się nieoczywiste rzeczy.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Fabryka gazów – niewidzialny, ale odczuwalny.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Składowisko odpadów, zawsze coś się dzieje.",
        points: [{ personality: "Radioaktywny uran", weight: 2 * 7.25 }],
      },
    ],
  },
  {
    question: "Twoja ulubiona pora dnia?",
    answers: [
      {
        text: "Wschód słońca – czas na intensywne działanie.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Północ – gdy wszystko jest spokojne, ale coś się czai w ciemności.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Południe – gdy atmosfera jest już maksymalnie napięta.",
        points: [{ personality: "Kwas azotowy", weight: 2 * 14.5 }],
      },
      {
        text: "Wieczór – powoli zmierzam do kulminacji.",
        points: [{ personality: "Fosfor biały", weight: 2 * 3.222 }],
      },
    ],
  },
  {
    question: "Jak radzisz sobie w pracy zespołowej?",
    answers: [
      {
        text: "Dominuję i narzucam swoją wizję.",
        points: [{ personality: "Radioaktywny uran", weight: 2 * 7.25 }],
      },
      {
        text: "Działam w cieniu, kontrolując sytuację subtelnie.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Uspokajam napięcia i staram się zneutralizować konflikty.",
        points: [{ personality: "Chlor", weight: 2 * 4.833 }],
      },
      {
        text: "Trzymam dystans, ale działam skutecznie, gdy trzeba.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Co motywuje Cię do działania?",
    answers: [
      {
        text: "Adrenalina i intensywne emocje.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Cierpliwe dążenie do celu.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Subtelne manipulowanie otoczeniem.",
        points: [{ personality: "Gaz musztardowy", weight: 2 * 7.25 }],
      },
      {
        text: "Chłodne i logiczne podejście.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Jak radzisz sobie ze stresem?",
    answers: [
      {
        text: "Wybucham od razu i rozładowuję napięcie.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Trzymam wszystko w sobie, aż to mnie wypali.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Staram się zamaskować stres i działać dalej.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Zamrażam emocje, by móc działać racjonalnie.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Jak reagujesz, gdy ktoś przekracza Twoje granice?",
    answers: [
      {
        text: "Od razu robię awanturę, nie ma przebacz!",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Cicho się wycofuję, ale nigdy tego nie zapomnę.",
        points: [
          { personality: "Czarny dym", weight: 2 * 1.0 },
          { personality: "Kwas siarkowy", weight: 1 * 1.261 },
        ],
      },
      {
        text: "Działam precyzyjnie i skutecznie, bez zbędnych emocji.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
      {
        text: "Wywołuję napięcie, aż wszyscy poczują dyskomfort.",
        points: [{ personality: "Amoniak", weight: 15 }],
      },
    ],
  },
  {
    question: "Jak wygląda Twoja idealna zemsta?",
    answers: [
      {
        text: "Szybka, efektowna i widowiskowa.",
        points: [
          { personality: "Nitrogliceryna", weight: 2 * 1.036 },
          { personality: "Fosfor biały", weight: 1 * 3.222 },
        ],
      },
      {
        text: "Powolna, ale skuteczna – nikt nie wie, kiedy to nadejdzie.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Subtelna, ale tak zaplanowana, że nikt się nie zorientuje.",
        points: [
          { personality: "Gaz musztardowy", weight: 2 * 7.25 },
          { personality: "Czarny dym", weight: 1 * 1.0 },
        ],
      },
      {
        text: "Chłodna, logiczna, bez zbędnych emocji.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Jak radzisz sobie z trudnymi emocjami?",
    answers: [
      {
        text: "Wybucham, muszę dać upust swoim emocjom.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Zamykam je w sobie i działam, aż w końcu one mnie wyniszczają.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Maskuję je, ale w środku wrze.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Zamrażam je, żeby przeanalizować sytuację na chłodno.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Gdy pojawia się problem, co robisz?",
    answers: [
      {
        text: "Rzucam się na niego z całą energią, aż wybuchnę.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Działam cierpliwie, krok po kroku eliminując przeszkody.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Próbuję ominąć problem, zostawiając go innym do rozwiązania.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Neutralizuję problem spokojnie i z dystansem.",
        points: [{ personality: "Chlor", weight: 6 }],
      },
    ],
  },
  {
    question: "Jakie jest Twoje podejście do konfliktów?",
    answers: [
      {
        text: "Atakuję, zanim ktoś zdąży się zorientować.",
        points: [{ personality: "Fosfor biały", weight: 2 * 3.222 }],
      },
      {
        text: "Unikam otwartych starć, ale po cichu truję atmosferę.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Działam chłodno i strategicznie, żeby zminimalizować straty.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
      {
        text: "Rozgrzewam atmosferę, aż wszyscy się spalą w emocjach.",
        points: [
          { personality: "Fosfor biały", weight: 2 * 3.222 },
          { personality: "Amoniak", weight: 10 },
        ],
      },
    ],
  },
  {
    question: "Jakie hasło najlepiej Cię opisuje?",
    answers: [
      {
        text: "Żyję szybko i intensywnie – liczy się moment!",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Cierpliwość to klucz do sukcesu.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Nie muszę być widoczny, żeby mieć wpływ.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Precyzja i chłód – to moja przewaga.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Jak działasz, gdy chcesz coś osiągnąć?",
    answers: [
      {
        text: "Ruszam z kopyta, bez oglądania się na konsekwencje.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Planuję dokładnie i czekam na odpowiedni moment.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Powoli osłabiam przeciwnika, nie dając mu szans na reakcję.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Rozpracowuję problem chłodno i analitycznie.",
        points: [{ personality: "Ciekły azot", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "Jak opiszesz swoją obecność w grupie?",
    answers: [
      {
        text: "Jestem jak dynamit – szybko robię wrażenie.",
        points: [{ personality: "Nitrogliceryna", weight: 2 * 1.036 }],
      },
      {
        text: "Cicho działam w tle, aż wszyscy poczują mój wpływ.",
        points: [{ personality: "Czarny dym", weight: 2 * 1.0 }],
      },
      {
        text: "Moja siła tkwi w cierpliwości i konsekwencji.",
        points: [{ personality: "Kwas siarkowy", weight: 2 * 1.261 }],
      },
      {
        text: "Neutralizuję konflikty i dbam o równowagę.",
        points: [{ personality: "Chlor", weight: 2 * 4.833 }],
      },
    ],
  },
];

export const toxicPersonalitiesEng: ToxicPersonality[] = [
  {
    name: "Nitroglycerin",
    description:
      "Unpredictable and explosive – you never know when you'll lose control. You can be useful, but it's better not to mess with you.",
  },
  {
    name: "Sulfuric Acid",
    description:
      "Slowly but effectively, you destroy everything in your path. Your strength lies in patience and persistence – your words and actions leave lasting marks.",
  },
  {
    name: "Black Smoke",
    description:
      "You're quiet but impossible to ignore. You enter unnoticed, and then everyone feels your presence. Perfect for subtle power plays.",
  },
  {
    name: "Liquid Nitrogen",
    description:
      "Cold as ice, you act with precision and speed. You keep emotions in check, but your reactions can be extreme if provoked.",
  },
  {
    name: "Mercury",
    description:
      "Fascinating but dangerous. Your personality is fluid and unpredictable – you can be admired, but it's better to keep your distance.",
  },
  {
    name: "Ammonia",
    description:
      "Intense and hard to endure, especially when you stay in one place too long. Your personality evokes extreme emotions – from admiration to irritation.",
  },
  {
    name: "Radioactive Uranium",
    description:
      "You leave a mark for years, even when you're gone. Your presence is powerful, but it sometimes requires caution and distance.",
  },
  {
    name: "Mustard Gas",
    description:
      "You're subtle and effective – you appear where no one expects you, and the effects of your actions are felt long afterward.",
  },
  {
    name: "Chlorine",
    description:
      "At first glance, you're useful and helpful, but if someone overdoses on your personality, things can get really unpleasant.",
  },
  {
    name: "White Phosphorus",
    description:
      "Your passion and energy can light up any room, but uncontrolled emotions can quickly burn everything down.",
  },
  {
    name: "Gunpowder",
    description:
      "A classic explosive mix – you may lack modern touches, but you always get the job done at the right moment.",
  },
  {
    name: "Asphalt",
    description:
      "You act slowly and steadily, but your stickiness and weight leave indelible marks. No one escapes your charm once you've caught them.",
  },
  {
    name: "Freon",
    description:
      "Your cool approach can calm the atmosphere, but everyone knows your presence can have long-term consequences.",
  },
  {
    name: "Nitric Acid",
    description:
      "You're focused and penetrating – you can break down anything in your path. However, your sharpness can be overwhelming at times.",
  },
  {
    name: "Laughing Gas",
    description:
      "You always bring a smile to everyone's face, but your joy can sometimes be... too intense. You need balance!",
  },
];

export const questionsEng: Question[] = [
  {
    question: "How do you react to difficult situations?",
    answers: [
      {
        text: "I explode instantly like a volcano.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I simmer slowly until I finally explode.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I avoid conflicts but quietly poison the atmosphere.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I neutralize tensions but sometimes ignite unpredictably.",
        points: [{ personality: "White Phosphorus", weight: 2 * 3.222 }],
      },
    ],
  },
  {
    question: "How would your friends describe you?",
    answers: [
      {
        text: "Intense and unpredictable.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "Slow but effective.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "Subtle but leaves a lasting impression.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "Fast and unstoppable.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "What do you do when someone ignores you?",
    answers: [
      {
        text: "I make myself known loud and clear.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I slowly plan revenge.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I disappear but return with twice the force.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I try to neutralize them peacefully.",
        points: [{ personality: "Chlorine", weight: 4.833 }],
      },
    ],
  },
  {
    question: "Which place best describes your character?",
    answers: [
      {
        text: "A chemical lab full of explosive substances.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "A swamp where subtle things happen slowly.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "A gas factory – invisible but noticeable.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "A waste dump – there’s always something going on.",
        points: [{ personality: "Radioactive Uranium", weight: 2 * 7.25 }],
      },
    ],
  },
  {
    question: "What’s your favorite time of day?",
    answers: [
      {
        text: "Sunrise – time for intense action.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "Midnight – when everything is calm but something lurks in the dark.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "Noon – when the atmosphere is at maximum tension.",
        points: [{ personality: "Nitric Acid", weight: 2 * 14.5 }],
      },
      {
        text: "Evening – slowly building to a climax.",
        points: [{ personality: "White Phosphorus", weight: 2 * 3.222 }],
      },
    ],
  },
  {
    question: "How do you handle teamwork?",
    answers: [
      {
        text: "I dominate and impose my vision.",
        points: [{ personality: "Radioactive Uranium", weight: 2 * 7.25 }],
      },
      {
        text: "I work in the shadows, subtly controlling the situation.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I calm tensions and try to neutralize conflicts.",
        points: [{ personality: "Chlorine", weight: 2 * 4.833 }],
      },
      {
        text: "I keep my distance but act effectively when needed.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "What motivates you to act?",
    answers: [
      {
        text: "Adrenaline and intense emotions.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "Patiently working toward a goal.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "Subtly manipulating the environment.",
        points: [{ personality: "Mustard Gas", weight: 2 * 7.25 }],
      },
      {
        text: "Cool and logical reasoning.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "How do you handle stress?",
    answers: [
      {
        text: "I explode right away and release the tension.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I keep everything inside until it burns me out.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I mask the stress and keep moving forward.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I freeze my emotions to act rationally.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "How do you react when someone crosses your boundaries?",
    answers: [
      {
        text: "I immediately create a scene – no forgiveness!",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I quietly retreat but never forget.",
        points: [
          { personality: "Black Smoke", weight: 2 * 1.0 },
          { personality: "Sulfuric Acid", weight: 1 * 1.261 },
        ],
      },
      {
        text: "I act precisely and effectively, without unnecessary emotions.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
      {
        text: "I create tension until everyone feels uncomfortable.",
        points: [{ personality: "Ammonia", weight: 15 }],
      },
    ],
  },
  {
    question: "What does your ideal revenge look like?",
    answers: [
      {
        text: "Quick, spectacular, and attention-grabbing.",
        points: [
          { personality: "Nitroglycerin", weight: 2 * 1.036 },
          { personality: "White Phosphorus", weight: 1 * 3.222 },
        ],
      },
      {
        text: "Slow but effective – no one knows when it will strike.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "Subtle but so well-planned no one notices.",
        points: [
          { personality: "Mustard Gas", weight: 2 * 7.25 },
          { personality: "Black Smoke", weight: 1 * 1.0 },
        ],
      },
      {
        text: "Cold, logical, and without unnecessary emotions.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "How do you deal with difficult emotions?",
    answers: [
      {
        text: "I explode; I need to vent my emotions.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I bottle them up and keep going until they destroy me.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I mask them, but I boil inside.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I freeze them to analyze the situation coolly.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "What do you do when a problem arises?",
    answers: [
      {
        text: "I tackle it head-on with all my energy until I explode.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I handle it patiently, eliminating obstacles step by step.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I try to bypass the problem, leaving it for others to solve.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I neutralize the problem calmly and with detachment.",
        points: [{ personality: "Chlorine", weight: 6 }],
      },
    ],
  },
  {
    question: "What’s your approach to conflicts?",
    answers: [
      {
        text: "I strike before anyone can realize.",
        points: [{ personality: "White Phosphorus", weight: 2 * 3.222 }],
      },
      {
        text: "I avoid open clashes but quietly poison the atmosphere.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I act coldly and strategically to minimize losses.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
      {
        text: "I heat things up until everyone burns with emotions.",
        points: [
          { personality: "White Phosphorus", weight: 2 * 3.222 },
          { personality: "Ammonia", weight: 10 },
        ],
      },
    ],
  },
  {
    question: "What slogan best describes you?",
    answers: [
      {
        text: "I live fast and intensely – it’s all about the moment!",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "Patience is the key to success.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I don’t need to be visible to make an impact.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "Precision and coolness are my strengths.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "How do you act when you want to achieve something?",
    answers: [
      {
        text: "I go all out without worrying about consequences.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I plan meticulously and wait for the right moment.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I slowly weaken my opponent, giving them no chance to react.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "I tackle the problem coolly and analytically.",
        points: [{ personality: "Liquid Nitrogen", weight: 2 * 1.45 }],
      },
    ],
  },
  {
    question: "How would you describe your presence in a group?",
    answers: [
      {
        text: "I’m like dynamite – I make an impression fast.",
        points: [{ personality: "Nitroglycerin", weight: 2 * 1.036 }],
      },
      {
        text: "I work quietly in the background until everyone feels my impact.",
        points: [{ personality: "Black Smoke", weight: 2 * 1.0 }],
      },
      {
        text: "My strength lies in patience and consistency.",
        points: [{ personality: "Sulfuric Acid", weight: 2 * 1.261 }],
      },
      {
        text: "I neutralize conflicts and maintain balance.",
        points: [{ personality: "Chlorine", weight: 2 * 4.833 }],
      },
    ],
  },
];
