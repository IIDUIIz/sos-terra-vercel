import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Mascot from './components/Mascot';
import {
  Leaf,
  Trees,
  Droplets,
  ShieldAlert,
  Home,
  BookOpen,
  Brain,
  Gamepad2,
  Recycle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  Download,
} from 'lucide-react';

// ─── Ecosystem ─────────────────────────────────────────────────────────────────

const ecosystemInfo = [
  {
    title: 'Flora local',
    emoji: '🌳',
    gradient: 'from-green-400 to-emerald-600',
    icon: Trees,
    text: 'A vegetação local ajuda a manter o solo firme, produz oxigênio, regula a temperatura e abriga várias espécies de animais.',
    points: ['Protege nascentes e rios', 'Reduz erosão do solo', 'Serve de abrigo para a fauna'],
  },
  {
    title: 'Fauna local',
    emoji: '🦋',
    gradient: 'from-orange-300 to-amber-500',
    icon: Leaf,
    text: 'Os animais fazem parte do equilíbrio natural. Alguns espalham sementes, outros controlam pragas e todos contribuem para o ecossistema.',
    points: ['Polinização de plantas', 'Dispersão de sementes', 'Equilíbrio da cadeia alimentar'],
  },
  {
    title: 'Água e rios',
    emoji: '💧',
    gradient: 'from-blue-400 to-cyan-500',
    icon: Droplets,
    text: 'A qualidade da água depende da preservação do entorno. Lixo e desmatamento afetam diretamente rios, lagos e nascentes.',
    points: ['Água limpa para a comunidade', 'Proteção das margens', 'Menos enchentes e assoreamento'],
  },
  {
    title: 'Riscos ambientais',
    emoji: '⚠️',
    gradient: 'from-red-400 to-rose-600',
    icon: ShieldAlert,
    text: 'Queimadas, lixo, corte irregular de árvores e poluição colocam o ecossistema local em risco e afetam a vida das pessoas.',
    points: ['Perda de biodiversidade', 'Aumento da poluição', 'Impactos no clima e na saúde'],
  },
];

// ─── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    image: '🌿',
    question: 'O que ajuda a proteger o ecossistema local?',
    options: [
      'Jogar lixo em áreas vazias',
      'Cuidar das plantas, da água e dos animais',
      'Queimar folhas e resíduos',
      'Poluir rios e lagos',
    ],
    answer: 1,
    explanation: 'A proteção do ecossistema depende do cuidado com todos os seus elementos: água, solo, plantas e animais.',
  },
  {
    image: '🌳',
    question: 'Por que as árvores são importantes para o ambiente?',
    options: [
      'Porque aumentam a poluição',
      'Porque só ocupam espaço',
      'Porque ajudam a manter o equilíbrio ambiental',
      'Porque secam os rios',
    ],
    answer: 2,
    explanation: 'As árvores ajudam na umidade, na qualidade do ar, na sombra, na proteção do solo e no abrigo de espécies.',
  },
  {
    image: '💧',
    question: 'Qual atitude prejudica a água da comunidade?',
    options: [
      'Preservar nascentes',
      'Plantar árvores perto de áreas degradadas',
      'Jogar lixo em córregos e rios',
      'Economizar água',
    ],
    answer: 2,
    explanation: 'O descarte incorreto de lixo contamina a água e compromete a saúde do ambiente e das pessoas.',
  },
  {
    image: '🦋',
    question: 'Os animais do ecossistema local são importantes porque...',
    options: [
      'não fazem diferença no ambiente',
      'atrapalham o crescimento das plantas',
      'ajudam no equilíbrio natural',
      'devem viver longe de qualquer vegetação',
    ],
    answer: 2,
    explanation: 'A fauna participa da polinização, dispersão de sementes e do equilíbrio das cadeias alimentares.',
  },
  {
    image: '♻️',
    question: 'Qual destas ações é uma atitude sustentável?',
    options: [
      'Desperdiçar água',
      'Queimar lixo no quintal',
      'Separar resíduos e cuidar dos espaços naturais',
      'Retirar plantas nativas sem cuidado',
    ],
    answer: 2,
    explanation: 'Pequenas atitudes sustentáveis ajudam muito na preservação do ecossistema local.',
  },
];

// ─── Memory game ───────────────────────────────────────────────────────────────

const memoryPairs = [
  { id: 'arvore', name: 'Árvore', emoji: '🌳', hint: 'Protege o solo e abriga animais.' },
  { id: 'borboleta', name: 'Borboleta', emoji: '🦋', hint: 'Poliniza flores e equilibra o ambiente.' },
  { id: 'agua', name: 'Rio', emoji: '💧', hint: 'Fornece água limpa para a vida.' },
  { id: 'flor', name: 'Flor', emoji: '🌸', hint: 'Atrai abelhas e borboletas.' },
  { id: 'sol', name: 'Sol', emoji: '☀️', hint: 'Energia para toda a natureza.' },
  { id: 'reciclagem', name: 'Reciclagem', emoji: '♻️', hint: 'Diminui o lixo na natureza.' },
];

function createMemoryDeck() {
  return memoryPairs
    .flatMap((item) => [
      { ...item, cardId: `${item.id}-a` },
      { ...item, cardId: `${item.id}-b` },
    ])
    .sort(() => Math.random() - 0.5);
}

// ─── Recycling challenge ───────────────────────────────────────────────────────

const recyclingBins = [
  {
    id: 'plastic',
    label: 'Plástico',
    colorClass: 'bg-red-500',
    borderClass: 'border-red-300',
    lightClass: 'bg-red-50',
    textClass: 'text-red-700',
  },
  {
    id: 'paper',
    label: 'Papel',
    colorClass: 'bg-blue-500',
    borderClass: 'border-blue-300',
    lightClass: 'bg-blue-50',
    textClass: 'text-blue-700',
  },
  {
    id: 'glass',
    label: 'Vidro',
    colorClass: 'bg-green-500',
    borderClass: 'border-green-300',
    lightClass: 'bg-green-50',
    textClass: 'text-green-700',
  },
  {
    id: 'metal',
    label: 'Metal',
    colorClass: 'bg-yellow-400',
    borderClass: 'border-yellow-300',
    lightClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
  },
];

const recyclingRounds = [
  { emoji: '🧴', name: 'Frasco de shampoo', correctBin: 'plastic', hint: 'Embalagens plásticas vão na lixeira vermelha.' },
  { emoji: '📰', name: 'Jornal velho', correctBin: 'paper', hint: 'Papel e papelão vão na lixeira azul.' },
  { emoji: '🍾', name: 'Garrafa de vidro', correctBin: 'glass', hint: 'Vidros vão na lixeira verde.' },
  { emoji: '🥫', name: 'Lata de conserva', correctBin: 'metal', hint: 'Metais vão na lixeira amarela.' },
  { emoji: '📦', name: 'Caixa de papelão', correctBin: 'paper', hint: 'Papelão é papel — vai na lixeira azul.' },
  { emoji: '🛍️', name: 'Sacola plástica', correctBin: 'plastic', hint: 'Sacolas plásticas vão na lixeira vermelha.' },
];

// ─── Practical tips ────────────────────────────────────────────────────────────

const practicalTips = [
  {
    emoji: '💧',
    title: 'Economize água',
    tips: ['Feche a torneira ao escovar os dentes', 'Tome banhos mais curtos', 'Reutilize a água da chuva para plantas'],
  },
  {
    emoji: '♻️',
    title: 'Recicle corretamente',
    tips: ['Separe o lixo por tipo (plástico, papel, vidro, metal)', 'Limpe as embalagens antes de descartar', 'Conheça o ponto de coleta mais próximo'],
  },
  {
    emoji: '🌱',
    title: 'Plante e preserve',
    tips: ['Plante mudas de árvores nativas', 'Não queime folhas e grama', 'Proteja nascentes e áreas verdes'],
  },
  {
    emoji: '🛒',
    title: 'Consuma com consciência',
    tips: ['Prefira produtos com menos embalagem', 'Leve sacola reutilizável ao mercado', 'Evite o desperdício de alimentos'],
  },
  {
    emoji: '🚶',
    title: 'Mobilidade sustentável',
    tips: ['Caminhe ou pedale em trajetos curtos', 'Use o transporte coletivo', 'Compartilhe caronas quando possível'],
  },
];

// ─── Navigation ────────────────────────────────────────────────────────────────

const tabItems = [
  { key: 'inicio', label: 'Início', icon: Home },
  { key: 'ecosistema', label: 'Eco', icon: BookOpen },
  { key: 'quiz', label: 'Quiz', icon: Brain },
  { key: 'jogo', label: 'Jogo', icon: Gamepad2 },
  { key: 'missao', label: 'Missão', icon: Recycle },
];

// ─── UI primitives ─────────────────────────────────────────────────────────────

function Card({ className = '', children }) {
  return <div className={`rounded-[24px] border-0 bg-white shadow-md ${className}`}>{children}</div>;
}

function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = '' }) {
  return <h2 className={`font-semibold text-slate-900 ${className}`}>{children}</h2>;
}

function CardDescription({ children, className = '' }) {
  return <p className={`mt-2 text-sm leading-6 text-slate-600 ${className}`}>{children}</p>;
}

function CardContent({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function Button({ children, className = '', variant = 'default', ...props }) {
  const styles =
    variant === 'secondary'
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
      : 'bg-emerald-600 text-white hover:bg-emerald-700';

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 ${className}`}>
      {children}
    </span>
  );
}

function Progress({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-emerald-600 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 p-5 text-white shadow-xl">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-black/10" />
      <div className="relative z-10">
        <Badge className="mb-3 bg-white/15 text-white">SOS Terra</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Cuidar do ambiente começa perto da gente</h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/90">
          Um app educativo sobre o ecossistema local com quiz, jogos e desafios.
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
          <MapPin className="h-4 w-4" />
          <span>Conteúdo pronto para adaptar à sua cidade, bairro ou escola</span>
        </div>
      </div>
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────────────

function HomeScreen({ onStartQuiz, onOpenEcosystem, onStartGame }) {
  const [expandedTip, setExpandedTip] = useState(null);

  return (
    <div className="space-y-4">
      <Header />

      {/* Mascot scenario */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Mascot pose="acenando" size={88} />
            </div>
            <div className="relative rounded-[20px] bg-emerald-50 p-4">
              <div
                className="absolute -left-2 top-5 h-0 w-0"
                style={{
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '10px solid #ecfdf5',
                }}
              />
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">Terra diz:</p>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                Olá! Eu sou a Terra 🌍 A natureza precisa de você! Explore, aprenda e ajude a cuidar do meio ambiente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About + quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5" />
            Sobre o app
          </CardTitle>
          <CardDescription>
            O SOS Terra ensina como a natureza da nossa região funciona e como podemos protegê-la.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
          <p>
            Ecossistema local é o conjunto de seres vivos e dos elementos não vivos que interagem em um lugar.
            O colapso acontece quando esse equilíbrio é quebrado por poluição, desmatamento e queimadas.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button className="h-12" onClick={onOpenEcosystem}>
              <BookOpen className="h-4 w-4" />
              Ecossistema
            </Button>
            <Button variant="secondary" className="h-12" onClick={onStartQuiz}>
              <Brain className="h-4 w-4" />
              Jogar quiz
            </Button>
            <Button variant="secondary" className="h-12" onClick={onStartGame}>
              <Gamepad2 className="h-4 w-4" />
              Memória
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Practical tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Dicas práticas</CardTitle>
          <CardDescription>Pequenas ações fazem uma grande diferença para o ambiente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {practicalTips.map((tip, index) => (
            <div key={index}>
              <button
                onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                className="flex w-full items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-left transition hover:bg-emerald-100"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <span className="text-lg">{tip.emoji}</span>
                  {tip.title}
                </span>
                <span className="text-[10px] font-bold text-emerald-500">
                  {expandedTip === index ? '▲' : '▼'}
                </span>
              </button>
              <AnimatePresence>
                {expandedTip === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 px-2 pb-2 pt-1">
                      {tip.tips.map((t, i) => (
                        <div key={i} className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs text-slate-700">
                          • {t}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Ecosystem screen ──────────────────────────────────────────────────────────

function EcosystemScreen() {
  return (
    <div className="space-y-4">
      {ecosystemInfo.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <Card className="overflow-hidden">
              <div className={`bg-gradient-to-br ${item.gradient} flex items-center justify-center py-10`}>
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.06 + 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="text-7xl"
                  role="img"
                  aria-label={item.title}
                >
                  {item.emoji}
                </motion.span>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.points.map((point) => (
                  <div key={point} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    ✓ {point}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Quiz screen ───────────────────────────────────────────────────────────────

function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];
  const progress = useMemo(() => ((current + (finished ? 1 : 0)) / quizQuestions.length) * 100, [current, finished]);

  const handleAnswer = (index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
    if (index === question.answer) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (current + 1 < quizQuestions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowFeedback(false);
      return;
    }
    setFinished(true);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / quizQuestions.length) * 100);
    const trophy = percent === 100 ? '🏆' : percent >= 60 ? '🌟' : '📚';
    const message =
      percent === 100
        ? 'Perfeito! Você mandou muito bem!'
        : percent >= 60
          ? 'Muito bom! Você já entende bastante sobre preservação.'
          : 'Boa! Agora é só revisar e tentar de novo.';

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Resultado do quiz</CardTitle>
          <CardDescription>Seu desempenho no joguinho de perguntas e respostas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[24px] bg-gradient-to-br from-emerald-100 to-lime-100 p-6 text-center">
            <motion.div
              initial={{ scale: 0, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="mb-2 flex justify-center"
            >
              <Mascot pose={percent >= 60 ? 'animado' : 'pensativo'} size={96} />
            </motion.div>
            <div className="text-5xl font-bold text-emerald-800">
              {trophy} {score}/{quizQuestions.length}
            </div>
            <p className="mt-2 text-sm text-emerald-900">{message}</p>
          </div>
          <Progress value={percent} />
          <p className="text-sm text-slate-600">Você acertou {percent}% das perguntas.</p>
          <Button onClick={restart} className="h-12 w-full">
            <RotateCcw className="h-4 w-4" />
            Jogar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl">Quiz SOS Terra</CardTitle>
            <CardDescription>
              Pergunta {current + 1} de {quizQuestions.length}
            </CardDescription>
          </div>
          <Badge>{score} ponto{score === 1 ? '' : 's'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Progress value={progress} />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-[24px] bg-slate-50 p-4">
              <motion.div
                key={`img-${current}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                className="mb-3 text-center text-5xl"
              >
                {question.image}
              </motion.div>
              <p className="text-lg font-semibold leading-7 text-slate-900">{question.question}</p>
            </div>

            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isSelected = selected === index;
                const showState = showFeedback && (isCorrect || isSelected);

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index)}
                    className={`rounded-[20px] border p-4 text-left text-sm transition-all ${
                      showState
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-rose-300 bg-rose-50'
                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="leading-6 text-slate-800">{option}</span>
                      {showFeedback && isCorrect && <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[20px] p-4 text-sm leading-6 ${
              selected === question.answer ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'
            }`}
          >
            {selected === question.answer ? '✅ ' : '💡 '}
            {question.explanation}
          </motion.div>
        )}

        <Button onClick={nextQuestion} disabled={!showFeedback} className="h-12 w-full">
          {current + 1 === quizQuestions.length ? 'Ver resultado' : 'Próxima pergunta'}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Memory game screen ────────────────────────────────────────────────────────

function MemoryGameScreen() {
  const [cards, setCards] = useState(() => createMemoryDeck());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState('Vire duas cartas para encontrar figuras iguais.');
  const [locked, setLocked] = useState(false);

  const finished = matchedPairs.length === memoryPairs.length;
  const progress = (matchedPairs.length / memoryPairs.length) * 100;

  const isMatched = (id) => matchedPairs.includes(id);
  const isFlipped = (cardId) => flippedCards.some((card) => card.cardId === cardId);

  const handleCardClick = (card) => {
    if (locked || isMatched(card.id) || isFlipped(card.cardId) || flippedCards.length === 2) return;
    setFlippedCards((prev) => [...prev, card]);
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return undefined;

    const [first, second] = flippedCards;
    setMoves((prev) => prev + 1);
    setLocked(true);

    if (first.id === second.id) {
      setMatchedPairs((prev) => [...prev, first.id]);
      setStatus(`${first.emoji} Par encontrado: ${first.name}!`);
      const timer = window.setTimeout(() => {
        setFlippedCards([]);
        setLocked(false);
      }, 700);
      return () => window.clearTimeout(timer);
    }

    setStatus('Essas cartas são diferentes. Tente lembrar onde cada figura estava.');
    const timer = window.setTimeout(() => {
      setFlippedCards([]);
      setLocked(false);
      setStatus('Vire duas cartas para encontrar figuras iguais.');
    }, 900);

    return () => window.clearTimeout(timer);
  }, [flippedCards]);

  useEffect(() => {
    if (finished) setStatus('🎉 Você encontrou todos os pares!');
  }, [finished]);

  const restart = () => {
    setCards(createMemoryDeck());
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setStatus('Vire duas cartas para encontrar figuras iguais.');
    setLocked(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl">Jogo da Memória</CardTitle>
            <CardDescription>Encontre os pares do ecossistema.</CardDescription>
          </div>
          <Badge>
            {matchedPairs.length}/{memoryPairs.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Progress value={progress} />

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => {
            const open = isFlipped(card.cardId) || isMatched(card.id);
            const done = isMatched(card.id);

            return (
              <motion.button
                key={card.cardId}
                onClick={() => handleCardClick(card)}
                disabled={done}
                aria-label={open ? card.name : 'Carta virada'}
                animate={{ scale: done ? 0.93 : 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={`flex aspect-[3/4] min-h-[88px] flex-col items-center justify-center rounded-[20px] border p-1.5 text-center transition-colors ${
                  open
                    ? done
                      ? 'border-emerald-200 bg-emerald-50 shadow-sm'
                      : 'border-emerald-400 bg-white shadow-md'
                    : 'border-emerald-200 bg-emerald-600 text-white shadow hover:bg-emerald-700'
                }`}
              >
                {open ? (
                  <>
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="text-[28px] leading-none"
                    >
                      {card.emoji}
                    </motion.span>
                    <span className="mt-1.5 text-[10px] font-semibold leading-tight text-slate-700">
                      {card.name}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl">🍃</span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[20px] bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Jogadas</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{moves}</p>
          </div>
          <div className="rounded-[20px] bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Pares</p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {matchedPairs.length}/{memoryPairs.length}
            </p>
          </div>
        </div>

        <motion.div
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 rounded-[20px] p-4 text-sm leading-6 ${
            finished ? 'bg-emerald-50 text-emerald-950' : 'bg-slate-50 text-slate-700'
          }`}
        >
          {finished && <Mascot pose="animado" size={64} className="flex-shrink-0" />}
          <span>
            {finished
              ? `🎉 Você completou o jogo em ${moves} jogada${moves === 1 ? '' : 's'}!`
              : status}
          </span>
        </motion.div>

        <Button onClick={restart} variant="secondary" className="h-12 w-full">
          <RotateCcw className="h-4 w-4" />
          Reiniciar jogo
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Recycling challenge screen ────────────────────────────────────────────────

function RecyclingChallengeScreen() {
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = recyclingRounds[currentRound];
  const progress = ((currentRound + (finished ? 1 : 0)) / recyclingRounds.length) * 100;

  const handleBinClick = (binId) => {
    if (showFeedback) return;
    setSelected(binId);
    setShowFeedback(true);
    if (binId === round.correctBin) setScore((s) => s + 1);
  };

  const nextRound = () => {
    if (currentRound + 1 < recyclingRounds.length) {
      setCurrentRound((r) => r + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentRound(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / recyclingRounds.length) * 100);
    const trophy = percent === 100 ? '🏆' : percent >= 60 ? '♻️' : '📚';
    const message =
      percent === 100
        ? 'Perfeito! Você é um mestre da reciclagem!'
        : percent >= 60
          ? 'Muito bem! Você já sabe reciclar bastante.'
          : 'Continue praticando! A reciclagem salva o planeta.';

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Resultado</CardTitle>
          <CardDescription>Desafio da Reciclagem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-[24px] bg-gradient-to-br from-emerald-100 to-lime-100 p-6 text-center">
            <motion.div
              initial={{ scale: 0, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="mb-2 flex justify-center"
            >
              <Mascot pose={percent >= 60 ? 'animado' : 'pensativo'} size={96} />
            </motion.div>
            <div className="text-5xl font-bold text-emerald-800">
              {trophy} {score}/{recyclingRounds.length}
            </div>
            <p className="mt-2 text-sm text-emerald-900">{message}</p>
          </div>
          <Progress value={percent} />
          <p className="text-sm text-slate-600">Você acertou {percent}% das questões.</p>

          <div className="rounded-[20px] bg-slate-50 p-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Guia de reciclagem</p>
            {recyclingBins.map((bin) => (
              <div key={bin.id} className="flex items-center gap-3 text-sm text-slate-700">
                <div className={`h-4 w-4 flex-shrink-0 rounded-full ${bin.colorClass}`} />
                <span>
                  <strong>{bin.label}</strong>
                  {' — lixeira '}
                  {bin.id === 'plastic' ? 'vermelha' : bin.id === 'paper' ? 'azul' : bin.id === 'glass' ? 'verde' : 'amarela'}
                </span>
              </div>
            ))}
          </div>

          <Button onClick={restart} className="h-12 w-full">
            <RotateCcw className="h-4 w-4" />
            Jogar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Mascot pose="reciclando" size={56} />
          </div>
          <div>
            <CardTitle className="text-2xl">Desafio da Reciclagem</CardTitle>
            <CardDescription>
              Item {currentRound + 1} de {recyclingRounds.length}
            </CardDescription>
          </div>
          <Badge className="ml-auto flex-shrink-0">{score} pt{score === 1 ? '' : 's'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Progress value={progress} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Item to sort */}
            <div className="rounded-[24px] bg-slate-50 p-6 text-center">
              <motion.div
                initial={{ scale: 0.4, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="mb-3 text-7xl"
              >
                {round.emoji}
              </motion.div>
              <p className="text-lg font-bold text-slate-900">{round.name}</p>
              <p className="mt-1 text-sm text-slate-500">Em qual lixeira este item vai?</p>
            </div>

            {/* Bin options */}
            <div className="grid grid-cols-2 gap-3">
              {recyclingBins.map((bin) => {
                const isSelected = selected === bin.id;
                const isCorrect = bin.id === round.correctBin;

                return (
                  <button
                    key={bin.id}
                    onClick={() => handleBinClick(bin.id)}
                    disabled={showFeedback}
                    className={`flex flex-col items-center gap-2 rounded-[20px] border-2 p-4 transition-all ${
                      showFeedback
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50'
                          : isSelected
                            ? 'border-rose-400 bg-rose-50'
                            : `${bin.borderClass} bg-white opacity-40`
                        : `${bin.borderClass} bg-white hover:bg-slate-50 active:scale-95`
                    }`}
                  >
                    {/* Bin visual */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bin.colorClass} shadow-sm`}
                    >
                      {showFeedback && isCorrect && <CheckCircle2 className="h-6 w-6 text-white" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-white" />}
                    </div>
                    <span className={`text-sm font-semibold ${bin.textClass}`}>{bin.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[20px] p-4 text-sm leading-6 ${
              selected === round.correctBin ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'
            }`}
          >
            {selected === round.correctBin ? '✅ Correto! ' : '💡 '}
            {round.hint}
          </motion.div>
        )}

        <Button onClick={nextRound} disabled={!showFeedback} className="h-12 w-full">
          {currentRound + 1 === recyclingRounds.length ? 'Ver resultado' : 'Próximo item'}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Install banner ────────────────────────────────────────────────────────────

function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!prompt || dismissed) return null;

  const install = async () => {
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setPrompt(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={() => setDismissed(true)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-emerald-100">
            <Download className="h-9 w-9 text-emerald-700" />
          </div>
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Instalar SOS Terra</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Adicione à sua tela inicial e acesse como um app, mesmo sem internet.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={install}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-base font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
          >
            <Download className="h-5 w-5" />
            Instalar agora
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="flex h-12 w-full items-center justify-center rounded-2xl text-sm font-medium text-slate-500 transition hover:bg-slate-100"
          >
            Agora não
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState('inicio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-emerald-50 p-3 sm:p-6">
      <Analytics />
      <InstallBanner />
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col gap-4">
        <div className="flex-1 space-y-4 pb-24">
          {tab === 'inicio' && (
            <HomeScreen
              onStartQuiz={() => setTab('quiz')}
              onOpenEcosystem={() => setTab('ecosistema')}
              onStartGame={() => setTab('jogo')}
            />
          )}
          {tab === 'ecosistema' && <EcosystemScreen />}
          {tab === 'quiz' && <QuizScreen />}
          {tab === 'jogo' && <MemoryGameScreen />}
          {tab === 'missao' && <RecyclingChallengeScreen />}
        </div>

        <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2">
          <div className="grid grid-cols-5 rounded-[24px] border border-white/60 bg-white/90 p-2 shadow-2xl backdrop-blur">
            {tabItems.map((item) => {
              const Icon = item.icon;
              const active = tab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-1.5 py-2 text-[10px] font-medium transition-all ${
                    active ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
