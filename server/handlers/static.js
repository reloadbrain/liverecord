/**
 * Created by zoonman on 2/4/17.
 */

const xtend = require('xtend');
const fs = require('fs');
const errorHandler = require('./errors');
const purify = require('./purify');

/**
 * Easy escape
 * @param  {string} html
 * @return {string}
 */


function ee(html) {
  html = purify(html, true);
  return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/"/g, '&quot;');
}

function modifyBody(inputString, options) {

  options = xtend({
    title: '',
    frontLiveRecordConfig: {version: '1'},
    description: '',
    keywords: []
  }, options);

  if (options.frontLiveRecordConfig.version) {
    inputString = inputString.replace(
        /\/main\.1\./g,
        '/main.' + options.frontLiveRecordConfig.version + '.'
        );
    inputString = inputString.replace('liveRecordConfig = {}',
        'liveRecordConfig = ' + JSON.stringify(options.frontLiveRecordConfig)
        );
  }

  if (options.title) {
    inputString = inputString.replace(
        '<title></title>',
        '<title>' + ee(options.title) + '</title>'
        );
  }

  if (options.description) {
    inputString = inputString.replace(
        '<meta name="description" content="">',
        '<meta name="description" content="' + ee(options.description.substr(
            0,
            250
        ).replace(/\n/g, ' ')) + '">'
        );
  }

  if (options.keywords) {
    inputString = inputString.replace(
        '<meta name="keywords" content="">',
        '<meta name="keywords" content="' + ee(options.keywords.join(', ')) +
        '">'
        );
  }

  return inputString;
}

function sendJsonResponse(res, data, code) {
  sendResponse(res, JSON.stringify(data), code, 'application/json');
}

function sendResponse(res, html, code, contentType) {
  'use strict';
  code = code || 200;
  html = html || '';
  contentType = contentType || 'text/html';
  res.writeHead(code, {
        'Content-Type': contentType + '; charset=UTF-8',
        'x-frame-options': 'SAMEORIGIN',
        'x-xss-protection': '1; mode=block',
        'x-powered-by': 'LiveRecord'
      }
  );
  res.write(html);
  res.end();
}

function expressRouter(req, res, next) {
  let modifyBodyFunction = function(inputStr) {
    return modifyBody(inputStr, {
      title: '',
      description: '',
      keywords: [''],
      frontLiveRecordConfig: req.app.get('frontLiveRecordConfig')
    });
  };
  serveIndex(res, modifyBodyFunction);
}

function serveIndex(res, modifyBodyFunction, code) {
  fs.readFile(__dirname + '/../public/index.html',
      'utf8',
      function(err, indexData) {
        if (err) {
          sendResponse(res, 'Internal server error', 502);
          return errorHandler(err);
        }
        if (modifyBodyFunction) {
          indexData = modifyBodyFunction(indexData);
        }
        sendResponse(res, indexData, code);
      }
  );
}

module.exports.modifyBody = modifyBody;
module.exports.sendResponse = sendResponse;
module.exports.expressRouter = expressRouter;
module.exports.serveIndex = serveIndex;
module.exports.easyEscape = ee;
module.exports.sendJsonResponse = sendJsonResponse;
