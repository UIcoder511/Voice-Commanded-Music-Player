jQuery(document).ready(function($){
  var $form_modal = $('.user-modal'),
    $form_login = $form_modal.find('#login'),
    $form_signup = $form_modal.find('#signup'),
   // $form_verify = $form_modal.find('#verify'),
    $form_forgot_password = $form_modal.find('#reset-password'),
    $form_modal_tab = $('.switcher'),
      
      $btn = $('#ss'),
    $lg=  $btn.children('li').eq(0).children('a'),
   $sn= $btn.children('li').eq(1).children('a'),
    //$vr=      $btn.children('li').eq(2).children('a'),
          
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    //$tab_verify= $form_modal_tab.children('li').eq(2).children('a'),
    $forgot_password_link = $form_login.find('.form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.form-bottom-message a'),
    $main_nav = $('.main-nav');

  //open modal
  $btn.on('click', function(event){

    
      $main_nav.children('ul').removeClass('is-visible');
      //show modal layer
      $form_modal.addClass('is-visible'); 
      //show the selected form'
       
     login_selected();
         
  });

  //close modal
  $('.user-modal').on('click', function(event){
    if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
      $form_modal.removeClass('is-visible');
    }
  });
  //close modal when clicking the esc keyboard button
  $(document).keyup(function(event){
      if(event.which=='27'){
        $form_modal.removeClass('is-visible');
      }
    });

  //switch from a tab to another
  $form_modal_tab.on('click', function(event) {
    event.preventDefault();
      
      
   // ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
      
      if ( $(event.target).is($tab_signup) )
          signup_selected();
         else if ( $(event.target).is($tab_login) )
          login_selected();
        // else if ( $(event.target).is($tab_verify) )
        //  verify_selected();
      
      
  });

  //hide or show password
  $('.hide-password').on('click', function(){
    var $this= $(this),
      $password_field = $this.prev('input');

    ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    ( 'Show' == $this.text() ) ? $this.text('Hide') : $this.text('Show');
    //focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
  });

  //show forgot-password form
  $forgot_password_link.on('click', function(event){
    event.preventDefault();
    forgot_password_selected();
  });

  //back to login from the forgot-password form
  $back_to_login_link.on('click', function(event){
    event.preventDefault();
    login_selected();
  });

  function login_selected(){
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
  //  $form_verify.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    
    $tab_signup.removeClass('selected');
  //  $tab_verify.removeClass('selected');
      $tab_login.addClass('selected');
  }

  function signup_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
  //  $form_verify.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
  //     $tab_verify.removeClass('selected');
    $tab_signup.addClass('selected');
   
  }
    
   /*  function verify_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
  //   $form_verify.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
    $tab_signup.removeClass('selected');
  //   $tab_verify.addClass('selected');
  }
*/
  function forgot_password_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
 //     $form_verify.removeClass('is-selected');
        $tab_login.removeClass('selected');
    $tab_signup.removeClass('selected');
  //    $tab_verify.removeClass('selected');
    $form_forgot_password.addClass('is-selected');
      
  }

    

    

  //IE9 placeholder fallback
  //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  if(!Modernizr.input.placeholder){
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        }
    }).blur(function() {
      var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.val(input.attr('placeholder'));
        }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
        })
    });
  }

});


//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
  return this.each(function() {
      // If this function exists...
      if (this.setSelectionRange) {
          // ... then use it (Doesn't work in IE)
          // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
          var len = $(this).val().length * 2;
          this.setSelectionRange(len, len);
      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)
          $(this).val($(this).val());
      }
  });
};
