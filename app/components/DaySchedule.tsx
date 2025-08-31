"use client";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import type { RestaurantFormData } from "~/types/form/restaurantFormSchema";

type DayScheduleProps = {
  index: number;
  dayName: string;
  register: UseFormRegister<RestaurantFormData>;
  watch: UseFormWatch<RestaurantFormData>;
  errors: FieldErrors<RestaurantFormData>;
};

export function DaySchedule({
  index,
  dayName,
  register,
  watch,
  errors,
}: DayScheduleProps) {
  const isLunchClosed = watch(`openingHours.${index}.lunchIsClosed`);
  const isDinnerClosed = watch(`openingHours.${index}.dinnerIsClosed`);
  const dayErrors = errors.openingHours?.[index];

  return (
    <div className="flex flex-col gap-4 rounded-md border p-3">
      <h4 className="text-center font-semibold">{dayName}</h4>

      {/* --- BLOC DÉJEUNER --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Déjeuner</span>
          <div className="flex items-center gap-1">
            <label className="text-xs">Fermé</label>
            <input
              type="checkbox"
              className="accent-coral h-4 w-4"
              {...register(`openingHours.${index}.lunchIsClosed`)}
            />
          </div>
        </div>
        <fieldset disabled={isLunchClosed} className="flex flex-col gap-1">
          <input
            type="time"
            className="w-full rounded border p-1 text-sm disabled:bg-gray-100"
            {...register(`openingHours.${index}.lunchOpenTime`)}
          />
          <input
            type="time"
            className="w-full rounded border p-1 text-sm disabled:bg-gray-100"
            {...register(`openingHours.${index}.lunchCloseTime`)}
          />
          {dayErrors?.lunchCloseTime && (
            <p className="text-xs text-red-500">
              {dayErrors.lunchCloseTime.message}
            </p>
          )}
        </fieldset>
      </div>

      {/* --- BLOC DÎNER --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Dîner</span>
          <div className="flex items-center gap-1">
            <label className="text-xs">Fermé</label>
            <input
              type="checkbox"
              className="accent-coral h-4 w-4"
              {...register(`openingHours.${index}.dinnerIsClosed`)}
            />
          </div>
        </div>
        <fieldset disabled={isDinnerClosed} className="flex flex-col gap-1">
          <input
            type="time"
            className="w-full rounded border p-1 text-sm disabled:bg-gray-100"
            {...register(`openingHours.${index}.dinnerOpenTime`)}
          />
          <input
            type="time"
            className="w-full rounded border p-1 text-sm disabled:bg-gray-100"
            {...register(`openingHours.${index}.dinnerCloseTime`)}
          />
          {dayErrors?.dinnerCloseTime && (
            <p className="text-xs text-red-500">
              {dayErrors.dinnerCloseTime.message}
            </p>
          )}
        </fieldset>
      </div>
    </div>
  );
}
