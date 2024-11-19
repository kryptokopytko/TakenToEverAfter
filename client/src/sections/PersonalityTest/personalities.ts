export type ToxicPersonality = {
  name: string;
  description: string;
};

export type Result = {
  personality: string;
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

export const toxicPersonalities: ToxicPersonality[] = [
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

export const questions: Question[] = [
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
