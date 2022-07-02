import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import styles from "../styles/Card.module.css"
import axios from "axios"

const CardForm = () => {
    const [isValid, setIsValid] = useState(false)
    const [rawResponse, setRawResponse] = useState()

    const pay = async () => {
      const res = await axios.post("http://localhost:3000/api/payment", {...form.values})
      setRawResponse(res.data)
    }

    const form = useForm({
        initialValues: {
          cardNumber: '',
          expDate: '',
          CVV: '',
          amount: ''
        },
    
        validate: {
          cardNumber: (value) => (value.match(/\d{16}/) ? null : ""),
          expDate: (value) => (value.match(/\d{2}\/\d{4}/) ? null : ""),
          CVV: (value) => (value.match(/\d{3}/) ? null : ""),
          amount: (value) => (value.match(/^[1-9]\d*$/) ? null : "")
        },
      });

    useEffect(() => {
      if (form.validate().hasErrors) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }, [
    form.values
  ])

  return (
    <div className={styles.card_form_component}>
      <form className={styles.card_form} onSubmit={form.onSubmit(pay)}>
        <div className={styles.card}>
          <TextInput
            classNames={{
              label: styles.card_label,
              input: [styles.card_input, styles.card_number]
            }}
            required
            label="Card number"
            placeholder="0000000000000000"
            maxLength={16}
            {...form.getInputProps('cardNumber')}
          />
          <div className={styles.card_bottom}>
            <TextInput
              classNames={{
                label: styles.card_label,
                input: [styles.card_input, styles.exp_date]
              }}
              required
              label="Expiration date"
              placeholder="MM/YYYY"
              maxLength={7}
              {...form.getInputProps('expDate')}
            />
            <TextInput
              classNames={{
                label: styles.card_label,
                input: [styles.card_input, styles.cvv]
              }}
              required
              label="CVV"
              type='password'
              
              placeholder="000"
              maxLength={3}
              {...form.getInputProps('CVV')}
            />
          </div>
        </div>
        <TextInput
              required
              label="Amount"
              classNames={{
                label: styles.form_label,
                input: styles.form_input
              }}
              type='text'
              placeholder="1000"
              {...form.getInputProps('amount')}
        />
        <button
          type='submit'
          className={isValid ? styles.pay_button_enabled : styles.pay_button}
          disabled={!isValid}
          >
            <span>Pay</span>
        </button>
      </form>
      <div className={styles.raw_info}>
        <div>{JSON.stringify(form.values, 0, 2)}</div>
        <div>{JSON.stringify(rawResponse, 0, 2)}</div>
      </div>
    </div>

  )
}

export default CardForm