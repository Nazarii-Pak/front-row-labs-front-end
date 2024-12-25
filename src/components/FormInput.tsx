import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> extends Omit<UseControllerProps<T>, 'control'> {
  control: Control<T>;
  label: string;
  placeholder: string;
  type?: string;
}

const FormInput = <T extends FieldValues>({ control, name, label, type, ...restProps }: FormInputProps<T>) => {
  const {
    fieldState: { error },
  } = useController({ control, name: name });

  return (
    <div className="mb-1 text-left">
      <p className="pb-1 pl-2 font-bold-f text-base  text-left text-primary-green-900">{label}</p>
      <input
        {...control.register(name)}
        type={type}
        className="p-4 border border-primary-green-300 rounded-2xl w-full text-primary-green-700 focus:outline-none "
        {...restProps}
      />
      <p className="text-red-400 text-left text-sm">{error?.message}</p>
    </div>
  );
};

export default FormInput;
