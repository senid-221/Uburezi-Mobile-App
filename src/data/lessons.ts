import type { Ionicons } from '@expo/vector-icons';

export type LessonStep = { title: string; text: string; icon: React.ComponentProps<typeof Ionicons>['name']; };
export type Lesson = { id: string; title: string; subject: string; duration: string; icon: React.ComponentProps<typeof Ionicons>['name']; summary: string; steps: LessonStep[]; };

export const lessons: Lesson[] = [
 { id:'math-counting-1', title:'Kwitoza kubara', subject:'Imibare', duration:'15 min', icon:'calculator-outline', summary:'Wiga kubara no gukoresha imibare mu buryo bworoshye.', steps:[
  {title:'Tangira ku mibare',text:'Imibare itangira kuri 1, 2, 3, 4, 5. Gerageza kuyivuga uko ikurikirana.',icon:'numbers-outline'},
  {title:'Ongeraho',text:'Iyo dufite 2 hanyuma tukongeraho 3, tubona 5. Kwongeraho bivuze guhuza umubare n’undi.',icon:'add-circle-outline'},
  {title:'Gerageza wenyine',text:'Tekereza ku mibare y’ibintu ubona hafi yawe, hanyuma uyibarire hamwe.',icon:'bulb-outline'} ]},
 { id:'math-addition-2', title:'Kwiga guteranya', subject:'Imibare', duration:'18 min', icon:'calculator-outline', summary:'Menya uko guteranya imibare bifasha gukemura ibibazo bya buri munsi.', steps:[
  {title:'Tera hamwe',text:'Guteranya ni ugushyira imibare hamwe. Urugero: 4 + 2 bingana na 6.',icon:'add-circle-outline'},
  {title:'Koresha ibintu',text:'Koresha utubuye, amakaramu cyangwa ibindi bintu bifatika kugira ngo ubone igisubizo.',icon:'calculator-outline'},
  {title:'Sobanura igisubizo',text:'Nyuma yo kubara, vuga uko wageze ku gisubizo kugira ngo wumve neza uburyo wakoresheje.',icon:'bulb-outline'} ]},
 { id:'science-plants-1', title:'Ibimera n’ubuzima', subject:'Siyansi', duration:'18 min', icon:'leaf-outline', summary:'Menya icyo ibimera bikenera kugira ngo bikure neza.', steps:[
  {title:'Ibimera ni ibinyabuzima',text:'Ibimera bikura kandi bigahinduka. Bimwe mu byo bikenera ni amazi, urumuri n’ubutaka bukwiye.',icon:'leaf-outline'},
  {title:'Amazi',text:'Amazi afasha ibimera gukomeza kubaho no gukura. Kuvomera bikwiye gukorwa mu buryo bukwiye.',icon:'water-outline'},
  {title:'Urumuri',text:'Ibimera byinshi bikenera urumuri kugira ngo bikore ibiryo byabyo.',icon:'sunny-outline'} ]},
 { id:'science-water-2', title:'Amazi n’imiterere yayo', subject:'Siyansi', duration:'15 min', icon:'water-outline', summary:'Menya amazi n’uko ashobora guhindura imiterere.', steps:[
  {title:'Amazi y’amazi',text:'Amazi ni ikintu dusanga mu biyaga, imigezi, amariba n’ahandi. Ni ingenzi ku buzima.',icon:'water-outline'},
  {title:'Gushyushya',text:'Iyo amazi ashyushye cyane ashobora guhinduka umwuka. Ibi ni urugero rw’imihindagurikire y’imiterere.',icon:'sunny-outline'},
  {title:'Gukonjesha',text:'Iyo amazi akonje cyane ashobora gukomera akaba urubura.',icon:'sparkles-outline'} ]},
 { id:'ict-computer-1', title:'Muri internet ni iki?', subject:'Ikoranabuhanga', duration:'15 min', icon:'laptop-outline', summary:'Menya igitekerezo cy’ibanze cy’uko internet idufasha guhanahana amakuru.', steps:[
  {title:'Internet ni urusobe',text:'Internet ni urusobe runini rw’ibikoresho bihujwe kugira ngo bishobore guhanahana amakuru.',icon:'globe-outline'},
  {title:'Browser',text:'Browser ni porogaramu ikoreshwa mu gusura imbuga no kureba amakuru yo kuri internet.',icon:'search-outline'},
  {title:'Umutekano',text:'Ntugasangize abandi ijambo ry’ibanga cyangwa amakuru y’ibanga. Banza ubaze umubyeyi cyangwa umwarimu igihe ufite gushidikanya.',icon:'shield-checkmark-outline'} ]},
 { id:'ict-digital-safety-2', title:'Umutekano kuri internet', subject:'Ikoranabuhanga', duration:'17 min', icon:'shield-checkmark-outline', summary:'Wiga imyitwarire myiza n’umutekano igihe ukoresha internet.', steps:[
  {title:'Ijambo ry’ibanga',text:'Koresha ijambo ry’ibanga rikomeye kandi nturihere abandi.',icon:'lock-closed-outline'},
  {title:'Amakuru bwite',text:'Irinde gutanga nimero za telefoni, aho utuye cyangwa andi makuru bwite ku bantu utazi.',icon:'shield-checkmark-outline'},
  {title:'Saba ubufasha',text:'Niba hari ikintu kuri internet kiguteza impungenge, vugana n’umubyeyi cyangwa umwarimu wizewe.',icon:'chatbubble-ellipses-outline'} ]},
 { id:'languages-reading-1', title:'Gusoma neza', subject:'Indimi', duration:'20 min', icon:'language-outline', summary:'Witoza gusoma interuro ngufi no kumva icyo zivuga.', steps:[
  {title:'Tegura amagambo',text:'Soma ijambo rimwe rimwe, wumve uko inyuguti n’amajwi bihuzwa.',icon:'text-outline'},
  {title:'Soma interuro',text:'Soma buhoro interuro, ukurikize utumenyetso tw’inyandiko n’icyo interuro ishaka kuvuga.',icon:'book-outline'},
  {title:'Sobanura',text:'Nyuma yo gusoma, gerageza kuvuga mu magambo yawe icyo wasomye.',icon:'chatbubble-ellipses-outline'} ]},
 { id:'languages-vocabulary-2', title:'Amagambo mashya', subject:'Indimi', duration:'16 min', icon:'language-outline', summary:'Wagura amagambo uzi kandi witoze kuyakoresha mu nteruro.', steps:[
  {title:'Menya ijambo',text:'Hitamo ijambo rishya, umenye uko ryandikwa n’icyo risobanura.',icon:'book-outline'},
  {title:'Rikoreshe',text:'Kora interuro ngufi ukoresheje iryo jambo kugira ngo uryibuke neza.',icon:'message-outline'},
  {title:'Subiramo',text:'Subiramo amagambo mashya nyuma y’igihe gito kandi uyakoreshe mu biganiro bisanzwe.',icon:'sparkles-outline'} ]},
];
export function getLesson(id:string):Lesson{return lessons.find(lesson=>lesson.id===id)??lessons[0];}
