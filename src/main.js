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

        updatedTodayContent: 'Don\'t waste a minute - check out the latest episodes! The webtoons updated today are...',
        updatedTodayContentNone: 'Oh... It looks like no webtoon has been updated today. But don\'t worry, you can read other webtoons!',
        popularContent: 'We\'re basing ourselves on your feedback, and according to our statistics, you seem to really like these webtoons!',
        popularContentNone: 'Unfortunately, none of our webtoons have satisfied you yet...',
        randomContent: 'Want to discover new nuggets? This is the place!',
        randomContentNone: 'No nuggets yet...',
        finishedContent: 'They may be finished, but we still enjoy reading and re-reading them!',
        finishedContentNone: 'All the webtoons are still being edited, so please be patient.',
        forbiddenEighteenContent: 'Content forbidden to minors, this way! Area strictly reserved for persons respecting the age limit indicated.',
        forbiddenEighteenContentNone: 'No webtoon -18 yet!',
        forbiddenFifteenContent: 'For those over 15, you\'ll find more violent and explicit webtoons here.',
        forbiddenFifteenContentNone: 'No webtoon -15 yet!',

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

        updatedTodayContent: 'Ne perds pas une minute et découvre les derniers épisodes sortis ! Les webtoons qui ont été mis à jour aujourd\'hui sont...',
        updatedTodayContentNone: 'Oh... Il semblerait qu\'aucun webtoon n\'ait été mis à jour aujourd\'hui. Mais pas d\'inquiètude, tu peux lire d\'autres webtoons !',
        popularContent: 'Nous nous basons sur vos retours, et d\'après nos statistiques, vous avez l\'air de beaucoup aimer ces webtoons-là !',
        popularContentNone: 'Malheureusement, aucun de nos webtoons n\'a encore su vous satisfaire...',
        randomContent: 'Tu veux découvrir de nouvelles pépites ? C\'est par ici que ça se passe !',
        randomContentNone: 'Aucune pépite pour le moment...',
        finishedContent: 'Ils sont peut-être terminés, mais on prend toujours autant de plaisir à les lire et les relire !',
        finishedContentNone: 'Tous les webtoons sont encore en cours d\'édition, encore un peu de patience.',
        forbiddenEighteenContent: 'Le contenu interdit aux mineurs, c\'est par ici ! Zone strictement réservée aux personnes respectant la limite d\'âge indiquée.',
        forbiddenEighteenContentNone: 'Pas de webtoon -18 pour l\'instant !',
        forbiddenFifteenContent: 'Pour les personnes qui ont plus de 15 ans, retrouvez ici des webtoons plus violents et plus explicites.',
        forbiddenFifteenContentNone: 'Pas de webtoon -15 pour l\'instant !',

        // Filters

        kakao: 'Kakao',
        naver: 'Naver',
        kakaoPage: 'Kakao Page',
        
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
        fans: 'fans',
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

        updatedTodayContent: '시간을 낭비하지 마시고 최신 에피소드를 확인해 보세요! 오늘 업데이트된 웹툰은...',
        updatedTodayContentNone: '아... 오늘은 업데이트된 웹툰이 없는 것 같네요. 하지만 걱정하지 마세요, 다른 웹툰을 읽을 수 있으니까요!',
        popularContent: '저희는 여러분의 피드백에 기반하고 있으며, 통계에 따르면 여러분은 이 웹툰을 정말 좋아하시는 것 같습니다!',
        popularContentNone: 'c안타깝게도 아직 만족스러운 웹툰은 없습니다...',
        randomContent: '새로운 너겟을 발견하고 싶으신가요? 이곳이 바로 그 곳입니다!',
        randomContentNone: '아직 너겟이 없습니다...',
        finishedContent: '다 읽었을지 모르지만 여전히 읽고 또 읽는 재미가 있습니다!',
        finishedContentNone: '모든 웹툰은 아직 편집 중이므로 조금만 기다려주세요.',
        forbiddenEighteenContent: '미성년자에게 금지된 콘텐츠, 여기 있습니다! 이 영역은 표시된 연령 제한에 해당하는 사람만 이용할 수 있습니다.',
        forbiddenEighteenContentNone: '아직 -18 웹툰이 없습니다!',
        forbiddenFifteenContent: '15세 이상은 여기에서 더 폭력적이고 노골적인 웹툰을 볼 수 있습니다.',
        forbiddenFifteenContentNone: '아직 -15 웹툰이 없습니다!',

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