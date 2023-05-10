import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().lowercase().trim().email('Невалидный email').required('Обязательное поле'),
    password: yup.string().trim().required('Обязательное поле').min(5, 'Короткий пароль'),
  })
  .required();

export const LoginInitValues = {
  defaultValues: {
    email: '',
    password: '',
  },
  resolver: yupResolver(schema),
};
