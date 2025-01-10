import { FC } from 'react';
import { Control, Controller, useController } from 'react-hook-form';
import Image from 'next/image';
import StarRating from './StarRating';

type MealComponentInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  name?: string;
  isComponent: boolean;
};

const MealComponentInput: FC<MealComponentInputProps> = ({ control, label, name = '', isComponent }) => {
  const {
    fieldState: { error },
  } = useController({
    control,
    name: name + '.content',
  });

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4">
      <div
        className={`flex items-center w-full lg:w-3/12 ${
          isComponent ? 'flex-row gap-2' : 'flex-col gap-4 p-4 border border-neutral-300 rounded-lg h-full'
        }`}
      >
        <Image
          src={'/assets/meal-placeholder.webp'}
          alt={label}
          width={isComponent ? 72 : 200}
          height={isComponent ? 72 : 150}
          className="rounded-lg object-contain"
        />

        <div className="flex flex-col flex-1">
          <p className="text-sm font-medium text-neutral-800">{label}</p>

          <Controller
            name={name + '.rating'}
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-1">
                <StarRating value={field.value} onChange={field.onChange} withText={!isComponent} />
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-9/12">
        <Controller
          name={name + '.content'}
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className=" px-4 py-[18px] text-neutral-500-base border border-gray-200 rounded-lg bg-transparent focus:outline-none focus:ring-0 resize-none"
              placeholder="Your thoughts about the component"
              rows={isComponent ? 1 : 9}
            />
          )}
        />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default MealComponentInput;
