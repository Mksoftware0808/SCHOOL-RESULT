/**
 * GitHub Pages → GAS API helper
 * Content-Type: text/plain avoids CORS preflight issues with Apps Script
 */
function apiCall(action, data) {
  data = data || {};
  data.action = action;

  if (!GAS_API_URL || GAS_API_URL.indexOf('YOUR_DEPLOYMENT_ID') !== -1) {
    return Promise.reject(new Error(
      'config.js માં GAS_API_URL સેટ કરો (Deploy પછીની Web App URL)'
    ));
  }

  return fetch(GAS_API_URL, {
    method: 'POST',
    // text/plain = simple request → no OPTIONS preflight
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
    redirect: 'follow'
  })
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error('API જવાબ અમાન્ય છે. URL અને Deploy ચેક કરો.\n' + text.substring(0, 200));
      }
    });
}

function apiRegister(payload) {
  return apiCall('register', payload);
}

function apiLogin(mobile, password) {
  return apiCall('login', { mobile: mobile, password: password });
}

function apiInfo(mobile) {
  return apiCall('info', { mobile: mobile });
}

function apiPing() {
  return apiCall('ping', {});
}

/* session helpers */
function saveSession(data) {
  try {
    sessionStorage.setItem('sr_mobile', data.mobile || '');
    sessionStorage.setItem('sr_school', data.schoolName || '');
    sessionStorage.setItem('sr_sheet', data.spreadsheetId || '');
  } catch (e) {}
}

function clearSession() {
  try {
    sessionStorage.removeItem('sr_mobile');
    sessionStorage.removeItem('sr_school');
    sessionStorage.removeItem('sr_sheet');
  } catch (e) {}
}

function getSessionMobile() {
  try {
    return sessionStorage.getItem('sr_mobile') || '';
  } catch (e) {
    return '';
  }
}
