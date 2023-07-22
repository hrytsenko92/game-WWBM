import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { submitForm } from './submitForm';
import { HasAccTrueType } from './submitForm';
import { colors } from '../../types/colors';

type InputsType = {
  username: string;
  password: string;
  confirm_password: string;
};
interface ExpandInputWrapperProps {
  hasAccount: boolean;
}

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 16px;
  width: 250px;
  padding: 25px 0px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
`;
const Title = styled.h2`
  color: ${colors.white};
  font-size: 30px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  height: 70px;
`;
const ExpandInputWrapper = styled.div<ExpandInputWrapperProps>`
  height: ${props => (props.hasAccount ? '0' : '70px')};
  overflow: hidden;
  transition: height 0.5s ease;
`;
const Label = styled.label`
  color: ${colors.white};
`;
const ErrorMessage = styled.span`
  color: ${colors.red};
`;
const Login = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  padding-left: 25px;
`;
const Password = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  padding-left: 25px;
`;
const Submit = styled.input`
  width: 150px;
  height: 30px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
`;

export const AuthForm: React.FC<{
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  hasToken: (data: HasAccTrueType) => void;
}> = ({ hasAccount, setHasAccount, hasToken }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputsType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<InputsType> = async InputData => {
    const { username, password } = InputData;
    const data = await submitForm(username, password, hasAccount);
    typeof data === 'string' ? hasToken(data) : setHasAccount(true);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>{hasAccount ? 'Вхід' : 'Реєстрація'}</Title>
      <InputWrapper>
        <Label>
          Логін
          <Login
            {...register('username', {
              required: "*обов 'язково",
              minLength: {
                value: 4,
                message: 'Мінімум 4 символи',
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символів',
              },
            })}
          />
        </Label>
        {errors?.username && (
          <ErrorMessage>
            {errors?.username?.message || "*обов 'язково"}
          </ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <Label>
          Пароль
          <Password
            type="password"
            {...register('password', {
              required: "*обов 'язково",
              minLength: {
                value: 4,
                message: 'Мінімум 4 символи',
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символів',
              },
            })}
          />
        </Label>
        {errors?.password && (
          <ErrorMessage>
            {errors?.password.message || "*обов 'язково"}
          </ErrorMessage>
        )}
      </InputWrapper>
      <ExpandInputWrapper hasAccount={hasAccount}>
        {!hasAccount ? (
          <InputWrapper>
            <Label>
              Підтвердити пароль
              <Password
                type="password"
                {...register('confirm_password', {
                  required: "*обов 'язково",
                  minLength: {
                    value: 4,
                    message: 'Мінімум 4 символи',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Максимум 10 символів',
                  },
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Паролі не співпадають';
                    }
                  },
                })}
              />
            </Label>
            {errors?.confirm_password && (
              <ErrorMessage>
                {errors?.confirm_password.message || 'Паролі не співпадають'}
              </ErrorMessage>
            )}
          </InputWrapper>
        ) : null}
      </ExpandInputWrapper>
      <Submit type="submit" />
    </Form>
  );
};
