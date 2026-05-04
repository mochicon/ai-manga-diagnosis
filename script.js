const scoreKeys = ["creative", "media", "manga", "emotion", "finish"];

const scoreLabels = {
  creative: "クリエイティブ力",
  media: "メディアへの情報力",
  manga: "漫画の知識",
  emotion: "エモーション力",
  finish: "作り上げる力と継続力"
};

const flagKeys = ["routeLibrary",
"routeMaze",
"routeKnight",
"routeRainbow",
"routeMofu",
"routeAkagane",
"routeBard",
"routeLove",
"routeDark",
"routeBlueDragon",
"routeAlchemist",
"routeSilver",
"routeKotodama",
"routePentagramHint",
"likesCuteWorld",
  "likesWords",
  "likesDarkMood",
  "likesVisualDesign",
  "likesPublishing",
  "hasMangaDepth",
  "hasKindnessDrive",
  "hasCompletionDrive",
  "likesWorldBuilding",
  "likesTrendWatching",
  "likesEmotionCharacter",
  "likesStoryStructure",
  "likesDarkMoodStrong",
  "likesBooksKnowledge",
  "likesWorldStructure",
  "otherTaste",
  "undecided"
];

const content = {
  title: "3分でできる あなたの物語クリエイター適性診断",
  subtitle: "漫画・アニメ・映画・夢・好きな世界から、あなたの“作る力”を見つけます",
  startButton: "診断をはじめる",
  questionStartButton: "16の質問に答える",
  showResultButton: "結果を見る",
  restartButton: "もう一度診断する",
  opening: [
  "この診断では、<br>あなたの中に眠る<br>AIマンガクリエイターとしての資質を<br>16の質問でそっと見ていきます。"
],
  loading: [
    "あなたの中に眠る<br>“作る力”の物語…"
  ]
};

function scores(values) {
  return {
    creative: values.creative || 0,
    media: values.media || 0,
    manga: values.manga || 0,
    emotion: values.emotion || 0,
    finish: values.finish || 0
  };
}

function flags(names) {
  return names.reduce((total, name) => {
    total[name] = true;
    return total;
  }, {});
}

function answer(text, scoreValues, flagNames = []) {
  return {
    text,
    scores: scores(scoreValues),
    flags: flags(flagNames)
  };
}

function createAnswerFlags() {
  return flagKeys.reduce((total, key) => {
    total[key] = false;
    return total;
  }, {});
}

const fixedQuestions = [
  {
    id: "fixed01",
    text: "漫画・アニメ・映画・ドラマなど、物語作品は好きですか？",
    answers: [
      { text: "生活の一部", scores: scores({ creative: 1, media: 3, manga: 2, emotion: 2 }) },
      { text: "かなり好き", scores: scores({ creative: 1, media: 2, manga: 1, emotion: 2 }) },
      { text: "たまに楽しむ", scores: scores({ media: 1, emotion: 1 }) },
      { text: "あまり触れていない", scores: scores({}) }
    ]
  },
  {
    id: "fixed02",
    text: "形にできない物語やアイデアがありますか？",
    answers: [
      { text: "ずっと心にある", scores: scores({ creative: 3, emotion: 2, finish: 1 }) },
      { text: "ぼんやりある", scores: scores({ creative: 2, emotion: 1, finish: 1 }) },
      { text: "いつか作ってみたい", scores: scores({ creative: 1, emotion: 1 }) },
      { text: "今は特にない", scores: scores({}) }
    ]
  },
  {
    id: "fixed03",
    text: "誰かの心に届くものを作れたら嬉しいですか？",
    answers: [
      { text: "とても嬉しい", scores: scores({ creative: 1, media: 1, emotion: 3, finish: 1 }) },
      { text: "そう思うことがある", scores: scores({ creative: 1, emotion: 2, finish: 1 }) },
      { text: "どちらかというと自分用に作りたい", scores: scores({ creative: 1, emotion: 1 }) },
      { text: "あまり意識しない", scores: scores({}) }
    ]
  },
  {
    id: "fixed04",
    text: "新しいツールやサービスを試すのは好きですか？",
    answers: [
      { text: "すぐ試したくなる", scores: scores({ creative: 1, media: 3, finish: 2 }) },
      { text: "気になるものは調べる", scores: scores({ media: 2, finish: 1 }) },
      { text: "必要なら使う", scores: scores({ media: 1, finish: 1 }) },
      { text: "少し苦手", scores: scores({}) }
    ]
  },
  {
    id: "fixed05",
    text: "最後まで作り上げることについて、今の自分に近いのは？",
    answers: [
      { text: "コツコツ続けられる", scores: scores({ finish: 3 }) },
      { text: "締切や目的があればできる", scores: scores({ finish: 2 }) },
      { text: "途中で止まりがち", scores: scores({ creative: 1, emotion: 1, finish: 1 }) },
      { text: "完成までの道筋が見えない", scores: scores({}) }
    ]
  },
  {
    id: "fixed06",
    text: "作品を見るとき、どこに一番ひかれますか？",
    answers: [
      { text: "キャラクター", scores: scores({ creative: 1, manga: 1, emotion: 2 }) },
      { text: "セリフや言葉", scores: scores({ manga: 1, emotion: 3 }), flags: flags(["likesWords"]) },
      { text: "世界観や雰囲気", scores: scores({ creative: 3, emotion: 1 }) },
      { text: "展開や構成", scores: scores({ manga: 3, finish: 1 }), flags: flags(["likesStoryStructure"]) }
    ]
  },
  {
    id: "fixed07",
    text: "外に出ず、家で創作や仕事ができたら嬉しいですか？",
    answers: [
      { text: "最高", scores: scores({ creative: 1, media: 1, finish: 2 }) },
      { text: "かなり嬉しい", scores: scores({ creative: 1, media: 1, finish: 1 }) },
      { text: "どちらでもいい", scores: scores({ finish: 1 }) },
      { text: "外に出る仕事も好き", scores: scores({}) }
    ]
  }
];

const randomGroups = [
  [
    {
      id: "q_manga_01",
      text: "漫画は好きですか？",
      answers: [
        { text: "大好き。生活の一部", scores: scores({ creative: 1, media: 2, manga: 3, emotion: 1 }) },
        { text: "好き。よく読む", scores: scores({ creative: 1, media: 1, manga: 2, emotion: 1 }) },
        { text: "たまに読む", scores: scores({ media: 1, manga: 1 }) },
        { text: "あまり読まない", scores: scores({}) }
      ]
    },
    {
      id: "q_manga_02",
      text: "マンガ家にあこがれたことがありますか？",
      answers: [
        { text: "かなりある", scores: scores({ creative: 3, manga: 2, emotion: 1, finish: 1 }) },
        { text: "少しある", scores: scores({ creative: 2, manga: 1, emotion: 1 }) },
        { text: "子どもの頃ならある", scores: scores({ creative: 1, manga: 1, emotion: 1 }) },
        { text: "ない", scores: scores({}) }
      ]
    },
    {
      id: "q_manga_03",
      text: "漫画を描いたことがありますか？",
      answers: [
        { text: "ある。完成させたこともある", scores: scores({ creative: 2, manga: 3, finish: 3 }) },
        { text: "途中まで描いたことがある", scores: scores({ creative: 2, manga: 2, finish: 1 }) },
        { text: "落書き程度ならある", scores: scores({ creative: 1, manga: 1 }) },
        { text: "ない", scores: scores({}) }
      ]
    },
    {
      id: "q_manga_04",
      text: "スケブ文化を知っていますか？",
      answers: [
        { text: "描いたり、お願いしたことある", scores: scores({ creative: 1, media: 1, manga: 3, finish: 1 }) },
        { text: "知っている", scores: scores({ media: 1, manga: 2 }) },
        { text: "スケッチブック？", scores: scores({ media: 1, manga: 1 }) },
        { text: "知らない", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_media_01",
      text: "映画は月1くらいで観ますか？",
      answers: [
        { text: "月1以上観る", scores: scores({ creative: 1, media: 3, emotion: 2 }) },
        { text: "数か月に1回くらい観る", scores: scores({ creative: 1, media: 2, emotion: 1 }) },
        { text: "たまに観る", scores: scores({ media: 1, emotion: 1 }) },
        { text: "あまり観ない", scores: scores({}) }
      ]
    },
    {
      id: "q_media_02",
      text: "アニメは生活の一部ですか？",
      answers: [
        { text: "生活の一部", scores: scores({ creative: 1, media: 3, manga: 2, emotion: 1 }) },
        { text: "よく観る", scores: scores({ creative: 1, media: 2, manga: 1, emotion: 1 }) },
        { text: "たまに観る", scores: scores({ media: 1, manga: 1 }) },
        { text: "あまり観ない", scores: scores({}) }
      ]
    },
    {
      id: "q_media_03",
      text: "ドラマは国内・海外問わず好きですか？",
      answers: [
        { text: "かなり好き", scores: scores({ creative: 1, media: 3, emotion: 2 }) },
        { text: "好き", scores: scores({ creative: 1, media: 2, emotion: 1 }) },
        { text: "たまに観る", scores: scores({ media: 1, emotion: 1 }) },
        { text: "あまり観ない", scores: scores({}) }
      ]
    },
    {
      id: "q_media_04",
      text: "本を読むのは好きですか？",
      answers: [
        { text: "とても好き", scores: scores({ creative: 2, media: 1, emotion: 2, finish: 1 }) },
        { text: "好き", scores: scores({ creative: 1, media: 1, emotion: 1, finish: 1 }) },
        { text: "たまに読む", scores: scores({ media: 1, emotion: 1 }) },
        { text: "あまり読まない", scores: scores({}) }
      ]
    },
    {
      id: "q_media_05",
      text: "今季アニメで気になるものはありますか？",
      answers: [
        { text: "黄泉のツガイ", scores: scores({ creative: 1, media: 3, manga: 2, emotion: 1 }) },
        { text: "あかね噺", scores: scores({ creative: 1, media: 3, manga: 3, emotion: 1 }) },
        { text: "とんがり帽子のアトリエ", scores: scores({ creative: 2, media: 3, manga: 2, emotion: 1 }) },
        { text: "日本三國", scores: scores({ creative: 1, media: 3, manga: 2, emotion: 1 }) },
        { text: "Re:ゼロから始める異世界生活 4th season", scores: scores({ creative: 1, media: 3, manga: 2, emotion: 2 }) },
        { text: "ドロヘドロ Season2", scores: scores({ creative: 2, media: 3, manga: 2, emotion: 1 }) },
        { text: "この中にはない", scores: scores({ media: 2, emotion: 1 }) },
        { text: "アニメは見ない", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_tool_01",
      text: "知っている漫画制作サービスはありますか？",
      answers: [
        { text: "CLIP STUDIO PAINTを知っている", scores: scores({ media: 1, manga: 3, finish: 2 }) },
        { text: "MediBang Paintを知っている", scores: scores({ media: 1, manga: 2, finish: 1 }) },
        { text: "他の制作ツールなら知っている", scores: scores({ media: 1, manga: 1, finish: 1 }) },
        { text: "全部知らない", scores: scores({}) }
      ]
    },
    {
      id: "q_tool_02",
      text: "知っている制作系サービスはありますか？",
      answers: [
        { text: "Canvaを知っている", scores: scores({ creative: 1, media: 2, finish: 2 }) },
        { text: "Adobe CCを知っている", scores: scores({ creative: 1, media: 2, finish: 3 }) },
        { text: "その他の制作系サービスを知っている", scores: scores({ creative: 1, media: 1, finish: 1 }) },
        { text: "ほとんど知らない", scores: scores({}) }
      ]
    },
    {
      id: "q_tool_03",
      text: "使っている、または知っているAIはありますか？",
      answers: [
        { text: "ChatGPT", scores: scores({ creative: 1, media: 2, finish: 1 }) },
        { text: "Claude", scores: scores({ creative: 1, media: 2, finish: 1 }) },
        { text: "Gemini", scores: scores({ creative: 1, media: 2, finish: 1 }) },
        { text: "Midjourney", scores: scores({ creative: 2, media: 2, manga: 1, finish: 1 }) },
        { text: "2個以上使っている", scores: scores({ creative: 2, media: 3, manga: 1, finish: 2 }) },
        { text: "使っていない", scores: scores({}) }
      ]
    },
    {
      id: "q_tool_04",
      text: "使っている映像系サブスクで、一番お気に入りに近いものは？",
      answers: [
        { text: "Netflix", scores: scores({ media: 3, emotion: 1 }) },
        { text: "Hulu", scores: scores({ media: 2, emotion: 1 }) },
        { text: "Amazon Prime Video", scores: scores({ media: 2, emotion: 1 }) },
        { text: "その他", scores: scores({ media: 1, emotion: 1 }) },
        { text: "使っていない", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_seed_01",
      text: "楽しいことが大好きですか？",
      answers: [
        { text: "大好き", scores: scores({ creative: 3, emotion: 2 }) },
        { text: "かなり好き", scores: scores({ creative: 2, emotion: 1 }) },
        { text: "どちらかというと好き", scores: scores({ creative: 1, emotion: 1 }) },
        { text: "あまり意識しない", scores: scores({}) }
      ]
    },
    {
      id: "q_seed_02",
      text: "新しいことに取り組むのはわくわくしますか？",
      answers: [
        { text: "とてもわくわくする", scores: scores({ creative: 2, media: 1, emotion: 1, finish: 2 }) },
        { text: "少し緊張するけど楽しみ", scores: scores({ creative: 1, media: 1, emotion: 1, finish: 1 }) },
        { text: "慣れてからなら楽しめる", scores: scores({ finish: 1 }) },
        { text: "苦手", scores: scores({}) }
      ]
    },
    {
      id: "q_seed_03",
      text: "ずっと続けている趣味がありますか？",
      answers: [
        { text: "かなり長く続けているものがある", scores: scores({ creative: 1, emotion: 1, finish: 3 }) },
        { text: "そこそこ続いているものがある", scores: scores({ creative: 1, emotion: 1, finish: 2 }) },
        { text: "いろいろ試すけど変わりやすい", scores: scores({ creative: 2, finish: 1 }) },
        { text: "特にない", scores: scores({}) }
      ]
    },
    {
      id: "q_seed_04",
      text: "集中すると、どうなりやすいですか？",
      answers: [
        { text: "食べるのを忘れることがある", scores: scores({ creative: 1, finish: 3 }) },
        { text: "気づいたら時間が経っている", scores: scores({ creative: 1, finish: 2 }) },
        { text: "ほどほどに休憩できる", scores: scores({ finish: 1 }) },
        { text: "集中するまでが大変", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_emotion_01",
      text: "誰かの力になれたら嬉しいですか？",
      answers: [
        { text: "とても嬉しい", scores: scores({ emotion: 3, finish: 1 }) },
        { text: "嬉しい", scores: scores({ emotion: 2, finish: 1 }) },
        { text: "たまにそう思う", scores: scores({ emotion: 1 }) },
        { text: "あまり意識しない", scores: scores({}) }
      ]
    },
    {
      id: "q_emotion_02",
      text: "音楽の歌詞に共感することがありますか？",
      answers: [
        { text: "よくある", scores: scores({ creative: 1, emotion: 3 }) },
        { text: "たまにある", scores: scores({ emotion: 2 }) },
        { text: "メロディの方が印象に残る", scores: scores({ emotion: 1 }) },
        { text: "あまりない", scores: scores({}) }
      ]
    },
    {
      id: "q_emotion_03",
      text: "文章だけでは伝わりきらないと感じたことがありますか？",
      answers: [
        { text: "よくある", scores: scores({ creative: 2, media: 1, manga: 1, emotion: 2 }) },
        { text: "たまにある", scores: scores({ creative: 1, media: 1, manga: 1, emotion: 1 }) },
        { text: "あまり意識したことがない", scores: scores({ emotion: 1 }) },
        { text: "文章だけで十分だと思う", scores: scores({}) }
      ]
    },
    {
      id: "q_emotion_04",
      text: "物語で泣いたり、心が動くことがありますか？",
      answers: [
        { text: "よくある", scores: scores({ creative: 1, emotion: 3 }) },
        { text: "たまにある", scores: scores({ emotion: 2 }) },
        { text: "あまり泣かないけど印象には残る", scores: scores({ emotion: 1 }) },
        { text: "あまりない", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_sense_01",
      text: "寝て見る夢はどんな感じですか？",
      answers: [
        { text: "カラフルだ", scores: scores({ creative: 3, emotion: 1 }) },
        { text: "においも感じる", scores: scores({ creative: 3, emotion: 2 }) },
        { text: "味も感じる", scores: scores({ creative: 3, emotion: 2 }) },
        { text: "音も感じる", scores: scores({ creative: 3, emotion: 1 }) },
        { text: "夢はあまり見ない／覚えていない", scores: scores({}) }
      ]
    },
    {
      id: "q_sense_02",
      text: "空を飛ぶ夢を見たことがありますか？",
      answers: [
        { text: "何度もある", scores: scores({ creative: 3, emotion: 1 }) },
        { text: "ある", scores: scores({ creative: 2, emotion: 1 }) },
        { text: "覚えていない", scores: scores({}) },
        { text: "ない", scores: scores({}) }
      ]
    },
    {
      id: "q_sense_03",
      text: "紙のにおいが好きですか？",
      answers: [
        { text: "とても好き", scores: scores({ creative: 2, manga: 1, emotion: 2 }) },
        { text: "好き", scores: scores({ creative: 1, manga: 1, emotion: 1 }) },
        { text: "少しわかる", scores: scores({ creative: 1, emotion: 1 }) },
        { text: "特に好きではない", scores: scores({}) }
      ]
    },
    {
      id: "q_sense_04",
      text: "ペンや鉛筆にこだわりがありますか？",
      answers: [
        { text: "かなりある", scores: scores({ creative: 2, manga: 2, emotion: 1, finish: 1 }) },
        { text: "少しある", scores: scores({ creative: 1, manga: 1, emotion: 1 }) },
        { text: "文房具を見るのは好き", scores: scores({ creative: 1, manga: 1, emotion: 1 }) },
        { text: "あまりない", scores: scores({}) }
      ]
    }
  ],
  [
    {
      id: "q_otaku_01",
      text: "コミケは年に何回開催されると思いますか？",
      answers: [
        { text: "10回", scores: scores({ media: 1, manga: 1 }) },
        { text: "5回", scores: scores({ media: 1, manga: 1 }) },
        { text: "2回", scores: scores({ media: 3, manga: 3 }) },
        { text: "1回", scores: scores({ media: 1, manga: 1 }) },
        { text: "知らない", scores: scores({}) }
      ]
    },
    {
      id: "q_otaku_02",
      text: "子どもの頃、漫画の技を繰り出した時代がありますか？",
      answers: [
        { text: "ある。全力でやった", scores: scores({ creative: 3, manga: 2, emotion: 1 }) },
        { text: "ちょっとだけある", scores: scores({ creative: 2, manga: 1, emotion: 1 }) },
        { text: "やったことはないけど気持ちはわかる", scores: scores({ creative: 1, manga: 1, emotion: 1 }) },
        { text: "ない", scores: scores({}) }
      ]
    },
    {
      id: "q_otaku_03",
      text: "空を飛ぼうと傘を持って高いところからジャンプしたことがありますか？",
      answers: [
        { text: "ある", scores: scores({ creative: 3, manga: 1, emotion: 1 }) },
        { text: "しようとしたことはある", scores: scores({ creative: 2, manga: 1, emotion: 1 }) },
        { text: "想像したことはある", scores: scores({ creative: 1, emotion: 1 }) },
        { text: "ない", scores: scores({}) }
      ]
    },
    {
      id: "q_otaku_04",
      text: "「小説家になろう」の“なろう”は何の略だと思いますか？",
      answers: [
        { text: "小説家になろう", scores: scores({ media: 3, manga: 1 }) },
        { text: "なりたい自分になろう", scores: scores({ creative: 1, emotion: 1 }) },
        { text: "物語を書こう", scores: scores({ creative: 1, emotion: 1 }) },
        { text: "知らない", scores: scores({}) }
      ]
    }
  ]
];

const categoryQuestionGroups = [
  [
    {
      id: "randomGroup01_manga_like",
      text: "漫画は好きですか？",
      answers: [
        answer("大好き。生活の一部", { manga: 3, creative: 1, finish: 1 }, ["hasMangaDepth"]),
        answer("好き。よく読む", { manga: 2, creative: 1 }, ["hasMangaDepth"]),
        answer("たまに読む", { manga: 1 }),
        answer("あまり読まない", {})
      ]
    },
    {
      id: "randomGroup01_manga_artist",
      text: "マンガ家にあこがれたことがありますか？",
      answers: [
        answer("かなりある", { manga: 3, creative: 1, finish: 1 }, ["hasMangaDepth", "likesWorldBuilding"]),
        answer("少しある", { manga: 2, creative: 1 }, ["hasMangaDepth"]),
        answer("子どもの頃ならある", { manga: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup01_manga_drawn",
      text: "漫画を描いたことがありますか？",
      answers: [
        answer("ある。完成させたこともある", { manga: 3, creative: 2, finish: 3 }, ["hasMangaDepth", "hasCompletionDrive", "likesVisualDesign"]),
        answer("途中まで描いたことがある", { manga: 2, creative: 2, finish: 1 }, ["hasMangaDepth", "likesVisualDesign"]),
        answer("落書き程度ならある", { manga: 1, creative: 1 }, ["likesVisualDesign"]),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup01_skeb",
      text: "スケブ文化を知っていますか？",
      answers: [
        answer("描いたり、お願いしたことある", { manga: 3, creative: 1, finish: 1 }, ["hasMangaDepth", "likesPublishing", "likesVisualDesign"]),
        answer("知っている", { manga: 2, creative: 1 }, ["hasMangaDepth"]),
        answer("スケッチブック？", { manga: 1 }),
        answer("知らない", {})
      ]
    },
    {
      id: "randomGroup01_event",
      text: "コミケや同人イベントに興味がありますか？",
      answers: [
        answer("行ったことがある／参加したことがある", { manga: 3, creative: 1, finish: 1 }, ["hasMangaDepth", "likesPublishing"]),
        answer("かなり興味がある", { manga: 2, creative: 1 }, ["hasMangaDepth"]),
        answer("少し気になる", { manga: 1 }),
        answer("あまり興味はない", {})
      ]
    },
    {
      id: "randomGroup01_recommend",
      text: "好きな漫画を人にすすめたくなることがありますか？",
      answers: [
        answer("よくある", { manga: 3, creative: 1, finish: 1 }, ["hasMangaDepth", "likesPublishing", "hasKindnessDrive"]),
        answer("たまにある", { manga: 2, creative: 1 }, ["hasMangaDepth"]),
        answer("少しある", { manga: 1 }),
        answer("ない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup02_movie",
      text: "映画は月1くらいで観ますか？",
      answers: [
        answer("月1以上観る", { media: 3, emotion: 2, creative: 1 }),
        answer("数か月に1回くらい観る", { media: 2, emotion: 1, creative: 1 }),
        answer("たまに観る", { media: 1, emotion: 1 }),
        answer("あまり観ない", {})
      ]
    },
    {
      id: "randomGroup02_anime",
      text: "アニメは生活の一部ですか？",
      answers: [
        answer("生活の一部", { media: 3, emotion: 2, creative: 1, manga: 1 }, ["hasMangaDepth"]),
        answer("よく観る", { media: 2, emotion: 1, creative: 1 }),
        answer("たまに観る", { media: 1, emotion: 1 }),
        answer("あまり観ない", {})
      ]
    },
    {
      id: "randomGroup02_drama",
      text: "ドラマは国内・海外問わず好きですか？",
      answers: [
        answer("かなり好き", { media: 3, emotion: 2, creative: 1 }),
        answer("好き", { media: 2, emotion: 1, creative: 1 }),
        answer("たまに観る", { media: 1, emotion: 1 }),
        answer("あまり観ない", {})
      ]
    },
    {
      id: "randomGroup02_books",
      text: "本を読むのは好きですか？",
      answers: [
        answer("とても好き", { media: 3, emotion: 2, creative: 1 }, ["likesWords", "likesBooksKnowledge"]),
        answer("好き", { media: 2, emotion: 1, creative: 1 }, ["likesWords", "likesBooksKnowledge"]),
        answer("たまに読む", { media: 1, emotion: 1 }),
        answer("あまり読まない", {})
      ]
    },
    {
      id: "randomGroup02_rewatch",
      text: "好きな作品を何度も見返すことがありますか？",
      answers: [
        answer("よくある", { media: 3, emotion: 2, creative: 1 }, ["likesWorldBuilding"]),
        answer("たまにある", { media: 2, emotion: 1, creative: 1 }),
        answer("少しある", { media: 1, emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup02_theory",
      text: "物語の考察を見るのは好きですか？",
      answers: [
        answer("かなり好き", { media: 3, emotion: 2, creative: 1 }, ["likesWorldBuilding"]),
        answer("好き", { media: 2, emotion: 1, creative: 1 }, ["likesWorldBuilding"]),
        answer("たまに見る", { media: 1, emotion: 1 }),
        answer("あまり見ない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup03_new_serial",
      text: "マンガアプリで新連載をチェックすることがありますか？",
      answers: [
        answer("よくある", { media: 3, manga: 2, emotion: 1 }, ["likesTrendWatching", "hasMangaDepth"]),
        answer("たまにある", { media: 2, manga: 1, emotion: 1 }, ["likesTrendWatching"]),
        answer("少しある", { media: 1, manga: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup03_sns",
      text: "SNSで話題の作品が気になりますか？",
      answers: [
        answer("かなり気になる", { media: 3, manga: 2, emotion: 1 }, ["likesTrendWatching", "likesPublishing"]),
        answer("気になる", { media: 2, manga: 1, emotion: 1 }, ["likesTrendWatching"]),
        answer("少し気になる", { media: 1, emotion: 1 }),
        answer("あまり気にしない", {})
      ]
    },
    {
      id: "randomGroup03_trend",
      text: "流行っている作品は一度見てみたくなりますか？",
      answers: [
        answer("かなり見たくなる", { media: 3, manga: 2, emotion: 1 }, ["likesTrendWatching"]),
        answer("少し見たくなる", { media: 2, manga: 1, emotion: 1 }, ["likesTrendWatching"]),
        answer("ものによる", { media: 1, emotion: 1 }),
        answer("あまりならない", {})
      ]
    },
    {
      id: "randomGroup03_ranking",
      text: "ランキング上位の漫画や動画を見ますか？",
      answers: [
        answer("よく見る", { media: 3, manga: 2, emotion: 1 }, ["likesTrendWatching"]),
        answer("たまに見る", { media: 2, manga: 1, emotion: 1 }, ["likesTrendWatching"]),
        answer("少し見る", { media: 1, emotion: 1 }),
        answer("見ない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup04_manga_tool",
      text: "知っている漫画制作サービスはありますか？",
      answers: [
        answer("CLIP STUDIO PAINTを知っている", { manga: 3, media: 1, finish: 2 }, ["hasMangaDepth", "likesVisualDesign", "hasCompletionDrive"]),
        answer("MediBang Paintを知っている", { manga: 2, media: 1, finish: 1 }, ["hasMangaDepth", "likesVisualDesign"]),
        answer("他の制作ツールなら知っている", { manga: 1, media: 1, finish: 1 }, ["hasCompletionDrive"]),
        answer("全部知らない", {})
      ]
    },
    {
      id: "randomGroup04_creation_tool_interest",
  text: "作品づくりで、使ってみたい道具はどれですか？",
  answers: [
    answer(
      "絵や漫画を描くツール",
      { manga: 2, creative: 1, finish: 1 },
      ["hasMangaDepth", "likesVisualDesign"]
    ),
    answer(
      "文章や構成を考えるツール",
      { creative: 1, emotion: 1, finish: 1 },
      ["likesWords", "likesStoryStructure"]
    ),
    answer(
      "画像やデザインを整えるツール",
      { creative: 1, media: 1, finish: 1 },
      ["likesVisualDesign"]
    ),
    answer(
      "動画や音楽を作るツール",
      { creative: 1, media: 1, emotion: 1 },
      ["likesPublishing"]
    ),
    answer(
      "まだよくわからない",
      {},
      ["undecided"]
    )
  ]
},
    {
      id: "randomGroup04_manga_apps",
      text: "使っているマンガアプリはいくつありますか？",
      answers: [
        answer("5個以上ある", { media: 3, manga: 2 }, ["likesTrendWatching", "hasMangaDepth"]),
        answer("3〜4個使っている", { media: 2, manga: 1 }, ["likesTrendWatching", "hasMangaDepth"]),
        answer("1〜2個使っている", { media: 1, manga: 1 }, ["hasMangaDepth"]),
        answer("ほとんど使っていない", {})
      ]
    },
    {
      id: "randomGroup04_streaming",
      text: "使っている映像系サブスクはありますか？",
      answers: [
        answer("Netflix", { media: 3, manga: 1, finish: 1 }, ["likesTrendWatching"]),
        answer("Amazon Prime Video", { media: 2, manga: 1, finish: 1 }),
        answer("その他を使っている", { media: 1, manga: 1 }),
        answer("使っていない", {})
      ]
    },
    {
  id: "randomGroup04_publishing",
  text: "作ったものを、誰かに見てもらうことに興味がありますか？",
  answers: [
    answer("ぜひ見てもらいたい", { media: 3, manga: 2, finish: 1 }, ["likesPublishing", "hasCompletionDrive"]),
    answer("少し興味がある", { media: 2, manga: 1, finish: 1 }, ["likesPublishing"]),
    answer("見るだけ・作るだけで満足かも", { media: 1, manga: 1 }),
    answer("あまり考えたことがない", {})
  ]
}
  ],
  [
    {
      id: "randomGroup05_ai",
      text: "使っている、または知っているAIはありますか？",
      answers: [
        answer("ChatGPT", { media: 2, creative: 1, finish: 1 }, ["hasCompletionDrive"]),
        answer("Claude", { media: 2, creative: 1, finish: 1 }, ["hasCompletionDrive"]),
        answer("Gemini", { media: 2, creative: 1, finish: 1 }, ["hasCompletionDrive"]),
        answer("Midjourney", { media: 2, creative: 2, manga: 1, finish: 1 }, ["likesVisualDesign", "hasCompletionDrive"]),
        answer("2個以上使っている", { media: 3, creative: 2, manga: 1, finish: 2 }, ["hasCompletionDrive", "likesVisualDesign"]),
        answer("使っていない", {})
      ]
    },
    {
      id: "randomGroup05_pc",
      text: "パソコンを使うのは日常ですか？",
      answers: [
        answer("日常的に使う", { media: 2, finish: 3 }, ["hasCompletionDrive"]),
        answer("よく使う", { media: 1, finish: 2 }, ["hasCompletionDrive"]),
        answer("たまに使う", { finish: 1 }),
        answer("苦手", {})
      ]
    },
    {
      id: "randomGroup05_phone_creation",
      text: "スマホで画像や文章を作るのは好きですか？",
      answers: [
        answer("かなり好き", { media: 3, finish: 2, creative: 1 }, ["likesVisualDesign", "hasCompletionDrive"]),
        answer("好き", { media: 2, finish: 1, creative: 1 }, ["hasCompletionDrive"]),
        answer("たまになら", { media: 1, finish: 1 }),
        answer("あまりしない", {})
      ]
    },
    {
      id: "randomGroup05_design_tools",
      text: "CanvaやAdobe系ツールを使ったことがありますか？",
      answers: [
        answer("よく使う", { media: 3, finish: 2, creative: 1 }, ["likesVisualDesign", "hasCompletionDrive"]),
        answer("使ったことがある", { media: 2, finish: 1, creative: 1 }, ["likesVisualDesign"]),
        answer("知っているだけ", { media: 1, finish: 1 }),
        answer("知らない", {})
      ]
    },
    {
      id: "randomGroup05_new_apps",
      text: "新しいアプリを触るのは苦ではないですか？",
      answers: [
        answer("すぐ触ってみる", { media: 3, finish: 2, creative: 1 }, ["hasCompletionDrive"]),
        answer("気になれば触る", { media: 2, finish: 1, creative: 1 }),
        answer("必要なら触る", { media: 1, finish: 1 }),
        answer("少し苦手", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup06_fun",
      text: "楽しいことが大好きですか？",
      answers: [
        answer("大好き", { creative: 3, emotion: 2, finish: 1 }, ["likesCuteWorld"]),
        answer("かなり好き", { creative: 2, emotion: 1, finish: 1 }),
        answer("どちらかというと好き", { creative: 1, emotion: 1 }),
        answer("あまり意識しない", {})
      ]
    },
    {
      id: "randomGroup06_new_things",
      text: "新しいことに取り組むのはわくわくしますか？",
      answers: [
        answer("とてもわくわくする", { creative: 3, emotion: 2, finish: 1 }, ["hasCompletionDrive"]),
        answer("少し緊張するけど楽しみ", { creative: 2, emotion: 1, finish: 1 }),
        answer("慣れてからなら楽しめる", { creative: 1, emotion: 1 }),
        answer("苦手", {})
      ]
    },
    {
      id: "randomGroup06_hobby",
      text: "ずっと続けている趣味がありますか？",
      answers: [
        answer("かなり長く続けているものがある", { finish: 3, creative: 1, emotion: 1 }, ["hasCompletionDrive"]),
        answer("そこそこ続いているものがある", { finish: 2, creative: 1 }, ["hasCompletionDrive"]),
        answer("いろいろ試すけど変わりやすい", { creative: 2, finish: 1 }),
        answer("特にない", {})
      ]
    },
    {
      id: "randomGroup06_daydream",
      text: "空想していると時間が過ぎることがありますか？",
      answers: [
        answer("よくある", { creative: 3, emotion: 2, finish: 1 }, ["likesWorldBuilding"]),
        answer("たまにある", { creative: 2, emotion: 1, finish: 1 }, ["likesWorldBuilding"]),
        answer("少しある", { creative: 1, emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup06_world",
      text: "好きな世界観を自分でも作ってみたいですか？",
      answers: [
        answer("とても作ってみたい", { creative: 3, emotion: 2, finish: 1 }, ["likesWorldBuilding"]),
        answer("少し作ってみたい", { creative: 2, emotion: 1, finish: 1 }, ["likesWorldBuilding"]),
        answer("興味はある", { creative: 1, emotion: 1 }),
        answer("今は特にない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup07_help",
      text: "誰かの力になれたら嬉しいですか？",
      answers: [
        answer("とても嬉しい", { emotion: 3, creative: 1 }, ["hasKindnessDrive"]),
        answer("嬉しい", { emotion: 2 }, ["hasKindnessDrive"]),
        answer("たまにそう思う", { emotion: 1 }),
        answer("あまり意識しない", {})
      ]
    },
    {
      id: "randomGroup07_lyrics",
      text: "音楽の歌詞に共感することがありますか？",
      answers: [
        answer("よくある", { emotion: 3, creative: 1 }, ["likesWords"]),
        answer("たまにある", { emotion: 2 }, ["likesWords"]),
        answer("少しある", { emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup07_words_limit",
      text: "文章だけでは伝わりきらないと感じたことがありますか？",
      answers: [
        answer("よくある", { emotion: 2, creative: 2, manga: 1, media: 1 }, ["likesWords", "hasMangaDepth"]),
        answer("たまにある", { emotion: 1, creative: 1, manga: 1 }, ["likesWords"]),
        answer("あまり意識したことがない", { emotion: 1 }),
        answer("文章だけで十分だと思う", {})
      ]
    },
    {
      id: "randomGroup07_moved",
      text: "物語で泣いたり、心が動くことがありますか？",
      answers: [
        answer("よくある", { emotion: 3, creative: 1 }, ["hasKindnessDrive"]),
        answer("たまにある", { emotion: 2 }),
        answer("少しある", { emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup07_character",
      text: "キャラクターの気持ちを考えてしまいますか？",
      answers: [
        answer("よくある", { emotion: 3, creative: 1 }, ["hasKindnessDrive"]),
        answer("たまにある", { emotion: 2 }),
        answer("少しある", { emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup07_line",
      text: "好きなセリフを覚えていることがありますか？",
      answers: [
        answer("よくある", { emotion: 3, creative: 1 }, ["likesWords"]),
        answer("たまにある", { emotion: 2 }, ["likesWords"]),
        answer("少しある", { emotion: 1 }),
        answer("ない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup08_dream",
      text: "寝て見る夢はどんな感じですか？",
      answers: [
        answer("色や音まで覚えていることがある", { creative: 3, emotion: 2 }, ["likesWorldBuilding"]),
        answer("場面を覚えていることがある", { creative: 2, emotion: 1 }),
        answer("少しだけ覚えている", { creative: 1, emotion: 1 }),
        answer("夢はあまり見ない／覚えていない", {})
      ]
    },
    {
      id: "randomGroup08_flying_dream",
      text: "空を飛ぶ夢を見たことがありますか？",
      answers: [
        answer("何度もある", { creative: 3, emotion: 2 }, ["likesWorldBuilding"]),
        answer("ある", { creative: 2, emotion: 1 }),
        answer("少し覚えている", { creative: 1, emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup08_paper",
      text: "紙のにおいが好きですか？",
      answers: [
        answer("とても好き", { creative: 3, emotion: 2, manga: 1 }, ["likesVisualDesign", "likesBooksKnowledge"]),
        answer("好き", { creative: 2, emotion: 1, manga: 1 }, ["likesVisualDesign", "likesBooksKnowledge"]),
        answer("少しわかる", { creative: 1, emotion: 1 }),
        answer("特に好きではない", {})
      ]
    },
    {
      id: "randomGroup08_pencil",
      text: "ペンや鉛筆にこだわりがありますか？",
      answers: [
        answer("かなりある", { creative: 3, emotion: 2, manga: 1 }, ["likesVisualDesign", "hasMangaDepth"]),
        answer("少しある", { creative: 2, emotion: 1, manga: 1 }, ["likesVisualDesign"]),
        answer("文房具を見るのは好き", { creative: 1, emotion: 1 }),
        answer("あまりない", {})
      ]
    },
    {
      id: "randomGroup08_manga_move",
      text: "子どもの頃、漫画の技を繰り出した時代がありますか？",
      answers: [
        answer("ある。全力でやった", { creative: 3, manga: 2, emotion: 1 }, ["hasMangaDepth"]),
        answer("ちょっとだけある", { creative: 2, manga: 1, emotion: 1 }, ["hasMangaDepth"]),
        answer("やったことはないけど気持ちはわかる", { creative: 1, manga: 1, emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup08_umbrella",
      text: "空を飛ぼうと傘を持ってジャンプしたことがありますか？",
      answers: [
        answer("ある", { creative: 3, manga: 2, emotion: 1 }, ["hasMangaDepth"]),
        answer("しようとしたことはある", { creative: 2, manga: 1, emotion: 1 }),
        answer("想像したことはある", { creative: 1, manga: 1, emotion: 1 }),
        answer("ない", {})
      ]
    },
    {
      id: "randomGroup08_library",
      text: "図書館が好きですか？",
      answers: [
        answer("とても好き", { creative: 3, emotion: 2, manga: 1 }, ["likesWorldBuilding", "likesWords", "likesBooksKnowledge"]),
        answer("好き", { creative: 2, emotion: 1, manga: 1 }, ["likesWorldBuilding", "likesBooksKnowledge"]),
        answer("少し好き", { creative: 1, emotion: 1 }),
        answer("あまり行かない", {})
      ]
    }
  ],
  [
    {
      id: "randomGroup09_seasonal_anime",
      text: "最近・今季のアニメで気になるものはありますか？",
      answers: [
        answer("黄泉のツガイ", { creative: 1, media: 2, manga: 2, emotion: 1 }, ["hasMangaDepth", "routeKnight"]),
answer("あかね噺", { creative: 1, media: 2, manga: 3, emotion: 1 }, ["hasMangaDepth", "likesStoryStructure", "routeMaze"]),
answer("とんがり帽子のアトリエ", { creative: 2, media: 2, manga: 2, emotion: 2 }, ["likesCuteWorld", "likesWorldStructure", "likesVisualDesign", "routeRainbow"]),
answer("日本三國", { creative: 1, media: 2, manga: 2, emotion: 1 }, ["likesWorldStructure", "likesStoryStructure", "routeMaze"]),
answer("本好きの下剋上 4th season", { creative: 1, media: 2, manga: 1, emotion: 1 }, ["likesBooksKnowledge", "likesWords", "routeLibrary"]),
answer("Re:ゼロから始める異世界生活 4th season", { creative: 1, media: 2, manga: 1, emotion: 2 }, ["likesEmotionCharacter", "likesWords", "routeBlueDragon"]),
answer("ドロヘドロ Season2", { creative: 2, media: 2, manga: 3, emotion: 1 }, ["likesDarkMoodStrong", "hasMangaDepth", "routeDark"]),
answer("この中にはない", {}, ["otherTaste"]),
answer("アニメは見ない", {})
      ]
    },
    {
      id: "randomGroup09_favorite_work",
      text: "この中で好きな作品、または気になる作品はありますか？",
      answers: [
        answer("チ。―地球の運動について―", { creative: 1, manga: 1, emotion: 1 }, ["likesWorldStructure", "likesBooksKnowledge", "routeLibrary"]),
answer("ルックバック", { creative: 1, manga: 1, emotion: 2 }, ["likesWords", "routeBard"]),
answer("ブルーピリオド", { creative: 1, manga: 1, finish: 1 }, ["likesVisualDesign", "routeAkagane"]),
answer("君に届け", { emotion: 2, manga: 1 }, ["hasKindnessDrive", "routeLove"]),
answer("動物のお医者さん", { creative: 1, manga: 1, emotion: 1 }, ["likesCuteWorld", "routeMofu"]),
answer("寄生獣", { creative: 1, manga: 2, emotion: 1 }, ["likesDarkMood", "likesDarkMoodStrong", "routeDark"]),
answer("この中にはない", { media: 1 }, ["otherTaste"])
      ]
    },
    {
      id: "randomGroup09_genre",
      text: "好きなジャンルに近いものはどれですか？",
      answers: [
        answer("ファンタジー・魔法・異世界", { creative: 1, media: 1 }, ["likesWorldBuilding", "routeAlchemist"]),
answer("青春・成長・創作もの", { creative: 1, emotion: 1, finish: 1 }, ["hasCompletionDrive", "routeAkagane"]),
answer("恋愛・人間関係", { emotion: 2 }, ["hasKindnessDrive", "routeLove"]),
answer("ホラー・怪談・不穏な話", { creative: 1, emotion: 1, manga: 1 }, ["likesDarkMood", "likesDarkMoodStrong", "routeDark"]),
answer("日常・動物・ほのぼの", { creative: 1, emotion: 1 }, ["likesCuteWorld", "routeMofu"]),
answer("SF・哲学・社会派", { creative: 1, manga: 1, media: 1 }, ["likesWorldStructure", "routeMaze", "routePentagramHint"]),
answer("バトル・冒険・少年漫画", { manga: 1, media: 1, finish: 1 }, ["hasMangaDepth", "routeKnight"]),
answer("特に決まっていない", {}, ["undecided"])
      ]
    }
  ]
];

const resultTypes = {
  "世界図書館の魔法司書": {
    subtitle: "知識と設定を集め、物語の世界を編む人",
    body: [
      "あなたは、知識や設定を集めて世界を組み立てるのが得意なタイプです。",
      "作品を読むときも、ただ楽しむだけではなく、「この世界の仕組みはどうなってるんだろう」「このキャラの過去には何があったんだろう」と、見えない背景まで想像してしまう人。",
      "設定、資料、構成、人物関係、世界観づくりに強く、物語の土台を整える力があります。",
      "その豊かな設定力は、世界観を形にするときの大きな武器になります。"
    ],
    step: "まずは「世界観説明」ではなく、その世界で暮らすキャラの1日を1ページ漫画にしてみましょう。"
  },
  "想像を創造するアルケミスト": {
    subtitle: "ぼんやりしたイメージを、作品へ変えていく人",
    body: [
      "あなたは、頭の中にあるぼんやりしたイメージを、形に変えていけるタイプです。",
      "「こういう雰囲気が好き」「こんな場面を作ってみたい」「まだ説明できないけど、何かある」",
      "そんな感覚を大切にしながら、少しずつ作品へ変えていける人です。",
      "最初から完璧な設計図がなくても大丈夫。作りながら発見し、直しながら育てていくことで、物語を現実の形にしていけます。"
    ],
    step: "今あるアイデアを、まずはタイトルだけ3つ書き出してみましょう。そこから一番気になるものを、1ページ漫画や短いプロットにすると動き出します。"
  },
  "もふもふに愛される召喚士": {
    subtitle: "かわいいものと、やさしい世界を呼び寄せる人",
    body: [
      "あなたは、かわいいもの・好きなもの・心がゆるむ世界を呼び寄せるのが得意なタイプです。",
      "キャラクター、動物、癒し、ファンタジー、やさしい空気感。そういうものに自然と反応できる感性があります。",
      "あなたの作品は、強い刺激で引っぱるよりも、「なんか好き」「見ていると落ち着く」「この子、そばにいてほしい」と思わせる方向で力を発揮しやすいです。"
    ],
    step: "まずは主人公ではなく、“そばにいる相棒キャラ”を作ってみましょう。もふもふ、ちいさい魔物、不思議な生き物など、あなたの世界を案内してくれる存在が相性抜群です。"
  },
  "碧き竜の加護を受けた魔術士": {
    subtitle: "心の奥にある痛みや願いを感じ取る人",
    body: [
      "あなたは、感情の奥にある痛みや願いを感じ取れるタイプです。",
      "誰かの言葉に心が揺れたり、音楽や物語で涙腺がゆるんだり、ふとした表情の変化が気になったり。",
      "あなたには、目に見える出来事の奥にある「本当は言えなかった気持ち」を拾う力があります。",
      "その力は、共感漫画、癒しの物語、再生のストーリーで大きく活きます。"
    ],
    step: "派手な事件よりも、「ほんの少し心が軽くなる瞬間」を描いてみましょう。あなたの作品は、あなたの作品は、静かな一言で、誰かの心に深く届きます。"
  },
  "忘れじの言葉を紡ぐ吟遊詩人": {
    subtitle: "記憶に残る言葉を、そっと物語にする人",
    body: [
      "あなたは、言葉で感情や記憶を残すのが得意なタイプです。",
      "好きな作品のセリフ、歌詞、誰かに言われた一言。そういう“忘れられない言葉”を大切にできる人です。",
      "あなたの強みは、ただ説明することではなく、読んだ人の中に残る言葉を紡げること。",
      "漫画にするなら、表情・余白・短いセリフの組み合わせで、静かに刺さる作品になりやすいです。"
    ],
    step: "まずは「忘れられない一言」をテーマに、4コマまたは1ページ漫画を作ってみましょう。長く語るより、短い言葉ほどあなたの力が光ります。"
  },
  "愛を届けるパフォーマー": {
    subtitle: "誰かを楽しませ、元気づける表現者",
    body: [
      "あなたは、誰かを楽しませたり、元気づけたりする表現に向いているタイプです。",
      "自分だけが満足するものより、「これを見た人が少し笑ってくれたらいいな」「誰かの背中をそっと押せたらいいな」という気持ちが作品の力になります。",
      "やさしさ、サービス精神、場を明るくする力があり、読者や見る人の反応を想像しながら作ることができます。"
    ],
    step: "誰か一人を思い浮かべて、その人に届けるつもりで短い漫画を作ってみましょう。“みんなに刺さる”より、“あの人に届く”が最初の魔法です。"
  },
  "見識の巡回騎士": {
    subtitle: "作品と流行を巡り、今の空気を読む人",
    body: [
      "あなたは、作品や流行を見て回り、今の空気を感じ取るのが得意なタイプです。",
      "漫画アプリ、アニメ、映画、ドラマ、SNS、サブスク。いろんな場所にある物語に触れることで、「今、どんなものが読まれているのか」「どんな見せ方が目に止まるのか」を自然と学べる人です。",
      "あなたの強みは、作る前の観察力。ただ流行を追うだけでなく、自分の表現に取り入れることで伸びます。"
    ],
    step: "最近好きだった作品を1つ選び、「どこで心をつかまれたのか」を3つ書いてみましょう。それがあなた自身の創作にも使える武器になります。"
  },
  "頂に至る白銀の魔術師": {
    subtitle: "小さな積み重ねで、高い場所へ進む人",
    body: [
      "あなたは、目標に向かって積み上げていくことで力を発揮するタイプです。",
      "一気に燃え上がるよりも、小さな投稿、小さな修正、小さな完成を重ねていくことで、いつの間にか高い場所まで進んでいける人です。",
      "SNS投稿、Kindle制作、マンガづくり、ブログやnoteの更新。続けるほどに強くなるタイプなので、制作の型を整え、自分に合ったペースと流れを作っていくことで、力をさらに発揮できます。"
    ],
    step: "まずは「週1回だけ投稿する」など、小さく続けられるルールを作りましょう。あなたの魔法は、継続して研鑽を重ねることで、より高い場所へ進んでいきます。。"
  },
  "迷宮を形づくる案内人": {
    subtitle: "複雑な物語に、読者が歩ける道を作る人",
    body: [
      "あなたは、複雑な情報や物語を、読める形に整えるのが得意なタイプです。",
      "コマ割り、順番、見せ場、説明の流れ。読者が迷わず進めるように、道を作る力があります。",
      "自分では地味に感じるかもしれませんが、漫画や物語にとって「わかりやすく読めること」はとても大事です。",
      "あなたは、世界を作るだけでなく、その世界を読者が歩けるように整える人です。"
    ],
    step: "いきなり作画に入らず、まずは「始まり・困りごと・変化・結末」の4つに分けて話を整理してみましょう。それだけで読みやすさが大きく上がります。"
  },
  "漆黒の余白から帰還せし者": {
    subtitle: "沈黙、影、余韻を物語に変える人",
    body: [
      "あなたは、暗さ・静けさ・余韻を表現するのが得意なタイプです。",
      "にぎやかな場面よりも、言葉にならない沈黙、夜の空気、心の影、少し怖いけれど目を離せない感情に惹かれやすい人。",
      "あなたの作品は、明るく説明しすぎるよりも、余白を残した方が魅力が出ます。",
      "ホラー、怪談、心理描写、過去の傷、再生の物語などに向いています。"
    ],
    step: "“何が起きたか”を全部説明するより、読者が想像できる余白を1つ残してみましょう。あなたの作品は、語られない余白の中で、静かに深みを増していきます。"
  },
  "赤銅（あかがね）と紺碧の錬金術師": {
    subtitle: "熱量と冷静さで、作品を磨き上げる人",
    body: [
      "あなたは、試行錯誤しながら作品を磨き上げるタイプです。",
      "一発で完璧に作るより、直して、足して、削って、整えて、少しずつ完成度を上げていくことに向いています。",
      "赤銅のような熱量と、紺碧のような冷静さ。その両方を使いながら、未完成の素材を作品へ変えていける人です。"
    ],
    step: "最初から完成形を目指さず、「ラフ版」「修正版」「完成版」の3段階で作ってみましょう。あなたの作品は、磨きを重ねるほどに、内側から静かな輝きを放ちはじめます。"
  },
  "創造を歌う言霊士": {
    subtitle: "作品に言葉を添えて、外の世界へ届ける人",
    body: [
  "あなたは、言葉や発信を通して作品を届ける力があるタイプです。",
  "作品を作るだけで終わらせず、その魅力を誰かに届く言葉へ変えていける人です。",
  "あなたにとって言葉は、ただの説明ではなく、作品の扉をひらく小さな光の道具です。",
  "届ける言葉を磨くほど、あなたの作品は必要な人のもとへ進んでいきます。"
],
    step: "作品を作ったら、必ず「誰に」「どんな気持ちで読んでほしいか」を一文で書いてみましょう。その一文は、作品に光を宿し、必要な人の心へ届く道しるべになります。"
  },
  "虹を繰り出す彩術士": {
    subtitle: "色と雰囲気で、人の目を惹きつける人",
    body: [
    "あなたは、色や雰囲気の力で、作品の印象を美しく形にできるタイプです。",
    "ただ情報を見せるのではなく、見た人の心に『好き』『気になる』という感覚を生み出す力があります。",
    "あなたの作品は、内容そのものに加えて、そこに漂う空気や彩りによって、いっそう魅力を増していきます。",
    "ひと目で世界観を感じさせる表現や、作品に美しさと個性をまとわせる力は、あなたの大きな才能です。"
  ],
    step: "ひとつの作品に使う色を、まず3色だけ決めてみましょう。色が響き合いはじめると、あなたの世界観はより鮮やかに輪郭を帯びていきます。"
  },
  "五芒星（ペンタグラム）を操る影の勇者": {
    subtitle: "五つの力を秘めし、創作界の隠れチート枠",
    body: [
    "おめでとうございます。",
    "あなたは、ひとつの力だけでなく、いくつもの力を組み合わせて作品を形にしていくタイプです。",
    "アイデア、構成、見せ方、仕上げ、届け方。別々に見える要素をつなぎ、作品全体の流れを整える力があります。",
    "表舞台で派手に目立つよりも、物語の裏側から全体を動かし、完成へ導いていく影の勇者です。",
    "AIや制作ツールを使うことで、あなたの中にある複数の力は、ひとつの魔法陣のように作品へ結ばれていきます。"
  ],
     step: "小さな作品でもいいので、「物語」「見た目」「届け方」「完成までの手順」「読んでほしい人」をセットで考えてみましょう。五つの点がつながると、あなたの作品はひとつの魔法陣として動き出します。"
},
  "呼ぶ声に応える覚醒者": {
    subtitle: "まだ眠る力に、そっと呼ばれている人",
    body: [
      "あなたは、まだ自分の力に気づききっていない可能性タイプです。",
      "今は知識や経験が少なくても、どこかで「やってみたい」「気になる」「呼ばれている気がする」という感覚がある人です。",
      "創作は、最初から自信がある人だけのものではありません。むしろ小さな違和感や憧れから、少しずつ目覚めていくもの。",
      "あなたは、最初の一歩を踏み出したときに変わり始めます。"
    ],
    step: "まずは完成を目指さなくて大丈夫。好きな作品、好きなキャラ、好きな雰囲気を3つ書くだけで、あなたの創作の入り口が見えてきます。"
  },
  "世界を夢見る旅立ちの勇者": {
    subtitle: "これから創作の世界へ踏み出す始まりの人",
   body: [
    "あなたは、これから創作の世界へ足を踏み出していくタイプです。",
    "まだ形ははっきりしていなくても、心のどこかに「作ってみたい」「見てみたい景色」が眠っています。",
    "大切なのは、最初から大きな物語を完成させようとしないこと。",
    "小さな場面、小さなキャラクター、小さな一言から、あなたの物語は少しずつ始まっていきます。"
  ],
  step: "まずは「自分が好きな世界」をひとつ選び、そこに登場しそうなキャラクターを考えてみましょう。最初の一歩が、あなたの物語の扉を開いていきます。"
  }
};

const typeMap = {
  "creative+manga": "世界図書館の魔法司書",
  "creative+finish": "想像を創造するアルケミスト",
  "creative+media": "もふもふに愛される召喚士",
  "creative+emotion": "碧き竜の加護を受けた魔術士",
  "emotion+creative": "碧き竜の加護を受けた魔術士",
  "emotion+media": "忘れじの言葉を紡ぐ吟遊詩人",
  "emotion+finish": "愛を届けるパフォーマー",
  "emotion+manga": "漆黒の余白から帰還せし者",
  "media+manga": "見識の巡回騎士",
  "media+finish": "頂に至る白銀の魔術師",
  "media+creative": "もふもふに愛される召喚士",
  "media+emotion": "忘れじの言葉を紡ぐ吟遊詩人",
  "manga+creative": "迷宮を形づくる案内人",
  "manga+emotion": "漆黒の余白から帰還せし者",
  "manga+media": "見識の巡回騎士",
  "manga+finish": "虹を繰り出す彩術士",
  "finish+creative": "赤銅（あかがね）と紺碧の錬金術師",
  "finish+media": "創造を歌う言霊士",
  "finish+manga": "虹を繰り出す彩術士",
  "finish+emotion": "愛を届けるパフォーマー"
};

const fallbackByTop = {
  creative: "想像を創造するアルケミスト",
  media: "見識の巡回騎士",
  manga: "迷宮を形づくる案内人",
  emotion: "碧き竜の加護を受けた魔術士",
  finish: "赤銅（あかがね）と紺碧の錬金術師"
};

const titleScreen = document.querySelector("#titleScreen");
const openingScreen = document.querySelector("#openingScreen");
const quizScreen = document.querySelector("#quizScreen");
const loadingScreen = document.querySelector("#loadingScreen");
const resultScreen = document.querySelector("#resultScreen");
const siteTitle = document.querySelector("#siteTitle");
const siteSubtitle = document.querySelector("#siteSubtitle");
const startButton = document.querySelector("#startButton");
const questionStartButton = document.querySelector("#questionStartButton");
const quickQuestionStartButton = document.querySelector("#quickQuestionStartButton");
const showResultButton = document.querySelector("#showResultButton");
const restartButton = document.querySelector("#restartButton");
const soundButton = document.querySelector("#soundButton");
const openingText = document.querySelector("#openingText");
const loadingText = document.querySelector("#loadingText");
const questionCount = document.querySelector("#questionCount");
const progressBar = document.querySelector("#progressBar");
const questionLabel = document.querySelector("#questionLabel");
const questionText = document.querySelector("#questionText");
const answerList = document.querySelector("#answerList");
const resultTitle = document.querySelector("#resultTitle");
const resultType = document.querySelector("#resultType");
const resultImageSlot = document.querySelector("#resultImageSlot");
const resultBody = document.querySelector("#resultBody");
const resultStep = document.querySelector("#resultStep");
const restartButtonBottom = document.querySelector("#restartButtonBottom");
const topToast = document.querySelector("#topToast");

let currentQuestion = 0;
let quizQuestions = [];
let earnedScores = scores({});
let maxScores = scores({});
let normalizedScores = scores({});
let answerFlags = createAnswerFlags();
let firstChoiceCount = 0;
let firstOrSecondChoiceCount = 0;
let bgm = null;
let soundEnabled = false;
let currentTrackIndex = -1;
let topToastTimer = null;
let topToastLastShown = 0;

const resultImageMap = {
  "迷宮を形づくる案内人": "c01",
  "世界図書館の魔法司書": "c02",
  "想像を創造するアルケミスト": "c03",
  "もふもふに愛される召喚士": "c04",
  "碧き竜の加護を受けた魔術士": "c05",
  "忘れじの言葉を紡ぐ吟遊詩人": "c06",
  "愛を届けるパーフォーマー": "c07",
  "愛を届けるパフォーマー": "c07",
  "見識の巡回騎士": "c08",
  "頂に至る白銀の魔術師": "c09",
  "漆黒の余白から帰還せし者": "c10",
  "赤銅（あかがね）と紺碧の錬金術師": "c11",
  "赤銅と紺碧の錬金術師": "c11",
  "創造を歌う言霊士": "c12",
  "虹を繰り出す彩術士": "c13",
  "五芒星（ペンタグラム）を操る影の勇者": "c14",
  "五芒星を操る影の勇者": "c14",
  "呼ぶ声に応える覚醒者": "c15",
  "世界を夢見る旅立ちの勇者": "c16"
};

const mainTopToastMessages = [
  "占う！",
  "レア職、出るかな？",
  "その“好き”も才能かも",
  "ゲートおーぷん",
  "BGMもONできるよ",
  "気軽にあそんでね！"
];

const rareTopToastMessages = [
  "しめきりって知ってる？",
  "右手の黒龍がうずく…",
  "朝はご飯派？パン派？"
];

const bgmTracks = [
  "assets/bgm-01.mp3",
  "assets/bgm-02.mp3",
  "assets/bgm-03.mp3",
  "assets/bgm-04.mp3",
  "assets/bgm-05.mp3",
  "assets/bgm-06.mp3",
  "assets/bgm-07.mp3",
  "assets/bgm-08.mp3"
];

function paragraphs(lines) {
  return lines.map((line) => `<p>${line}</p>`).join("");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function hideTopToast() {
  if (!topToast) {
    return;
  }

  topToast.classList.remove("is-visible");
  topToast.setAttribute("aria-hidden", "true");
}

function pickTopToastMessage() {
  const pool = Math.random() < 0.7 ? mainTopToastMessages : rareTopToastMessages;
  return pickOne(pool);
}

function positionTopToast(event) {
  if (!topToast || !event) {
    return;
  }

  const rect = startButton.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - rect.left, 64), rect.width - 64);
  const y = Math.min(Math.max(event.clientY - rect.top, 42), rect.height - 10);
  topToast.style.left = `${x}px`;
  topToast.style.top = `${y}px`;
}

function showTopToast(event) {
  if (!titleScreen.classList.contains("is-active") || !topToast) {
    return;
  }

  const now = Date.now();
  if (now - topToastLastShown < 1200) {
    return;
  }

  topToastLastShown = now;
  positionTopToast(event);
  topToast.textContent = pickTopToastMessage();
  topToast.setAttribute("aria-hidden", "false");
  topToast.classList.add("is-visible");

  clearTimeout(topToastTimer);
  topToastTimer = setTimeout(hideTopToast, 2000);
}

function buildQuizQuestions() {
  const randomQuestions = categoryQuestionGroups.map((group) => pickOne(group));
  return shuffle([...fixedQuestions, ...randomQuestions]);
}

function showScreen(screen) {
  if (screen !== titleScreen) {
    hideTopToast();
  }

  [titleScreen, openingScreen, quizScreen, loadingScreen, resultScreen].forEach((item) => {
    item.classList.toggle("is-active", item === screen);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStaticText() {
  siteTitle.textContent = content.title;
  siteSubtitle.textContent = content.subtitle;
  startButton.setAttribute("aria-label", content.startButton);
  questionStartButton.textContent = content.questionStartButton;
  showResultButton.textContent = content.showResultButton;
  restartButton.textContent = content.restartButton;
  openingText.innerHTML = paragraphs(content.opening);
  loadingText.innerHTML = paragraphs(content.loading);
}

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  questionCount.textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
  questionLabel.textContent = `Q${currentQuestion + 1}`;
  questionText.textContent = question.text;
  answerList.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer.text}`;
    button.addEventListener("click", () => chooseAnswer(question, answer, index));
    answerList.appendChild(button);
  });
}

function addScores(target, addition) {
  scoreKeys.forEach((key) => {
    target[key] += addition[key] || 0;
  });
}

function addFlags(addition = {}) {
  flagKeys.forEach((key) => {
    answerFlags[key] = answerFlags[key] || Boolean(addition[key]);
  });
}

function getQuestionMaxScores(question) {
  return scoreKeys.reduce((total, key) => {
    total[key] = Math.max(...question.answers.map((answer) => answer.scores[key] || 0));
    return total;
  }, scores({}));
}

function startQuiz() {
  currentQuestion = 0;
  quizQuestions = buildQuizQuestions();
  earnedScores = scores({});
  maxScores = scores({});
  normalizedScores = scores({});
  answerFlags = createAnswerFlags();
  firstChoiceCount = 0;
  firstOrSecondChoiceCount = 0;
  renderQuestion();
  showScreen(quizScreen);
}

function chooseAnswer(question, answer, answerIndex) {
  addScores(earnedScores, answer.scores);
  addFlags(answer.flags);
  addScores(maxScores, getQuestionMaxScores(question));
  if (answerIndex === 0) {
    firstChoiceCount += 1;
  }
  if (answerIndex <= 1) {
    firstOrSecondChoiceCount += 1;
  }
  currentQuestion += 1;

  if (currentQuestion < quizQuestions.length) {
    renderQuestion();
    return;
  }

  calculateNormalizedScores();
  showScreen(loadingScreen);
}

function calculateNormalizedScores() {
  normalizedScores = scoreKeys.reduce((total, key) => {
    total[key] = maxScores[key] > 0 ? Math.round((earnedScores[key] / maxScores[key]) * 100) : 0;
    return total;
  }, scores({}));
}

function getTypeFromPair(first, second) {
  return typeMap[`${first}+${second}`] || typeMap[`${second}+${first}`] || fallbackByTop[first];
}

function hasHighPair(first, second, threshold = 45) {
  return normalizedScores[first] >= threshold && normalizedScores[second] >= threshold;
}

function hasLibrarySignal() {
  return (
    firstChoiceCount < 12 &&
    firstOrSecondChoiceCount < 14 &&
    answerFlags.likesBooksKnowledge &&
    (answerFlags.likesWords || normalizedScores.media >= 54) &&
    normalizedScores.creative >= 44
  );
}

function hasMazeSignal() {
  return answerFlags.likesStoryStructure && (normalizedScores.manga >= 38 || normalizedScores.finish >= 38);
}

function hasAlchemistSignal() {
  return (
    firstChoiceCount < 12 &&
    firstOrSecondChoiceCount < 14 &&
    answerFlags.hasCompletionDrive &&
    normalizedScores.creative >= 56 &&
    normalizedScores.finish >= 56 &&
    !answerFlags.likesVisualDesign &&
    !answerFlags.likesPublishing &&
    !answerFlags.likesCuteWorld &&
    !answerFlags.likesWords
  );
}

function getTopTwoBiasedType(first, second) {
  if (answerFlags.likesDarkMoodStrong) {
    return "漆黒の余白から帰還せし者";
  }

  if (answerFlags.likesVisualDesign && hasHighPair("manga", "finish", 68) && normalizedScores.creative >= 60) {
    return "虹を繰り出す彩術士";
  }

  if (answerFlags.likesCuteWorld && hasHighPair("creative", "media", 34)) {
    return "もふもふに愛される召喚士";
  }

  if (answerFlags.likesEmotionCharacter && hasHighPair("emotion", "creative", 36)) {
    return "碧き竜の加護を受けた魔術士";
  }

  if (answerFlags.likesPublishing && hasHighPair("media", "finish", 36)) {
    return normalizedScores.finish >= normalizedScores.media
      ? "創造を歌う言霊士"
      : "頂に至る白銀の魔術師";
  }

  if (answerFlags.hasKindnessDrive && hasHighPair("emotion", "finish", 36)) {
    return "愛を届けるパフォーマー";
  }

  if ((answerFlags.likesTrendWatching || answerFlags.hasMangaDepth) && hasHighPair("media", "manga", 36)) {
    return "見識の巡回騎士";
  }

  if (answerFlags.hasCompletionDrive && normalizedScores.finish >= 48) {
    return "赤銅（あかがね）と紺碧の錬金術師";
  }

  if (answerFlags.likesWords && normalizedScores.emotion >= 46) {
    return normalizedScores.creative > normalizedScores.media
      ? "碧き竜の加護を受けた魔術士"
      : "忘れじの言葉を紡ぐ吟遊詩人";
  }

  return getAdjustedTypeFromPair(first, second);
}

function getAdjustedTypeFromPair(first, second) {
  const resultName = getTypeFromPair(first, second);

  if (resultName === "虹を繰り出す彩術士" && firstOrSecondChoiceCount >= 14) {
    if (answerFlags.likesPublishing && hasHighPair("media", "finish", 36)) {
      return normalizedScores.finish >= normalizedScores.media
        ? "創造を歌う言霊士"
        : "頂に至る白銀の魔術師";
    }

    if ((answerFlags.likesTrendWatching || answerFlags.hasMangaDepth) && hasHighPair("media", "manga", 36)) {
      return "見識の巡回騎士";
    }

    if (answerFlags.likesEmotionCharacter && normalizedScores.emotion >= 42) {
      return "碧き竜の加護を受けた魔術士";
    }

    return "赤銅（あかがね）と紺碧の錬金術師";
  }

  if (resultName === "世界図書館の魔法司書" && !hasLibrarySignal()) {
    if (firstOrSecondChoiceCount < 14 && answerFlags.likesVisualDesign && hasHighPair("manga", "finish", 42)) {
      return "虹を繰り出す彩術士";
    }

    if (normalizedScores.media >= 38 || answerFlags.hasMangaDepth || answerFlags.likesTrendWatching) {
      return "見識の巡回騎士";
    }

    if (normalizedScores.emotion >= 38) {
      return "碧き竜の加護を受けた魔術士";
    }

    return "もふもふに愛される召喚士";
  }

  if (resultName === "想像を創造するアルケミスト" && !hasAlchemistSignal()) {
    if (firstChoiceCount >= 12 && normalizedScores.media >= 54) {
      return normalizedScores.finish >= normalizedScores.media
        ? "創造を歌う言霊士"
        : "頂に至る白銀の魔術師";
    }

    if (answerFlags.hasCompletionDrive && normalizedScores.finish >= 45) {
      return "赤銅（あかがね）と紺碧の錬金術師";
    }

    if (firstOrSecondChoiceCount < 14 && answerFlags.likesVisualDesign && (hasHighPair("manga", "finish", 42) || hasHighPair("creative", "manga", 48))) {
      return "虹を繰り出す彩術士";
    }

    if (answerFlags.likesPublishing && normalizedScores.media >= 38) {
      return normalizedScores.finish >= normalizedScores.media
        ? "創造を歌う言霊士"
        : "頂に至る白銀の魔術師";
    }

    if (answerFlags.likesCuteWorld) {
      return "もふもふに愛される召喚士";
    }

    if (answerFlags.likesWords || answerFlags.likesEmotionCharacter) {
      return "碧き竜の加護を受けた魔術士";
    }

    return "赤銅（あかがね）と紺碧の錬金術師";
  }

  if (resultName === "迷宮を形づくる案内人" && !hasMazeSignal()) {
    if (firstOrSecondChoiceCount < 14 && answerFlags.likesVisualDesign && hasHighPair("manga", "finish", 42)) {
      return "虹を繰り出す彩術士";
    }

    if (hasLibrarySignal() && normalizedScores.creative >= 54) {
      return "世界図書館の魔法司書";
    }

    if (normalizedScores.media >= 38 || answerFlags.hasMangaDepth || answerFlags.likesTrendWatching) {
      return "見識の巡回騎士";
    }

    return "見識の巡回騎士";
  }

  return resultName;
}

const normalJobKeys = [
  "世界図書館の魔法司書",
  "想像を創造するアルケミスト",
  "もふもふに愛される召喚士",
  "碧き竜の加護を受けた魔術士",
  "忘れじの言葉を紡ぐ吟遊詩人",
  "愛を届けるパフォーマー",
  "見識の巡回騎士",
  "頂に至る白銀の魔術師",
  "迷宮を形づくる案内人",
  "漆黒の余白から帰還せし者",
  "赤銅（あかがね）と紺碧の錬金術師",
  "創造を歌う言霊士",
  "虹を繰り出す彩術士"
];

function createJobScores() {
  return normalJobKeys.reduce((total, key) => {
    total[key] = 0;
    return total;
  }, {});
}

function addJobScore(jobScores, jobName, point) {
  if (jobScores[jobName] === undefined) return;
  jobScores[jobName] += point;
}

function getAverageNormalizedScore() {
  const values = scoreKeys.map((key) => normalizedScores[key] || 0);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getNormalizedScoreRange() {
  const values = scoreKeys.map((key) => normalizedScores[key] || 0);
  return Math.max(...values) - Math.min(...values);
}

function getAverageNormalizedScore() {
  const values = scoreKeys.map((key) => normalizedScores[key] || 0);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getNormalizedScoreRange() {
  const values = scoreKeys.map((key) => normalizedScores[key] || 0);
  return Math.max(...values) - Math.min(...values);
}

function getJobName(name) {
  if (resultTypes[name]) return name;

  // 表記ゆれ保険：まだ resultTypes 側が「パーフォーマー」の場合に備える
  if (name === "愛を届けるパフォーマー" && resultTypes["愛を届けるパーフォーマー"]) {
    return "愛を届けるパーフォーマー";
  }

  return name;
}

function getPowerBand() {
  const average = getAverageNormalizedScore();

  if (average >= 62) return "high";
  if (average >= 38) return "middle";
  return "low";
}

function hasAnyRouteFlag() {
  return (
    answerFlags.routeLibrary ||
    answerFlags.routeMaze ||
    answerFlags.routeKnight ||
    answerFlags.routeRainbow ||
    answerFlags.routeMofu ||
    answerFlags.routeAkagane ||
    answerFlags.routeBard ||
    answerFlags.routeLove ||
    answerFlags.routeDark ||
    answerFlags.routeBlueDragon ||
    answerFlags.routeAlchemist ||
    answerFlags.routeSilver ||
    answerFlags.routeKotodama
  );
}

function getLowScoreResult() {
  const average = getAverageNormalizedScore();

  if (average >= 38) return "";

  const hasInterest =
    hasAnyRouteFlag() ||
    answerFlags.likesCuteWorld ||
    answerFlags.likesWords ||
    answerFlags.likesDarkMood ||
    answerFlags.likesVisualDesign ||
    answerFlags.likesBooksKnowledge ||
    answerFlags.hasKindnessDrive ||
    answerFlags.likesWorldBuilding ||
    answerFlags.hasMangaDepth;

  return hasInterest
    ? "呼ぶ声に応える覚醒者"
    : "世界を夢見る旅立ちの勇者";
}

function shouldShowPentagram() {
  const average = getAverageNormalizedScore();
  const range = getNormalizedScoreRange();

  const rareFlags = [
    "routePentagramHint",
    "likesBooksKnowledge",
    "likesDarkMoodStrong",
    "likesStoryStructure",
    "likesVisualDesign",
    "hasCompletionDrive",
    "likesPublishing",
    "hasMangaDepth",
    "likesWorldStructure"
  ];

  const rareFlagCount = rareFlags.filter((flag) => answerFlags[flag]).length;

  return (
    average >= 78 &&
    range <= 24 &&
    rareFlagCount >= 3 &&
    firstChoiceCount < 13
  );
}

function getActionJobByFlags(band) {
  // 作品・ジャンルで強い分岐がない時だけ、行動系で拾う
  if (hasAnyRouteFlag()) return "";

  if (answerFlags.likesPublishing) {
    return band === "high"
      ? getJobName("創造を歌う言霊士")
      : getJobName("頂に至る白銀の魔術師");
  }

  if (answerFlags.hasCompletionDrive) {
    return band === "high"
      ? "赤銅（あかがね）と紺碧の錬金術師"
      : getJobName("頂に至る白銀の魔術師");
  }

  return "";
}

function getHighBandJob() {
  // 強制・強めルート
  if (answerFlags.routeDark || answerFlags.likesDarkMoodStrong) {
    return "漆黒の余白から帰還せし者";
  }

  if (answerFlags.routeLibrary) {
    return "世界図書館の魔法司書";
  }

  if (answerFlags.routeMaze) {
    return "迷宮を形づくる案内人";
  }

  if (answerFlags.routeRainbow) {
    return "虹を繰り出す彩術士";
  }

  if (answerFlags.routeAkagane) {
    return "赤銅（あかがね）と紺碧の錬金術師";
  }

  if (answerFlags.routeBard) {
    return "忘れじの言葉を紡ぐ吟遊詩人";
  }

  if (answerFlags.routeLove) {
    return getJobName("愛を届けるパフォーマー");
  }

  if (answerFlags.routeMofu) {
    return "もふもふに愛される召喚士";
  }

  if (answerFlags.routeBlueDragon) {
    return "碧き竜の加護を受けた魔術士";
  }

  if (answerFlags.routeAlchemist) {
    return "想像を創造するアルケミスト";
  }

  if (answerFlags.routeKnight) {
    return "見識の巡回騎士";
  }

  return "";
}

function getMiddleBandJob() {
  // 中スコア帯は、少しやわらかい職へ寄せる
  if (answerFlags.routeDark || answerFlags.likesDarkMoodStrong) {
    return "漆黒の余白から帰還せし者";
  }

  if (answerFlags.routeLibrary) {
    return "世界図書館の魔法司書";
  }

  if (answerFlags.routeMaze) {
    return "迷宮を形づくる案内人";
  }

  if (answerFlags.routeRainbow) {
    return "もふもふに愛される召喚士";
  }

  if (answerFlags.routeAkagane) {
    return "忘れじの言葉を紡ぐ吟遊詩人";
  }

  if (answerFlags.routeBard) {
    return "忘れじの言葉を紡ぐ吟遊詩人";
  }

  if (answerFlags.routeLove) {
    return getJobName("愛を届けるパフォーマー");
  }

  if (answerFlags.routeMofu) {
    return "もふもふに愛される召喚士";
  }

  if (answerFlags.routeBlueDragon) {
    return "碧き竜の加護を受けた魔術士";
  }

  if (answerFlags.routeAlchemist) {
    return "もふもふに愛される召喚士";
  }

  if (answerFlags.routeKnight) {
    return "見識の巡回騎士";
  }

  return "";
}

function getFallbackJob() {
  const creative = normalizedScores.creative || 0;
  const media = normalizedScores.media || 0;
  const manga = normalizedScores.manga || 0;
  const emotion = normalizedScores.emotion || 0;
  const finish = normalizedScores.finish || 0;

  if (emotion >= creative && emotion >= manga && emotion >= media) {
    if (answerFlags.hasKindnessDrive) return getJobName("愛を届けるパフォーマー");
    if (answerFlags.likesWords) return "忘れじの言葉を紡ぐ吟遊詩人";
    return "碧き竜の加護を受けた魔術士";
  }

  if (manga >= creative && manga >= media) {
    if (answerFlags.likesStoryStructure) return "迷宮を形づくる案内人";
    return "見識の巡回騎士";
  }

  if (finish >= creative && finish >= media) {
    if (answerFlags.likesPublishing) return "創造を歌う言霊士";
    return "赤銅（あかがね）と紺碧の錬金術師";
  }

  if (media >= creative) {
    return "見識の巡回騎士";
  }

  return "想像を創造するアルケミスト";
}

function getResultName() {
  const lowScoreResult = getLowScoreResult();
  if (lowScoreResult) {
    return lowScoreResult;
  }

  if (shouldShowPentagram()) {
    return "五芒星（ペンタグラム）を操る影の勇者";
  }

  const band = getPowerBand();

  const actionJob = getActionJobByFlags(band);
  if (actionJob) {
    return actionJob;
  }

  if (band === "high") {
    const highJob = getHighBandJob();
    if (highJob) return highJob;
  }

  if (band === "middle") {
    const middleJob = getMiddleBandJob();
    if (middleJob) return middleJob;
  }

  return getFallbackJob();
}



function renderResult() {
  const resultName = getResultName();
  const result = resultTypes[resultName];
  const imageKey = resultImageMap[resultName];
  resultTitle.textContent = resultName;
  resultType.textContent = result.subtitle;
  resultImageSlot.innerHTML = imageKey
  ? `<img src="assets/cha/${imageKey}.jpg" alt="${resultName}">`
  : "";
  resultBody.innerHTML = paragraphs(result.body);
  resultStep.textContent = result.step;
  showScreen(resultScreen);
}

function getBgm() {
  if (!bgm) {
    bgm = new Audio();
    bgm.loop = false;
    bgm.volume = 0.55;
    bgm.addEventListener("ended", playRandomTrack);
  }

  return bgm;
}

function pickRandomTrack() {
  if (bgmTracks.length === 1) {
    return 0;
  }

  let nextIndex = currentTrackIndex;
  while (nextIndex === currentTrackIndex) {
    nextIndex = Math.floor(Math.random() * bgmTracks.length);
  }
  return nextIndex;
}

async function playRandomTrack() {
  if (!soundEnabled) {
    return;
  }

  const audio = getBgm();
  currentTrackIndex = pickRandomTrack();
  audio.src = bgmTracks[currentTrackIndex];
  audio.currentTime = 0;
  await audio.play();
}

async function toggleSound() {
  soundButton.classList.remove("is-bouncy");
  void soundButton.offsetWidth;
  soundButton.classList.add("is-bouncy");

  soundEnabled = !soundEnabled;
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  soundButton.textContent = soundEnabled ? "BGM ON" : "BGM OFF";

  const audio = getBgm();
  if (soundEnabled) {
    try {
      await playRandomTrack();
    } catch {
      soundEnabled = false;
      soundButton.setAttribute("aria-pressed", "false");
      soundButton.textContent = "BGM OFF";
    }
    return;
  }

  audio.pause();
}

renderStaticText();
soundButton.addEventListener("animationend", () => {
  soundButton.classList.remove("is-bouncy");
});
startButton.addEventListener("mouseenter", (event) => {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    showTopToast(event);
  }
});
startButton.addEventListener("pointerdown", showTopToast);
startButton.addEventListener("click", (event) => {
  showTopToast(event);
  setTimeout(() => showScreen(openingScreen), 420);
});
questionStartButton.addEventListener("click", startQuiz);
quickQuestionStartButton.addEventListener("click", startQuiz);
showResultButton.addEventListener("click", renderResult);
restartButton.addEventListener("click", () => showScreen(titleScreen));
restartButtonBottom.addEventListener("click", () => showScreen(titleScreen));
soundButton.addEventListener("click", toggleSound);
