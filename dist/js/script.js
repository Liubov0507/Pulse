// number - числа
// string - строка, в словах "", '', ``
// true/false - да/нет
// null - не существует
// undefind - не имеет значения
// object - объект, может содержать разный тип данных, смешанный
// Symbol - технический тип данных, редкий

// alert(1234)

// console.log()

// let answer = confirm("вам есть 18?");
// concole.log(answer);

// let answer = prompt("вам есть 18?", "");
// concole.log(answer);

// console.log(4 + 'fdd');

// let isChecked = true,
//     isClose = true;
// console.log(isChecked && isClose); и
// console.log(isChecked || isClose); или

// if (2*4 == 8*1) {
    // console.log('Верно')
// } else {
//     console.log('Ошибка')
// }

// let answer = confirm("вам есть 18?");
// if (answer) {
 //   console.log('Приходи')  
// } else {
//     console.log('Уходи')
// }


// 1)Подключение слайдера через slick (jquery)
// Карусель

$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        // infinite: false,
        
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/chevron_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/chevron_right.svg"></button>',
        responsive: [
            {
                breakpoint: 1100,
            /*это классическая точка перехода от компьютера к планшетам и мобильным, тут вместо стрелок будут точки*/
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    
    // Табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
         $(this)
           .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
           .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
 // Переключатель карточки
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
     }
   toggleSlide('.catalog-item__back');
   toggleSlide('.catalog-item__link');

   //Модальные окна

   $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
   });
   $('.button_mini').each(function(i) {
       $(this).on('click', function() {
           $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
           $('.overlay, #order').fadeIn('slow');
       });
   });

   //Валидация форм

   function validateForms(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
              },
            phone: 'required',
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Требуется не менее {0} символов!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
        });
   }
   
   validateForms('#consultation form');
   validateForms('#consultation-form');
   validateForms('#order form');

   // Маска формы

   $('input[name=phone]').mask("+7 (999) 999-99-99");

   //Отправка писем без перезагрузки страницы
   $('form').submit(function(e) {
    e.preventDefault();
    
    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
        return false;
    });

    //Плавный скролл (smooth scroll and pageup)

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut(); 
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //Подключение анимации
    new WOW().init();
});
   


/*2) Подключение слайдера через tiny
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    speed: 1200,
    rewind: true,
    responsive: {
        320: {
            edgePadding: 20,
            gutter: 20,
            items: 1,
            nav: true //точки появляются после ширины 320px
            
        },
        768: {
            gutter: 30,
            nav: true
                  
        },
        1201: {
            nav: false, //точки пропадают после 900px
        }
      }
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });*/
