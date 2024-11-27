import './index.html';
import './css/style.sass';


import mapArrow from './img/mapArrow.png';


// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [48.821376, 58.620521],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 5,
    controls: [],
    behaviors: ['drag']
  });



  var myPlacemark = new ymaps.Placemark([55.727541, 37.653505], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    },

  );

  myMap.geoObjects.add(myPlacemark);

  var myPlacemark2 = new ymaps.Placemark([48.500645, 44.579830], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark2);

  var myPlacemark3 = new ymaps.Placemark([45.040884, 38.983003], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark3);


  var myPlacemark4 = new ymaps.Placemark([51.586543, 45.966398], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark4);


  var myPlacemark5 = new ymaps.Placemark([51.671439, 39.203270], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark5);


  var myPlacemark6 = new ymaps.Placemark([40.215791, 44.568125], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark6);


  var myPlacemark7 = new ymaps.Placemark([55.022654, 82.975748], {},
    {
      iconLayout: 'default#image',
      iconImageHref: mapArrow,
      iconImageSize: [36, 40]
    }
  );

  myMap.geoObjects.add(myPlacemark7);

}


class FormsValidatioin {
  selectors = {
    form: '[data-js-form]',
    fieldErrors: '[data-js-form-field-error]',
  }

  errorMessages = {
    valueMissing: () => 'Заполните это поле',
    patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
    tooShort: ({ minLength }) => `Слишком короткое значение, минимум символов - ${minLength}`,
    tooLong: ({ maxLength }) => ` Слишком длинное значение, ограничение символов- ${maxLength}`,
    checkBoxUnchecked:()=>'Примите согласие на обработку персональных данных'
  }


  constructor() {
    this.bindEvents()
  }


  manageErrors(fieldControlElemnet, errorMessages) {
    const fieldErrorsElement = fieldControlElemnet.parentElement.querySelector(this.selectors.fieldErrors)
    fieldErrorsElement.innerHTML = errorMessages.map((message) => `<span class="field_error">${message}</span>`)
      .join('')
  }



  validateField(fieldControlElemnet) {
    const errors = fieldControlElemnet.validity

    const errorMessages = []





    if(fieldControlElemnet.type==='checkbox'&&!fieldControlElemnet.checked){
      errorMessages.push(this.errorMessages.checkBoxUnchecked())
    }
    else{
      
    }








    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElemnet))
      }
    })

    this.manageErrors(fieldControlElemnet, errorMessages)


    const isValid = errorMessages.length === 0



    fieldControlElemnet.ariaInvalid = !isValid

    return isValid
  }


  onBlur(e) {
    const { target } = e
    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required

    if (isFormField && isRequired) {
      this.validateField(e.target)
    }
  }

  onChange(e) {
    const { target } = e
    const isRequired = target.required
    const isToggleType = ['radio', 'checkbox'].includes(target.type)

    if (isToggleType && isRequired) {
      this.validateField(target)
    }
  }

  onSubmit(e) {

    const isFormElement = e.target.matches(this.selectors.form)
    if (!isFormElement) {
      return
    }

    const requiredControlElements = [...e.target.elements].filter(({ required }) => required)
    let isFormValid = true
    let firstInvalidFieldControl = null


    requiredControlElements.forEach((element) => {
      const isFieldValid = this.validateField(element)

      if (!isFieldValid) {
        isFormValid = false
        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = element
        }

      }

    })
    if (!isFormValid) {
      e.preventDefault()
      firstInvalidFieldControl.focus()
    }
  }


  bindEvents() {
    document.addEventListener('blur', (e) => {
      this.onBlur(e)
    }, { capture: true })
    document.addEventListener('change', (e) => this.onChange(e))
    document.addEventListener('submit', (e) => this.onSubmit(e))
  }


}

new FormsValidatioin()

