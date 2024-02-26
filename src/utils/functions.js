import { MILLISECONDS_PER_DAY } from "./constants";


/* Custom Cookies */

function clearCustomCookie(cookieName) {

  localStorage.setItem(cookieName, "");
}

function getCustomCookieValue(cookieName) {

  let currentCookieLocal = localStorage.getItem(cookieName);

  if (currentCookieLocal) {

    const currentCookie = JSON.parse(currentCookieLocal);
    let currentTime = new Date().getTime() / MILLISECONDS_PER_DAY;

    if (currentCookie.expiryTime > currentTime) {
      return currentCookie.cookieValue;
    }
    else {
      clearCustomCookie(cookieName);
      return null;
    }
  }

  return null;
}

function getCookieExpiryDate() {

  let currentDate = new Date();

  let futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 30);
  
  let totalDays = Math.floor(futureDate.getTime() / MILLISECONDS_PER_DAY);

  return totalDays;
}

function setCustomCookie(cookieName, cookieValue) {

  const cookieObj = {
    cookieValue,
    expiryTime: getCookieExpiryDate()
  };

  localStorage.setItem(cookieName, JSON.stringify(cookieObj));
}


export {
  clearCustomCookie, 
  getCustomCookieValue, 
  setCustomCookie
};