(function () {
  "use strict";

  var TOKEN_KEY = "vbmappSignInToken";

  function getConfig() {
    if (!window.DataMTDConfig) {
      throw new Error("DataMTDConfig was not loaded. Ensure config.js is included before common.js.");
    }

    var cfg = Object.assign({}, window.DataMTDConfig);
    cfg.signInToken = sessionStorage.getItem(TOKEN_KEY) || "";
    return cfg;
  }

  function apiBaseUrl() {
    var cfg = getConfig();
    return cfg.environment === "production"
      ? "https://api.vbmappapp.com"
      : "https://api-sandbox.vbmappapp.com";
  }

  function loadIframeSupport() {
    return new Promise(function (resolve, reject) {
      if (window.__dataMTDIframeSupportLoaded) {
        resolve();
        return;
      }

      var script = document.createElement("script");
      script.src = apiBaseUrl() + "/javascripts/iframe_support.js";
      script.onload = function () {
        window.__dataMTDIframeSupportLoaded = true;
        resolve();
      };
      script.onerror = function () {
        reject(new Error("Unable to load DataMTD iframe_support.js from " + script.src));
      };
      document.head.appendChild(script);
    });
  }

  function requireValue(name, value) {
    if (value === undefined || value === null || value === "") {
      throw new Error("Missing required configuration value: " + name);
    }
    return value;
  }

  function setStatus(message, isError) {
    var el = document.getElementById("status");
    if (!el) return;
    el.textContent = message;
    el.className = isError ? "status error" : "status";
  }

  function redirectToTokenPage() {
    var returnTo = encodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
    window.location.replace("./index.html?returnTo=" + returnTo);
  }

  function mountDataMTD(startFn, required) {
    window.addEventListener("load", function () {
      var cfg;
      try {
        cfg = getConfig();
        if (!cfg.signInToken) {
          redirectToTokenPage();
          return;
        }

        (required || []).forEach(function (name) {
          requireValue(name, cfg[name]);
        });
      } catch (err) {
        console.error(err);
        setStatus(err.message, true);
        return;
      }

      setStatus("Loading VB-MAPP iframe...");

      loadIframeSupport()
        .then(function () {
          startFn(cfg, document.getElementById("mount-point"));
          setStatus("VB-MAPP iframe launch requested.");
        })
        .catch(function (err) {
          console.error(err);
          setStatus(err.message, true);
        });
    });
  }

  window.DataMTDHelpers = {
    getConfig: getConfig,
    apiBaseUrl: apiBaseUrl,
    loadIframeSupport: loadIframeSupport,
    mountDataMTD: mountDataMTD,
    tokenKey: TOKEN_KEY
  };
})();
