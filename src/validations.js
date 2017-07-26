export default {

  'text': {
    test: (input, {required, minLength, maxLength}={}) => {
      let error;
      if (required && !input.length) {
        error = {type: 'required'};
      } else if (input.length < minLength) {
        error = {type: 'minLength'};
      } else if (input.length > maxLength) {
        error = {type: 'maxLength'};
      }

      return error;
    }
  },

  'password': {
    test: (input, {required, minLength, maxLength}={}) => {
      let error;
      if (required && !input.length) {
        error = {type: 'required'};
      } else if (input.length < minLength) {
        error = {type: 'minLength'};
      } else if (input.length > maxLength) {
        error = {type: 'maxLength'};
      }

      return error;
    }
  },

  'date': {
    test: (input, {required=false, minDate='', maxDate=''}={}) => {
      let error;

      if (required && !input.length) {
        error = {type: 'required'};
      } else if (input && input.length) {
        const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        
        if (regex.test(input)) {
          let [month, date, year] = input.split('/');
          const dateInput = new Date(Date.UTC(year, month - 1, date));

          if (isNaN(dateInput.getTime()) || dateInput.getUTCDate() != date || (dateInput.getUTCMonth()+1) != month) {
            error = {type: 'date'};
          } else {
            [month, date, year] = minDate.split('/');
            const minDateObj = new Date(Date.UTC(year, month - 1, date));
            [month, date, year] = maxDate.split('/');
            const maxDateObj = new Date(Date.UTC(year, month - 1, date));       

            if (dateInput < minDateObj) {
              error = {type: 'minDate'};
            } else if (dateInput > maxDateObj) {
              error = {type: 'maxDate'};
            }

          }

        } else {
          error = {type: 'date'};
        }   
      }
      
      
      return error;
    }
  },

  'email': {
    test: (input, {required}={}) => {
      let error;
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (required && !input.length) {
        error = {type: 'required'};
      } else if (input.length && !regex.test(input)) {
        error = {type: 'email'};
      }
      return error;
    }
  },

  'fullname': {
    test: (input, { required, minLength, maxLength }={}) => {

      let error;

      if (required && !input.length) {
        error = {type: 'required'};
      } else if (input.length) {

        const names = input.split(' ');

        if (names.length !== 2 || !names[0].length || !names[1].length ) {
          error = {type: 'fullname'};
        } else if (minLength && input.length < minLength) {
          error = {type: 'minLength'};

        } else if (maxLength && input.length > maxLength) {
          error = {type: 'maxLength'};
        }
      }

      return error;
    }
  },

}