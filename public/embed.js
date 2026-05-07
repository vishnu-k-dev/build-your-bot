(function () {
  var ORIGIN = document.currentScript
    ? new URL(document.currentScript.src).origin
    : window.location.origin;

  var btn = document.createElement('button');
  btn.innerHTML = '💬';
  btn.setAttribute('aria-label', 'Open chat');
  btn.style.cssText =
    'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;' +
    'background:#2563EB;color:white;font-size:24px;border:none;cursor:pointer;' +
    'box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;transition:transform 0.2s;';
  btn.onmouseenter = function () { btn.style.transform = 'scale(1.1)'; };
  btn.onmouseleave = function () { btn.style.transform = 'scale(1)'; };

  var frame = document.createElement('iframe');
  frame.src = ORIGIN + '/embed';
  frame.style.cssText =
    'position:fixed;bottom:92px;right:24px;width:380px;height:520px;border:none;' +
    'border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:9998;display:none;' +
    'transition:opacity 0.2s;';

  var open = false;
  btn.onclick = function () {
    open = !open;
    frame.style.display = open ? 'block' : 'none';
    btn.innerHTML = open ? '✕' : '💬';
  };

  document.body.appendChild(frame);
  document.body.appendChild(btn);
})();
