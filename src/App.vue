<template>
  <div>
    <header>
      <h1>{{ $t('header') }}</h1>
      <!-- Sélecteur de langue -->
      <div class="language-selector">
        <select id="lang" v-model="selectedLanguage" @change="changeLanguage">
          <option value="en">🇺🇸</option>
          <option value="fr">🇫🇷</option>
          <option value="kr">🇰🇷</option>
        </select>
      </div>
    </header>

    <body>
      
      <!-- Menu principal -->
      <nav class="main-menu menu-container">
        <ul>
          <li>
            <a href="#updated-today">
              <i class="fa fa-calendar fa-2x"></i>
              <span class="nav-text">{{ $t('updatedToday') }}</span>
            </a>
          </li>
          <li>
            <a href="#the-most-popular">
              <i class="fa fa-bookmark fa-2x"></i>
              <span class="nav-text">{{ $t('theMostPopular') }}</span>
            </a>
          </li>
          <li>
            <a href="#i-discover">
              <i class="fa fa-pencil fa-2x"></i>
              <span class="nav-text">{{ $t('iDiscover') }}</span>
            </a>
          </li>
          <li>
            <a href="#finished-but-quality">
              <i class="fa fa-check fa-2x"></i>
              <span class="nav-text">{{ $t('finishedButQuality') }}</span>
            </a>
          </li>
          <li>
            <a href="#forbidden-18">
              <i class="fa fa-warning fa-2x"></i>
              <span class="nav-text">{{ $t('forbiddenForUnder18s') }}</span>
            </a>
          </li>
          <li>
            <a href="#forbidden-15">
              <i class="fa fa-user fa-2x"></i>
              <span class="nav-text">{{ $t('forbiddenForUnder15s') }}</span>
            </a>
          </li>
          <li>
            <a href="#list-of-webtoons">
              <i class="fa fa-book fa-2x"></i>
              <span class="nav-text">{{ $t('listOfWebtoons') }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Contenu principal -->

      <h1 id="updated-today">{{ $t('updatedToday') }}</h1>
      <div v-if="updatedTodayWebtoons.length > 0">
        <p>{{ $t('updatedTodayContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in updatedTodayWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('updatedTodayContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="the-most-popular">{{ $t('theMostPopular') }}</h1>
      <div v-if="popularWebtoons.length > 0">
        <p>{{ $t('popularContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in popularWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('popularContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="i-discover">{{ $t('iDiscover') }}</h1>
      <div v-if="randomWebtoons.length > 0">
        <p>{{ $t('randomContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in randomWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('randomContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="finished-but-quality">{{ $t('finishedButQuality') }}</h1>
      <div v-if="finishedWebtoons.length > 0">
        <p>{{ $t('finishedContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in finishedWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('finishedContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="forbidden-18">{{ $t('forbiddenForUnder18s') }}</h1>
      <div v-if="forbiddenEighteenWebtoons.length > 0">
        <p>{{ $t('forbiddenEighteenContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in forbiddenEighteenWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('forbiddenEighteenContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="forbidden-15">{{ $t('forbiddenForUnder15s') }}</h1>
      <div v-if="forbiddenFifteenWebtoons.length > 0">
        <p>{{ $t('forbiddenFifteenContent') }}</p>
        <div class="webtoon-list">
          <div class="webtoon-grid">
            <div v-for="(webtoon, index) in forbiddenFifteenWebtoons" :key="index" class="webtoon-item">
              <div class="webtoon-card">
                <!-- Thumbnail du webtoon -->
                <div class="webtoon-thumbnail">
                  <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                  <!-- Image sensitive_content.png -->
                  <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                    <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                  </div>
                </div>
                <!-- Détails du webtoon -->
                <div class="release-date">
                  <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                  <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                  <img v-else src="./assets/calendar.webp" alt="Calendar">
                  <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
                </div>
                <!-- Images interdites en haut à gauche -->
                <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                  <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                  <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
                </div>
                <div class="webtoon-details">
                  <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                  <p class="webtoon-author">
                    <span v-if="webtoon.author.includes(',')">
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                      <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                    </span>
                    <span v-else>
                      <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    </span>
                  </p>
                  <div class="container">
                    <div class="btns">
                      <button class="topics">
                        <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                      </button>
                      <button v-if="webtoon.update" class="topics">
                        <p class="keyword">{{ $t('update') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                        <p class="keyword">{{ $t('waitFree') }}</p>
                      </button>
                      <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                        <p class="keyword">{{ $t('free') }}</p>
                      </button>
                      <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                        <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                        <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                      </button>
                      <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                        <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                      </button>
                    </div>
                  </div>
                  <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="webtoon-card-no-content">
          <img src="./assets/no_content.jpg" alt="No content" class="noContent">
          <div class="webtoon-details">
            <p class="webtoon-author">{{ $t('forbiddenFifteenContentNone') }}</p>
            <a href="#list-of-webtoons" class="read-now-button">{{ $t('readNow') }}</a>
          </div>
        </div>
      </div>

      <h1 id="list-of-webtoons">{{ $t('listOfWebtoons') }}</h1>
      <div class="filters">
        <select v-model="filterByService" @change="applyFilters">
          <option value="">{{ $t('everyService') }}</option>
          <option value="kakao">{{ $t('kakao') }}</option>
          <option value="naver">{{ $t('naver') }}</option>
          <option value="kakaoPage">{{ $t('kakaoPage') }}</option>
        </select>
        <select v-model="filterByUpdateDay" @change="applyFilters">
          <option value="">{{ $t('everyday') }}</option>
          <option value="mon">{{ $t('mon') }}</option>
          <option value="tue">{{ $t('tue') }}</option>
          <option value="wed">{{ $t('wed') }}</option>
          <option value="thu">{{ $t('thu') }}</option>
          <option value="fri">{{ $t('fri') }}</option>
          <option value="sat">{{ $t('sat') }}</option>
          <option value="sun">{{ $t('sun') }}</option>
          <option value="finished">{{ $t('finished') }}</option>
          <option value="naverDaily">{{ $t('naverDaily') }}</option>
        </select>
        <select v-model="filterByAdultContent" @change="applyFilters">
          <option value="">{{ $t('all') }}</option>
          <option value="false">{{ $t('noAgeRestrictions') }}</option>
          <option value="true">{{ $t('forbiddenForUnder18s') }}</option>
          <option value="singularityList.includes('over15')">{{ $t('forbiddenForUnder15s') }}</option>
        </select>
        <select v-model="filterByNew" @change="applyFilters">
          <option value="">{{ $t('all') }}</option>
          <option value="true">{{ $t('new') }}</option>
          <option value="false">{{ $t('notNew') }}</option>
        </select>

        <!-- Nouvelle liste déroulante pour le tri -->
        <select v-model="sortBy" @change="applyFilters">
          <option value="title">{{ $t('title') }}</option>
          <option value="author">{{ $t('author') }}</option>
          <option value="releaseDate">{{ $t('releaseDate') }}</option>
        </select>
      </div>

      <div class="webtoon-list">
        <div class="webtoon-grid" v-if="filteredWebtoons">
          <div v-for="(webtoon, index) in filteredWebtoons" :key="index" class="webtoon-item">
            <div class="webtoon-card">
              <!-- Thumbnail du webtoon -->
              <div class="webtoon-thumbnail">
                <img :src="webtoon.img" :alt="webtoon.title" :class="{ 'blurry-background': webtoon.additional.adult || webtoon.additional.singularityList.includes('over15') }">
                <!-- Image sensitive_content.png -->
                <div class="sensitive-content" v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')">
                  <img src="./assets/sensitive_content.png" alt="Sensitive Content" @click="hideBlurredImage" ref="sharpOverlayImage">
                </div>
              </div>
              <!-- Détails du webtoon -->
              <div class="release-date">
                <img v-if="webtoon.updateDays.includes('naverDaily')" src="./assets/naver_daily_logo.png" alt="{{ $t('naverDaily') }}">
                <img v-else-if="webtoon.updateDays.includes('finished')" src="./assets/check_mark.webp" alt="Check mark">
                <img v-else src="./assets/calendar.webp" alt="Calendar">
                <p v-if="!webtoon.updateDays.includes('finished') && !webtoon.updateDays.includes('naverDaily')" class="webtoon-update-days">{{ webtoon.updateDays.join(', ') }}</p>
              </div>
              <!-- Images interdites en haut à gauche -->
              <div v-if="webtoon.additional.adult || webtoon.additional.singularityList.includes('over15')" class="topics">
                <img v-if="webtoon.additional.adult" src="./assets/forbidden_under_18.png" alt="{{ $t('forbiddenForUnder18s') }}" class="forbidden-image">
                <img v-else-if="webtoon.additional.singularityList.includes('over15')" src="./assets/forbidden_under_15.png" alt="{{ $t('forbiddenForUnder15s') }}" class="forbidden-image">
              </div>
              <div class="webtoon-details">
                <h2 class="webtoon-title">{{ webtoon.title }}</h2>
                <p class="webtoon-author">
                  <span v-if="webtoon.author.includes(',')">
                    <img src="./assets/author_icon.png" alt="{{ $t('author') }}"> {{ splitAuthors(webtoon.author)[0] }}
                    <img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[1] }}
                  </span>
                  <span v-else>
                    <img src="./assets/author_icon.png" alt="{{ $t('author') }}"><img src="./assets/artist_icon.png" alt="{{ $t('artist') }}"> {{ splitAuthors(webtoon.author)[0] }}
                  </span>
                </p>
                <div class="container">
                  <div class="btns">
                    <button class="topics">
                      <p class="keyword">{{ webtoon.fanCount }} {{ $t('fans') }}</p>
                    </button>
                    <button v-if="webtoon.update" class="topics">
                      <p class="keyword">{{ $t('update') }}</p>
                    </button>
                    <button v-if="webtoon.additional.singularityList.includes('waitFree')" class="topics">
                      <p class="keyword">{{ $t('waitFree') }}</p>
                    </button>
                    <button v-if="webtoon.additional.singularityList.includes('Free')" class="topics">
                      <p class="keyword">{{ $t('free') }}</p>
                    </button>
                    <button v-if="webtoon.service === 'kakao'" class="topics kakao-button">
                      <img src="./assets/kakao_logo.png" alt="{{ $t('kakao') }}" class="service-image">
                    </button>
                    <button v-else-if="webtoon.service === 'naver'" class="topics naver-button">
                      <img src="./assets/naver_logo.png" alt="{{ $t('naver') }}" class="service-image">
                    </button>
                    <button v-else-if="webtoon.service === 'kakaoPage'" class="topics kakaoPage-button">
                      <img src="./assets/kakao_page_logo.png" alt="{{ $t('kakaoPage') }}" class="service-image">
                    </button>
                  </div>
                </div>
                <a :href="webtoon.url" target="_blank" rel="noopener noreferrer" class="read-now-button">{{ $t('readNow') }}</a>
              </div>
            </div>
          </div>
        </div>
        <p v-else>{{ $t('loading') }}</p>
      </div>

    </body>

    <footer>
      <h2>Footer</h2>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webtoonsFromAPI: [],
      currentPage: 0,
      totalPages: 1,
      sortBy: "title",
      filterByService: "",
      filterByUpdateDay: "",
      filterByAdultContent: "",
      filterByNew: "",
      selectedLanguage: 'en',
    };
  },
  computed: {
    filteredWebtoons() {
      let filtered = this.webtoonsFromAPI;
      if (this.filterByService) {
        filtered = filtered.filter(webtoon => webtoon.service === this.filterByService);
      }
      if (this.filterByUpdateDay) {
        filtered = filtered.filter(webtoon => {
          if (this.filterByUpdateDay === "done") {
            return webtoon.updateDays === "";
          } else {
            return webtoon.updateDays.includes(this.filterByUpdateDay);
          }
        });
      }
      if (this.filterByAdultContent !== "") {
        if (this.filterByAdultContent === "true") {
          filtered = filtered.filter(webtoon => webtoon.additional.adult);
        } else if (this.filterByAdultContent === "singularityList.includes('over15')") {
          filtered = filtered.filter(webtoon => webtoon.additional.singularityList.includes('over15'));
        } else if (this.filterByAdultContent === "false") {
        }
      }
      if (this.filterByNew !== "") {
        filtered = filtered.filter(webtoon => webtoon.additional.new === (this.filterByNew === "true"));
      }

      if (this.sortBy === "title") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === "author") {
        filtered.sort((a, b) => a.author.localeCompare(b.author));
      } else if (this.sortBy === "releaseDate") {
        filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
      }

      return filtered;
    },
    updatedTodayWebtoons() {
      let filtered = this.webtoonsFromAPI;
      
      const currentDayIndex = new Date().getDay();
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const currentDay = daysOfWeek[currentDayIndex];
      
      filtered = filtered.filter(webtoon => webtoon.updateDays == currentDay);

      return filtered.slice(0, 5);
    },
    popularWebtoons() {
      let filtered = this.webtoonsFromAPI;
      
      filtered.sort((a, b) => b.fanCount - a.fanCount);
      
      return filtered.slice(0, 5);
    },
    randomWebtoons() {
      let filtered = this.webtoonsFromAPI.filter(webtoon => {
        return webtoon.additional.adult !== 'true' && !webtoon.additional.singularityList.includes('over15');
      });

      const randomWebtoons = [];
      const numWebtoons = filtered.length;
      const numRandom = Math.min(5, numWebtoons);

      const randomIndexes = [];
      while (randomIndexes.length < numRandom) {
        const randomIndex = Math.floor(Math.random() * numWebtoons);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      randomIndexes.forEach(index => {
        randomWebtoons.push(filtered[index]);
      });

      return randomWebtoons;
    },
    finishedWebtoons() {
      let filtered = this.webtoonsFromAPI;
      
      filtered = filtered.filter(webtoon => webtoon.updateDays == 'finished');

      return filtered.slice(0, 5);
    },
    forbiddenEighteenWebtoons() {
      let filtered = this.webtoonsFromAPI;
      
      filtered = filtered.filter(webtoon => webtoon.additional.adult == '1');

      return filtered.slice(0, 5);
    },
    forbiddenFifteenWebtoons() {
      let filtered = this.webtoonsFromAPI;
      
      filtered = filtered.filter(webtoon => webtoon.additional.singularityList.includes('over15') == '1');

      return filtered.slice(0, 5);
    },
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
    async fetchWebtoons() {
      try {
        while (this.currentPage < this.totalPages) {
          const response = await fetch(`https://korea-webtoon-api.herokuapp.com?page=${this.currentPage}`);
          if (!response.ok) {
            throw new Error(`Error retrieving webtoons from the API: ${response.statusText}`);
          }
          const data = await response.json();
          this.webtoonsFromAPI.push(...data.webtoons);
          this.totalPages = Math.ceil(data.totalWebtoonCount / 10);
          this.currentPage++;
        }
      } catch (error) {
        console.error('Error when retrieving webtoons:', error.message);
      }
    },
    applyFilters() {
      
    },
    splitAuthors(authorString) {
      return authorString.split(',').map(part => part.trim());
    },
    hideBlurredImage(event) {
      console.log("hideBlurredImage method is called");
      event.target.style.display = 'none';
      event.target.parentElement.parentElement.querySelector('.blurry-background').classList.remove('blurry-background');
    },
    saveDataLocally() {
      localStorage.setItem('webtoons', JSON.stringify(this.webtoonsFromAPI));
    },
    loadDataFromLocalStorage() {
      const storedWebtoons = localStorage.getItem('webtoons');
      if (storedWebtoons) {
        this.webtoonsFromAPI = JSON.parse(storedWebtoons);
      } else {
        this.fetchWebtoons();
      }
    }
  },
  async mounted() {
    this.loadDataFromLocalStorage();
  },
  watch: {
    webtoonsFromAPI: {
      handler() {
        this.saveDataLocally();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);
@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);

html {
  font-size: 16px;
}

a:hover,a:focus {
  text-decoration:none;
}

.fa-2x {
  font-size: 2em;
}


.fa {
  position: relative;
  display: table-cell;
  width: 60px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size:20px;
}

.main-menu:hover,nav.main-menu.expanded {
  width:250px;
  overflow:visible;
}

.menu-container {
  display: flex;
  align-items: center;
  height: 100vh;
}

.main-menu {
  background:#212121;
  border-right:1px solid #e5e5e5;
  position:absolute;
  top:0;
  bottom:0;
  height:100%;
  left:0;
  width:60px;
  overflow:hidden;
  -webkit-transition:width .05s linear;
  transition:width .05s linear;
  -webkit-transform:translateZ(0) scale(1,1);
  z-index:1000;
  position: fixed;
}

.main-menu>ul {
  margin:7px 0;
}

.main-menu li {
  position:relative;
  display:block;
  width:250px;
}

.main-menu li>a {
  position:relative;
  display:table;
  border-collapse:collapse;
  border-spacing:0;
  color:#999;
  font-family: 'Titillium Web', sans-serif;
  font-size: 14px;
  text-decoration:none;
  -webkit-transform:translateZ(0) scale(1,1);
  -webkit-transition:all .1s linear;
  transition:all .1s linear;
}

.main-menu .nav-icon {
  position:relative;
  display:table-cell;
  width:60px;
  height:36px;
  text-align:center;
  vertical-align:middle;
  font-size:18px;
}

.main-menu .nav-text {
  position:relative;
  display:table-cell;
  vertical-align:middle;
  width:190px;
  font-family: 'Titillium Web', sans-serif;
}

a:hover,a:focus {
  text-decoration:none;
}

nav {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  -o-user-select:none;
  user-select:none;
}

nav ul,nav li {
  outline:0;
  margin:0;
  padding:0;
}
.main-menu li:hover>a,
nav.main-menu li.active>a {
  color:#fff;
  background-color:#000000;
}

select,
option {
  font-size: 1em;
  padding: 0.5em 0.75em;
  border-radius: 0.3125em;
  border: 0.0625em solid #ccc;
  background-color: #fff;
  cursor: pointer;
  margin-right: 0.625em;
}

header,
footer,
body {
  font-family: 'Titillium Web', sans-serif;
}

header,
footer {
  background-color: #f0f0f0;
  padding: 1.25em;
  text-align: center;
}

body {
  padding-left: 3.75em;
}

.webtoon-list {
  max-width: 75em;
  margin: 0 auto;
  padding: 1.25em;
}

.webtoon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10.625em, 1fr));
  grid-gap: 1.25em;
}

.webtoon-item {
  position: relative;
}

.webtoon-card,.webtoon-card-no-content {
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1.25em;
  overflow: hidden;
  box-shadow: 0 0 1.25em rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  max-height: 40em;
  max-width: 12em;
}

.webtoon-card-no-content {
  width:12em;
}

.webtoon-card:hover,.webtoon-card-no-content:hover {
  transform: translateY(-0.3125em);
}

.hovered .webtoon-card,.hovered .webtoon-card-no-content {
  transform: translateY(-0.3125em);
}

.webtoon-thumbnail {
  max-width: 12em;
  max-height: 20em;
  border-radius: 0.625em 0.625em 0em 0em;
  position: relative;
  overflow: hidden;
}

.webtoon-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 0.625em 0.625em 0em 0em;
  transition: filter 0.3s ease;
}

.webtoon-update-days {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-65%, -80%);
  font-weight: bold;
  font-size: 0.5em;
}

.forbidden-image {
  position: absolute;
  top: 0.3125em;
  left: 0.3125em;
  width: 1.875em;
  height: auto;
}

.sensitive-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0.8;
}

.blurry-background {
  filter: blur(2.5em);
}

.webtoon-details {
  position: relative;
}

.webtoon-details p {
  margin: 0.3125em 0;
}

.webtoon-title {
  margin: 0em 0.3125em 0em 0.3125em;
  font-size: 1.125em;
  text-align: center;
}

.webtoon-author {
  margin-top: 0em;
  text-align: center;
  font-size: 0.8em;
}

.webtoon-author img {
  width: 1.1em;
  height: auto;
}

.release-date {
  position: absolute;
  top: 0.3125em;
  right: 0.3125em;
  display: flex;
  align-items: center;
}

.release-date img {
  width: 1.875em;
  height: auto;
  margin-right: 0.25em;
  margin-top: 0.375em;
}

.fans-count {
  text-align: center;
  color: #888;
}

.update-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}

.update-info .fans-count,
.update-info .update-indicator {
  color: #888;
}

.container {
  display: grid;
  place-items: center;
  margin: 10% 25%;
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: auto;
}

.keyword {
  font-size: 0.7em;
}

button.topics {
  text-align: center;
  text-transform: lowercase;
  vertical-align: middle;
  padding: 0.0625em 0.3125em;
  margin: 0.1875em;
  color: #636363;
  background-color: #fff;
  border: 0.125em solid #636363;
  box-shadow: rgba(77, 77, 77, 0.94) 0.125em -0.125em 0px 0px;
  border-radius: 0.625em 0.625em 0em 0.625em;
  transition: box-shadow 0.3s;
  cursor: default;
}

button.topics:hover {
  box-shadow: rgba(77, 77, 77, 0.94) 0em 0em 0em 0em;
}

button.topics:active {
  transform: translateY(0.1875em);
}

button.kakao-button {
  background-color: #000;
}

button.naver-button {
  background-color: #02d560;
}

button.kakaoPage-button {
  background-color: #ffd200;
}

.service-image {
  padding-top: 0.2em;
  width: 1em;
  height: auto;
}

.read-now-button {
  display: block;
  margin-top: auto;
  padding: 0.625em 1.25em;
  background-color: #212121;
  color: #999;
  border: none;
  border-radius: 0.3125em;
  cursor: pointer;
  font-size: 0.7em;
  text-decoration: none;
  text-align: center;
  border-radius: 0em 0em 0.625em 0.625em;
}

.read-now-button:hover {
  background-color: #000;
  color: #fff;
  text-decoration: none;
}

.noContent {
  width: 100%;
  border-radius: 0.625em;
  position: relative;
  overflow: hidden;
  border-radius: 0.625em 0.625em 0em 0em;
  transition: filter 0.3s ease;
}

</style>
