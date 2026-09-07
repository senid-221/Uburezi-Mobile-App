import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type LessonStep = { title: string; text: string; icon: IconName };
export type Lesson = { id: string; title: string; subject: string; duration: string; icon: IconName; summary: string; steps: LessonStep[] };

export const lessons: Lesson[] = [
  { id: 'math-counting-1', title: 'Kwitoza kubara', subject: 'Imibare', duration: '15 min', icon: 'calculator-outline', summary: 'Wiga kubara no gukoresha imibare mu buryo bworoshye.', steps: [
    { title: 'Tangira ku mibare', text: 'Imibare itangira kuri 1, 2, 3, 4, 5. Gerageza kuyivuga uko ikurikirana.', icon: 'numbers-outline' },
    { title: 'Ongeraho', text: 'Iyo dufite 2 hanyuma tukongeraho 3, tubona 5. Kwongeraho bivuze guhuza umubare n’undi.', icon: 'add-circle-outline' },
    { title: 'Gerageza wenyine', text: 'Tekereza ku mibare y’ibintu ubona hafi yawe, hanyuma uyibarire hamwe.', icon: 'bulb-outline' },
  ] },
  { id: 'science-plants-1', title: 'Ibimera n’ubuzima', subject: 'Siyansi', duration: '18 min', icon: 'leaf-outline', summary: 'Menya icyo ibimera bikenera kugira ngo bikure neza.', steps: [
    { title: 'Ibimera ni ibinyabuzima', text: 'Ibimera bikura kandi bigahinduka. Bimwe mu byo bikenera ni amazi, urumuri n’ubutaka bukwiye.', icon: 'leaf-outline' },
    { title: 'Amazi', text: 'Amazi afasha ibimera gukomeza kubaho no gukura. Ni yo mpamvu kuvomera bikwiye gukorwa mu buryo bukwiye.', icon: 'water-outline' },
    { title: 'Urumuri', text: 'Ibimera byinshi bikenera urumuri kugira ngo bikore ibiryo byabyo.', icon: 'sunny-outline' },
  ] },
  { id: 'ict-computer-1', title: 'Muri internet ni iki?', subject: 'Ikoranabuhanga', duration: '15 min', icon: 'laptop-outline', summary: 'Menya igitekerezo cy’ibanze cy’uko internet idufasha guhanahana amakuru.', steps: [
    { title: 'Internet ni urusobe', text: 'Internet ni urusobe runini rw’ibikoresho bihujwe kugira ngo bishobore guhanahana amakuru.', icon: 'globe-outline' },
    { title: 'Browser', text: 'Browser ni porogaramu ikoreshwa mu gusura imbuga no kureba amakuru yo kuri internet.', icon: 'search-outline' },
    { title: 'Umutekano', text: 'Ntugasangize abandi ijambo ry’ibanga cyangwa amakuru y’ibanga. Banza ubaze umubyeyi cyangwa umwarimu igihe ufite gushidikanya.', icon: 'shield-checkmark-outline' },
  ] },
  { id: 'languages-reading-1', title: 'Gusoma neza', subject: 'Indimi', duration: '20 min', icon: 'language-outline', summary: 'Witoza gusoma interuro ngufi no kumva icyo zivuga.', steps: [
    { title: 'Tegura amagambo', text: 'Soma ijambo rimwe rimwe, wumve uko inyuguti n’amajwi bihuzwa.', icon: 'text-outline' },
    { title: 'Soma interuro', text: 'Soma buhoro interuro, ukurikize utumenyetso tw’inyandiko n’icyo interuro ishaka kuvuga.', icon: 'book-outline' },
    { title: 'Sobanura', text: 'Nyuma yo gusoma, gerageza kuvuga mu magambo yawe icyo wasomye.', icon: 'chatbubble-ellipses-outline' },
  ] },
];

export function getLesson(id: string): Lesson { return lessons.find((lesson) => lesson.id === id) ?? lessons[0]; }
