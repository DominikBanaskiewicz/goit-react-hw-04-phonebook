import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onhandleSubmit = evt => {
    evt.preventDefault();
    handleSubmit({ name, number });
  };

  const handleChange = e => {
    setName(e.currentTarget.value);
  };
  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  return (
    <>
      <form className={css.form} onSubmit={onhandleSubmit}>
        <label className={css.label}>
          <p className={css.p}>Name</p>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </label>
        <label className={css.label}>
          <p className={css.p}>Number</p>
          <input
            onChange={handleChangeNumber}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};
