import * as yup from 'yup';

export const registerUserSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  gmail: yup.string().email('Invalid email format').required('Gmail is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
});