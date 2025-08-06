//Update for pushing sitelive

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    };
  });
});


  function isEmail(emailElem) {
    var emailTest = $(emailElem).val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailTest);
  };

  function isIban(ibanElem) {
    var ibanTest = $(ibanElem).val();
    var regex = /^DE\d{2}  \d{4} \d{4} \d{4} \d{4} \d{2}$/;
    return regex.test(ibanTest);
  };

var Webflow = Webflow || [];
Webflow.push(function() {
 var l = $('#flowbaseSlider .w-slider-arrow-left');
 var r = $('#flowbaseSlider .w-slider-arrow-right');
 $('#flowbaseSlider')
   .on('click', '.slider-left', function() {
      l.trigger('tap');
      $("html, body").animate({ scrollTop: 0 }, "slow");
   })
   

   .on('click', '.slider-right', function() {
      if ( !( (this.classList.contains('text-check')) || (this.classList.contains('email-check')) || (this.classList.contains('radio-check'))  )) {
       r.trigger('tap');
       $("html, body").animate({ scrollTop: 0 }, "slow");
     };
   })

   .on('keyup', '.text-check-n', function(e) {
     			var code = e.key;
          if (code === "Enter") {
          		r.trigger('tap');
              $("html, body").animate({ scrollTop: 0 }, "slow");
          };
    })

     .on('click', '.text-check', function() {
         var elemText = [];
         var condition = 0;
         elemText = $(this).closest('.form-content').find('.text-check-t');
         elemText.each(function() {
             if (this.value == '') {
                 $(this).parent().find('.confirm-w-field').show();
                 $('.text-field').attr('style','background-color: #ff00001f;');
                 $('.field-Label').attr('style','color: red;');
                 condition++;
             } else {
                 $(this).parent().find('.confirm-w-field').hide();
                 $('.text-field').attr('style','background-color: #f2f2f2;');
                 $('.field-Label').attr('style','color: rgba(0, 0, 0, 0.5);');
             };
         });
         
         var emailText = $(this).closest('.form-content').find('.text-check-e');
         var emailAlert = emailText.parent().find('.confirm-w-field');
         if (isEmail(emailText)) {
             emailAlert.hide();
         } else {
             emailAlert.show();
         };
         
         if ( (condition === 0) && (isEmail(emailText)) ) {
             r.trigger('tap');
             $("html, body").animate({ scrollTop: 0 }, "slow");
          };
          
          var vorname = $('#Vorname').val();
          var nachname = $('#Nachname').val();
          $('.conf-vorname').text(vorname + ' ' + nachname);

          var address = $('#address').val();
          var zip = $('#zip').val();
          var city = $('#city').val();
          $('.conf-address').text(address + ', ' + zip + ', ' + city);
          
          var email = $('#email').val();
          $('.conf-email').text(email);
          
          var firmenname = $('#Firmenname').val();
          $('.conf-firmname').text(firmenname);
          
          var umsatzsteuerId = $('#Umsatzsteuer-ID').val();
          $('.conf-umsatzsteuer-id').text(umsatzsteuerId);

      })


    // Paypal E-Mail Check and populate
     .on('click', '.email-check', function() {
         var emailText = $(this).closest('.form-content').find('.text-check-e');
         var emailAlert = emailText.parent().find('.confirm-w-field');
         if ( emailText.val() === '' ) {
            //r.trigger('tap');
            // $("html, body").animate({ scrollTop: 0 }, "slow");
         
         } else {
             if (isEmail(emailText)) {
                 emailAlert.hide();
                 r.trigger('tap');
                 $("html, body").animate({ scrollTop: 0 }, "slow");
             } else {
                 emailAlert.show();
             };
         };
         
          var iban = $('#IBAN').val();
          if ( iban != '') {
             $('.conf-iban').text(iban);
          };
          
          var paypal = $('#Paypal-Account').val();
          if ( paypal != '') {
             $('.conf-paypal').text(paypal);
          };
         
      })

 
    //IBAN verifier
     .on('click', '.email-check', function() {
     
        var elemText = [];
         var condition = 0;
         elemText = $(this).closest('.form-content').find('.text-check-n');
         elemText.each(function() {
             if (this.value == '') {
                 r.trigger('tap');
             $("html, body").animate({ scrollTop: 0 }, "slow");
             $(this).parent().find('.hideme').hide();
             } else {
                 $(this).parent().find('.confirm-w-field').hide();
                 $(this).parent().find('.hideme').show();
             };
         });
     
         var iBanText = $(this).closest('.form-content').find('.text-check-n');
         var iBanAlert = iBanText.parent().find('.confirm-w-field');
         if (isIban(iBanText)) {
             iBanAlert.hide();
         } else {
             iBanAlert.show();
         };
         
         if ( (condition === 0) && (isIban(iBanText)) ) {
             r.trigger('tap');
             $("html, body").animate({ scrollTop: 0 }, "slow");
          };
          

      })
     

    .on('click', '.fahr-check', function() {
          var photos = [];
          photos = $('.photo-car-e');
          var photosC = [];
          photosC1 = $('.photo-car-e-c-1');
          photosC2 = $('.photo-car-e-c-2');
          for (let i = 0; i < photos.length; i++) {
             let photoName = photos.eq(i).text();
             if ( (photoName != 'fileuploaded.jpg') && (photoName != 'Datei hochlader') ) {
                photosC1.eq(i).text(photoName);
                photosC2.eq(i).text(photoName);
             } else {
                photosC1.eq(i).text('Keine Angabe');
                photosC2.eq(i).text('Keine Angabe');
             };
          };

         nextcar = [];
         nextcar = $('.conf-next-car-w');
         nextcar.each(function() {
            if ( ( ($(this).find('.photo-car-e-c-v').text() === '') && ($(this).find('.photo-car-e-c-r').text() === '') )
            || ( ($(this).find('.photo-car-e-c-v').text() === 'Keine Angabe') && ($(this).find('.photo-car-e-c-r').text() === 'Keine Angabe') ) ) {
                 $(this).hide();
                 console.log('Hide');
             } else {
                 $(this).show();
                 $('.conf-subhead-b-1').show();
                 console.log('Show');
             };
         });
                  
     })

 
    .on('click', '.person-check', function() {
          var personV = $('.person-v').text();
          var personR = $('.person-r').text();
          if ( (personV !== 'fileuploaded.jpg') && (personV !== 'Datei hochlader') ) {
             $('.person-conf-v').text(personV);
          } else {
             $('.person-conf-v').text('Keine Angabe');
          };

          if ( (personR !== 'fileuploaded.jpg') && (personR !== 'Datei hochlader') ) {
             $('.person-conf-r').text(personR);
          } else {
             $('.person-conf-r').text('Keine Angabe');
          };

     })

    .on('click', '.submit-button-c', function() {
        let elemRadio = [];
        elemRadio = $(this).closest('.form-content').find('.w-checkbox-input');
        elemRadio.each(function() {
           let elemAlert = $(this).closest('.checkbox-c').find('.confirm-w-field');
           if ( $(this).hasClass('w--redirected-checked') ) {
              elemAlert.hide();
           } else {
              elemAlert.show();
           };
        });
     })

    .on('click', '.privat-radio-check', function() {
       let elemAlert = $(this).closest('.checkbox-c').find('.confirm-w-field');
       if ( $(this).find('.w-checkbox-input').hasClass('w--redirected-checked') ) {
          elemAlert.show();
          $('.submit-button-c').show();
       } else {
          elemAlert.hide();
          if ( $('.company-name-b').css('display') == 'none') {
             $('.submit-button-c').hide();
          } else {
             if ( $('#firma-radio-check').find('.w-checkbox-input').hasClass('w--redirected-checked') ) {
                $('.submit-button-c').hide();
             } else {
                $('.submit-button-c').show();
             };
          };
       };
    })

    .on('click', '.firma-radio-check', function() {
       let elemAlert = $(this).closest('.checkbox-c').find('.confirm-w-field');
       if ( $(this).find('.w-checkbox-input').hasClass('w--redirected-checked') ) {
          elemAlert.show();
          $('.submit-button-c').show();
       } else {
          elemAlert.hide();
          if ( $('#privat-radio-check').find('.w-checkbox-input').hasClass('w--redirected-checked') ) {
             $('.submit-button-c').hide();
          } else {
             $('.submit-button-c').show();
          };
       };
    })


    .on('click', '#Privat', function() {
         $('.company-b').hide();
         $('.privat-b').show();
         $('#Firmenname').removeClass('text-check-t');
         $('#Umsatzsteuer-ID').removeClass('text-check-t');
         $('#preis-fix').css('display', 'flex');
         r.trigger('tap');
         $("html, body").animate({ scrollTop: 0 }, "slow");
    })
    
    .on('click', '#Firma', function() {
         $('.company-b').show();
         $('.privat-b').hide();
         $('#Firmenname').addClass('text-check-t');
         $('#Umsatzsteuer-ID').addClass('text-check-t');
         $('#checkbase').css('background-color: #307652;');
         $('#preis-fix').css('display', 'none');
         r.trigger('tap');
         $("html, body").animate({ scrollTop: 0 }, "slow");
    })
    
    .on('click', '#Schnell', function() {
         $('.slide-privat-fix').css('display', 'flex');
         $('.slide-privat-max').css('display', 'none');
         r.trigger('tap');
         $("html, body").animate({ scrollTop: 0 }, "slow");
    })
    
        .on('click', '#Max', function() {
         $('.slide-privat-fix').css('display', 'none');
         $('.slide-privat-max').css('display', 'flex');
         r.trigger('tap');
         $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    

});
  
  

$('.checkbox-base').on('click', function() {	
    if (this.children[0].classList.contains('w--redirected-checked')) {	
        $(this).addClass('radio-active');	
    };	
});	
