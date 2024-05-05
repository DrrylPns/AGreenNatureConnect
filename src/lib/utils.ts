import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatStatus = (status:string)=>{
  const correctStatus = status === "APPROVED" ? "Approved" : "Declined"
  return correctStatus
}
const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export function formatDate(date: Date) {
  if (!date) return "No date set";

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };

  return new Date(date).toLocaleDateString(undefined, options);
}

export const calculateAge = (birthday: Date) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }

  return age;
};

export function calculateDaysUntilUsernameChange(lastChangeDate: Date): number {
  const today = new Date().getTime();
  const nextChangeDate = new Date(lastChangeDate);
  nextChangeDate.setDate(nextChangeDate.getDate() + 30);

  return Math.ceil((nextChangeDate.getTime() - today) / (1000 * 60 * 60 * 24));
}

// age restriction 13
export function getMinBirthDate() {
  const today = new Date();
  const minBirthYear = today.getFullYear() - 18; // change number to any age restriction number

  const minMonth = String(today.getMonth() + 1).padStart(2, '0');
  const minDay = String(today.getDate()).padStart(2, '0');

  return `${minBirthYear}-${minMonth}-${minDay}`;
}

export const formatCreatedAt = (createdAt: Date): string => {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
};