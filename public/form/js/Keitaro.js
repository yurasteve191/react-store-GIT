function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getSubId() {
  var params = new URLSearchParams(document.location.search.substr(1));
  if (!'{subid}'.match('{')) {
    return '{subid}';
  }
  var clientSubid = '<?php echo isset($client) ? $client->getSubid() : "" ?>';
  if (clientSubid && !clientSubid.match('>')) {
    return clientSubid;
  }
  if (params.get('_subid')) {
    return params.get('_subid')
  }
  if (params.get('subid')) {
    return params.get('subid')
  }
  if (getCookie('subid')) {
    return getCookie('subid');
  }
}

function getToken() {
  var params = new URLSearchParams(document.location.search.substr(1));
  if (!'{token}'.match('{')) {
    return '{token}';
  }
  var clientToken= '<?php echo isset($client) ? $client->getToken() : "" ?>';
  if (clientToken && !clientToken.match('>')) {
    return clientToken;
  }
  if (params.get('_token')) {
    return params.get('_token')
  }
  if (params.get('token')) {
    return params.get('token')
  }
  if (getCookie('token')) {
    return getCookie('token');
  }
  return null;
}

function getPixel() {
  var params = new URLSearchParams(document.location.search.substr(1));
  if (!'{pixel}'.match('{')) {
    return '{pixel}';
  }
  if (params.get('pixel')) {
    return params.get('pixel')
  }
  
  if (getCookie('pixel')) {
    return getCookie('pixel');
  }
  
  return null;
}

if (typeof URLSearchParams === 'function') {
  document.addEventListener("DOMContentLoaded", function(event) {
    var params = new URLSearchParams(document.location.search.substr(1));
    var subid = getSubId();
    var token = getToken();
    var pixel = getPixel();
    
    params.set('_token', token);
    setCookie('pixel', pixel);
    setCookie('token', token);
    setCookie('subid', subid);
        
    // Adds params to the links  
    document.querySelectorAll('a').forEach(function(link) {
        var url = new URL(link.href); 
        params.forEach(function(v, k) { 
            url.searchParams.append(k, v);
        }); 
        link.href = url.toString();
    });

    // Replace placeholders to actual values for input[hidden] fields
    const subIdRegExp = new RegExp('\{subid\}', 'g');
    const tokenRegExp = new RegExp('\{token\}', 'g');
    const pixelRegExp = new RegExp('\{pixel\}', 'g');

    document.querySelectorAll('input[type="hidden"]').forEach(function (input) {
      if (subIdRegExp.test(input.value)) {
        input.value = input.value.replaceAll(subIdRegExp, subid);
      }
      if (tokenRegExp.test(input.value)) {
        input.value = input.value.replaceAll(tokenRegExp, token);
      }
      if (pixelRegExp.test(input.value)) {
        input.value = input.value.replaceAll(pixelRegExp, pixel);
      }
    });
    
    // Adds params as hidden inputs to the forms
    document.querySelectorAll('form').forEach(function(form) {
        params.forEach(function(v, k) { 
            var input = document.createElement('input'); 
            input.type = 'hidden';
            input.name = k;
            input.value = v;
    
            form.append(input);
        });
    });
  })
}