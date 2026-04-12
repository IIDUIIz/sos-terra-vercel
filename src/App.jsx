import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Leaf,
  Trees,
  Droplets,
  ShieldAlert,
  Home,
  BookOpen,
  Brain,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  Download,
} from 'lucide-react';

const ecosystemInfo = [
  {
    title: 'Flora local',
    icon: Trees,
    text: 'A vegetação local ajuda a manter o solo firme, produz oxigênio, regula a temperatura e abriga várias espécies de animais.',
    points: ['Protege nascentes e rios', 'Reduz erosão do solo', 'Serve de abrigo para a fauna'],
  },
  {
    title: 'Fauna local',
    icon: Leaf,
    text: 'Os animais fazem parte do equilíbrio natural. Alguns espalham sementes, outros controlam pragas e todos contribuem para o ecossistema.',
    points: ['Polinização', 'Dispersão de sementes', 'Equilíbrio da cadeia alimentar'],
  },
  {
    title: 'Água e rios',
    icon: Droplets,
    text: 'A qualidade da água depende da preservação do entorno. Lixo e desmatamento afetam diretamente rios, lagos e nascentes.',
    points: ['Água limpa para a comunidade', 'Proteção das margens', 'Menos enchentes e assoreamento'],
  },
  {
    title: 'Riscos ambientais',
    icon: ShieldAlert,
    text: 'Queimadas, lixo, corte irregular de árvores e poluição colocam o ecossistema local em risco e afetam a vida das pessoas.',
    points: ['Perda de biodiversidade', 'Aumento da poluição', 'Impactos no clima e na saúde'],
  },
];

const actions = [
  'Separar o lixo corretamente.',
  'Evitar jogar resíduos em ruas, terrenos e rios.',
  'Economizar água e energia.',
  'Participar de mutirões de limpeza e plantio.',
  'Valorizar e proteger a fauna e a flora da sua região.',
];

const quizQuestions = [
  {
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

const tabItems = [
  { key: 'inicio', label: 'Início', icon: Home },
  { key: 'ecosistema', label: 'Ecossistema', icon: BookOpen },
  { key: 'quiz', label: 'Quiz', icon: Brain },
];

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

function Header() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 p-5 text-white shadow-xl">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-black/10" />
      <div className="relative z-10">
        <Badge className="mb-3 bg-white/15 text-white">SOS Terra</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Cuidar do ambiente começa perto da gente</h1>

      </div>
    </div>
  );
}

function HomeScreen({ onStartQuiz, onOpenEcosystem }) {
  return (
    <div className="space-y-4">
      <Header />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5" />
              Sobre o app
            </CardTitle>
            <CardDescription>
              O SOS Terra foi pensado para ensinar, de forma simples, como a natureza da nossa região funciona e como podemos protegê-la.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
            <p>
              Ecossistema local é o conjunto de seres vivos (plantas, animais e microrganismos) e dos elementos não vivos
              (água, solo, ar e luz) que interagem em um lugar específico. Já o colapso do ecossistema acontece quando
              esse equilíbrio é quebrado, geralmente por ações como poluição, desmatamento e queimadas, causando morte
              de espécies e desequilíbrio na natureza.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button className="h-12" onClick={onOpenEcosystem}>
                Ver ecossistema local
              </Button>
              <Button variant="secondary" className="h-12" onClick={onStartQuiz}>
                Jogar quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Como ajudar</CardTitle>
            <CardDescription>Pequenas ações fazem diferença no ambiente.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {actions.map((item, index) => (
                <div key={index} className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-950">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EcosystemScreen() {
  return (
    <div className="space-y-4">
<div className="grid gap-4">
        {ecosystemInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card>
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
                      {point}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

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
    const message =
      percent === 100
        ? 'Perfeito! Você mandou muito bem 🌱'
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
            <div className="text-5xl font-bold text-emerald-800">
              {score}/{quizQuestions.length}
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
                      {showFeedback && isCorrect && <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="mt-0.5 h-5 w-5 text-rose-600" />}
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
    <>
      {/* Backdrop + centralizador */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        onClick={() => setDismissed(true)}
      >
      {/* Card centralizado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-emerald-100">
            <Download className="h-9 w-9 text-emerald-700" />
          </div>
        </div>

        {/* Texto */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Instalar SOS Terra</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Adicione à sua tela inicial e acesse como um app, mesmo sem internet.
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <button
            onClick={install}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-base font-semibold text-white transition active:scale-95 hover:bg-emerald-700"
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
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState('inicio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-emerald-50 p-3 sm:p-6">
      <InstallBanner />
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col gap-4">
        <div className="flex-1 space-y-4 pb-24">
          {tab === 'inicio' && (
            <HomeScreen onStartQuiz={() => setTab('quiz')} onOpenEcosystem={() => setTab('ecosistema')} />
          )}
          {tab === 'ecosistema' && <EcosystemScreen />}
          {tab === 'quiz' && <QuizScreen />}
        </div>

        <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2">
          <div className="grid grid-cols-3 rounded-[24px] border border-white/60 bg-white/90 p-2 shadow-2xl backdrop-blur">
            {tabItems.map((item) => {
              const Icon = item.icon;
              const active = tab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-3 py-2 text-xs font-medium transition-all ${
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
