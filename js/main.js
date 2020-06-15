'use strict';

var PHOTOS_NUMBERS = 25;
var COMMENTS_VALUE = 3;
var min_likes = 15;
var max_likes = 200;
var MIN_AVATAR_NUMBER = 6;
var MAX_AVATAR_NUMBER = 6;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпина', 'Вашингтон', 'Артем', 'Ирина', 'Илья', 'Виктория', 'Ираида', 'Василий', 'Виолетта'];

var DESCRIPTION = ['я на природе', 'я дома', 'в магазине', 'в городе', 'в университете'];


// получение случайного числа

var getRandomElement = function (elements) {
  return elements[Math.round(Math.random() * (elements.length))];
};

// получение случайного числа из интервала

var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

// получаем массив с фотографиями

var getPhotosArray = function () {
  var photos = [];

  for (var i = 1; i <= PHOTOS_NUMBERS; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      description: getRandomElement(DESCRIPTION),
      likes: getRandomIntFromInterval(min_likes, max_likes)
    };

    var renderComments = function (commentsNumber) {
      var comments = [];

      for (var i = 0; i < commentsNumber; i++) {
        var comment = {
          avatar: 'img/avatar-0' + getRandomIntFromInterval(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
          message: getRandomElement(MESSAGES),
          name: getRandomElement(NAMES),
        };
        comments.push(comment);
      }
      return comments;
    };

    var photo = {
      picture: picture,
      comment: renderComments(getRandomIntFromInterval(0, 3))
    }
    photos.push(photo);
  }
  return photos;
}

// находим элемент куда будем вставлять

var similarPhotoList = document.querySelector('.pictures');

var similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture')

// рендерим фото, описание, комментарии, лайки

var photoElement = function (photo) {
  var element = similarPhotosTemplate.cloneNode(true);

    element.querySelector('.picture__img').src = photo.picture.url;
    element.querySelector('.picture__img').alt = photo.picture.description;
    element.querySelector('.picture__comments').textContent = photo.comment.length;
    element.querySelector('.picture__likes').textContent = photo.picture.likes;

  return element;
};

var photosArr = getPhotosArray();

var render = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_NUMBERS; i++) {
    fragment.appendChild(photoElement(photos[i]));
  }
  similarPhotoList.appendChild(fragment);
};

render(photosArr);
