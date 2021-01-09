chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'clicked_browser_action') {
    let dsr;
    let data = ['Daily', 'Project', 'Completed', 'Tomorrow\'s'];

    dsr = window.getSelection().toString();
    dsr = dsr.split('\n').splice(0, dsr.split('\n').length - 2).join('\n')
    dsr = dsr.replace(/^\s*$(?:\r\n?|\n)/gm, '');
    dsr = dsr.split('"').join('');
    
    data = data.map(item => dsr.split('\n').filter(item1 => item1.includes(item))).flat();
    data = [... new Set(data)];
    data.map(item => {       
      dsr = dsr.split(item).join(`*${item}*`);
    });

    var $temp = $('<textarea>');
    var brRegex = /<br\s*[\/]?>/gi;
    $('body').append($temp);
    $temp.val(dsr.replace(brRegex, '\r\n')).select();
    document.execCommand('copy');
    $temp.remove();

    alert('Copied to clipboard!');

  }
});
