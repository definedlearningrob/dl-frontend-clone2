import DOMPurify from 'dompurify';

export const cleanInjection = (dirty) => ({ __html: DOMPurify.sanitize(dirty) });
