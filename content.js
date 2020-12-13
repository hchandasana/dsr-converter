chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'clicked_browser_action') {
    let dsr;

    dsr = window.getSelection().toString();
    dsr = dsr.split('\n').splice(0, dsr.split('\n').length - 2).join('\n')
    dsr = dsr.replace(/^\s*$(?:\r\n?|\n)/gm, '');
    dsr = dsr.split('"').join('');

    var $temp = $('<textarea>');
    var brRegex = /<br\s*[\/]?>/gi;
    $('body').append($temp);
    $temp.val(dsr.replace(brRegex, '\r\n')).select();
    document.execCommand('copy');
    $temp.remove();

    alert('Copied to clipboard!');

  }
});