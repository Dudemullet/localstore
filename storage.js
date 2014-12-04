window.storage = (function(){
  var PUBLIC_KEY = "data";
  var PRIVATE_KEY = "data";
  var publicStore = window.localStorage;
  var privateStore = window.sessionStorage;

  var savePublic = function(item) {
    var data = JSON.stringify(item);
    return publicStore.setItem(PUBLIC_KEY, data);
  }

  var getPublic = function() {
    var info = publicStore[PUBLIC_KEY];
    if(info)
      return JSON.parse(info);
    return false;
  }

  var savePrivate = function(item) {
    var data = JSON.stringify(item);
    return privateStore.setItem(PRIVATE_KEY, data);
  }

  var getPrivate = function() {
    var info = privateStore[PRIVATE_KEY];
    if(info)
      return JSON.parse(info);
    return false;
  }

  return {
    savePublic: savePublic,
    getPublic: getPublic,
    savePrivate: savePrivate,
    getPrivate: getPrivate
  }
})();
