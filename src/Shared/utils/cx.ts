import clsx from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

const tailwindMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [{ text: ['xxxs', 'xxs', 'xs', 'sm', 'base', 'lg', '2lg', 'xl', '2xl', '3xl'] }],
  },
});

export function cx(...inputs: (string | undefined | null | object)[]) {
  return tailwindMerge(clsx(inputs));
}
