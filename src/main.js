import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en', // Default language
  messages: {
    en: {
        header: 'Tooniverse',
        updatedToday: 'Updated today',
        theMostPopular: 'The most popular',
        iDiscover: 'I discover',
        finishedButQuality: 'Finished but still quality',
        forbiddenForUnder18s: 'Forbidden for under 18s',
        forbiddenForUnder15s: 'Forbidden for under 15s',
        listOfWebtoons: 'List of webtoons',

        // Filters

        everyService: 'Every service',
        kakao: 'Kakao',
        naver: 'Naver',
        kakaoPage: 'Kakao Page',

        everyday: 'Everyday',
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
        finished: 'Finished',
        naverDaily: 'Naver Daily+',

        all: 'All',
        noAgeRestrictions: 'No age restrictions',

        new: 'New',
        notNew: 'Not new',
        
        title: 'Title',
        author: 'Author',
        releaseDate: 'Release Date',

        // Card

        artist: 'Artist',
        fans: 'fans',
        update: 'update',
        waitFree: 'wait free',
        free: 'free',

        // Other

        loading: 'Loading...',
        readNow: 'Read now',
    },
    fr: {
        updatedToday: 'Mis à jour aujourd\'hui',
        theMostPopular: 'Les plus populaires',
        iDiscover: 'Je découvre',
        finishedButQuality: 'Terminés mais toujours de qualité',
        forbiddenForUnder18s: 'Interdits aux moins de 18 ans',
        forbiddenForUnder15s: 'Interdits aux moins de 15 ans',
        listOfWebtoons: 'Liste des webtoons',
        everyService: 'Tous les services',

        // Filters
        
        everyService: 'Toutes les plateformes',

        everyday: 'Tous les jours',
        mon: 'Lundi',
        tue: 'Mardi',
        wed: 'Mercredi',
        thu: 'Jeudi',
        fri: 'Vendredi',
        sat: 'Samedi',
        sun: 'Dimanche',
        finished: 'Terminé',

        all: 'Tout',
        noAgeRestrictions: 'Sans restrictiton d\'âge',

        new: 'Nouveau',
        notNew: 'Pas nouveau',
        
        title: 'Titre',
        author: 'Auteur',
        releaseDate: 'Date de sortie',

        // Card

        artist: 'Artiste',
        update: 'mise à jour',
        waitFree: 'attendre gratuitement',
        free: 'gratuit',

        // Other

        loading: 'Chargement...',
        readNow: 'Lire maintenant',
    },
    kr: {
        header: '투니버스',
        updatedToday: '오늘 업데이트됨',
        theMostPopular: '가장 인기 있는',
        iDiscover: '나는 발견한다',
        finishedButQuality: '완료되었지만 품질이 좋음',
        forbiddenForUnder18s: '18 세 미만 금지됨',
        forbiddenForUnder15s: '15 세 미만 금지됨',
        listOfWebtoons: '웹툰 목록',

        // Filters
        
        everyService: '모든 서비스',
        kakao: '카카오',
        naver: '네이버',
        kakaoPage: '카카오페이지',

        everyday: '매일',
        mon: '월요일',
        tue: '화요일',
        wed: '수요일',
        thu: '목요일',
        fri: '금요일',
        sat: '토요일',
        sun: '일요일',
        finished: '완료됨',
        naverDaily: '네이버 데일리+',

        all: '모두',
        noAgeRestrictions: '연령 제한 없음',

        new: '신규',
        notNew: '신규 아님',
        
        title: '제목',
        author: '저자',
        releaseDate: '출시 날짜',

        // Card

        artist: '예술가',
        fans: '팬',
        update: '업데이트',
        waitFree: '무료 기다리기',
        free: '무료',

        // Other

        loading: '로딩 중...',
        readNow: '지금 읽기',
    }
  }
});

// Création de l'application Vue en utilisant App.vue comme composant racine et en ajoutant VueI18n
const app = createApp(App);
app.use(i18n); // Ajout de VueI18n à l'application
app.mount('#app');