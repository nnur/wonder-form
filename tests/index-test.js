import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import validations from './../src/validations'

describe('validations', () => {
  describe('date', () => {
    it('should return no error for valid dates', () => {
      const { test } = validations['date'];
      expect(test('01/27/2017')).toBe(undefined);
      expect(test('01/27/2017')).toBe(undefined);
      expect(test('1/27/2017')).toBe(undefined);

      expect(test('02/27/2017')).toBe(undefined);
      expect(test('2/27/2017')).toBe(undefined);
      expect(test('11/2/2017')).toBe(undefined);
      expect(test('11/2/0017')).toBe(undefined);
      expect(test('11/2/0017')).toBe(undefined);
    });

    it('should return error of type date for invalid dates', () => {
      const { test } = validations['date'];
      expect(test('34/12/2017')).toEqual({type: 'date'});
      expect(test('34/34/2017')).toEqual({type: 'date'});

      expect(test('110/27/2017')).toEqual({type: 'date'});
      expect(test('11/270/2017')).toEqual({type: 'date'});
      expect(test('11/27/20170')).toEqual({type: 'date'});

      expect(test('11/27/201')).toEqual({type: 'date'});

      expect(test('11-27/2017')).toEqual({type: 'date'});
      expect(test('11/27-2017')).toEqual({type: 'date'});
      expect(test('11/272017')).toEqual({type: 'date'});
      expect(test('11272017')).toEqual({type: 'date'});

      expect(test('a1272017')).toEqual({type: 'date'});
      expect(test('ab/12/2017')).toEqual({type: 'date'});
      expect(test('ab/12/2017')).toEqual({type: 'date'});

      expect(test('11/12/*((S')).toEqual({type: 'date'});
      expect(test('12/2017')).toEqual({type: 'date'});
      expect(test('2017')).toEqual({type: 'date'});

      expect(test('2/0/2017')).toEqual({type: 'date'});
      expect(test('0/01/2017')).toEqual({type: 'date'});

      expect(test('02/31/2017')).toEqual({type: 'date'});
      expect(test('2//31/2017')).toEqual({type: 'date'});
      expect(test('2/3//2017')).toEqual({type: 'date'});
    });

    it('should return no error if input is not required', () => {
      const { test } = validations['date'];
      expect(test('')).toBe(undefined);
    });

    it('should return an error if input is required', () => {
      const { test } = validations['date'];
      expect(test('', {required: true})).toEqual({type: 'required'});
    });

    it('should return an error if date is less than minDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2017', {minDate: '12/1/2017'})).toEqual({type: 'minDate'});
    });

    it('should return an error if date is greater than maxDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2018', {maxDate: '12/1/2017'})).toEqual({type: 'maxDate'});
    });

    it('should return no error if date is less than maxDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2017', {maxDate: '12/1/2017'})).toEqual(undefined);
    });

    it('should return no error if date is more than minDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2017', {minDate: '10/1/2017'})).toEqual(undefined);
    });

    it('should return error if date is equal to minDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2017', {minDate: '11/2/2017'})).toEqual({type: 'minDate'});
    });

    it('should return no error if date is equal to maxDate', () => {
      const { test } = validations['date'];
      expect(test('11/2/2017', {maxDate: '11/2/2017'})).toEqual(undefined);
    });


  });

  describe('fullname', () => {
    it('should return error if it is not a full name', () => {
      const { test } = validations['fullname'];
      expect(test('Olaf')).toEqual({type: 'fullname'});
    });

    it('should return no error if it is a full name', () => {
      const { test } = validations['fullname'];
      expect(test('Olaf Jenkins')).toEqual(undefined);
    });

    it('should return no error if it is a full name and it is required', () => {
      const { test } = validations['fullname'];
      expect(test('Olaf Jenkins', {required: true})).toEqual(undefined);
    });

    it('should return an error if there is no name and it is required', () => {
      const { test } = validations['fullname'];
      expect(test('', {required: true})).toEqual({type: 'required'});
    });

    it('should return no error if there is no name and it is not required', () => {
      const { test } = validations['fullname'];
      expect(test('', {required: false})).toEqual(undefined);
    });

    it('should return an error if the name is less than minlength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo Be', {minLength: 6})).toEqual({type: 'minLength'});
    });

    it('should return an error if the name is greater than maxlength', () => {
      const { test } = validations['fullname'];
      expect(test('Joe Bee', {maxLength: 2})).toEqual({type: 'maxLength'});
    });

    it('should return no error if the name is equal to maxlength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo Be', {maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the name is equal to minlength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo Be', {minLength: 5})).toEqual(undefined);
    });

    it('should return no error if the name is equal to minlength and maxLength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo Be', {minLength: 5, maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the name is between minlength and maxLength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo Beg', {minLength: 5, maxLength: 7})).toEqual(undefined);
    });

    it('should return error if the name is less than minlength', () => {
      const { test } = validations['fullname'];
      expect(test('Jo B', {minLength: 5, maxLength: 7})).toEqual({type: 'minLength'});
    });

    it('should return fullname error if the name is not a fullname even if there are minlength and maxlength fields', () => {
      const { test } = validations['fullname'];
      expect(test('Jo', {minLength: 5, maxLength: 7})).toEqual({type: 'fullname'});
    });
  });

  describe('password', () => {
    it('should return no error if it is a password', () => {
      const { test } = validations['password'];
      expect(test('password')).toEqual(undefined);
    });

    it('should return no error if it is a full name and it is required', () => {
      const { test } = validations['password'];
      expect(test('password', {required: true})).toEqual(undefined);
    });

    it('should return an error if there is no password and it is required', () => {
      const { test } = validations['password'];
      expect(test('', {required: true})).toEqual({type: 'required'});
    });

    it('should return no error if there is no password and it is not required', () => {
      const { test } = validations['password'];
      expect(test('', {required: false})).toEqual(undefined);
    });

    it('should return an error if the password is less than minlength', () => {
      const { test } = validations['password'];
      expect(test('pa', {minLength: 6})).toEqual({type: 'minLength'});
    });

    it('should return an error if the password is greater than maxlength', () => {
      const { test } = validations['password'];
      expect(test('passwooord', {maxLength: 2})).toEqual({type: 'maxLength'});
    });

    it('should return no error if the password is equal to maxlength', () => {
      const { test } = validations['password'];
      expect(test('12345', {maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the password is equal to minlength', () => {
      const { test } = validations['password'];
      expect(test('12345', {minLength: 5})).toEqual(undefined);
    });

    it('should return no error if the password is equal to minlength and maxLength', () => {
      const { test } = validations['password'];
      expect(test('12345', {minLength: 5, maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the password is between minlength and maxLength', () => {
      const { test } = validations['password'];
      expect(test('123456', {minLength: 5, maxLength: 7})).toEqual(undefined);
    });

    it('should return error if the password is less than minlength', () => {
      const { test } = validations['password'];
      expect(test('123', {minLength: 5, maxLength: 7})).toEqual({type: 'minLength'});
    });
  });

  describe('text', () => {
    it('should return no error if there is text', () => {
      const { test } = validations['text'];
      expect(test('some text')).toEqual(undefined);
    });

    it('should return no error if there is text and it is required', () => {
      const { test } = validations['text'];
      expect(test('text', {required: true})).toEqual(undefined);
    });

    it('should return an error if there is no text and it is required', () => {
      const { test } = validations['text'];
      expect(test('', {required: true})).toEqual({type: 'required'});
    });

    it('should return no error if there is no text and it is not required', () => {
      const { test } = validations['text'];
      expect(test('', {required: false})).toEqual(undefined);
    });

    it('should return a minlength error if there is text and minlength is set, even if required is false', () => {
      const { test } = validations['text'];
      expect(test('lemon', {required: false, minLength: 6})).toEqual({type: 'minLength'});
    });

    it('should return an error if the text is less than minlength', () => {
      const { test } = validations['text'];
      expect(test('pa', {minLength: 6})).toEqual({type: 'minLength'});
    });

    it('should return an error if the text is greater than maxlength', () => {
      const { test } = validations['text'];
      expect(test('some text', {maxLength: 2})).toEqual({type: 'maxLength'});
    });

    it('should return no error if the text is equal to maxlength', () => {
      const { test } = validations['text'];
      expect(test('12345', {maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the text is equal to minlength', () => {
      const { test } = validations['text'];
      expect(test('12345', {minLength: 5})).toEqual(undefined);
    });

    it('should return no error if the text is equal to minlength and maxLength', () => {
      const { test } = validations['text'];
      expect(test('12345', {minLength: 5, maxLength: 5})).toEqual(undefined);
    });

    it('should return no error if the text is between minlength and maxLength', () => {
      const { test } = validations['text'];
      expect(test('123456', {minLength: 5, maxLength: 7})).toEqual(undefined);
    });

    it('should return error if the text is less than minlength', () => {
      const { test } = validations['text'];
      expect(test('123', {minLength: 5, maxLength: 7})).toEqual({type: 'minLength'});
    });
  });

  describe('email', () => {
    it('should return no error if there is an email', () => {
      const { test } = validations['email'];
      expect(test('naila@beamer.com')).toEqual(undefined);
    });

    it('should return no error if there is an email and it is required', () => {
      const { test } = validations['email'];
      expect(test('naila@beamer.com', {required: true})).toEqual(undefined);
    });

    it('should return an error if there is no email and it is required', () => {
      const { test } = validations['email'];
      expect(test('', {required: true})).toEqual({type: 'required'});
    });

    it('should return no error if there is no email and it is not required', () => {
      const { test } = validations['email'];
      expect(test('', {required: false})).toEqual(undefined);
    });

    it('should return no error if there is a correct email and it is not required', () => {
      const { test } = validations['email'];
      expect(test('naila@beamer.com', {required: false})).toEqual(undefined);
    });

    it('should return an error if there is a wrong email even if it is not required', () => {
      const { test } = validations['email'];
      expect(test('gibberish', {required: false})).toEqual({type: 'email'});
    });

    it('should return error for invalid formats', () => {
      const { test } = validations['email'];
      expect(test('gibb@erish')).toEqual({type: 'email'});
      expect(test('#@%^%#$@#$@#.com')).toEqual({type: 'email'});
      expect(test('@example.com')).toEqual({type: 'email'});
      expect(test('oe Smith <email@example.com>')).toEqual({type: 'email'});
      expect(test('email.example.com')).toEqual({type: 'email'});
      expect(test('email@example@example.com')).toEqual({type: 'email'});
      expect(test('.email@example.com')).toEqual({type: 'email'});
      expect(test('email.@example.com')).toEqual({type: 'email'});
      expect(test('email..email@example.com')).toEqual({type: 'email'});
      expect(test('email@example.com (Joe Smith)')).toEqual({type: 'email'});
    });

    it('should no error for valid formats', () => {
      const { test } = validations['email'];
      expect(test('email@example.exam')).toEqual(undefined);
      expect(test('firstname.lastname@example.com')).toEqual(undefined);
      expect(test('email@subdomain.example.com')).toEqual(undefined);
      expect(test('firstname+lastname@example.com')).toEqual(undefined);
      expect(test('email@example.co.jp')).toEqual(undefined);
      expect(test('firstname-lastname@example.com')).toEqual(undefined);
    });

    

  });

})
