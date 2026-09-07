export type LessonStep = {
  title: string;
  text: string;
  icon: 'calculator-outline' | 'leaf-outline' | 'laptop-outline' | 'book-outline';
};

export type Lesson = {
  id: string;
  title: string;
  subject: string;
  duration: string;
  icon: LessonStep['icon'];
  summary: string;
  steps: LessonStep[];
};

export const lessons: Lesson[] = [
  {
    id: 'math-counting-1',
    title: 'Kwibara no kubara',
    subject: 'Imibare',
    duration: '15 min',
    icon: 'calculator-outline',
    summary: 'Menya imibare y’ibanze kandi witoze kubara neza.',
    steps: [
      { title: 'Menya imibare', text: 'Tangira umenye imibare kuva kuri 1 kugeza kuri 10.', icon: 'calculator-outline' },
      { title: 'Gereranya', text: 'Reba umubare munini n’umuto ukoresheje ingero zoroshye.', icon: 'calculator-outline' },
      { title: 'Imyitozo', text: 'Kora imyitozo mike kugira ngo ushimangire ibyo wize.', icon: 'calculator-outline' },
    ],
  },
  {
    id: 'science-plants-1',
    title: 'Ibimera n’ubuzima',
    subject: 'Siyansi',
    duration: '18 min',
    icon: 'leaf-outline',
    summary: 'Sobanukirwa ibyo ibimera bikenera kugira ngo bikure neza.',
    steps: [
      { title: 'Ibice by’igiterwa', text: 'Menya umuzi, uruti, amababi n’indabo.', icon: 'leaf-outline' },
      { title: 'Ibyo ibimera bikenera', text: 'Wige akamaro k’amazi, urumuri n’ubutaka ku bimera.', icon: 'leaf-outline' },
      { title: 'Reba hafi yawe', text: 'Shaka igiterwa hafi yawe maze umenye ibice byacyo.', icon: 'leaf-outline' },
    ],
  },
  {
    id: 'technology-computer-1',
    title: 'Muri mudasobwa ni iki?',
    subject: 'Ikoranabuhanga',
    duration: '15 min',
    icon: 'laptop-outline',
    summary: 'Menya ibice by’ibanze bya mudasobwa n’icyo buri kimwe gikora.',
    steps: [
      { title: 'Monitor', text: 'Monitor yerekana amakuru n’amashusho kuri mudasobwa.', icon: 'laptop-outline' },
      { title: 'Keyboard', text: 'Keyboard ikoreshwa mu kwandika no gutanga amabwiriza.', icon: 'laptop-outline' },
      { title: 'Mouse', text: 'Mouse igufasha guhitamo ibintu no gukoresha porogaramu.', icon: 'laptop-outline' },
    ],
  },
  {
    id: 'languages-reading-1',
    title: 'Gusoma no kumva',
    subject: 'Indimi',
    duration: '20 min',
    icon: 'book-outline',
    summary: 'Witoze gusoma interuro ngufi no kumva igitekerezo nyamukuru.',
    steps: [
      { title: 'Soma buhoro', text: 'Soma interuro ngufi wita ku magambo yose.', icon: 'book-outline' },
      { title: 'Sobanura', text: 'Gerageza kuvuga mu magambo yawe icyo wasomye.', icon: 'book-outline' },
      { title: 'Imyitozo', text: 'Subiza ikibazo gito ku byo wasomye.', icon: 'book-outline' },
    ],
  },
];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}
