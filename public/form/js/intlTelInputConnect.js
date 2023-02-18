try{
const country_avalible_codes = ['gb', 'ie', 'be', 'bg', 'ca', 'hr', 'cy', 'cz', 'dk', 'ee',
'fr', 'gr', 'hu', 'is', 'it', 'lv', 'lt', 'mt', 'nl', 'kr', 'no', 'pl', 'pt',
'rs', 'sk', 'sl', 'es', 'se', 'tr'];

const default_country_code = 'gb';

}catch{}
  try{
  // Connect phone #1
  let country_code = document.querySelector("#country_code");
  let input = document.querySelector("#phone");

  
  try{
    input.removeEventListener('countrychange', function(e) {
      let selectedCountryData = iti.getSelectedCountryData();
      country_code.value = "+"+selectedCountryData.dialCode;
      newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
      iti.setNumber("");
      mask = newPlaceholder.replace(/[1-9]/g, "0");
      $(this).mask(mask);
    });
  }catch{}


  console.log('CONNECT : phone input elemtnt is ready.')

  let iti = window.intlTelInput(input, {
    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
      return "e.g. " + selectedCountryPlaceholder;
    },
    initialCountry: "auto",
    geoIpLookup: function(callback) {
      $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : default_country_code;
        //if the ip country code not in list - set default
        // if (country_avalible_codes.includes(countryCode.toLowerCase())){}
        // else{countryCode = default_country_code}
        callback(countryCode);
      });
    },
    // onlyCountries: country_avalible_codes,
    separateDialCode: false,
    utilsScript:'js/utils.js',
    hiddenInput: "full_number",
    placeholderNumberType: "MOBILE",
    preferredCountries: ['es'],
  });
  // console.log('CONNECT : iti is ready.');

  input.addEventListener('countrychange', function(e) {
    let selectedCountryData = iti.getSelectedCountryData();
    // country_code.value = "+"+selectedCountryData.dialCode;
    newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
    iti.setNumber("");
    mask = newPlaceholder.replace(/[1-9]/g, "0");
    $(this).mask(mask);
  });

  try{
    //check the num valid after submit form
    form.addEventListener('submit', (event) => {
      if (!iti.isValidNumber()){
        event.preventDefault();
        alert('The phone number is not valid.');
      }
    });
  }
  catch{
    console.log('WARRING : The form with ID: "form" - not found! Set the form id for num validation!');
  }
  }catch{
  }


